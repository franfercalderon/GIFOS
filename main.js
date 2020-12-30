//DESPLEGAR MENU MOBILE
menuBtn.addEventListener("click", desplegarMenu);

//DARK MODE MOBILE
switchDarkMobile.addEventListener("click", ()=>{
    enableDark(); 
    if(darkStatus==false){
        menuBtn.src="./images/assets/close.svg";
    }else{
        menuBtn.src="./images/assets/closedark.svg";
    }
})

//DARK MODE DESKTOP
switchDarkDesktop.addEventListener("click", ()=>{
    enableDark(); 
    if(darkStatus==false){
        menuBtn.src="./images/assets/close.svg";
    }else{
        menuBtn.src="./images/assets/closedark.svg";
    }
})

//HOVER SOCIAL MEDIA LOGOS
fbLogo.addEventListener("mouseover", ()=>{
    fbLogo.src= "./images/assets/icon_facebook_hover.svg";
})

fbLogo.addEventListener("mouseout", ()=>{
    if(darkStatus==false){
        fbLogo.src= "./images/assets/icon_facebook.svg";
    }else{
        fbLogo.src= "./images/assets/icon_facebook_noc.svg";
    }
})

twLogo.addEventListener("mouseover", ()=>{
    twLogo.src= "./images/assets/icon-twitter-hover.svg";
})

twLogo.addEventListener("mouseout", ()=>{
    if(darkStatus==false){
        twLogo.src= "./images/assets/icon-twitter.svg";
    }else{
        twLogo.src= "./images/assets/icon_twitter_noc.svg";
    }
})

igLogo.addEventListener("mouseover", ()=>{
    igLogo.src= "./images/assets/icon_instagram-hover.svg";
})

igLogo.addEventListener("mouseout", ()=>{
    if(darkStatus==false){
        igLogo.src= "./images/assets/icon_instagram.svg";
    }else{
        igLogo.src= "./images/assets/icon_instagram_noc.svg";
    }
})

//MUESTRA SECCION DE FAVORITOS
favButton.addEventListener("click", ()=>{
    console.log("hola");
    mainSec.classList.add("hidden");
    favSec.classList.remove("hidden");
    mygifosSec.classList.add("hidden");
    maxSec.classList.add("hidden");

} )




