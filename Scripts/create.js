var arrayMyGifos=[];

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

var counterbtns= document.querySelectorAll(".countercont div");

StartBtn.addEventListener("click", firstStep, {once: true});

function firstStep(){
    StartBtn.removeEventListener("click", firstStep);

    //CAMBIA BOTONES
    document.querySelector(".centertextcontainer p").innerHTML= "¿Nos das acceso a tu cámara?";
    document.querySelector(".centertextcontainer p:nth-child(2)").innerHTML="El acceso a tu cámara será válido sólo";
    document.querySelector(".centertextcontainer p:nth-child(3)").innerHTML="por el tiempo en el que estés creando el GIFO.";
    // document.querySelector(".countercont div:first-child").style.background="#572EE5";
    // document.querySelector(".countercont div:first-child").style.color="white";
    if(darkStatus==true){

        //COLORES
        // $mainviolet: #572EE5;
        // $backgrey: #F3F5F8;
        // $darkbody: #37383C;
        ///
        document.querySelector(".countercont div:first-child").style.background="#F3F5F8";
        document.querySelector(".countercont div:first-child").style.color="#37383C";
        // console.log("darkcounter pos 0")
        // counterbtns[0].classList.remove("unseleclight");
        // counterbtns[0].classList.add("selecdark");
        // document.querySelector(".countercont div:first-child").classList.add(".darkcounter");
    }
    else{
        document.querySelector(".countercont div:first-child").style.background="#572EE5";
        document.querySelector(".countercont div:first-child").style.color="white";

        // counterbtns[0].classList.remove("unseleclight");
        // counterbtns[0].classList.add("seleclight");
    }
    StartBtn.innerHTML="OK";
    StartBtn.style.width="60px";
    StartBtn.addEventListener("click", ()=>{
        getCam();
    }, {once:true});
}

