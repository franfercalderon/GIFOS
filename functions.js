function desplegarMenu(){
    if(menuOpen==false){
        mobileUl.classList.toggle("hidden");
        menuOpen=true;
        if(darkStatus==false){
            menuBtn.src="./images/assets/close.svg";
        }else{
            menuBtn.src="./images/assets/closedark.svg";
        }
        
    }
    else{
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
        //ACTUALIZA VALOR DEL DARKSTATUS
        darkStatus=true;
    }else{
        console.log("Sun is up!");
        //CAMBIO DE SRC DE ELEMENTOS
        mainLogo.src="images/assets/logo-mobile.svg";
        newLogo.src= "./images/assets/button-crear-gifo.svg";
        searchIcon.src= "./images/assets/icon-search.svg";
        //ACTUALIZA VALOR DEL DARKSTATUS
        darkStatus=false;
    }
}