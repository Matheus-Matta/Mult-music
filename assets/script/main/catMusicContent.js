import { getMusicCategory } from "../requests/getMusicCategory.js"
import { requestToken } from "../requests/requestToken.js"
import { getCategoryPlaylists } from "../requests/getCategorys.js";
import { removeElement } from "../import.js";
import { perfilArtist } from "./perfilArtist.js";
import { disableEvents,enableEvents } from "./spinners.js";
import { playerSong } from "./player.js";

const token = await requestToken();

const width = window.innerWidth;
let tam;

if(width > 1000){
    tam = 25;
} else {
    tam= 45;
}
if(width <= 750 && width >= 660 ){
    tam = 20;
} else if (width < 660){
    tam = 15;
}

export async function catMusicContent(){
    const Allcat = document.querySelectorAll(".active-category")
    Allcat.forEach((cat)=>{
        cat.addEventListener("click",async()=>{
            disableEvents();
            let section;
            if(width < 1450){
                section = document.querySelector("section")
                section.style.flexDirection = "column";
                section.style.alignItems = "center"
    
                const body = document.querySelector("body")
                body.classList.add("body-resposiv");
                
            } else {
                section = document.querySelector("#box-music-recommended")
            }
             
            section.innerHTML = ""


            const id = cat.dataset.id
            const idCat = cat.dataset.idcat
            const infoCat = await getCategoryPlaylists(token,idCat);
            const musicResult = await  getMusicCategory(id);

            const quant = musicResult.length
 
            const perfilCategory = document.createElement("div")
            perfilCategory.className = "box-perfil-category"
            perfilCategory.innerHTML = `
                    <div class="img-category">
                    </div>
                    <div class="info-category">
                        <h1>${infoCat.name}</h1>
                        <p>${infoCat.description}</p>
                    </div>
            `;
            section.appendChild(perfilCategory)
            await removeElement(".box-perfil-category",1);

            const imgCat = document.querySelector(".img-category")
            imgCat.style.backgroundImage = `url(${infoCat.images[0].url})`

            const musicsCategory = document.createElement("div")
            musicsCategory.className = "box-music-category"
            section.appendChild(musicsCategory)
            const musics = document.querySelector(".box-music-category")
            for(var i = 0;i < quant ;i++){
                let nameMusic = musicResult[i].track.name
                if(nameMusic.length > tam){
                    nameMusic =  nameMusic.slice(0,tam) + "...";
                }
                let albumName = musicResult[i].track.album.name
                if( albumName.length > tam){
                    albumName =  albumName.slice(0,tam) + "...";
                }
                const div =  document.createElement("div");
                div.className = "music-category active-song";
                div.setAttribute("data-id",musicResult[i].track.id)
                div.innerHTML = `
                    <div class="info-items-category">
                        <div class="img-music-category"></div>
                        <div class="info-music-category">
                            <h3>${nameMusic}</h3>
                            <p class="activate-profile" data-id="${musicResult[i].track.artists[0].id}">${musicResult[i].track.artists[0].name}</p>
                        </div>
                    </div>
                    <div class="more-and-duration">
                    <h1>${albumName}</h1>
                        <p>${(musicResult[i].track.duration_ms / 60000).toFixed(2).replace(".",":")}</p>
                        <svg class="icon-mais" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"  viewBox="0 0 24 24">
                            <path fill-rule="evenodd" d="M 11 2 L 11 11 L 2 11 L 2 13 L 11 13 L 11 22 L 13 22 L 13 13 L 22 13 L 22 11 L 13 11 L 13 2 Z"></path>
                        </svg>
                    </div>
                `;
                musics.appendChild(div);
            };
            await removeElement(".music-category",quant);
            const allMusics = document.querySelectorAll(".img-music-category")
            allMusics.forEach((music,index)=>{
                music.style.backgroundImage = `url(${musicResult[index].track.album.images[0].url})`
            })

            enableEvents();
            await perfilArtist();
            playerSong();
        })
    })
}