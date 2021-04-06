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
        document.querySelector(".countercont div:first-child").style.color="572EE5";
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
                    <p>Estamos subiendo tu GIFO</p>`
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
                                    })
                                    createoverlay.querySelector("img").src="images/assets/ok.svg";
                                    createoverlay.querySelector("p").innerHTML= "GIFO subido con éxito!";
                                    setTimeout(() => {
                                        openMyGifos(openCreate());
                                    }, 2000);

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
        mainSec.classList.add("hidden");
        searchResults.classList.add("hidden");
        maxSec.classList.add("hidden");
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