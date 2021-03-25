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
        document.querySelector(".leftslider").src="./images/assets/button-slider-left-md-noct.svg";
        document.querySelector(".rightslider").src="./images/assets/button-slider-right-md-noct.svg";
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
        document.querySelector(".leftslider").src="./images/assets/button-slider-left.svg";
        document.querySelector(".rightslider").src="./images/assets/Button-Slider-right.svg";
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

async function trendingTagsFn(){
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

function fillTags(array){
    //BORRA EL PLACEHOLDER
    trendingTags.innerHTML= "";
    //CREA LOS ELEMENTOS
    for(let i=0; i<5; i++){
        let tag=document.createElement("span");
        tag.classList.add("tags");
        tag.innerHTML= array[i];
        trendingTags.appendChild(tag);
    }
    //GENERATE TAG LISTENERS

}

function hideSearch(){
    searchBar.style.borderRadius = "27px";
    closeSearch.style.zIndex= "-1";
    searchIcon.style.left= "";
    if (darkStatus==true){
        searchBar.style.borderBottom= "1pt solid white";
    }
    if (darkStatus==false){
        searchBar.style.borderBottom= "1pt solid #572EE5";
    }
    autocompletecontainer.classList.add("hidden");
    // searchResults.classList.add("hidden");
}

function fillSearchSuggestions(array){
    if (searchBar.value.length == 0){
        hideSearch();
    }
    else{
        autocompletecontainer.classList.remove("hidden");
        autocompleteUL.innerHTML = "";
        searchBar.style.borderRadius = "27px 27px 0 0";
        searchBar.style.borderBottom = "none";
        searchIcon.style.left= "24px";
        closeSearch.style.zIndex= "2";
        closeSearch.addEventListener("click", ()=>{
            hideSearch();
        })
        for(let i = 0; i<5; i++){
            let li=document.createElement("li");
            li.innerHTML=`<img src="images/assets/icon-search.svg"><p>${array[i].title}</p>`
            autocompleteUL.appendChild(li);
            li.addEventListener("click", ()=>{
                searchBar.value= array[i].title;
                hideSearch();
        })
    }
    }
}

async function suggest(input){
    await fetch (apiSearchEP + "?api_key=" + apiKey + "&q=" + input + "&limit=" + 5 + "&rating=g")
        .then(res=>{return(res.json())})
        .then(json=>{
            console.log(json)
            fillSearchSuggestions(json.data)
        })
        .catch(err=>{
            console.log(err)
        })
}
// function createButton(){
//     let newButton= document.createElement("button");
//     newButton.classList.add("morebtn");
//     newButton.innerHTML="VER MÁS";
// }

function renderSearch(array, input){
    //SI ES LA PRIMERA BÚSQUEDA
    if(prevOffset==0){
        //RESET
        searchResults.innerHTML="";
        gifoResults=[];
        //CREAR LINEA
        let line= document.createElement("div");
        line.classList.add("divline");
        searchResults.appendChild(line);
        //CREA H2
        let h2= document.createElement("h2");
        h2.innerHTML=input;
        searchResults.appendChild(h2);
        //CREA DIV CONTENEDOR
        var containerDiv= document.createElement("div");
        containerDiv.classList.add("resultsgifocontainer");
        searchResults.appendChild(containerDiv);
        //CREA BOTON VER MAS
        // if(array.length!= 0){
        //     let newButton= document.createElement("button");
        //     newButton.classList.add("morebtn");
        //     newButton.innerHTML="VER MÁS";
        //     searchResults.appendChild(newButton);
        // }
        // let newButton= document.createElement("button");
        // newButton.classList.add("morebtn");
        // newButton.innerHTML="VER MÁS";
        // searchResults.appendChild(newButton);
    }
    //SI NO SE OBTIENEN RESULTADOS
    // if(array.length==0){
    //     let noResLogo= document.createElement("img");
    //     noResLogo.src="./images/assets/ouch.svg";


    // }

    //RENDERIZA GIFOS
    for(let i=0; i<array.length; i++){
        gifoDiv=document.createElement("div");
        gifoDiv.classList.add("gifcontainer");
        containerDiv.appendChild(gifoDiv);
        img=document.createElement("img");
        img.src=`${array[i].url}`;
        gifoDiv.appendChild(img);
    }

}

function fillGifoPreview(array, input){
    //CREA ARRAY DE RESULTADOS DE BUSQUEDA COMO OBJETOS
    for(let i=0; i<array.length; i++){
        var newGifo = new GIFO(
            i+prevOffset,
            array[i].username,
            array[i].title,
            array[i].images.original.url,
        );
        gifoResults.push(newGifo);
    }
    console.log(gifoResults);
    //LLAMA FN DE RENDERIZAR
    renderSearch(gifoResults, input);
}


async function search(input){
    //LLAMADA A API
    await fetch (apiSearchEP + "?api_key=" + apiKey + "&q=" + input + "&limit=" + 12 + "&offset=" + (prevOffset+1) + "&rating=g")
    .then(res=>{return(res.json())})
    .then(json=>{
        console.log(json);
        console.log(input);
        fillGifoPreview(json.data , input);
    })
    .catch(err=> console.log(err))
}

function doSearch(){
    if(searchBar != ""){
        //POSICIONAR EN SECCIÓN
        searchResults.scrollIntoView()
        //RESET
        iterations= 0;
        prevOffset=0;
        gifoResults= [];
        //MOSTRAR SECCION DE RESULTADOS
        searchResults.classList.remove("hidden");
        //LLAMADO API
        search(searchBar.value);
        //ESCONDE SUGERENCIAS
        hideSearch();
    }
}


