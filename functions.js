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
    // var darkStatus= false;
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
        leftArrow.src="./images/assets/button-slider-left-md-noct.svg";
        rightArrow.src="./images/assets/button-slider-right-md-noct.svg";
        closeSearch.src="./images/assets/closedark.svg";
        searchBar.style.borderBottom="1px solid white";
        newGifoBtnHover.src="images/assets/CTA-crear-gifo-active.svg";

        // document.querySelector(".mygifosbtndesktop").style.color="#572EE5";

        document.querySelector(".favbtndesktop").style.color="white";
        document.querySelector(".mygifosbtndesktop").style.color="white";
        
        //ACTUALIZA VALOR DEL DARKSTATUS
        darkStatus=true;
        //LOCALSTORAGE
        localStorage.setItem("DARKSTATUS", "true");
    }else{
        console.log("Sun is up!");
        //CAMBIO DE SRC DE ELEMENTOS
        mainLogo.src="images/assets/logo-mobile.svg";
        newLogo.src= "./images/assets/button-crear-gifo.svg";
        searchIcon.src= "./images/assets/icon-search.svg";
        fbLogo.src="./images/assets/icon_facebook.svg";
        twLogo.src="./images/assets/icon-twitter.svg";
        igLogo.src="./images/assets/icon_instagram.svg";
        leftArrow.src="./images/assets/button-slider-left.svg";
        rightArrow.src="./images/assets/Button-Slider-right.svg";
        closeSearch.src="./images/assets/close.svg";
        searchBar.style.borderBottom="1px solid #572EE5";
        newGifoBtnHover.src=newLogo.src;
        
        document.querySelector(".favbtndesktop").style.color="#572EE5";
        document.querySelector(".mygifosbtndesktop").style.color="#572EE5";

        //ACTUALIZA VALOR DEL DARKSTATUS
        darkStatus=false;
        //LOCALSTORAGE
        localStorage.setItem("DARKSTATUS", "false");
    }
}

//LOCAL STORAGE DARK MODE
function isItDark(){
    if(localStorage.getItem("DARKSTATUS")=="true"){
        enableDark();
    }
}
isItDark();

//  MOSTRAR SECTION FAVORITOS
function openFavSec(){
    //CHEQUEA SI LA SECCIÓN ESTÁ ABIERTA O CERRADA
    if(favOpen==false){
        retrieveFavs();
        renderFavs();
        mainSec.classList.add("hidden");
        favSec.classList.remove("hidden");
        mygifosSec.classList.add("hidden");
        maxSec.classList.add("hidden");
        searchResults.classList.add("hidden");
        //CIERRA MENÚ HAMBURGUESA
        if(menuOpen=true){
            mobileUl.classList.toggle("hidden");
            menuOpen=false;
        }
        //CHEQUEA DARK MODE
        if(darkStatus==false){
            menuBtn.src="./images/assets/burger.svg";
            document.querySelector(".favbtndesktop").style.color="#9CAFC3";
            if(myGifosOpen==true){
                document.querySelector(".mygifosbtndesktop").style.color="#572EE5";
            }
        }else{
            menuBtn.src="./images/assets/burgerdark.svg";
            document.querySelector(".favbtndesktop").style.color="#9CAFC3";
            if(myGifosOpen==false){
                document.querySelector(".mygifosbtndesktop").style.color="white";
            }
        }

        // if(createOpen==true){
        //     if(darkStatus==false){
        //         newLogo.src= "./images/assets/button-crear-gifo.svg";
        //     }
        //     else{
        //         newLogo.src= "./images/assets/CTA-crear-gifo-modo-noc.svg";
        //     }
        // }

        favOpen=true;
    }
    else{
        mainSec.classList.remove("hidden");
        favSec.classList.add("hidden");
        // mygifosSec.classList.remove("hidden");
        maxSec.classList.remove("hidden");
        searchResults.classList.remove("hidden");
        //CHEQUEA DARK MODE
        if(darkStatus==false){
            document.querySelector(".favbtndesktop").style.color="#572EE5";
        }
        else{
            document.querySelector(".favbtndesktop").style.color="white";
        }
        favOpen=false;
    }
}

function openMain(){
    //ESCONDE/MUESTRA SECCIONES PARA VOLVER A MENU PRINCIPAL
    mainSec.classList.remove("hidden");
    favSec.classList.add("hidden");
    mygifosSec.classList.add("hidden");
    maxSec.classList.add("hidden");
    favOpen=false;
    //CHEQUEA MODO NOCTURNO 
    if(darkStatus==true){
        document.querySelector(".favbtndesktop").style.color="white";
        document.querySelector(".mygifosbtndesktop").style.color="white";
    }
    else{
        document.querySelector(".favbtndesktop").style.color="#572EE5";
        document.querySelector(".mygifosbtndesktop").style.color="#572EE5";
    }

}

