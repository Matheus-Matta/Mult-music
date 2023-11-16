import { getSearch } from "../requests/getSearch.js"; // (token,query)
import { requestToken } from "../requests/requestToken.js"
import { resetContent } from "./apiSpotify.js";
import { perfilArtist } from "./perfilArtist.js";
import { playerSong } from "./player.js";

const token = await requestToken();
const width = window.innerWidth;

const btnLogo = document.querySelector("#box-logo")
const btnClean = document.querySelector("#icon-clean")

let section;
let typingTimer;

let tamCorte;
if(width > 1000){
    tamCorte = 25;
} else {
    tamCorte = 45;
}
if(width <= 700){
    tamCorte = 20;
}

export  async function searchContent(){
    if(width < 1450){
       section = document.querySelector("section")
    } else {
       section = document.querySelector("#box-music-recommended")
    }
    const search = document.querySelector("#seacrh")
    search.addEventListener("input", async ()=>{

        btnLogo.className = 'inativo';
        btnClean.classList.add("inativo");

        clearTimeout(typingTimer);
        typingTimer = setTimeout(async() => {

            const result = await getSearch(token, search.value);
            console.log(result)
            if (result == false) {
               await resetContent();
              } else if (result == null) {
              } else {
                if(width < 1450){
                    section.style.flexDirection = "column";
                    section.style.justifyContent = "center"
                }
                section.innerHTML = ""
                const mainContent = document.createElement('div');
                mainContent.innerHTML = `
                    <div class="box-searchContent">
                    <div class="contentArtist">
                        <div class="content-info">
                            <div class="artist-img">
                            </div>
                            <div class="artist-info">
                                <h2  class="activate-profile" data-id="${result.artistResult.id}">${result.artistResult.name}</h2>
                                <p>followers: ${result.artist.followers.total} ✔︎</p>
                                <p>Popularity: ${result.artist.popularity} ⤴︎</p>
                                <p>albums: ${result.albums.total}</p>
                            </div>
                           
                        </div>
                        <div class="musics-artist">
                            <ul>
                                
                                
                            </ul>
                        </div>
                       
                    </div>
                 </div>
                 <div class="box-title">
                 <h1>Outras musicas:</h1>
                 </div>
                 <div class="other-songs">
                 </div> 
                 `;
                 section.appendChild(mainContent);
                 const ul = document.querySelector(".musics-artist ul")
                 let quant = 9;
                 for(var i = 0;i < quant;i++){
                    if(result.tracks.tracks[i].name == result.songResult.name){
                        quant++;
                        continue
                    }
                    let li = document.createElement('li')
                    li.setAttribute('data-id',result.tracks.tracks[i].id);
                    li.className = "active-song"
                    li.innerHTML = `
                       ${result.tracks.tracks[i].name}
                    `
                    ul.appendChild(li)
                 }
                 const contentArtist = document.querySelector(".contentArtist")
                 let nameMusic = result.songResult.name;
                 if(nameMusic.length > tamCorte){
                    nameMusic =  nameMusic.slice(0, tamCorte) + "...";
                 }
                 const div = document.createElement('div')
                 div.className = 'box-music-searched active-song'
                 div.setAttribute('data-id',result.songResult.id);
                 div.innerHTML = `
                        <div class="music-searched">
                        <div class="music-img">

                        </div>
                        <div class="music-info">
                            <h2>${nameMusic}</h2>
                            <p class="activate-profile" data-id="${result.artistResult.id}">${result.artistResult.name}</p>
                        </div>
                    </div>
                    <div class="music-duration">
                        <p>${result.songResult.duração}</p>
                        <svg class="icon-mais" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"  viewBox="0 0 24 24">
                            <path fill-rule="evenodd" d="M 11 2 L 11 11 L 2 11 L 2 13 L 11 13 L 11 22 L 13 22 L 13 13 L 22 13 L 22 11 L 13 11 L 13 2 Z"></path>
                        </svg>
                    </div> 
                 `
                 contentArtist.appendChild(div)

                 const imgArtist = document.querySelector(".artist-img")
                 const imgMusic = document.querySelector(".music-img")
                 imgArtist.style.backgroundImage = `url(${result.artist.images[0].url})`
                 imgMusic.style.backgroundImage = `url(${result.songResult.image})`

                 const otherSongs = document.querySelector(".other-songs")

                 for(var i = 1;i < 11;i++){
                    const song = document.createElement('div')
                    let nameMusic = result.songResult.outros[i].name;
                    if(nameMusic.length > tamCorte){
                       nameMusic =  nameMusic.slice(0, tamCorte) + "...";
                    }
                    song.className = "songs active-song"
                    song.setAttribute('data-id',result.songResult.outros[i].id);
                    song.innerHTML = `
                    <div class="box-info">
                       <div class="music-img">
      
                       </div>
                       <div class="music-info">
                          <h2>${nameMusic}</h2>
                          <p class="activate-profile" data-id="${result.songResult.outros[i].album.artists[0].id}">${result.songResult.outros[i].album.artists[0].name}</p>
                       </div>
                    </div>   
                  
                       <div class="music-duration">
                           <p>${(result.songResult.outros[i].duration_ms / 60000).toFixed(2).replace(".",":")}</p>
                           <svg class="icon-mais" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"  viewBox="0 0 24 24">
                               <path fill-rule="evenodd" d="M 11 2 L 11 11 L 2 11 L 2 13 L 11 13 L 11 22 L 13 22 L 13 13 L 22 13 L 22 11 L 13 11 L 13 2 Z"></path>
                           </svg>
                       </div>
                    `
                    otherSongs.appendChild(song)
                 }
                 const otherImg = document.querySelectorAll(".songs .music-img")
                 otherImg.forEach((img,index)=>{
                    img.style.backgroundImage = `url(${result.songResult.outros[index+1].album.images[0].url})`
                 })

                btnLogo.classList.remove("inativo");
                btnClean.classList.remove("inativo");
                await perfilArtist();
                await playerSong();

            } // fim else 
        },400) // fim timeout
    }) // fim evento input 
} // fim função
