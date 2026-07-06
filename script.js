console.log("Welcome to Spotify!!");
let songIndex = 0;
let audioElement = new Audio('1.mp3'); 
let masterPlay = document.getElementById('masterPlayWrapper');
let masterSongName = document.getElementById('masterSongName');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');

let songs = [
    {songName: "Let Me Love You", filePath: "1.mp3", coverPath: "cover1.jpg"},
    {songName: "Perfect", filePath: "2.mp3", coverPath: "cover2.jpg"},
    {songName: "Runaway", filePath: "3.mp3", coverPath: "cover3.jpg"},
    {songName: "Night Changes", filePath: "4.mp3", coverPath: "cover4.jpg"},
    {songName: "Shape Of You", filePath: "5.mp3", coverPath: "cover5.jpg"},
    {songName: "Chanel", filePath: "6.mp3", coverPath: "cover6.webg"},
    {songName: "Pretty Little Baby", filePath: "7.mp3", coverPath: "cover7.jpg"},
];

masterPlay.addEventListener("click", () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterPlay.innerHTML = '<i class="fa-solid fa-3x fa-circle-pause" id="masterPlay"></i>';
        gif.style.opacity = 1;

        let smallIcon = document.getElementById(`${songIndex}`);

        if (smallIcon) {
            smallIcon.classList.remove('fa-circle-play')
            smallIcon.classList.add('fa-circle-pause')
        }
    } else {
        audioElement.pause();
        masterPlay.innerHTML = '<i class="fa-solid fa-3x fa-circle-play" id="masterPlay"></i>';
        gif.style.opacity = 0;

        let smallIcon = document.getElementById(`${songIndex}`);
        if (smallIcon) {
            smallIcon.classList.remove('fa-circle-pause');
            smallIcon.classList.add('fa-circle-play');
        }
    }
});

audioElement.addEventListener('timeupdate', () => {
    console.log('timeupdate');

    let progress = parseInt((audioElement.currentTime / audioElement.duration) * 100)
    console.log(progress)
    myProgressBar.value = progress;
})

myProgressBar.addEventListener('change', () => {
    audioElement.currentTime = myProgressBar.value * audioElement.duration / 100;
})

const makeAllPlays = () => {
    Array.from(document.getElementsByClassName("jeel")).forEach((element) => {
        element.classList.remove('fa-circle-pause');
        element.classList.add('fa-circle-play');
    })
}

Array.from(document.getElementsByClassName("songlistplay")).forEach((element) => {
    element.addEventListener('click', (e) => {
        let clickedIndex = parseInt(e.target.id);
        
        if (songIndex === clickedIndex) {
            if (audioElement.paused) {
                audioElement.play();
                masterPlay.innerHTML = '<i class="fa-solid fa-3x fa-circle-pause" id="masterPlay"></i>';
                e.target.classList.remove('fa-circle-play');
                e.target.classList.add('fa-circle-pause');
                gif.style.opacity = 1;
            } else {
                audioElement.pause();
                masterPlay.innerHTML = '<i class="fa-solid fa-3x fa-circle-play" id="masterPlay"></i>';
                e.target.classList.remove('fa-circle-pause');
                e.target.classList.add('fa-circle-play');
                gif.style.opacity = 0;
            }
        } 
        else {
            makeAllPlays();
            songIndex = clickedIndex;
            masterSongName.innerText = songs[songIndex].songName;
            audioElement.src = `${songIndex + 1}.mp3`;
            audioElement.currentTime = 0;
            audioElement.play();
            
            masterPlay.innerHTML = '<i class="fa-solid fa-3x fa-circle-pause" id="masterPlay"></i>';
            e.target.classList.remove('fa-circle-play');
            e.target.classList.add('fa-circle-pause');
            gif.style.opacity = 1;
        }
    })
})

document.getElementById('next').addEventListener('click', () => {
    if (songIndex >= 6) {
        songIndex = 0;
    } else {
        songIndex += 1;
    }

    audioElement.src = `${songIndex + 1}.mp3`;
    audioElement.currentTime = 0;
    audioElement.play();
    masterSongName.innerText = songs[songIndex].songName;
    masterPlay.innerHTML = '<i class="fa-solid fa-3x fa-circle-pause" id="masterPlay"></i>';
    gif.style.opacity = 1;

    makeAllPlays();
    let currentIcon = document.getElementById(`${songIndex}`);

    if (currentIcon) {
        currentIcon.classList.remove('fa-circle-play');
        currentIcon.classList.add('fa-circle-pause');
    }
})

document.getElementById('previous').addEventListener('click', () => {
    if (songIndex <= 0) {
        songIndex = 6;
    } else {
        songIndex -= 1;
    }

    audioElement.src = `${songIndex + 1}.mp3`;
    
    audioElement.currentTime = 0;
    audioElement.play();
    masterSongName.innerText = songs[songIndex].songName;
    masterPlay.innerHTML = '<i class="fa-solid fa-3x fa-circle-pause" id="masterPlay"></i>';
    gif.style.opacity = 1;

    makeAllPlays();
    let currentIcon = document.getElementById(`${songIndex}`);

    if (currentIcon) {
        currentIcon.classList.remove('fa-circle-play');
        currentIcon.classList.add('fa-circle-pause');
    }
})
