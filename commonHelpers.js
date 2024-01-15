import{S as q,i as y,a as D}from"./assets/vendor-1feca4b1.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))d(o);new MutationObserver(o=>{for(const s of o)if(s.type==="childList")for(const p of s.addedNodes)p.tagName==="LINK"&&p.rel==="modulepreload"&&d(p)}).observe(document,{childList:!0,subtree:!0});function n(o){const s={};return o.integrity&&(s.integrity=o.integrity),o.referrerpolicy&&(s.referrerPolicy=o.referrerpolicy),o.crossorigin==="use-credentials"?s.credentials="include":o.crossorigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function d(o){if(o.ep)return;o.ep=!0;const s=n(o);fetch(o.href,s)}})();const L=document.querySelector(".form"),l=document.querySelector(".gallery"),c=document.querySelector(".loader-up"),m=document.querySelector(".loader-down"),g=document.querySelector(".buttonLoadMore");let f,a=1,b=40,v,h;const P="https://pixabay.com/api/",r={on:"on",off:"off"},w=new q(".gallery a",{nav:!0,captionDelay:250,captionsData:"alt",close:!0,enableKeyboard:!0,docClose:!0});document.addEventListener("DOMContentLoaded",()=>{i(c,r.off),i(m,r.off)});function E(t,e){const n={key:"41531560-af55148938f1784ffe04592f4",q:t,image_type:"photo",orientation:"horizontal",safesearch:!0,page:e,per_page:b};return D.get(P,{params:n})}async function R(t){if(t.preventDefault(),f=t.target.elements.search.value.trim(),a=1,!f)return l.innerHTML="",u(r.off),y.info({position:"topRight",message:"Input search text"});try{i(c,r.on);const{data:{hits:e,totalHits:n}}=await E(f,a);if(h=Math.ceil(n/b),e.length>0)l.innerHTML=M(e),w.refresh(),v=document.querySelector(".gallery-item:first-child").getBoundingClientRect().top;else{l.innerHTML="",y.error({position:"topRight",message:"Sorry, there are no images matching your search query. Please try again!"}),i(c,r.off),u(r.off);return}S(h)}catch(e){console.log(e)}finally{i(c,r.off),L.reset()}}async function $(t){t.preventDefault(),a+=1,i(m,r.on);try{const{data:{hits:e}}=await E(f,a);l.insertAdjacentHTML("beforeend",M(e)),w.refresh(),i(m,r.off),window.scrollBy({top:v*4,behavior:"smooth"}),S(h)}catch(e){console.log(e)}}L.addEventListener("submit",R);g.addEventListener("click",$);function M(t){return t.reduce((e,n)=>e+`<li class="gallery-item">
    <a class="gallery-link" href="${n.largeImageURL}">
      <img
        class="gallery-image"
        src="${n.webformatURL}"
        alt="${n.tags}"
      />
    </a>
    <div class="info-img">
    <p>Likes<span>${n.likes}</span></p>
    <p>Views<span>${n.views}</span></p>
    <p>Comments<span>${n.comments}</span></p>
    <p>Downloads<span>${n.downloads}</span></p>
    </div>
  </li>`,"")}function u(t){t===r.on&&g.classList.remove("is-hidden"),t===r.off&&g.classList.add("is-hidden")}function i(t,e){e===r.on&&(t.style.display="block"),e===r.off&&(t.style.display="none")}function S(t){t===a?(u(r.off),y.info({position:"topRight",message:"We're sorry, but you've reached the end of search results."})):u(r.on)}
//# sourceMappingURL=commonHelpers.js.map
