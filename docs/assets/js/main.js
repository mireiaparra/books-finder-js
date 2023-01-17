"use strict";const allList=document.querySelector(".js-allBoardGamesList"),favList=document.querySelector(".js-favBoardGamesList"),favSection=document.querySelector(".js-favSection"),searchBtn=document.querySelector(".js-searchBtn"),searchInput=document.querySelector(".js-searchInput"),container=document.querySelector(".js-main"),logBtn=document.querySelector(".js-LogBtn");let BoardGames=[],favBoardGames=[],favsLocal=JSON.parse(localStorage.getItem("favChars"));function handleClickSearch(e){e.preventDefault();const t=BoardGames.filter(e=>e.name.toLowerCase().includes(searchInput.value.toLowerCase())),a=BoardGames.filter(e=>e.type.toLowerCase().includes(searchInput.value.toLowerCase()));let c=t.concat(a);console.log(c.length),allList.innerHTML="",paintBoardGames(c,allList,"allBoardGames__list--article");const s=allList.children;setEventClick(s);for(let e=0;e<s.length;e++){s[e].addEventListener("click",handleClickFav);const t=s[e].firstChild;if(null!==favBoardGames&&favBoardGames!==[]){-1!==favBoardGames.findIndex(e=>e.char_id==parseInt(t.id))?t.classList.add("favsBoardGames__list--article"):t.classList.add("allBoardGames__list--article")}}}function paintFav(e){let t=e.currentTarget.firstChild;t.classList.add("favsBoardGames__list--article");const a=BoardGames.find(e=>e.id===t.id),c=favBoardGames.findIndex(e=>e.id===t.id);-1===c?favBoardGames.push(a):(favBoardGames.splice(c,1),t.classList.remove("favsBoardGames__list--article")),updateFavList()}function updateFavList(){favList.innerHTML="",0===favBoardGames.length||null===favBoardGames?(favSection.classList.add("hidden"),favSection.classList.remove("favsBoardGames"),container.classList.remove("main"),removeLocalSt()):(favSection.classList.remove("hidden"),favSection.classList.add("favsBoardGames"),paintBoardGames(favBoardGames,favList,"favsBoardGames__list--articleBtn"),styleFav(),setLocalSt())}function styleFav(){container.classList.add("main");const e=document.querySelectorAll(".favsBoardGames__list--articleBtn");for(const t of e){const e=document.createElement("p");e.classList.add("removeFav"),e.addEventListener("click",handleClickRemove);const a=document.createTextNode("X");e.appendChild(a),t.appendChild(e)}}function handleClickRemove(e){e.preventDefault();const t=favBoardGames.findIndex(t=>t.id===e.target.parentElement.id);favBoardGames.splice(t,1);const a=allList.children;Array.prototype.slice.call(a).find(t=>t.firstChild.id===e.target.parentElement.id).firstChild.classList.remove("favsBoardGames__list--article"),updateFavList()}function handleClickFav(e){e.preventDefault(),paintFav(e)}function setLocalSt(){localStorage.setItem("favChars",JSON.stringify(favBoardGames))}function removeLocalSt(){localStorage.removeItem("favChars")}function paintLocalSt(){if(null!==favsLocal&&favsLocal!==[]){favSection.classList.remove("hidden"),favSection.classList.add("favsBoardGames"),favBoardGames=favsLocal,paintBoardGames(favsLocal,favList,"favsBoardGames__list--articleBtn"),styleFav();const e=allList.children;for(let t=0;t<e.length;t++){const a=e[t].firstChild;-1!==favBoardGames.findIndex(e=>e.id===a.id)&&a.classList.add("favsBoardGames__list--article")}}}function createReset(){const e=document.createElement("button"),t=document.createTextNode("Delete All");e.appendChild(t),e.classList.add("favsBoardGames__reset"),favSection.appendChild(e),e.addEventListener("click",handleClickReset)}function handleClickReset(){favBoardGames=[],favList.innerHTML="",favSection.classList.add("hidden"),favSection.classList.remove("favsBoardGames"),container.classList.remove("main"),removeLocalSt();for(const e of allList.children)e.firstChild.classList.remove("favsBoardGames__list--article")}function paintBoardGames(e,t,a){for(let c=0;c<e.length;c++){const s=document.createElement("li"),r=document.createElement("article");r.classList.add(a),r.setAttribute("id",""+e[c].id);const n=document.createElement("img");n.src=""+e[c].image_url,n.alt="Photo of "+e[c].name,n.style.height="150px",n.style.width="120px",r.appendChild(n);const l=document.createElement("h2");r.appendChild(l);const i=document.createElement("p");r.appendChild(i),s.appendChild(r),t.appendChild(s);const o=document.createTextNode(""+e[c].name);l.appendChild(o);const d=document.createTextNode(""+e[c].type);if(i.appendChild(d),e[c].player_counts){const t=e[c].player_counts.join(","),a=document.createElement("ul"),s=document.createElement("p"),n=document.createTextNode(t);s.appendChild(n),a.appendChild(s),r.appendChild(a)}}}function getBoardGames(){fetch("https://api.boardgameatlas.com/api/search?order_by=popularity&client_id=fedCzdzOWG").then(e=>e.json()).then(e=>{BoardGames=e.games,paintBoardGames(BoardGames,allList,"allBoardGames__list--article");setEventClick(allList.children),paintLocalSt()})}function setEventClick(e){for(let t=0;t<e.length;t++)e[t].addEventListener("click",handleClickFav)}searchBtn.addEventListener("click",handleClickSearch),getBoardGames(),createReset();