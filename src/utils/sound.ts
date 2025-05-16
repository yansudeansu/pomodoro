import alarm from '../assets/alarm.mp3';
import start from '../assets/start.mp3';

const alarmAudio = new Audio(alarm);
const startAudio = new Audio(start);

export const playAlarm = () => {
  stopAll();
  alarmAudio.currentTime = 0;
  alarmAudio.play().catch((e) => console.error('Alarm play error', e));
};

export const playStartSound = () => {
  stopAll();
  startAudio.currentTime = 0;
  startAudio.play().catch((e) => console.error('Start sound play error', e));
};

export const stopAll = () => {
  [alarmAudio, startAudio].forEach((audio) => {
    audio.pause();
    audio.currentTime = 0;
  });
};