function fillTags(array){
    //BORRA EL PLACEHOLDER
    trendingTags.innerHTML= "";
    //CREA LOS ELEMENTOS
    for(let i=0; i<5; i++){
        var tag=document.createElement("span");
        tag.classList.add("tags");
        tag.innerHTML= array[i];
        trendingTags.appendChild(tag);
    }
    // TAG LISTENERS
    tagListener();
}

function tagListener(){
    //GENERA EVENTO ONCLICK EN CADA TAG PARA BÚSQUEDA
    for(let i=0; i<5; i++){
        document.querySelectorAll(".tags")[i].addEventListener("click", ()=>{
            let input= searchBar.value=document.querySelectorAll(".tags")[i].innerHTML;
            search(input);
            doSearch();
            searchResults.scrollIntoView({behavior: 'smooth' });
        })
    }
}
//TRENDING GIFOS

function fillTredingGifos(array){
    //LLENA EL ARRAY DE GIFOS RECIBIDOS DE API
    for(let i=0; i<array.length; i++){
        arrayTrendingGifos[i]= new GIFO(
            i,
            array[i].username,
            array[i].title,
            array[i].images.downsized.url
        )
    }
}

function renderTrendingGifos(offset){
    //RENDERIZA GIFOS EN CAROUSSEL
        let trendingcontainer= document.querySelector(".trendingcontainer");
        trendingcontainer.innerHTML="";
        for(let i=offset; i<offset+3; i++){
            let trendinggifodiv=document.createElement("div");
            trendinggifodiv.classList.add("trendinggifo");
            trendinggifodiv.innerHTML=`<img src="${arrayTrendingGifos[i].url}" alt="${arrayTrendingGifos[i].title}">
            <!--GENERA OVERLAY-->
            <div class="overlaygifo hidden">
                <div class="overlaybuttons">
                    <img src="images/assets/icon-fav.svg" alt="ícono favoritos">
                    <img src="images/assets/icon-download.svg" alt="ícono descargar">
                    <img src="images/assets/icon-max-normal.svg" alt="">
                </div>
                <div class="trendingoverlayp">
                    <p class="overlayuser">${arrayTrendingGifos[i].author}</p>
                    <p class="overlaytitle">${arrayTrendingGifos[i].title}</p>
                </div>
            </div>`
            trendingcontainer.appendChild(trendinggifodiv);
            showHover(trendinggifodiv);
            gifoButtons(trendinggifodiv, trendingSec);
            
        }
    }
    
function renderTrendingLoop(pos1, pos2, pos3){
    //RENDERIZA TRENDING GIFOS DE CARROUSEL EN LOOP 
    let newArrayTrendingGifos=[arrayTrendingGifos[pos1], arrayTrendingGifos[pos2], arrayTrendingGifos[pos3]];
    let trendingcontainer= document.querySelector(".trendingcontainer");
    trendingcontainer.innerHTML="";
    for(let i=0; i<newArrayTrendingGifos.length; i++){
        let trendinggifodiv=document.createElement("div");
        trendinggifodiv.classList.add("trendinggifo");
        trendinggifodiv.innerHTML=`<img src="${newArrayTrendingGifos[i].url}" alt="${newArrayTrendingGifos[i].title}">
        <!--GENERA OVERLAY-->
        <div class="overlaygifo hidden">
            <div class="overlaybuttons">
                <img src="images/assets/icon-fav.svg" alt="ícono favoritos">
                <img src="images/assets/icon-download.svg" alt="ícono descargar">
                <img src="images/assets/icon-max-normal.svg" alt="">
            </div>
            <div class="trendingoverlayp">
                <p class="overlayuser">${newArrayTrendingGifos[i].author}</p>
                <p class="overlaytitle">${newArrayTrendingGifos[i].title}</p>
            </div>
        </div>`
        trendingcontainer.appendChild(trendinggifodiv);
        showHover(trendinggifodiv);
        gifoButtons(trendinggifodiv, trendingSec);
    }
}
    

function hideSearch(){
    //ESCONDE SECCIÓN DE SUGERENCIAS Y ESTILIZA NUEVAMENTE LA SEARCHBAR
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
}

