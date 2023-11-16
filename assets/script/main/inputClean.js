import { resetContent } from "./apiSpotify.js";

const seacrh = document.querySelector("#seacrh")
const btnClean = document.querySelector("#icon-clean")
const width = window.innerWidth;

export async function inputClean(){
 btnClean.style.display = "none"

   if(width <= 610){
      seacrh.placeholder = "buscar...";
   } else {
      seacrh.placeholder = "O que você está procurando?";
   }
   seacrh.addEventListener("focus",()=>{
      seacrh.placeholder = "";
   })
   seacrh.addEventListener("blur",()=>{
      if(width <= 550){
         seacrh.placeholder = "buscar...";
      } else {
         seacrh.placeholder = "O que você está procurando?";
      }
   })
 

 seacrh.addEventListener("input",valido)
 btnClean.addEventListener("click",cleanInput)
   
}

export async function cleanInput(){
   let query = seacrh.value;
   if (query[0] == " "){
      for(var i = 0;i < query.length;i+0){
         if(query[i] == " "){
            i++;
            if( i == query.length){
               seacrh.value = "";
               valido()
            }
         } 
      }
   } else {
      seacrh.value = "";
      valido()
      await resetContent()
   }
}

function valido(){
   if(seacrh.value != ""){
      btnClean.classList.add("digitando")
   }else{
      btnClean.classList.remove("digitando")
   }
}