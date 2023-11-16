export  function resposivo(){
  const btnTopPlay = document.querySelector("#play-rec-active")
  const TopPlay = document.querySelector("#box-playlist-recommended")
  const closeTopPlay = document.querySelector("#play-rec-close")
  const blur = document.querySelector("#blur")

  btnTopPlay.addEventListener("click",()=>{
    TopPlay.classList.add("play-rec-ativo");
    blur.style.display = "block"
  })
  closeTopPlay.addEventListener("click",()=>{
    TopPlay.classList.remove("play-rec-ativo");
    blur.style.display = "none"
  })
  blur.addEventListener("click", ()=>{
    TopPlay.classList.remove("play-rec-ativo");
    blur.style.display = "none"
  });

  const seacrh = document.querySelector("header #box-seacrh label #seacrh")
  const logo = document.querySelector("#box-logo")
  const perfil = document.querySelector("#box-perfil")
  const header = document.querySelector("#menu")
  const width = window.innerWidth;
  if(width <= 550){
    seacrh.addEventListener("click",()=>{
       seacrh.style.width = 350+"px"
       logo.style.display = "none"
       perfil.style.display = "none"
       header.style.justifyContent = "center"
    })
    seacrh.addEventListener("blur",()=>{
      seacrh.style.width = ""
      logo.style.display = ""
      perfil.style.display = ""
      header.style.justifyContent = ""
   })
  }
}