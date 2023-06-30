<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\User\DashboardController;
use App\Http\Controllers\User\MovieController;
use App\Http\Controllers\User\SubscriptionPlanController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\Admin\MovieController as AdminMovieController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::post('midtrans/notification', [SubscriptionPlanController::class, 'midtransCallback']);

Route::get('/', function () {
    return Inertia::render('Auth/Login');
});

Route::prefix('prototype')->group(function () {
    Route::get('/login', function () {
        return Inertia::render('Prototype/Login');
    })->name('prototype.login');

    Route::get('/register', function () {
        return Inertia::render('Prototype/Register');
    })->name('prototype.register');

    Route::get('/dashboard', function () {
        return Inertia::render('Prototype/Dashboard');
    })->name('prototype.dashboard');

    Route::get('/subscription_plan', function () {
        return Inertia::render('Prototype/SubscriptionPlan');
    })->name('prototype.subscription_plan');

    Route::get('/movie/{slug}', function ($slug) {
        return Inertia::render('Prototype/Movie/Detail', ['slug' => $slug]);
    })->name('prototype.movie.detail');
});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
    Route::get('/dashboard/movie/{movie:slug}', [MovieController::class, 'show'])->name('dashboard.movie.show')->middleware('checkUserSubscription:true');
    Route::get('subscription-plan', [SubscriptionPlanController::class, 'index'])->name('subscriptionPlan')->middleware('checkUserSubscription:false');
    Route::post('subscription-plan/{subscriptionPlan}/user-subscribe', [SubscriptionPlanController::class, 'userSubscribe'])->name('subscriptionPlan.userSubscribe')->middleware('checkUserSubscription:false');
});

Route::middleware(['auth', 'role:admin'])->prefix('admin')->name('admin.dashboard.')->group(function () {
    Route::put('movie/{movie}/restore', [AdminMovieController::class, 'restore'])->name('movie.restore');
    Route::resource('movie', AdminMovieController::class);
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
