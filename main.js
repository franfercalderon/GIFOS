//COMPLETA LAS TRENDING TAGS
trendingTagsFn();

async function trendingTagsFn(){
    //LLAMADA A API PARA TRAER TRENDING TAGS
    await fetch(apiTrengingTagsEP + "?api_key=" + apiKey)
        .then(response=>{
            return(response.json())
        })
        .then(json=>{
            // console.log(json)
            fillTags(json.data)
        })
        .catch(err=>{
            console.log(err)
        })

}

getTrendingGifos();

//LLAMADA API PARA OBTENER TRENDING GIFOS
async function getTrendingGifos(){
    await fetch(apiTrendingEP + "?api_key=" + apiKey)
        .then(res=>{
            return(res.json())
        })
        .then(json=>{
            console.log(json)
        })
}

//SEARCHBAR
searchBar.addEventListener("input", ()=>{suggest(searchBar.value)});


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

//MENU HAMBURGUESA
menuBtn.addEventListener("click", desplegarMenu);

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

//MOSTRAR SECCIÓN PRINCIPAL
document.querySelector(".logo").addEventListener("click", openMain);

//MUESTRA SECCION DE FAVORITOS
document.querySelector(".favbtnmobile").addEventListener("click", openFavSec);
document.querySelector(".favbtndesktop").addEventListener("click", openFavSec);

//BUSQUEDA ON CLICK LOGO LUPA
searchIcon.addEventListener("click",doSearch);

//BUSQUEDA SEARCHBAR CON ENTER
searchBar.addEventListener("keypress", (input)=>{
    if(input.charCode ===13){
        doSearch();
    }
})

//CONSTRUCTOR OBJETO GIFO
function GIFO(index, author, title, url){
    this.index=index;
    this.author=author;
    if(this.author==""){
        this.author="Desconocido";
    }
    this.title=title;
    if(this.title==""){
        this.title="Untitled";
    }
    this.url=url;

    return this;
}

//CONSTRUCTOR GIFO FAVORITO
function FAVGIFO(index, author, title, url){
    this.index=index; 
    this.author=author;
    if(this.author==""){
        this.author="Desconocido"
    }
    this.title=title;
    if(this.title==""){
        this.title="Desconocido"
    }
    this.url= url;

    setFavGifo(this);

    return this;
}






