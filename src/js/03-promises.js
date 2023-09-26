import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { createPromise } from './helpers.js';

const refs = {
  form: document.querySelector('.form'),
};

refs.form.addEventListener('submit', async e => {
  e.preventDefault();

  const formData = new FormData(refs.form);
  const delay = Number(formData.get('delay'));
  const step = Number(formData.get('step'));
  const amount = Number(formData.get('amount'));

  for (let i = 0; i < amount; i += 1) {
    const position = i + 1;
    const promise = createPromise(position, delay + step * i);

    promise
      .then(({ position, delay }) => {
        console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        console.log(`❌ Rejected promise ${position} in ${delay}ms`);
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
  }
});
