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

StartBtn.addEventListener("click", firstStep, {once: true});

function firstStep(){
    StartBtn.removeEventListener("click", firstStep);
    //CAMBIA BOTONES
    document.querySelector(".centertextcontainer p").innerHTML= "¿Nos das acceso a tu cámara?";
    document.querySelector(".centertextcontainer p:nth-child(2)").innerHTML="El acceso a tu cámara será válido sólo";
    document.querySelector(".centertextcontainer p:nth-child(3)").innerHTML="por el tiempo en el que estés creando el GIFO.";
    document.querySelector(".countercont div:first-child").style.background="#572EE5";
    document.querySelector(".countercont div:first-child").style.color="white";
    StartBtn.innerHTML="Ok !";
    StartBtn.style.width="60px";
    StartBtn.addEventListener("click", ()=>{
        getCam();
    }, {once:true});
////////////SEGUIR CAMBIANDO ESTILO DEL BOTON STARTBTN PARA QUE DIGA OK Y AGREGAR ADDEVENT PARA QUE EJECUTE GETCAM()
    // getCam();

}

async function getCam(){
    //CAMBIA BOTONES
    document.querySelector(".countercont div:first-child").style.background="white";
    document.querySelector(".countercont div:first-child").style.color="#572EE5";
    document.querySelector(".countercont div:nth-child(2)").style.background="#572EE5";
    document.querySelector(".countercont div:nth-child(2)").style.color="white";
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

// async function getStreamAndRecord() {
//     document.querySelector(".createSection .level_2 .p1").style.backgroundColor = "white";
//     document.querySelector(".createSection .level_2 .p1").style.color = "#572EE5";
//     document.querySelector(".createSection .level_2 .p2").style.backgroundColor = "#572EE5";
//     document.querySelector(".createSection .level_2 .p2").style.color = "white";
//     var video = document.createElement("video");
//     await navigator.mediaDevices.getUserMedia({
//         audio: false,
//         video: {
//             height: { max: 480 }
//         }
//     })
//         .then(function (stream) {
//             document.querySelector(".create_window").innerHTML = "";
//             document.querySelector(".create_window").append(video);
//             //*STEP 4 (When the stream is gotten)
//             BtnStart.innerHTML = "GRABAR";
//             BtnStart.addEventListener("click", () => {
//                 //*STEP 4 (When GRABAR is clicked)
//                 recorder.startRecording();
//                 BtnStart.innerHTML = "FINALIZAR";
//                 BtnStart.addEventListener("click", () => {
//                     //*STEP 5 (When FINALIZAR is clicked)
//                     document.querySelector(".createSection .level_2 .p2").style.backgroundColor = "white";
//                     document.querySelector(".createSection .level_2 .p2").style.color = "#572EE5";
//                     document.querySelector(".createSection .level_2 .p3").style.backgroundColor = "#572EE5";
//                     document.querySelector(".createSection .level_2 .p3").style.color = "white";
//                     //!CREATE OVERLAY
//                     overlay = document.createElement("div");
//                     overlay.classList.add("create_overlay");
//                     overlay.innerHTML = `<img src="assets/loader.svg" alt="Cargando"><p>Estamos subiendo tu GIFO</p>`
//                     document.querySelector(".create_window").append(overlay)
//                     //!
//                     recorder.stopRecording()
//                     let form = new FormData();
//                     form.append('file', recorder.getBlob(), 'myGifo.gif');
//                     form.append('api_key', apiKey)
//                     console.log(form.get('file'))
//                     ////
//                     async function uploadFetch() {
//                         await fetch("https://upload.giphy.com/v1/gifs", {
//                             method: 'POST',
//                             body: form,
//                             mode: 'cors'
//                         })
//                             .then(response => {
//                                 return response.json();
//                             })
//                             .then(result => {
//                                 console.log("RESULT")
//                                 console.log(result)
//                                 fetch(`https://api.giphy.com/v1/gifs?ids=${result.data.id}&api_key=${apiKey}`)
//                                     .then(response => response.json())
//                                     .then(gifow => {
//                                         let newmygifo = new MYGIFO(MyGifosArray.length, "TÃº", "Sin tÃ­tulo", gifow.data[0].images.original.url)
//                                         console.log("GIFOW")
//                                         console.log(newmygifo)
//                                         MyGifosArray.push(newmygifo);
//                                         localStorage.setItem("MYGIFOS", JSON.stringify(MyGifosArray));
//                                     })
//                                 overlay.querySelector("img").src = "assets/ok.svg";
//                                 overlay.querySelector("p").innerHTML = "GIFO subido con Ã©xito. Si quieres subir otro GIFO, recarga la pÃ¡gina";
//                                 setTimeout(() => {
//                                     takeUserToMyGifos();
//                                 }, 2500);
//                             })
//                     }
//                     ////
//                     uploadFetch();

//                 }, { once: true })
//             }, { once: true });
//             video.srcObject = stream;
//             video.play();

//             //RECORDER OBJECT
//             recorder = RecordRTC(stream, {
//                 type: 'gif',
//                 frameRate: 1,
//                 quality: 10,
//                 width: 360,
//                 hidden: 240,
//                 onGifRecordingStarted: function () {
//                     console.log("recording started")
//                 },
//             });
//         })
// }
