const music_container = document.getElementById("music-container");
const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const audio = document.getElementById("audio");
const progress = document.getElementById("progress");
const progress_container = document.getElementById("progress-container");
const title = document.getElementById("title");
const cover = document.getElementById("cover");

const songs = ["forever1", "lionheart", "party"];
let index = 0;

const loadSongs = (song) => {
  title.innerText = `Music Name : ${song}`;
  cover.src = `cover/${song}.jpeg`;
  audio.src = `audio/${song}.mp3`;
};

playBtn.addEventListener("click", () => {
  const isPlay = music_container.classList.contains("play"); // chk ว่าเล่นเพลงมั้ย
  if (isPlay) {
    pauseSong();
  } else {
    playSong();
  }
});

prevBtn.addEventListener("click", () => {
  index--;
  if (index < 0) {
    index = songs.length - 1;
  }
  loadSongs(songs[index]);
  playSong();
});

const nextSong = () => {
  index++;
  if (index > songs.length - 1) {
    index = 0;
  }
  loadSongs(songs[index]);
  playSong();
};

// const playSong = async () => {
//   try {
//     await music_container.classList.add("play");
//     playBtn.querySelector("i.fa-solid").classList.remove("fa-play");
//   } catch (err) {
//     playBtn.querySelector("i.fa-solid").classList.add("fa-pause");
//     audio.play();
//   }
// };

// const pauseSong = async () => {
//   try {
//     await music_container.classList.remove("play");
//     playBtn.querySelector("i.fa-solid").classList.remove("fa-pause");
//   } catch (error) {
//     playBtn.querySelector("i.fa-solid").classList.add("fa-play");
//     audio.pause();
//   }
// };

const playSong = () => {
  music_container.classList.add("play");
  playBtn.querySelector("i.fa-solid").classList.remove("fa-play");
  playBtn.querySelector("i.fa-solid").classList.add("fa-pause");
  audio.play();
};

const pauseSong = () => {
  music_container.classList.remove("play");
  playBtn.querySelector("i.fa-solid").classList.remove("fa-pause");
  playBtn.querySelector("i.fa-solid").classList.add("fa-play");
  audio.pause();
};

const updateProgress = (e) => {
  const { duration, currentTime } = e.srcElement;
  const progressPercent = (currentTime / duration) * 100;
  progress.style.width = `${progressPercent}%`;
};

const setProgress = (e) => {
  const width = this.clientwidth;
  const clickX = e.offsetX;
  const duration = audio.duration;

  audio.currentTime = (clickX / width) * duration;
};

loadSongs(songs[index]);

nextBtn.addEventListener("click", nextSong);

audio.addEventListener("timeupdate", updateProgress);

progress_container.addEventListener("click", setProgress);

audio.addEventListener("ended", nextSong);
