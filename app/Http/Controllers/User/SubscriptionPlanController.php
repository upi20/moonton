<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\SubscriptionPlan;
use App\Models\UserSubscription;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use Carbon\Carbon;
use Illuminate\Support\Facades\Redirect;
use Midtrans\Config;
use Midtrans\Notification;
use Midtrans\Snap;

class SubscriptionPlanController extends Controller
{

    public function __construct()
    {
        // Set your Merchant Server Key
        Config::$serverKey = env('MIDTRANS_SERVERKEY');
        // Set to Development/Sandbox Environment (default). Set to true for Production Environment (accept real transaction).
        Config::$isProduction = env('MIDTRANS_IS_PRODUCTION', false);
        // Set sanitization on (default)
        Config::$isSanitized = env('MIDTRANS_IS_SANITIZED', false);
        // Set 3DS transaction for credit card to true
        Config::$is3ds = env('MIDTRANS_IS_3DS', false);
    }

    public function index(Request $request)
    {
        $subscriptionPlans = SubscriptionPlan::all();

        return inertia('User/Dashboard/SubscriptionPlan/Index', [
            'subscriptionPlans' => $subscriptionPlans,
            'userSubscription' => null,
        ]);
    }

    public function userSubscribe(Request $request, SubscriptionPlan $subscriptionPlan)
    {

        $data = [
            'user_id' => Auth::id(),
            'subscription_plan_id' => $subscriptionPlan->id,
            'price' => $subscriptionPlan->price,
            'expired_date' => Carbon::now()->addMonth($subscriptionPlan->active_period_in_months),
            'payment_status' => 'pending',
        ];

        $userSubscription = UserSubscription::create($data);

        $params = [
            'transaction_details' => [
                'order_id' => $userSubscription->id . '-' . Str::random(5),
                'gross_amount' => $userSubscription->price
            ]
        ];

        $snapToken = Snap::getSnapToken($params);

        $userSubscription->update([
            'snap_token' => $snapToken
        ]);

        return inertia('User/Dashboard/SubscriptionPlan/Index', [
            'userSubscription' => $userSubscription,
        ]);

        return Redirect::route('dashboard');
    }

    public function midtransCallback(Request $request)
    {
        $notif = new Notification();

        $transaction_status = $notif->transaction_status;
        $fraud = $notif->fraud_status;

        $transaction_id = explode('-', $notif->order_id)[0];
        $userSubscription = UserSubscription::find($transaction_id);

        if ($transaction_status == 'capture') {
            if ($fraud == 'challenge') {
                // TODO Set payment status in merchant's database to 'challenge'
                $userSubscription->payment_status = 'pending';
            } else if ($fraud == 'accept') {
                // TODO Set payment status in merchant's database to 'success'
                $userSubscription->payment_status = 'paid';
                $userSubscription->expired_date = Carbon::now()->addMonths((int) $userSubscription->subscriptionPlan->active_period_in_months);
            }
        } else if ($transaction_status == 'cancel') {
            if ($fraud == 'challenge') {
                // TODO Set payment status in merchant's database to 'failure'
                $userSubscription->payment_status = 'failed';
            } else if ($fraud == 'accept') {
                // TODO Set payment status in merchant's database to 'failure'
                $userSubscription->payment_status = 'failed';
            }
        } else if ($transaction_status == 'deny') {
            // TODO Set payment status in merchant's database to 'failure'
            $userSubscription->payment_status = 'failed';
        } else if ($transaction_status == 'settlement') {
            // TODO set payment status in merchant's database to 'Settlement'
            $userSubscription->payment_status = 'paid';
            $userSubscription->expired_date = Carbon::now()->addMonths((int) $userSubscription->subscriptionPlan->active_period_in_months);
        } else if ($transaction_status == 'pending') {
            // TODO set payment status in merchant's database to 'Pending'
            $userSubscription->payment_status = 'pending';
        } else if ($transaction_status == 'expire') {
            // TODO set payment status in merchant's database to 'expire'
            $userSubscription->payment_status = 'failed';
        }

        $userSubscription->save();
        return response()->json([
            'status' => 'success',
            'message' => 'Payment success'
        ]);
    }
}