async function getCam(){
    //CAMBIA BOTONES SEGUN DARK MODE
    if(darkStatus==true){
        document.querySelector(".countercont div:first-child").style.background="#37383C";
        document.querySelector(".countercont div:first-child").style.color="#F3F5F8";
        document.querySelector(".countercont div:nth-child(2)").style.background="#F3F5F8";
        document.querySelector(".countercont div:nth-child(2)").style.color="#37383C";
    }
    else{
        document.querySelector(".countercont div:first-child").style.background="white";
        document.querySelector(".countercont div:first-child").style.color="#572EE5";
        document.querySelector(".countercont div:nth-child(2)").style.background="#572EE5";
        document.querySelector(".countercont div:nth-child(2)").style.color="white";
    }
    var video= document.createElement("video");
    await navigator.mediaDevices.getUserMedia({
        audio: false,
        video:{
            height: {max:480}
        }
    })
        .then(function(stream){
            let center=document.querySelector(".center");
            center.innerHTML="";
            center.appendChild(video);

            //VIDEO OBTENIDO
            //CAMBIO DE BOTONES
            StartBtn.innerHTML="GRABAR";
            StartBtn.style.width="95px";
            StartBtn.addEventListener("click", ()=>{
                //AL CLICKEAR GRABAR
                recorder.startRecording();
                StartBtn.innerHTML = "FINALIZAR";
                StartBtn.style.width="105px";
                StartBtn.addEventListener("click", ()=>{
                    //AL CLICKEAR FINALIZAR
                    //CAMBIA BOTONES
                    if(darkStatus==true){
                        document.querySelector(".countercont div:nth-child(2)").style.background="#37383C";
                        document.querySelector(".countercont div:nth-child(2)").style.color="#F3F5F8";
                        document.querySelector(".countercont div:nth-child(3)").style.background="#F3F5F8";
                        document.querySelector(".countercont div:nth-child(3)").style.color="#37383C";
                    }
                    else{
                        document.querySelector(".countercont div:nth-child(2)").style.background="white";
                        document.querySelector(".countercont div:nth-child(2)").style.color="#572EE5";
                        document.querySelector(".countercont div:nth-child(3)").style.background="#572EE5";
                        document.querySelector(".countercont div:nth-child(3)").style.color="white";
                    }
                    //ESCONDE BOTON
                    StartBtn.style.display="none";
                    //GENERA DIV OVERLAY Y ELEMENTOS
                    let createoverlay= document.createElement("div");
                    createoverlay.classList.add("createoverlay");
                    center.appendChild(createoverlay);
                    createoverlay.innerHTML=`<img src="images/assets/loader.svg" alt="cargando">
                    <p>Estamos subiendo tu GIFO...</p>`
                    //DETIENE LA GRABACIÓN
                    recorder.stopRecording();
                    let form = new FormData();
                    form.append('file', recorder.getBlob(), 'myGifo.gif');
                    form.append('api_key', apiKey);
                    console.log(form.get('file'));
                    //SUBE GIF A GIPHY 
                    async function uploadGifo(){
                        await fetch (apiUpload, {
                            method: "POST",
                            body: form,
                            mode: "cors"
                        })
                            .then(res=>{
                                return res.json()
                            })
                            .then(ans=>{
                                console.log("result")
                                console.log(ans)
                                fetch(`https://api.giphy.com/v1/gifs?ids=${ans.data.id}&api_key=${apiKey}`)
                                    .then(res=> res.json())
                                    .then(gifox=>{
                                        let mynewgifo= new MYGIFO(arrayMyGifos.length, "Tú", "Sin nombre", gifox.data[0].images.original.url)
                                        console.log("GIFOX");
                                        console.log(mynewgifo);
                                        arrayMyGifos.push(mynewgifo);
                                        localStorage.setItem("MYGIFOS", JSON.stringify(arrayMyGifos));
                                        renderMy();
                                    })
                                    createoverlay.querySelector("img").src="images/assets/ok.svg";
                                    createoverlay.querySelector("p").innerHTML= "GIFO subido con éxito!<br>\Te dirigiremos a la sección de tus GIFOS!";
                                    setTimeout(() => {
                                        openMyGifos(openCreate());
                                    }, 3000);

                            })
                    }
                    uploadGifo();
                }, {once:true})
            }, {once:true})
            //ASIGNA SRC AL VIDEO
            video.srcObject= stream;
            video.play();

            //OBJETO RECORDER
            recorder = RecordRTC(stream, {
                type: 'gif',
                frameRate: 1,
                quality: 10,
                width: 360,
                hidden: 240,
                onGifRecordingStarted: function () {
                    console.log("recording started")
                },
            });
        })


}

//SECCIÓN MY GIFOS

