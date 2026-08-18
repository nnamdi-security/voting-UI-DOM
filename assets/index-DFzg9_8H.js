(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=[`Augustine`,`Kosisochukwu`],t=[`Stephanie`,`Rita`,`James`,`Peter`,`Victor`,`Anthony`,`Charles`,`Augustine`,`Lillian`,`Gabriel`,`Christopher`,`Kosisochukwu`,`Bonaventure`,`Abigail`,`David`,`Amarachi`,`Loveth`,`Chidimma`,`Ifeanyi`,`Majesty`],n=new Set,r={};e.forEach(e=>{r[e]=0});var i={total:0,winner:void 0,poll:r},a=document.getElementById(`voterSelect`),o=document.getElementById(`candidateSelect`),s=document.getElementById(`castVoteBtn`),c=document.getElementById(`showResultBtn`),l=document.getElementById(`resultModal`),u=document.getElementById(`closeModalBtn`),d=document.getElementById(`resultContent`);t.forEach(e=>{let t=document.createElement(`option`);t.value=e,t.textContent=e,a.appendChild(t)}),e.forEach(e=>{let t=document.createElement(`option`);t.value=e,t.textContent=e,o.appendChild(t)});function f(){let e=a.value,t=o.value;if(!e){alert(`Please select a voter.`);return}if(!t){alert(`Please select a candidate.`);return}if(n.has(e)){alert(`${e} has already voted!`);return}n.add(e),i.poll[t]=(i.poll[t]||0)+1,i.total+=1,alert(`Vote cast successfully! ${e} voted for ${t}`)}function p(){let t=0,n=`No winner yet`,r=`<div class="space-y-4">`;e.forEach(e=>{let a=i.poll[e]||0;r+=`
      <div class="flex justify-between items-center border-b pb-2">
        <span class="font-medium">${e}</span>
        <span class="bg-blue-100 px-3 py-1 rounded-full">${a} vote${a===1?``:`s`}</span>
      </div>
    `,a>t&&(t=a,n=e)}),r+=`
    <div class="mt-4 pt-4 border-t-2 border-gray-300">
      <div class="flex justify-between items-center">
        <span class="font-bold">Total Votes:</span>
        <span class="font-bold">${i.total}</span>
      </div>
      <div class="flex justify-between items-center mt-2 text-green-600">
        <span class="font-bold text-lg">🏆 Winner:</span>
        <span class="font-bold text-lg">${n} (${t} votes)</span>
      </div>
    </div>
  `,r+=`</div>`,d.innerHTML=r,l.classList.remove(`hidden`),l.classList.add(`flex`)}s.addEventListener(`click`,f),c.addEventListener(`click`,p),u.addEventListener(`click`,()=>{l.classList.add(`hidden`),l.classList.remove(`flex`)}),l.addEventListener(`click`,e=>{e.target===l&&(l.classList.add(`hidden`),l.classList.remove(`flex`))});