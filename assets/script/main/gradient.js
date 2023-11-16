export function gradient(){

   const bg = document.querySelector("#box-music-recommended")
   bg.classList.add("gradient-bot")
   bg.addEventListener("scroll", function() {
        if (bg.scrollTop > 30) {
            bg.classList.add("gradient-top")
        } else {
            bg.classList.remove("gradient-top")
        }
        if (bg.scrollTop + bg.clientHeight >= bg.scrollHeight - 20) {
            bg.classList.remove("gradient-bot")
        } else {
            bg.classList.add("gradient-bot")
        }
    })
}