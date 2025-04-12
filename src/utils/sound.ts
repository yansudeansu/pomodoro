import alarm from '../assets/alarm.mp3'
import start from '../assets/start.mp3'

export const playAlarm = () => {
  new Audio(alarm).play()
}

export const playStartSound = () => {
  new Audio(start).play()
}