function fillSearchSuggestions(array){
    //SOLO SI NO HAY NADA EN LA SEARCHBAR
    if (searchBar.value.length == 0){
        hideSearch();
        mainTrending.classList.remove("hidden");

    }
    //SI TIENE ALOG QUE BUSCAR, ESTILIZA LA BARRA DEBAJO
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
        mainTrending.classList.add("hidden");
        //GENERA LI EN LA UL CON EL ARRAY DE RESULTADOS OBTENIDO DE LA API
        for(let i = 0; i<5; i++){
            let li=document.createElement("li");
            if(darkStatus==false){
                li.innerHTML=`<img src="images/assets/icon-search.svg" class="limagnifier"><p>${array[i].title}</p>`
            }
            else{
                li.innerHTML=`<img src="images/assets/icon-search-mod-noc.svg" class="limagnifier"><p>${array[i].title}</p>`
            }
            
            autocompleteUL.appendChild(li);
            li.addEventListener("click", ()=>{
                searchBar.value= array[i].title;
                hideSearch();
            })

            iterations=0;
            prevOffset=0;
        }
    }
}

async function suggest(input){
    //LLAMA API PARA OBTENER SUGERENCIAS DE BUSQUEDA
    await fetch (apiSearchEP + "?api_key=" + apiKey + "&q=" + input + "&limit=" + 5 + "&rating=g")
        .then(res=>{return(res.json())})
        .then(json=>{
            // console.log(json)
            fillSearchSuggestions(json.data)
        })
        .catch(err=>{
            console.log(err)
        })
}

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
    }

    //SI NO SE OBTIENEN RESULTADOS
    if(array.length==0){
        let noResLogo= document.createElement("img");
        noResLogo.src="./images/assets/ouch.svg";
        noResLogo.classList.add("noreslogo");
        searchResults.appendChild(noResLogo);
        let noResLegend= document.createElement("h3");
        noResLegend.innerHTML="Intenta con otra búsqueda";
        searchResults.appendChild(noResLegend);
    }

    //CREA DIV CONTENEDOR
    var containerDiv= document.createElement("div");
    containerDiv.classList.add("resultsgifocontainer");
    searchResults.appendChild(containerDiv);

    //RENDERIZA GIFOS
    for(let i=0; i<array.length; i++){
    gifoDiv=document.createElement("div");
    gifoDiv.classList.add("gifcontainer");
    
    gifoDiv.innerHTML=`<img src="${array[i].url} alt="${array[i].title}>
        <!--GENERA OVERLAY-->
        <div class="overlaygifo hidden">
            <div class="overlaybuttons">
                <img src="images/assets/icon-fav.svg" alt="ícono favoritos">
                <img src="images/assets/icon-download.svg" alt="ícono descargar">
                <img src="images/assets/icon-max-normal.svg" alt="">
            </div>
            <div class="overlayp">
                <p class="overlayuser">${array[i].author}</p>
                <p class="overlaytitle">${array[i].title}</p>
            </div>
        </div>`
    containerDiv.appendChild(gifoDiv);
    showHover(gifoDiv);
    gifoButtons(gifoDiv, searchResults);
    }
    iterations++;
    //LLAMA A FUNCION CREAR BOTON "VER MAS"
    if(array.length>11){
        viewMoreBtn();
    }

    //FUNCION CREAR BOTON "VER MAS"
    function viewMoreBtn(){
        let btn = document.createElement("button");
        btn.classList.add("viewmore");
        btn.innerHTML="VER MÁS";
        btn.addEventListener("click", ()=>{
            document.querySelector(".viewmore").remove();
            prevOffset=prevOffset+12;
            search(input);
        });
        searchResults.append(btn);
    }
}


function showHover(gifo){
    //MUESTRA OVERLAY CON HOVER
    gifo.addEventListener("mouseover", ()=>{
        gifo.querySelector(".overlaygifo").classList.remove("hidden");
    })
    gifo.addEventListener("mouseout", ()=>{
        gifo.querySelector(".overlaygifo").classList.add("hidden");
    })
    //MAXIMIZA GIFO AL CLICK EN DISP MOVILES
    if(window.matchMedia("(max-width: 768px)").matches){
        gifo.addEventListener("click", ()=>{
            maxGifo(gifo.querySelector("img").src, gifo.querySelector(".overlaytitle").innerHTML, gifo.querySelector(".overlayuser").innerHTML, searchResults)
        })
    }
}

