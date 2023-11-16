export  function carouselArtist(){
    let mov = 0;
    let tela = 3;
    const width = window.innerWidth;
    const car = document.querySelector("#carousel")
    if(width <= 750){
        tela = 1;
        car.style.minWidth = 200+"px"
        car.style.maxWidth = 200+"px"
    } 
    
    let limite = (10 - tela) * 200;
    const btnArrow = document.querySelectorAll("#box-btn-arrow")
    btnArrow[0].addEventListener("click", ()=>{
      const box = document.querySelector("#box-mov")
      if(mov < limite){
        mov += 200;
        box.style.marginLeft = `-${mov}px`;
      }
    })
    btnArrow[1].addEventListener("click", ()=>{
      const box = document.querySelector("#box-mov")
      if(mov <= 0){
        mov = 0;
        itens.style.marginLeft = `${mov}`;
      } else {
        mov = mov - 200;
        box.style.marginLeft = `-${mov}px`;
      }
    })


}