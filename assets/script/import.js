import {apiSpotify} from "./main/apiSpotify.js"
import {carouselArtist} from "./main/carousel.js"
import {inputClean} from "./main/inputClean.js"
import {gradient}  from "./main/gradient.js";   
import {resposivo} from "./main/resposivo.js";    
import {searchContent} from "./main/searchContent.js";
import {infoMore} from "./main/moreInfo.js"
import { perfilArtist } from "./main/perfilArtist.js";
import { categoryContent } from "./main/apiSpotify.js";
import { catMusicContent } from "./main/catMusicContent.js";
import { playerSong } from "./main/player.js";
import { loading , concluded } from "./main/spinners.js"  ;
import { loadcat , concludcat } from "./main/spinners.js" ;

export async function activeWeb(){
   loading();
   resposivo();
   inputClean();
   gradient();
   searchContent();
   await apiSpotify();
   concluded();
   carouselArtist();
   perfilArtist();
   infoMore();
   loadcat();
   await playerSong();
   await categoryContent();
   concludcat();
   catMusicContent();


}    

export async function removeElement(element,limit){
   let all = document.querySelectorAll(element)
   if (all.length > limit) {
       for (let i = limit; i < all.length; i++) {
           all[i].remove();
    }
   }
}