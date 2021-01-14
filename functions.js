function desplegarMenu(){
    //CHEQUEA SI EL MENÚ ESTÁ ABIERTO
    if(menuOpen==false){
        mobileUl.classList.toggle("hidden");
        //ASIGNA NUEVO VALOR A MENUOPEN
        menuOpen=true;
        //CHEQUEA DARKMODE
        if(darkStatus==false){
            menuBtn.src="./images/assets/close.svg";
        }else{
            menuBtn.src="./images/assets/closedark.svg";
        }
    }else{
        mobileUl.classList.toggle("hidden");
        menuOpen=false;
        if(darkStatus==false){
            menuBtn.src="./images/assets/burger.svg";
        }else{
            menuBtn.src="./images/assets/burgerdark.svg";
        }
    }
}

function enableDark(){
    //AGREGA O QUITA LA CLASE "DARK" AL BODY
    body.classList.toggle("dark");
    if(darkStatus==false){
        console.log("Oh, it's getting dark..");
        //CAMBIO DE SRC DE ELEMENTOS
        mainLogo.src= "./images/assets/logo-mobile-modo-noct.svg";
        newLogo.src= "./images/assets/CTA-crear-gifo-modo-noc.svg";
        searchIcon.src= "./images/assets/icon-search-mod-noc.svg";
        fbLogo.src="./images/assets/icon_facebook_noc.svg";
        twLogo.src="./images/assets/icon_twitter_noc.svg";
        igLogo.src="./images/assets/icon_instagram_noc.svg";
        document.querySelector(".leftslider").src="./images/assets/button-slider-left-md-noct.svg"
        document.querySelector(".rightslider").src="./images/assets/button-slider-right-md-noct.svg"
        //ACTUALIZA VALOR DEL DARKSTATUS
        darkStatus=true;
    }else{
        console.log("Sun is up!");
        //CAMBIO DE SRC DE ELEMENTOS
        mainLogo.src="images/assets/logo-mobile.svg";
        newLogo.src= "./images/assets/button-crear-gifo.svg";
        searchIcon.src= "./images/assets/icon-search.svg";
        fbLogo.src="./images/assets/icon_facebook.svg";
        twLogo.src="./images/assets/icon-twitter.svg";
        igLogo.src="./images/assets/icon_instagram.svg";
        document.querySelector(".leftslider").src="./images/assets/button-slider-left.svg"
        document.querySelector(".rightslider").src="./images/assets/Button-Slider-right.svg"
        //ACTUALIZA VALOR DEL DARKSTATUS
        darkStatus=false;
    }
}

//  MOSTRAR SECTION FAVORITOS
function openFavSec(){
    mainSec.classList.add("hidden");
    favSec.classList.remove("hidden");
    mygifosSec.classList.add("hidden");
    maxSec.classList.add("hidden");
    //CIERRA MENÚ HAMBURGUESA
    if(menuOpen=true){
        mobileUl.classList.toggle("hidden");
        menuOpen=false;
    }
    //CHEQUEA DARK MODE
    if(darkStatus==false){
        menuBtn.src="./images/assets/burger.svg";
    }else{
        menuBtn.src="./images/assets/burgerdark.svg";
    }
}

function openMain(){
    mainSec.classList.remove("hidden");
    favSec.classList.add("hidden");
    mygifosSec.classList.add("hidden");
    maxSec.classList.add("hidden");

}