function gifoButtons(gifo, origin){
    let buttons= gifo.querySelectorAll(".overlaybuttons img");
    //HOVER LOGOS
    buttons[0].addEventListener("mouseover", ()=>{
        buttons[0].src="./images/assets/icon-fav-hover.svg";
    })
    buttons[0].addEventListener("mouseleave", ()=>{
        buttons[0].src="./images/assets/icon-fav.svg"
    })
    buttons[1].addEventListener("mouseover", ()=>{
        buttons[1].src="./images/assets/icon-download-hover.svg"
    })
    buttons[1].addEventListener("mouseleave", ()=>{
        buttons[1].src="./images/assets/icon-download.svg"
    })
    buttons[2].addEventListener("mouseover", ()=>{
        buttons[2].src="./images/assets/icon-max-hover.svg"
    })
    buttons[2].addEventListener("mouseleave", ()=>{
        buttons[2].src="./images/assets/icon-max-normal.svg"
    })
    //FUNCION CLICK
        //FAV
        buttons[0].addEventListener("click", ()=>{
            buttons[0].src="./images/assets/icon-fav-act.svg";
            let newFavGifo= new FAVGIFO(
                favArray.length,
                gifo.querySelector(".overlayuser").innerHTML,
                gifo.querySelector(".overlaytitle").innerHTML,
                gifo.querySelector("img").src,
            )
        })
        //DESCARGAR
        buttons[1].addEventListener("click", ()=>{
            downloadGifo(gifo.querySelector("img").src, gifo.querySelector(".overlaytitle").innerHTML)
        });
        //MAXIMIZAR
        buttons[2].addEventListener("click", ()=>{
            maxGifo(gifo.querySelector("img").src, gifo.querySelector(".overlaytitle").innerHTML, gifo.querySelector(".overlayuser").innerHTML, origin);
        })
}

function fillGifoPreview(array, input){
    //CREA ARRAY DE RESULTADOS DE BUSQUEDA COMO OBJETOS
    
    for(let i=0; i<array.length; i++){
        let newGifo = new GIFO(
            i+prevOffset,
            array[i].username,
            array[i].title,
            array[i].images.downsized.url,
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
        // console.log(json);
        // console.log(input);
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
        // searchResults.innerHTML="";
        gifoResults= [];
        //MOSTRAR SECCION DE RESULTADOS
        searchResults.classList.remove("hidden");
        //LLAMADO API
        search(searchBar.value);
        //ESCONDE SUGERENCIAS
        hideSearch();
    }

}

async function downloadGifo(url, name){
    let a = document.createElement("a");
    let source = await fetch (url);
    let file = await source.blob();
    a.download=name + ".gif";
    a.href=window.URL.createObjectURL(file);
    a.dataset.downloadurl=['application/octet-stream', a.download, a.href].join(':');
    a.click();
}

function maxGifo(url, title, user, origin){
    maxSec.innerHTML="";
    maxSec.style.visibility="visible";
    maxSec.scrollIntoView({behavior: 'smooth' });

    //CREA ELEMENTOS E INSERTA GIF
    let close= document.createElement("img");
    close.classList.add("closemax");
    if(darkStatus==false){
        close.src="./images/assets/close.svg";
    }else{
        close.src="./images/assets/closedark.svg";
    }
    maxSec.appendChild(close);
    let maxdivcontainer=document.createElement("div");
    maxdivcontainer.classList.add("maxdivcontainer")
    maxSec.appendChild(maxdivcontainer);
    maxdivcontainer.innerHTML=`<img src="${url}" alt="${title} " class= "maxgifo">
    <div class="maxfootercontainer">
        <div class="maxp">
            <p class="maxuser">${user}</p>
            <p class="maxtitle">${title}</p>
        </div>
        <div class="maxbtns">
            <img src="images/assets/icon-fav.svg" alt="ícono favoritos">
            <img src="images/assets/icon-download.svg" alt="ícono descargar">
        </div>
    </div>`

    //CERRAR SECCIÓN
    close.addEventListener("click", ()=>{
        maxSec.style.visibility="hidden";
        //LLEVA AL ORIGEN
        origin.scrollIntoView({behavior: 'smooth' });
    })

    //HOVER BOTONES
    let botones= maxdivcontainer.querySelectorAll(".maxbtns img");

    botones[0].addEventListener("mouseover", ()=>{
        botones[0].src="images/assets/icon-fav-hover.svg"
    });
    botones[0].addEventListener("mouseleave", ()=>{
        botones[0].src="images/assets/icon-fav.svg"
    })
    botones[1].addEventListener("mouseover", ()=>{
        botones[1].src="images/assets/icon-download-hover.svg"
    });
    botones[1].addEventListener("mouseleave", ()=>{
        botones[1].src="images/assets/icon-download.svg"
    });

    
    //GUARDA FAVORITOS
    botones[0].addEventListener("click", ()=>{
        botones[0].src="images/assets/icon-fav-act.svg";
        let newFavGifo= new FAVGIFO(
            favArray.length,
            user,
            title,
            url,
        )
    })

    //DESCARGA GIF
    botones[1].addEventListener("click", ()=>{
        downloadGifo(url, title)
    })
}






