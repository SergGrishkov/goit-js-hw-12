import{S as q,i as m,a as D}from"./assets/vendor-1feca4b1.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))p(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const y of s.addedNodes)y.tagName==="LINK"&&y.rel==="modulepreload"&&p(y)}).observe(document,{childList:!0,subtree:!0});function o(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerpolicy&&(s.referrerPolicy=r.referrerpolicy),r.crossorigin==="use-credentials"?s.credentials="include":r.crossorigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function p(r){if(r.ep)return;r.ep=!0;const s=o(r);fetch(r.href,s)}})();const b=document.querySelector(".form"),l=document.querySelector(".gallery"),c=document.querySelector(".loader-up"),g=document.querySelector(".loader-down"),h=document.querySelector(".buttonLoadMore");let f,a=1,L=40,v,u;const P="https://pixabay.com/api/",n={on:"on",off:"off"},w=new q(".gallery a",{nav:!0,captionDelay:250,captionsData:"alt",close:!0,enableKeyboard:!0,docClose:!0});document.addEventListener("DOMContentLoaded",()=>{i(c,n.off),i(g,n.off)});function M(t,e){const o={key:"41531560-af55148938f1784ffe04592f4",q:t,image_type:"photo",orientation:"horizontal",safesearch:!0,page:e,per_page:L};return D.get(P,{params:o})}async function R(t){if(t.preventDefault(),f=t.target.elements.search.value.trim(),a=1,!f)return l.innerHTML="",d(n.off),m.info({position:"topRight",message:"Input search text"});try{i(c,n.on);const{data:{hits:e,totalHits:o}}=await M(f,a);if(u=Math.ceil(o/L),e.length>0)l.innerHTML=E(e),w.refresh(),v=document.querySelector(".gallery-item:first-child").getBoundingClientRect().top;else{l.innerHTML="",m.error({position:"topRight",message:"Sorry, there are no images matching your search query. Please try again!"}),i(c,n.off),d(n.off);return}S(u)}catch(e){console.log(e)}finally{i(c,n.off),b.reset()}}async function $(t){t.preventDefault(),a+=1,i(g,n.on);try{const{data:{hits:e,totalHits:o}}=await M(f,a);u=Math.ceil(o/L),l.insertAdjacentHTML("beforeend",E(e)),w.refresh(),i(g,n.off),window.scrollBy({top:v*4,behavior:"smooth"}),S(u)}catch(e){console.log(e)}}b.addEventListener("submit",R);h.addEventListener("click",$);function E(t){return t.reduce((e,o)=>e+`<li class="gallery-item">
    <a class="gallery-link" href="${o.largeImageURL}">
      <img
        class="gallery-image"
        src="${o.webformatURL}"
        alt="${o.tags}"
      />
    </a>
    <div class="info-img">
    <p>Likes<span>${o.likes}</span></p>
    <p>Views<span>${o.views}</span></p>
    <p>Comments<span>${o.comments}</span></p>
    <p>Downloads<span>${o.downloads}</span></p>
    </div>
  </li>`,"")}function d(t){t===n.on&&h.classList.remove("is-hidden"),t===n.off&&h.classList.add("is-hidden")}function i(t,e){e===n.on&&(t.style.display="block"),e===n.off&&(t.style.display="none")}function S(t){t===a?(d(n.off),m.info({position:"topRight",message:"We're sorry, but you've reached the end of search results."})):d(n.on)}
//# sourceMappingURL=commonHelpers.js.map
