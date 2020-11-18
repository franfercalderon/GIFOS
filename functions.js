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

        //ACTUALIZA VALOR DEL DARKSTATUS
        darkStatus=true;
    }else{
        console.log("Sun is up!");
        //CAMBIO DE SRC DE ELEMENTOS

        //ACTUALIZA VALOR DEL DARKSTATUS
        darkStatus=false;
    }
}