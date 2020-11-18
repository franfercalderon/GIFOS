menuBtn.addEventListener("click", desplegarMenu);
switchDarkDesktop.addEventListener("click", enableDark);
switchDarkMobile.addEventListener("click", ()=>{
    enableDark(); 
    if(darkStatus==false){
        menuBtn.src="./images/assets/close.svg";
    }else{
        menuBtn.src="./images/assets/closedark.svg";
    }
})