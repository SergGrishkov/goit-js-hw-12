import{S as E,i as d,a as M}from"./assets/vendor-1feca4b1.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))y(o);new MutationObserver(o=>{for(const s of o)if(s.type==="childList")for(const u of s.addedNodes)u.tagName==="LINK"&&u.rel==="modulepreload"&&y(u)}).observe(document,{childList:!0,subtree:!0});function n(o){const s={};return o.integrity&&(s.integrity=o.integrity),o.referrerpolicy&&(s.referrerPolicy=o.referrerpolicy),o.crossorigin==="use-credentials"?s.credentials="include":o.crossorigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function y(o){if(o.ep)return;o.ep=!0;const s=n(o);fetch(o.href,s)}})();const g=document.querySelector(".form"),a=document.querySelector(".gallery"),m=document.querySelector("body>span"),p=document.querySelector(".buttonLoadMore");let l,c=1,h=40,L;const q="https://pixabay.com/api/",r={on:"on",off:"off"},b=new E(".gallery a",{nav:!0,captionDelay:250,captionsData:"alt",close:!0,enableKeyboard:!0,docClose:!0});document.addEventListener("DOMContentLoaded",()=>{i(r.off)});function v(t,e){const n={key:"41531560-af55148938f1784ffe04592f4",q:t,image_type:"photo",orientation:"horizontal",safesearch:!0,page:e,per_page:h};return M.get(q,{params:n})}async function D(t){if(t.preventDefault(),l=t.target.elements.search.value.trim(),c=1,!l)return a.innerHTML="",f(r.off),d.info({position:"topRight",message:"Input search text"});i(r.on);try{const{data:{hits:e}}=await v(l,c);if(e.length>0)w(e),i(r.on),a.innerHTML=S(e),b.refresh(),i(r.off),L=document.querySelector(".gallery-item:first-child").getBoundingClientRect().top;else{a.innerHTML="",d.error({position:"topRight",message:"Sorry, there are no images matching your search query. Please try again!"}),i(r.off),f(r.off);return}}catch(e){console.log(e)}finally{g.reset()}}async function R(t){t.preventDefault(),c+=1,i(r.on);try{const{data:{hits:e}}=await v(l,c);a.insertAdjacentHTML("beforeend",S(e)),b.refresh(),i(r.off),window.scrollBy({top:L*4,behavior:"smooth"}),w(e)}catch(e){console.log(e)}}g.addEventListener("submit",D);p.addEventListener("click",R);function S(t){return t.reduce((e,n)=>e+`<li class="gallery-item">
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
  </li>`,"")}function f(t){t===r.on&&p.classList.remove("is-hidden"),t===r.off&&p.classList.add("is-hidden")}function i(t){t===r.on&&(m.style.display="block"),t===r.off&&(m.style.display="none")}function w(t){t.length<h?(f(r.off),d.info({position:"topRight",message:"We're sorry, but you've reached the end of search results."})):f(r.on)}
//# sourceMappingURL=commonHelpers.js.map
