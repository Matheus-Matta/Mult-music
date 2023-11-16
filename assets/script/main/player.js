


export async function playerSong(){
    const musics = document.querySelectorAll(".active-song")
    const play = document.querySelector("#playerSong")
    const btnDel = document.querySelector("#icon-delete")
    musics.forEach((music) => {
        const id = music.dataset.id
        let url = `https://open.spotify.com/embed/track/${id}`
        music.addEventListener("click",(event)=>{
        let target = event.target
           if(!target.classList.contains("activate-profile")){
           play.src = url
           btnDel.style.display = "flex"
           btnDel.addEventListener("click",cleanPlay)
           }
        })
    });
   
}
export async function cleanPlay(){
    const play = document.querySelector("#playerSong")
    const btnDel = document.querySelector("#icon-delete")
    play.src = ""
    btnDel.style.display = "none"
}