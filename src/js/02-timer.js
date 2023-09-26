import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

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

flatpickr(refs.dateTimeInput, options);

// Функція для форматування чисел з додаванням нулів
function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}

// Функція для оновлення інтерфейсу таймера
function updateTimerDisplay(days, hours, minutes, seconds) {
  refs.timer.querySelector('[data-days]').textContent = addLeadingZero(days);
  refs.timer.querySelector('[data-hours]').textContent = addLeadingZero(hours);
  refs.timer.querySelector('[data-minutes]').textContent =
    addLeadingZero(minutes);
  refs.timer.querySelector('[data-seconds]').textContent =
    addLeadingZero(seconds);
}
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

// Функція для обробки натискання на кнопку "Start"
function handleStartButtonClick() {
  if (!timerInterval) {
    timerInterval = setInterval(() => {
      const currentDate = new Date(); // Оновлюємо поточну дату і час
      const timeDifference = selectedDate - currentDate; // Оновлюємо різницю в часі

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
