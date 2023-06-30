import SubscriptionPlanCard from "@/Components/SubscriptionPlanCard";
import Authenticated from "@/Layouts/Authenticated/Index";
import { Head } from "@inertiajs/react";
import { router } from '@inertiajs/react';

export default function SubscriptionPlan(props) {
    const { subscriptionPlans } = props;
    const selectSubscription = (id) => {
        router.post(route('subscriptionPlan.userSubscribe', id));
    }

    return <Authenticated {...props}>
        <Head title="Subscription Plan" />
        <div className="py-20 flex flex-col items-center">
            <div className="text-black font-semibold text-[26px] mb-3">
                Pricing for Everyone
            </div>
            <p className="text-base text-gray-1 leading-7 max-w-[302px] text-center">
                Invest your little money to get a whole new experiences from movies.
            </p>


            <div className="flex justify-center gap-10 mt-[70px]">
                {subscriptionPlans.map((subscriptionPlan) => (
                    <SubscriptionPlanCard
                        name={subscriptionPlan.name}
                        price={subscriptionPlan.price}
                        durationInMonth={
                            subscriptionPlan.active_period_in_months
                        }
                        features={JSON.parse(subscriptionPlan.features)}
                        isPremium={subscriptionPlan.name === "Premium"}
                        key={subscriptionPlan.id}
                        onSelectSubscription={() =>
                            selectSubscription(subscriptionPlan.id)
                        }
                    />
                ))}
            </div>

        </div>
    </Authenticated>
}
