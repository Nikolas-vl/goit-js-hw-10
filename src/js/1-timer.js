import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import errorIcon from '../img/erro.svg';

const button = document.querySelector('[data-start]');
const days = document.querySelector('[data-days]');
const hours = document.querySelector('[data-hours]');
const minutes = document.querySelector('[data-minutes]');
const seconds = document.querySelector('[data-seconds]');

button.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  dateFormat: 'Y-m-d H:i',
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    const selectedDate = selectedDates[0];
    if (!selectedDate) return;
    const currentDate = new Date();
    if (selectedDate < currentDate) {
      iziToast.error({
        message: 'Please choose a date in the future',
        position: 'topRight',
        color: '#EF4040',
        iconUrl: errorIcon,
      });
      userSelectedDate = null;
      button.disabled = true;
    } else {
      userSelectedDate = selectedDate;
      button.disabled = false;
    }
  },
};

flatpickr('#datetime-picker', options);

let userSelectedDate = null;

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

const timer = {
  intervalId: null,
  initTime: null,

  start() {
    if (!userSelectedDate) return;
    this.intervalId = setInterval(() => {
      this.tick();
    }, 1000);
    button.disabled = true;
  },

  tick() {
    const currentTime = Date.now();
    const ms = userSelectedDate - currentTime;
    const time = convertMs(ms);
    days.textContent = addLeadingZero(time.days);
    hours.textContent = addLeadingZero(time.hours);
    minutes.textContent = addLeadingZero(time.minutes);
    seconds.textContent = addLeadingZero(time.seconds);

    if (ms < 1000) {
      clearInterval(this.intervalId);
      button.disabled = false;
    }
  },
};

button.addEventListener('click', () => {
  timer.start();
});
