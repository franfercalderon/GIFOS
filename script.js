const menuBtn= document.querySelector(".menuIcon");
const mobileUl= document.querySelector(".mobileUl");
menuBtn.addEventListener("click", desplegarMenu);
var imgTrack= "burger";

function desplegarMenu(){
    
    if(imgTrack=="burger"){
        menuBtn.src="./images/assets/close.svg"; 
        imgTrack="close"
        mobileUl.classList.toggle("hidden");
    }else{
        menuBtn.src="./images/assets/burger.svg";
        imgTrack= "burger";
        mobileUl.classList.toggle("hidden");
    }
}
