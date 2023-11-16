import {getTracksArtist} from "../requests/getTracksArtist.js"; // (token,artist_id)
import { requestToken } from "../requests/requestToken.js"
import { removeElement } from "../import.js";
import { albumContent } from "./albumContent.js";
import { disableEvents,enableEvents } from "./spinners.js";
import { playerSong } from "./player.js";

export async function perfilArtist(){
const token = await requestToken();

const width = window.innerWidth;
let section;

let tam = 25;
if( width > 500 && width < 620){
    tam = 45
} else if(width <= 500){
    tam = 20
    console.log(width)
}

 const btnPlay = document.querySelectorAll(".activate-profile")
 btnPlay.forEach((btn)=>{
    btn.addEventListener("click", async ()=>{
        disableEvents();
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
        const idArtist = btn.dataset.id
        const data = await getTracksArtist(token,idArtist);
        
        const box = document.createElement("div")
        box.className = "box-perfil-artist"
        section.appendChild(box)
        const boxPerfil = document.querySelector(".box-perfil-artist")

        const perfilArtist = document.createElement("div")
        perfilArtist.className = "perfil-artist"
        perfilArtist.innerHTML = `
                    <div class="box-perfil-img">
                        <h1 class="name-img">${(data.artist.name).toUpperCase()}</h1>
                        <div class="perfil-img"></div>
                        <span id="perfil-blur"></span>
                    </div>
                    <div class="infos-artist">
                       <h2>${data.artist.name}</h2>
                       <div class="infos">
                           <div class="info">Popularidade:<p>${data.artist.popularity}</p> ⤴︎</div>
                           <div class="info">Seguidores:<p>${data.artist.followers.total}</p> ✔︎</div>
                           <div class="info-genres">generos:<p>${data.artist.genres}</p></div>
                       </div>
                    </div>
        `;
        boxPerfil.appendChild(perfilArtist)
        const imgPerfilBg = document.querySelector(".box-perfil-img")
        const imgPerfil = document.querySelector(".perfil-img")
        imgPerfilBg.style.backgroundImage = `url(${data.artist.images[0].url})`
        imgPerfil.style.backgroundImage = `url(${data.artist.images[0].url})`


        await removeElement(".perfil-artist",1)
        
 
        const divSongs =  document.createElement("div")
        divSongs.className = "other-songs"
        section.appendChild(divSongs)
        const songs = document.querySelector(".other-songs")
        for(var i = 0; i < 10;i++){
        let nameMusic = data.tracks.tracks[i].name
        if(nameMusic.length > tam){
            nameMusic =  nameMusic.slice(0,tam) + "...";
        }
        let nameAlbum = data.tracks.tracks[i].album.name
        if( nameAlbum.length > 25){
            nameAlbum =  nameAlbum.slice(0,25) + "...";
        }
        let song =  document.createElement("div")
        song.className = 'songs active-song'
        song.setAttribute('data-id',data.tracks.tracks[i].id)
        song.innerHTML = `
            <div class="box-info">
                <div class="music-img"></div>
                <div class="music-info">
                    <h2>${nameMusic}</h2>
                    <p>${nameAlbum}</p>
                </div>
            </div>   
            <div class="music-duration">
                <p>${(data.tracks.tracks[i].duration_ms /  60000).toFixed(2).replace(".",":")}</p>
                <svg class="icon-mais" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"  viewBox="0 0 24 24">
                    <path fill-rule="evenodd" d="M 11 2 L 11 11 L 2 11 L 2 13 L 11 13 L 11 22 L 13 22 L 13 13 L 22 13 L 22 11 L 13 11 L 13 2 Z"></path>
                </svg>
            </div>
        `;
        songs.appendChild(song)
    }// fim for da musicas

    await removeElement(".songs",10)
   

    const imgMusic = document.querySelectorAll(".music-img")
    imgMusic.forEach((img,index)=>{
        img.style.backgroundImage = `url(${data.tracks.tracks[index].album.images[0].url})`
    })
   
    const boxAlbums = document.createElement("div")
    boxAlbums.className = "box-albums"
    section.appendChild(boxAlbums)
    const albums = document.querySelector(".box-albums")
    let quant = data.albums.items.length;

    for(var i = 0;i < quant; i++){
      let nameAlbum = data.albums.items[i].name;
        if( nameAlbum.length > 15){
            nameAlbum =  nameAlbum.slice(0,15) + "...";
       }
      const album = document.createElement("div")
      album.className = "album active-album"
      album.setAttribute("data-id", `${data.albums.items[i].id}`);
      album.innerHTML = `
            <div class="album-img"></div>
            <div class="album-info">
                <h2>${(nameAlbum).toLowerCase()}</h2>
                    <div class="infos">
                        <p>${(data.albums.items[i].release_date).replace("-","/")}</p>
                        <p>•</p>
                        <p>${data.albums.items[i].total_tracks}</p>
                    </div>
            </div>
      `;
      albums.appendChild(album)
    } // fim for albums

    await removeElement(".album",quant)

    const imgAlbum = document.querySelectorAll(".album-img")
    imgAlbum.forEach((img,index)=>{
        img.style.backgroundImage = `url(${data.albums.items[index].images[0].url})`
    })

    enableEvents();
    await albumContent();
    playerSong();

    })// fim click
 })// fim foreach
}// fim função