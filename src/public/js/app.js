const socket = io();

const myFace = document.querySelector('#myFace');
const muteBtn = document.querySelector('#mute');
const cameraBtn = document.querySelector('#camera');

let myStream;
let muted = false;
let cameraOff = false;

const getMedia = async () => {
  try {
    myStream = await navigator.mediaDevices.getUserMedia({
      audio: muted,
      video: cameraOff,
    });
    myFace.srcObject = myStream;
  } catch (e) {
    console.log(e);
  }
};

getMedia();

const handleMuteClick = () => {
  if (!muted) {
    muteBtn.innerHTML = '음소거 해제';
    muted = true;
  } else {
    muteBtn.innerHTML = '음소거';
    muted = false;
  }
};

const handleCameraClick = () => {
  if (!cameraOff) {
    cameraBtn.innerHTML = '카메라 ON';
    cameraOff = true;
  } else {
    cameraBtn.innerHTML = '카메라 OFF';
    cameraOff = false;
  }
};

muteBtn.addEventListener('click', handleMuteClick);
cameraBtn.addEventListener('click', handleCameraClick);
