console.log("spotify clone");

//initialize variables
let songIndex = 0;
let audioElement = new Audio('song/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let songItems = Array.from(document.getElementsByClassName('songItem'));
let songItemPlay = Array.from(document.getElementsByClassName("songItemPlay"));
let previousBtn = document.getElementById("masterPreviousBtn");
let nextBtn = document.getElementById("masterNextBtn");
let masterSongName = document.getElementById("masterSongName");
let artist = 'Metro Boomin';


let songs = [
    {songName: '10AM/Save The World', filepath: "song/1.mp3", coverPath: "cover1.jpg", duration: "3:47"},
    {songName: 'Overdue', filepath: "song/2.mp3", coverPath: "cover1.jpg", duration: "2:47" },
    {songName: "Don't Come Out The House", filepath: "song/3.mp3", coverPath: "cover1.jpg", duration: "2:49"},
    {songName: 'Dreamcatcher', filepath: "song/4.mp3", coverPath: "cover1.jpg", duration: "3:33"},
    {songName: 'Space Cadet', filepath: "song/5.mp3", coverPath: "cover1.jpg", duration: "3:35"},
    {songName: '10 Freaky Girls', filepath: "song/6.mp3", coverPath: "cover1.jpg", duration: "3:31"},
    {songName: 'Up To Something', filepath: "song/7.mp3", coverPath: "cover1.jpg", duration: "3:05"},
    {songName: 'Borrowed Love', filepath: "song/8.mp3", coverPath: "cover1.jpg", duration: "3:51"}
    /* {songName: 'Only You', filepath: "song/9.mp3", coverPath: "cover1.jpg"},
    {songName: 'No More', filepath: "song/10.mp3", coverPath: "cover1.jpg"} */
];

//handle play/pause click
masterPlay.addEventListener('click', ()=> {
    if(audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
    } else {
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
    }
})

//Listen to events
audioElement.addEventListener('timeupdate', ()=> {
   //update seekbar
   let progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
   myProgressBar.value = progress;
});

myProgressBar.addEventListener('change', ()=> {
    audioElement.currentTime = (myProgressBar.value * audioElement.duration) / 100;
});

songItems.forEach((e, i) => {
    e.getElementsByTagName("img")[0].src = songs[i].coverPath;
    e.getElementsByClassName("songName")[0].innerText = songs[i].songName;
    e.getElementsByClassName("timestamp")[0].innerText = songs[i].duration;
});

/* const makeAllPlays = () => {
    songItemPlay.forEach((e) => {
        e.classList.remove('fa-pause-circle');
        e.classList.add('fa-play-circle');
    });
} */

/* songItemPlay.forEach((e) => {
    e.addEventListener('click', (s) => {
        makeAllPlays();
        songIndex = parseInt(s.target.id);
        s.target.classList.remove('fa-play-circle');
        s.target.classList.add('fa-pause-circle');
        audioElement.src = `song/${songIndex}.mp3`;
        masterSongName.innerText = songs[songIndex-1].songName + " - " + artist;
        audioElement.currentTime = 0;
        audioElement.play();      
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
    })
}); */

const makeAllPlays = (id) => {
    songItemPlay.forEach((e) => {
        if(e.id != id) {
            e.classList.remove('fa-pause-circle');
            e.classList.add('fa-play-circle');
        }
    });
}

function tog(s, sound) {
    if(s.target.classList.contains('fa-pause-circle')){
        s.target.classList.remove('fa-pause-circle');
        s.target.classList.add('fa-play-circle');
        sound.pause();
    } else {
        s.target.classList.remove('fa-play-circle');
        s.target.classList.add('fa-pause-circle');
        sound.play();
    }
}

songItemPlay.forEach((e) => {
    e.addEventListener('click', (s) => {
        songIndex = parseInt(s.target.id);
        audioElement.src = `song/${songIndex}.mp3`;
        masterSongName.innerText = songs[songIndex-1].songName + " - " + artist;
        audioElement.currentTime = 0;
        tog(s, audioElement);
        makeAllPlays(e.id);
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
    })
})

previousBtn.addEventListener('click', () => {
    if(songIndex <= 1) {
        songIndex = 8;
    } else {
        songIndex--;
    }
    audioElement.src = `song/${songIndex}.mp3`;
    masterSongName.innerText = songs[songIndex-1].songName + " - " + artist;
    audioElement.currentTime = 0;
    audioElement.play();
    gif.style.opacity = 1;
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
});

nextBtn.addEventListener('click', () => {
    if(songIndex >= 8) {
        songIndex = 1;
    } else {
        songIndex++;
    }
    audioElement.src = `song/${songIndex}.mp3`;
    masterSongName.innerText = songs[songIndex-1].songName + " - " + artist;
    audioElement.currentTime = 0;
    audioElement.play();
    gif.style.opacity = 1;
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
});