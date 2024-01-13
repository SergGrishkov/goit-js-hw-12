import{S,i as m,a as w}from"./assets/vendor-1feca4b1.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))i(e);new MutationObserver(e=>{for(const s of e)if(s.type==="childList")for(const c of s.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&i(c)}).observe(document,{childList:!0,subtree:!0});function r(e){const s={};return e.integrity&&(s.integrity=e.integrity),e.referrerpolicy&&(s.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?s.credentials="include":e.crossorigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(e){if(e.ep)return;e.ep=!0;const s=r(e);fetch(e.href,s)}})();const g=document.querySelector(".form"),d=document.querySelector(".gallery"),y=document.querySelector("body>span"),u=document.querySelector(".buttonLoadMore");let p,l=1,h;const M="https://pixabay.com/api/",n={on:"on",off:"off"},L=new S(".gallery a",{nav:!0,captionDelay:250,captionsData:"alt",close:!0,enableKeyboard:!0,docClose:!0});document.addEventListener("DOMContentLoaded",()=>{a(n.off)});function b(t,o){const r={key:"41531560-af55148938f1784ffe04592f4",q:t,image_type:"photo",orientation:"horizontal",safesearch:!0,page:o,per_page:40};return w.get(M,{params:r})}async function E(t){t.preventDefault(),d.innerHTML="",a(n.on),p=t.target.elements.search.value.trim();try{const{data:{hits:o,total:r,totalHits:i}}=await b(p,l);if(o.length>0){a(),d.innerHTML=v(o),L.refresh(),a(n.off);let e=document.querySelector(".gallery-item:first-child");console.log(e.getBoundingClientRect()),h=e.getBoundingClientRect().top}else{m.error({position:"topRight",message:"Sorry, there are no images matching your search query. Please try again!"}),a(n.off),f(n.off);return}Math.ceil(r/i)>l?f(n.on):f(n.off)}catch(o){console.log(o)}finally{g.reset()}}async function q(t){t.preventDefault(),l+=1,a(n.on);try{const{data:{hits:o,total:r,totalHits:i}}=await b(p,l);d.insertAdjacentHTML("beforeend",v(o)),L.refresh(),a(n.off),window.scrollBy({top:h*4,behavior:"smooth"}),D(totalPages)}catch(o){console.log(o)}}g.addEventListener("submit",E);u.addEventListener("click",q);function v(t){return t.reduce((o,r)=>o+`<li class="gallery-item">
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
  </li>`,"")}function f(t){t===n.on&&u.classList.remove("is-hidden"),t===n.off&&u.classList.add("is-hidden")}function a(t){t===n.on&&(y.style.display="block"),t===n.off&&(y.style.display="none")}function D(t){l===t&&m.info({position:"topRight",message:"We're sorry, but you've reached the end of search results."})}
//# sourceMappingURL=commonHelpers.js.map
