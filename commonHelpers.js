import{S as v,i as m,a as M}from"./assets/vendor-1feca4b1.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))i(o);new MutationObserver(o=>{for(const s of o)if(s.type==="childList")for(const c of s.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&i(c)}).observe(document,{childList:!0,subtree:!0});function r(o){const s={};return o.integrity&&(s.integrity=o.integrity),o.referrerpolicy&&(s.referrerPolicy=o.referrerpolicy),o.crossorigin==="use-credentials"?s.credentials="include":o.crossorigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(o){if(o.ep)return;o.ep=!0;const s=r(o);fetch(o.href,s)}})();const g=document.querySelector(".form"),u=document.querySelector(".gallery"),y=document.querySelector("body>span"),d=document.querySelector(".buttonLoadMore");let p,l=1;const S="https://pixabay.com/api",n={on:"on",off:"off"},h=new v(".gallery a",{nav:!0,captionDelay:250,captionsData:"alt",close:!0,enableKeyboard:!0,docClose:!0});document.addEventListener("DOMContentLoaded",()=>{a(n.off)});function L(e,t){const r={key:"41531560-af55148938f1784ffe04592f4",q:e,image_type:"photo",orientation:"horizontal",safesearch:!0,page:t,per_page:40};return M.get(S,{params:r})}async function w(e){e.preventDefault(),u.innerHTML="",a(n.on),p=e.target.elements.search.value.trim();try{const{data:{hits:t,total:r,totalHits:i}}=await L(p,l);if(t.length>0)a(),u.innerHTML=b(t),h.refresh(),a(n.off);else{m.error({position:"topRight",message:"Sorry, there are no images matching your search query. Please try again!"}),a(n.off),f(n.off);return}Math.ceil(r/i)>l?f(n.on):f(n.off)}catch(t){console.log(t)}finally{g.reset()}}async function E(e){e.preventDefault(),l+=1,a(n.on);try{const{data:{hits:t,total:r,totalHits:i}}=await L(p,l);u.insertAdjacentHTML("beforeend",b(t)),h.refresh(),a(n.off),q(totalPages)}catch(t){console.log(t)}}g.addEventListener("submit",w);d.addEventListener("click",E);function b(e){return e.reduce((t,r)=>t+`<li class="gallery-item">
    <a class="gallery-link" href="${r.largeImageURL}">
      <img
        class="gallery-image"
        src="${r.webformatURL}"
        alt="${r.tags}"
      />
    </a>
    <div class="info-img">
    <p>Likes<span>${r.likes}</span></p>
    <p>Views<span>${r.views}</span></p>
    <p>Comments<span>${r.comments}</span></p>
    <p>Downloads<span>${r.downloads}</span></p>
    </div>
  </li>`,"")}function f(e){e===n.on&&d.classList.remove("is-hidden"),e===n.off&&d.classList.add("is-hidden")}function a(e){e===n.on&&(y.style.display="block"),e===n.off&&(y.style.display="none")}function q(e){l===e&&m.info({position:"topRight",message:"We're sorry, but you've reached the end of search results."})}
//# sourceMappingURL=commonHelpers.js.map
