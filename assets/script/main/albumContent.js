import { removeElement } from "../import.js";
import { getAlbumTracks } from "../requests/getAlbumTracks.js";
import { perfilArtist } from "./perfilArtist.js";
import { disableEvents,enableEvents } from "./spinners.js";
import { playerSong } from "./player.js";

const width = window.innerWidth;
let tam;
if(width > 1000){
    tam =  75;
} else if(width <= 600){
    tam = 20;
}

export async function albumContent(){
   const allAlbums = document.querySelectorAll(".active-album")
   allAlbums.forEach((album)=>{
    album.addEventListener("click",async()=>{
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
        section.innerHTML = "";
        const imgAlbum = album.querySelector(".album-img").getAttribute('style').match(/url\((["'])(.*?)\1\)/)[2];
        const albumName = album.querySelector(".album-info h2").innerHTML;
        const id = album.dataset.id
        const data = await getAlbumTracks(id)
        const quant = data.length
        console.log(data)
        const perfilCategory = document.createElement("div")
        perfilCategory.className = "box-perfil-category"
        perfilCategory.innerHTML = `
                <div class="img-category">
                </div>
                <div class="info-category">
                    <h2>${data[0].artists[0].name}</h2>
                    <h3>${albumName}</h3>   
                </div>
        `;
        section.appendChild(perfilCategory)
        await removeElement(".box-perfil-category",1);

        const imgPer = document.querySelector(".img-category")
        imgPer.style.backgroundImage = `url(${imgAlbum})`
        const musicsCategory = document.createElement("div")
        musicsCategory.className = "box-music-category"
        section.appendChild(musicsCategory)
        const musics = document.querySelector(".box-music-category")
        for(var i = 0;i < quant ;i++){
            let nameMusic = data[i].name
            if(nameMusic.length > tam){
                nameMusic =  nameMusic.slice(0,tam) + "...";
            }
            const nameArtists = new Array()
            for(var j = 0;j<data[i].artists.length;j++){
                const obj = {
                    name: data[i].artists[j].name,
                    id:data[i].artists[j].id,
                }
                nameArtists.push(obj)
            }
            const div =  document.createElement("div");
            div.className = "music-category active-song";
            div.setAttribute("data-id",data[i].id)
            div.innerHTML = `
                <div class="info-items-category">
                    <div class="img-music-category"><p>${i+1}</p></div>
                    <div class="info-music-category">
                        <h3>${nameMusic}</h3>
                        <div class="box-artists"></div>
                    </div>
                </div>
                <div class="more-and-duration">
                    <p>${(data[i].duration_ms / 60000).toFixed(2).replace(".",":")}</p>
                    <svg class="icon-mais" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"  viewBox="0 0 24 24">
                        <path fill-rule="evenodd" d="M 11 2 L 11 11 L 2 11 L 2 13 L 11 13 L 11 22 L 13 22 L 13 13 L 22 13 L 22 11 L 13 11 L 13 2 Z"></path>
                    </svg>
                </div>
            `;
            musics.appendChild(div);
            const boxArtist = document.querySelectorAll(".box-artists")[i]
            for(var j = 0;j<nameArtists.length;j++){
                const p = document.createElement("p")
                p.className = "activate-profile"
                p.setAttribute("data-id", `${nameArtists[j].id}`);
                p.innerHTML = `${nameArtists[j].name},`
                boxArtist.appendChild(p);
            }
            const allP = boxArtist.querySelectorAll("p")
            if (allP.length > nameArtists.length) {
                for (let i = nameArtists.length; i < allP.length; i++){
                    allP[i].remove();
             }
            }
        };
        await removeElement(".music-category",quant);
       
        

        enableEvents();
        await perfilArtist();
        playerSong();
    })
   })

}