//CONSTRUCTOR OBJETO MYGIFO
function MYGIFO(index, author, title, url){
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

//FUNCTION OPEN MYGIFOS
function openMyGifos(origin){
    
    if(myGifosOpen==false){
        // console.log("antes");
        // retrieveMyGifos();
        // console.log("despues");
        mainSec.classList.add("hidden");
        searchResults.classList.add("hidden");
        mygifosSec.classList.remove("hidden");
        createSec.classList.add("hidden");
        favSec.classList.add("hidden");
        trendingSec.classList.remove("hidden")
        origin;
        document.querySelector(".mygifosbtndesktop").style.color="#9CAFC3";
        if(createOpen==true){
            if(darkStatus==false){
                newLogo.src= "./images/assets/button-crear-gifo.svg";
            }
            else{
                newLogo.src= "./images/assets/CTA-crear-gifo-modo-noc.svg";
            }
        }
        else if(favOpen==true){
            if(darkStatus==false){
                document.querySelector(".favbtndesktop").style.color="#572EE5";
            }
            else{
                document.querySelector(".favbtndesktop").style.color="#9CAFC3";
            }
        }
        //ACTUALIZA GIFOSOPEN STATUS
        myGifosOpen=true;
    }
    else{
        mainSec.classList.remove("hidden");

        mygifosSec.classList.add("hidden");

        if(darkStatus==true){
            document.querySelector(".mygifosbtndesktop").style.color="white";
        }
        else{
            document.querySelector(".mygifosbtndesktop").style.color="#572EE5";
        }
        //ACTUALIZA GIFOSOPEN STATUS
        myGifosOpen=false;

    }
}
function retrieveMyGifos(){
    if(localStorage.hasOwnProperty("MYGIFOS")){
        arrayMyGifos=JSON.parse(localStorage.getItem("MYGIFOS"))
    }
}

retrieveMyGifos();


function renderMy(){
    if(arrayMyGifos.length==0){
        document.querySelector(".nomy").classList.remove("hidden");
    }
    else{
        document.querySelector(".nomy").classList.add("hidden");
        document.querySelector(".mycontainer").innerHTML="";
        for(let i=0; i<arrayMyGifos.length; i++){
            let mydiv = document.createElement("div");
            mydiv.classList.add("mydiv");
            document.querySelector(".mycontainer").appendChild(mydiv);
            mydiv.innerHTML=`<img src=${arrayMyGifos[i].url} alt="${arrayMyGifos[i].title}">
            <div class="overlaygifo hidden">
                <div class="overlayfavbuttons">
                    <img src="images/assets/icon-trash.svg" alt="ícono borrar">
                    <img src="images/assets/icon-download.svg" alt="ícono descargar">
                    <img src="images/assets/icon-max-normal.svg" alt="">
                </div>
                <div class="overlayp">
                    <p class="overlayuser">${arrayMyGifos[i].author}</p>
                    <p class="overlaytitle">${arrayMyGifos[i].title}</p>
                </div>
            </div>`
            //HOVER OVERLAY
            mydiv.addEventListener("mouseover", ()=>{
                mydiv.querySelector(".overlaygifo").classList.remove("hidden");
            })
            mydiv.addEventListener("mouseout", ()=>{
                mydiv.querySelector(".overlaygifo").classList.add("hidden");
            })
            //HOVER BOTONES
            let favbtns= mydiv.querySelectorAll(".overlayfavbuttons img");
            favbtns[0].addEventListener("mouseover", ()=>{
                favbtns[0].src="./images/assets/icon-trash-hover.svg";
            })
            favbtns[0].addEventListener("mouseleave", ()=>{
                favbtns[0].src="./images/assets/icon-trash.svg";
            })
            favbtns[1].addEventListener("mouseover", ()=>{
                favbtns[1].src="./images/assets/icon-download-hover.svg";
            })
            favbtns[1].addEventListener("mouseleave", ()=>{
                favbtns[1].src="./images/assets/icon-download.svg"
            })
            favbtns[2].addEventListener("mouseover", ()=>{
                favbtns[2].src="./images/assets/icon-max-hover.svg"
            })
            favbtns[2].addEventListener("mouseleave", ()=>{
                favbtns[2].src="./images/assets/icon-max-normal.svg"
            })
            //BORRAR MY GIFOS
            favbtns[0].addEventListener("click", ()=>{
                arrayMyGifos.splice([i],1);
                localStorage.setItem("MYGIFOS", JSON.stringify(arrayMyGifos));
                if(arrayMyGifos.length!=0){
                    renderMy();
                }
                else{
                    document.querySelector(".nomy").classList.remove("hidden");
                    document.querySelector(".mycontainer").innerHTML="";
                }
            })
            //DESCARGAR
            favbtns[1].addEventListener("click", ()=>{
                downloadGifo(arrayMyGifos[i].url, arrayMyGifos[i].title)
            })
            //MAXIMIZAR
            favbtns[2].addEventListener("click", ()=>{
                maxGifo(arrayMyGifos[i].url, arrayMyGifos[i].title, arrayMyGifos[i].author, mygifosSec)
            })
        }
    }
}
renderMy();