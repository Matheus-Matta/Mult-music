import { requestToken } from "../requests/requestToken.js"
import { getTop50Playlist } from "../requests/getTop50Playlist.js";  // (token)
import { getArtist } from "../requests/getArtist.js";  // (token,artist_id)
import { getCategories } from "../requests/getCategorys.js";
import {activeWeb} from "../import.js";
import { removeElement } from "../import.js";
import {cleanInput} from "./inputClean.js"



const token = await requestToken();

const body = document.querySelector("body")
const width = window.innerWidth;
let section;
if(width < 1450){
    section = document.querySelector("section")
 } else {
    section = document.querySelector("#box-music-recommended")
 }
const content = section.innerHTML;
export async function resetContent(){
    if(width < 1450){
        if(width < 1081){
            section.style.flexDirection = "colum";
        } else{
            section.style.flexDirection = "row";
        }
        section.style.justifyContent = "space-between"
    }
    body.classList.remove("body-resposiv");
    section.innerHTML = ""
    section.innerHTML = content;
    
    await activeWeb()
}

export  async function apiSpotify(){
    const playlist = await getTop50Playlist(token);
    let artists = new Array()
    let musics = new Array()
    for(var i = 0;i < 50 ;i++){
      let id =  playlist.tracks.items[i].track.artists[0].id
      let artist = await getArtist(token,id)
      let object = {
        id: id,
        name: playlist.tracks.items[i].track.artists[0].name,
        streams: artist.streams,
        Image: artist.image,
      }
      artists.push(object)
      let object2 ={
        idArtist: playlist.tracks.items[i].track.artists[0].id,
        id: playlist.tracks.items[i].track.id,
        name: playlist.tracks.items[i].track.name,
        artist: playlist.tracks.items[i].track.album.artists[0].name,
        duração: (playlist.tracks.items[i].track.duration_ms / 60000).toFixed(2).replace(".",":"),
        image: playlist.tracks.items[i].track.album.images[0].url,
      }
      musics.push(object2)
    }
    artists.sort((a, b) => b.streams - a.streams);
    let names = new Array();
    let quat = 10;
    for(var i = 0;i < quat;i++){
        let pule = false;
        for(var j = 0;j < quat;j++){
            if(names[j] == artists[i].name){
                pule = true;
            }
        }
        if(pule){
           quat++;
           continue;
        }
        const div = document.createElement('div');
        div.className = 'carousel-itens';
        div.innerHTML = `
        <div class="box-itens-carousel">
            <div class="carousel-img">
            <img src="${artists[i].Image}" alt="">
            </div>
            <div class="carousel-info">
            <p class="name-artist subTitle">${artists[i].name}</p>
            <div class="btn-play activate-profile" data-id="${artists[i].id}">
                <img width="50" height="50" src="https://img.icons8.com/ios-filled/50/ffffff/play--v1.png" alt="play--v1"/>
            </div>
            </div>
        </div>
        `;
        const boxCarousel = document.querySelector("#box-mov")
        boxCarousel.appendChild(div);
        names.push(artists[i].name);
    }
  
    

    for(var i = 0;i < 10; i++){
        const div = document.createElement('div');
        div.className = 'music';
        div.innerHTML = `
                    <div class="box-info active-song" data-id="${musics[i].id}">
                    <div class="info-img">
                    <img src="${musics[i].image}" alt="">
                    </div>
                    <div class="info">
                        <p class="name-music subTitle">${musics[i].name}</p>
                        <p class="name-artist activate-profile" data-id="${musics[i].idArtist}">${musics[i].artist}</p>
                    </div>
                </div>
                <div class="duration-and-config">
                    <p class="music-duration textInfo">${musics[i].duração}</p>
                    <svg class="icon-mais" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"  viewBox="0 0 24 24">
                        <path fill-rule="evenodd" d="M 11 2 L 11 11 L 2 11 L 2 13 L 11 13 L 11 22 L 13 22 L 13 13 L 22 13 L 22 11 L 13 11 L 13 2 Z"></path>
                    </svg>
                </div>
        `;
        const boxMusic = document.querySelector("#box-music")
        boxMusic.appendChild(div)
    } // fim music recomend

    await removeElement(".music",10)

  

    const btnLogo = document.querySelector("#box-logo")
    btnLogo.addEventListener("click",async ()=>{
        await cleanInput(); // aqui dentro dessa função ele ja reseta o coteudo 
    })
   
} // fim


export async function categoryContent(){
    const cat = await getCategories(token);
    const boxCategory = document.querySelector("#category")
        for(var i = 0; i < cat.length;i++){
            const div = document.createElement('div');
            div.className = 'category-item active-category'
            div.setAttribute("data-id", `${cat[i].id}`);
            div.setAttribute("data-idCat", `${cat[i].idCat}`);
            div.innerHTML = `
              <p class="title-category subTitle">${cat[i].name}</p>
            `
            boxCategory.appendChild(div)
        }
        
        await removeElement(".category-item",cat.length)
            const itensCat = document.querySelectorAll(".category-item")
            itensCat.forEach((item, index)=>{
                if(cat[index].image){
                item.style.backgroundImage = `url(${cat[index].image})`;
                item.style.backgroundPosition = `top center`;
                item.style.backgroundSize = `cover`;
                }
            })

    
}



