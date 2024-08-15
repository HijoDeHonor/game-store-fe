const numberInput = document.getElementById('numberinput');

numberInput.addEventListener('input', (event) => {
  let value = event.target.value;
  value = value.replace(/\D/g, '');
  event.target.value = value;
});
