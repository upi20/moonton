import{j as t,b as r,a as e}from"./app-9b057e5e.js";import{r as i,F as n,M as l}from"./react-flickity-component.es-3a4f28ab.js";import{A as o}from"./Index-bbbf865e.js";import"./index-f5eb5316.js";function h(){const s={cellAlign:"left",contain:!0,groupCells:1,wrapAround:!1,pageDots:!1,prevNextButtons:!1,draggable:">1"};return t(o,{children:[t(r,{children:[e("link",{rel:"stylesheet",href:"https://unpkg.com/flickity@2/dist/flickity.min.css"}),e("title",{children:"Dashboard"})]}),t("div",{children:[e("div",{className:"font-semibold text-[22px] text-black mb-4",children:"Featured Movies"}),e(i,{className:"gap-[30px]",options:s,children:[1,2,3].map(a=>e(n,{name:"name",slug:"name",category:"Action • Horror",thumbnail:`/assets/images/featured-${a}.png`,rating:4},a))})]}),t("div",{children:[e("div",{className:"font-semibold text-[22px] text-black mb-4",children:"Browse"}),e(i,{className:"gap-[30px]",options:s,children:[1,2,3,4].map(a=>e(l,{slug:"the-batman-in-love",name:`The Batman in Love ${a}`,category:"Comedy",thumbnail:`/assets/images/browse-${a}.png`},a))})]})]})}export{h as default};