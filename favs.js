var favArray=[];

//MUESTRA FAVORITOS 

function retrieveFavs(){
    if(localStorage.hasOwnProperty("FAVGIFS")){
        favArray=JSON.parse(localStorage.getItem("FAVGIFS"))
    }
}

retrieveFavs();

//ALMACENA GIFO COMO FAV EN ARRAY Y LOCAL STORAGE
function setFavGifo(item){
    favArray.push(item);
    localStorage.setItem("FAVGIFS", JSON.stringify(favArray));
    //ACTUALIZA RENDER DE FAVORITOS
    renderFavs();
}

function renderFavs(){

    if(favArray.length==0){
        document.querySelector(".nofav").classList.remove("hidden")
    }
    else{
        document.querySelector(".nofav").classList.add("hidden");
        document.querySelector(".favcontainer").innerHTML="";
        for(let i=0; i<favArray.length; i++){
            let favdiv = document.createElement("div");
            favdiv.classList.add("favdiv");
            document.querySelector(".favcontainer").appendChild(favdiv);
            favdiv.innerHTML=`<img src=${favArray[i].url} alt="${favArray[i].title}">
            <div class="overlaygifo hidden">
                <div class="overlayfavbuttons">
                    <img src="images/assets/icon-trash.svg" alt="ícono borrar">
                    <img src="images/assets/icon-download.svg" alt="ícono descargar">
                    <img src="images/assets/icon-max-normal.svg" alt="">
                </div>
                <div class="overlayp">
                    <p class="overlayuser">${favArray[i].author}</p>
                    <p class="overlaytitle">${favArray[i].title}</p>
                </div>
            </div>`
            //HOVER OVERLAY
            favdiv.addEventListener("mouseover", ()=>{
                favdiv.querySelector(".overlaygifo").classList.remove("hidden");
            })
            favdiv.addEventListener("mouseout", ()=>{
                favdiv.querySelector(".overlaygifo").classList.add("hidden");
            })
            //HOVER BOTONES
            let favbtns= favdiv.querySelectorAll(".overlayfavbuttons img");
            favbtns[0].addEventListener("mouseover", ()=>{
                favbtns[0].src="./images/assets/icon-trash-hover.svg";
            })
            favbtns[0].addEventListener("mouseleave", ()=>{
                favbtns[0].src="./images/assets/icon-trash.svg";
            })
            favbtns[1].addEventListener("mouseover", ()=>{
                favbtns[1].src="./images/assets/icon-download-hover.svg";
            })
            favbtns[1].addEventListener("mouseleave", ()=>{
                favbtns[1].src="./images/assets/icon-download.svg"
            })
            favbtns[2].addEventListener("mouseover", ()=>{
                favbtns[2].src="./images/assets/icon-max-hover.svg"
            })
            favbtns[2].addEventListener("mouseleave", ()=>{
                favbtns[2].src="./images/assets/icon-max-normal.svg"
            })
            //BORRAR FAV
            favbtns[0].addEventListener("click", ()=>{
                favArray.splice([i],1);
                localStorage.setItem("FAVGIFS", JSON.stringify(favArray));
                if(favArray.length!=0){
                    renderFavs();
                }
                else{
                    document.querySelector(".nofav").classList.remove("hidden");
                    document.querySelector(".favcontainer").innerHTML="";
                }
            })

        }
        if(favIterations<1){
            let eraseAllBtn= document.createElement("div");
            eraseAllBtn.classList.add("eraseAllBtn");
            document.querySelector(".favcontainer").appendChild(eraseAllBtn);
        }
        favIterations++;
    }
}
renderFavs();

function eraseAllFavs(){
    favArray=[];
    localStorage.setItem("FAVGIFS", JSON.stringify(favArray))
}
// eraseAllFavs();
