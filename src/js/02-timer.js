import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { addLeadingZero, convertMs } from './helpers.js';

const refs = {
  startBtn: document.querySelector('button[data-start]'),
  dateTimeInput: document.getElementById('datetime-picker'),
  timer: document.querySelector('.timer'),
};

let selectedDate;
let timerInterval;

refs.startBtn.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0].getTime() < Date.now()) {
      Notify.failure('Please choose a date in the future');
    } else {
      Notify.success('Press the button to start the timer');
      refs.startBtn.disabled = false;
      selectedDate = selectedDates[0].getTime();
      refs.startBtn.addEventListener('click', handleStartButtonClick);
    }
  },
};
// ініціалізація календаря
flatpickr(refs.dateTimeInput, options);

// Функція для оновлення інтерфейсу таймера
function updateTimerDisplay(days, hours, minutes, seconds) {
  refs.timer.querySelector('[data-days]').textContent = addLeadingZero(days);
  refs.timer.querySelector('[data-hours]').textContent = addLeadingZero(hours);
  refs.timer.querySelector('[data-minutes]').textContent =
    addLeadingZero(minutes);
  refs.timer.querySelector('[data-seconds]').textContent =
    addLeadingZero(seconds);
}

// Функція для обробки натискання на кнопку "Start"
function handleStartButtonClick() {
  if (!timerInterval) {
    timerInterval = setInterval(() => {
      const currentDate = new Date();
      const timeDifference = selectedDate - currentDate;

      // Перевірка, чи час не минув
      if (timeDifference <= 0) {
        clearInterval(timerInterval);
        timerInterval = null;
        refs.startBtn.disabled = true;
        return;
      }

      const timeLeft = convertMs(timeDifference);
      updateTimerDisplay(
        timeLeft.days,
        timeLeft.hours,
        timeLeft.minutes,
        timeLeft.seconds
      );
    }, 1000);
  }
}
