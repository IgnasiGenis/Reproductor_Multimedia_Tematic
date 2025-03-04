let instruments = [];
window.onload = function () {
    let info = localStorage.getItem('instruments');
    if (info) { 
        info = JSON.parse(info);
        instruments = info;
    } else {
        instruments = [
            {
                nom: "Piano",
                audios: [
                    { src: "Audio_Piano1.mp3", temps: 0, volum: 0.5 },
                    { src: "piano1.mp3", temps: 0, volum: 0 }
                ],
                videos: [
                    { src: "pianoVideo.mp4", temps: 0, volum: 0.5 }
                ]
            },
            {
                nom: "Guitarra",
                audios: [
                    { src: "guitar2.mp3", temps: 0, volum: 0 },
                    { src: "Rito_Village.mp3", temps: 0, volum: 0.1 }
                ],
                videos: [
                    { src: "GuitarraVideo.mp4", temps: 0, volum: 0.2 }
                ]
            },
            {
                nom: "Trompeta",
                audios: [
                    { src: "trompeta1.mp3", temps: 0, volum: 0.5 },
                    { src: "trompeta2.mp3", temps: 0, volum: 0.5 }
                ],
                videos: [
                    { src: "trompetaVideo.mp4", temps: 0, volum: 0.5 }
                ]
            },
            {
                nom: "Flauta",
                audios: [
                    { src: "flauta-1.mp3", temps: 0, volum: 0.5 },
                    { src: "flauta-2.mp3", temps: 0, volum: 0.5 }
                ],
                videos: [
                    { src: "flauta_video.mp4", temps: 0, volum: 0.5 }
                ]
            }
        ];
    }
    generarPagina(0); 
};

function generarPagina(num) {
    let nomInstrument = instruments[num].nom;
    let audiosInstrumento = instruments[num].audios;
    let videosInstrumento = instruments[num].videos;

    let contenedorAudios = document.getElementById("audios");
    let contenedorVideos = document.getElementById("videos"); 
    contenedorAudios.innerHTML = "";
    contenedorVideos.innerHTML = "";

    // Crear i ensenyar audios
    for (let audioIndex = 0; audioIndex < audiosInstrumento.length; audioIndex++) {
        let audioData = audiosInstrumento[audioIndex];

        let audioElement = document.createElement("audio");
        audioElement.id = "audio" + num + "_" + audioIndex;
        audioElement.src = audioData.src;
        audioElement.loop = true;
        audioElement.controls = true;
        audioElement.currentTime = audioData.temps;
        audioElement.volume = audioData.volum;

        audioElement.addEventListener("pause", function () {
            instruments[num].audios[audioIndex].temps = audioElement.currentTime;
            instruments[num].audios[audioIndex].volum = audioElement.volume;
        });

        let spanElement = document.createElement("span");
        spanElement.className = "audio " + nomInstrument.toLowerCase();
        spanElement.textContent = "Audio " + (audioIndex + 1) + " - " + nomInstrument;

        contenedorAudios.appendChild(spanElement);
        contenedorAudios.appendChild(audioElement);
    }

    // Crear i ensenyar videos
    for (let videoIndex = 0; videoIndex < videosInstrumento.length; videoIndex++) {
        let videoData = videosInstrumento[videoIndex];

        let videoElement = document.createElement("video");
        videoElement.id = "video" + num + "_" + videoIndex;
        videoElement.src = videoData.src;
        videoElement.controls = true;
        videoElement.currentTime = videoData.temps;
        videoElement.volume = videoData.volum;

        videoElement.addEventListener("pause", function () {
            instruments[num].videos[videoIndex].temps = videoElement.currentTime;
            instruments[num].videos[videoIndex].volum = videoElement.volume;
        });

        let spanElement = document.createElement("span");
        spanElement.className = "video " + nomInstrument.toLowerCase();
        spanElement.textContent = "Video " + (videoIndex + 1) + " - " + nomInstrument;

        contenedorVideos.appendChild(spanElement);
        contenedorVideos.appendChild(videoElement);
    }
}

document.addEventListener("DOMContentLoaded", function () {
    let llista = document.getElementsByTagName("nav")[0].getElementsByTagName("a");
    for (let i = 0; i < llista.length; i++) {
        llista[i].addEventListener("click", function () {
            generarPagina(i); 
        });
    }
});

window.onbeforeunload = function () {
    let json = JSON.stringify(instruments);
    localStorage.setItem('instruments', json);
};