import{j as i,a as n,b as l,g as o}from"./app-9b057e5e.js";import{S as m}from"./SubscriptionPlanCard-f24e74c6.js";import{A as u}from"./Index-bbbf865e.js";import"./index-f5eb5316.js";import"./Button-bd2fd86d.js";function h(s){const{subscriptionPlans:r,env:a}=s,c=e=>{snap.pay(e.snap_token,{onSuccess:function(t){o.visit(route("dashboard"))},onPending:function(t){console.log({result:t})},onError:function(t){console.log({result:t})}})},p=e=>{o.post(route("subscriptionPlan.userSubscribe",{subscriptionPlan:e}),{},{only:["userSubscription"],onSuccess:({props:t})=>{c(t.userSubscription)}})};return i(u,{...s,children:[n(l,{title:"Subscription Plan",children:n("script",{src:"https://app.sandbox.midtrans.com/snap/snap.js","data-client-key":a.MIDTRANS_CLIENTKEY})}),i("div",{className:"py-20 flex flex-col items-center",children:[n("div",{className:"text-black font-semibold text-[26px] mb-3",children:"Pricing for Everyone"}),n("p",{className:"text-base text-gray-1 leading-7 max-w-[302px] text-center",children:"Invest your little money to get a whole new experiences from movies."}),n("div",{className:"flex justify-center gap-10 mt-[70px]",children:r.map(e=>n(m,{name:e.name,price:e.price,durationInMonth:e.active_period_in_months,features:JSON.parse(e.features),isPremium:e.name==="Premium",onSelectSubscription:()=>p(e.id)},e.id))})]})]})}export{h as default};
