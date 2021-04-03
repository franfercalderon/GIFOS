function openCreate(){
    if (createOpen==false){
        mainSec.classList.add("hidden");
        searchResults.classList.add("hidden");
        favSec.classList.add("hidden");
        trendingSec.classList.add("hidden");
        mygifosSec.classList.add("hidden");
        createSec.classList.remove("hidden");
        newLogo.src="images/assets/CTA-crear-gifo-active.svg";
        createOpen=true;
    }
    else{
        mainSec.classList.remove("hidden");
        trendingSec.classList.remove("hidden");
        createSec.classList.add("hidden");
        createOpen=false;
        if(darkStatus==false){
            newLogo.src= "./images/assets/button-crear-gifo.svg";
        }
        else{
            newLogo.src= "./images/assets/CTA-crear-gifo-modo-noc.svg";
        }
    }
}