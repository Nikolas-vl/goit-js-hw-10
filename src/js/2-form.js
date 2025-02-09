const formData = {
  email: '',
  message: '',
};

const form = document.querySelector('.feedback-form');
const emailInput = form.elements.email;
const messageInput = form.elements.message;
const STORAGE_KEY = 'feedback-form-state';

loadFromLS(STORAGE_KEY);

function saveToLS() {
  const jsonData = JSON.stringify(formData);
  localStorage.setItem(STORAGE_KEY, jsonData);
}

function loadFromLS(key) {
  const body = localStorage.getItem(key);
  try {
    const data = JSON.parse(body);
    Object.assign(formData, data);
    emailInput.value = formData.email || '';
    messageInput.value = formData.message || '';
    return data;
  } catch {
    return body;
  }
}

form.addEventListener('input', e => {
  formData[e.target.name] = e.target.value.trim();
  saveToLS();
});

form.addEventListener('submit', e => {
  e.preventDefault();

  if (!formData.email || !formData.message) {
    alert('Fill please all fields');
    return;
  }
  console.log(formData);
  localStorage.removeItem(STORAGE_KEY);
  formData.email = '';
  formData.message = '';
  form.reset();
});
