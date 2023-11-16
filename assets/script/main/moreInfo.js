export async function infoMore(){
   const btnMore = document.querySelectorAll("#music-recommended .music .icon-mais")
   const songs = document.querySelectorAll("#music-recommended .music .box-info")
   const modalAdd = document.querySelector(".box-modal-add")
   const btnClose = document.querySelector(".box-modal-add .icon-close")
   btnMore.forEach((btn,index) => {
        btn.addEventListener("click",()=>{
            modalAdd.style.display = "flex"
        })
    });
    modalAdd.addEventListener("click",(event)=>{
        if(event.target.classList.contains("box-modal-add")){
            modalAdd.style.display = "none"
        }
    })
    btnClose.addEventListener("click",()=>{
            modalAdd.style.display = "none"
    })
    
    
}