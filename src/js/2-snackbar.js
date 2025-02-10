import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');
const delayInp = document.querySelector('[name=delay]');

form.addEventListener('submit', e => {
  e.preventDefault();

  const delay = Number(delayInp.value);

  const selectedButton = document.querySelector('input[name="state"]:checked');

  let selectedState = selectedButton ? selectedButton.value : null;

  if (selectedState) {
    const promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        if (selectedState === 'fulfilled') {
          resolve(delay);
        } else if (selectedState === 'rejected') {
          reject(delay);
        }
      }, delay);
    });

    // Опрацьовуємо проміс
    promise
      .then(() => {
        iziToast.success({
          message: `✅ Fulfilled promise in ${delay}ms`,
          position: 'topRight',
          color: 'green',
          icon: false,
        });
      })
      .catch(() => {
        iziToast.error({
          message: `❌ Rejected promise in ${delay}ms`,
          position: 'topRight',
          color: 'red',
          icon: false,
        });
      });
  }
});
