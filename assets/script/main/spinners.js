
export async function loading(){
    const width = window.innerWidth;
    let section;
    if(width < 1080){
        section = document.querySelector("section")
    } else {
        section = document.querySelector("#box-music-recommended")
    }
    section.classList.remove("loading-concluded")
    section.className = "loading-pending"

}

export async function concluded(){
    
    const width = window.innerWidth;
    let section;
        if(width < 1080){
            section = document.querySelector("section")
        } else {
            section = document.querySelector("#box-music-recommended")
    }
    const load = document.querySelector(".loading")
    load.style.display = "none"
    section.classList.remove("loading-pending")
    section.className = "loading-concluded"
    
}
export async function loadcat(){
    const boxCategory = document.querySelector("#category")
    const load = document.querySelector(".loading-cat")
    load.style.display = "block"
    boxCategory.className = "loading-pending-cat";
}
export async function concludcat(){
    const boxCategory = document.querySelector("#category")
    const load = document.querySelector(".loading-cat")
    boxCategory.classList.remove("loading-pending-cat")
    load.style.display = "none"
}
export async function disableEvents(){

    const btnLogo = document.querySelector("#box-logo")
    const seacrh = document.querySelector("#seacrh")
    
    btnLogo.className = 'inativo';
    seacrh.className = 'inativo';
    
}
export async function enableEvents(){

    const btnLogo = document.querySelector("#box-logo")
    const seacrh = document.querySelector("#seacrh")

    btnLogo.classList.remove("inativo")
    seacrh.classList.remove("inativo") 
}