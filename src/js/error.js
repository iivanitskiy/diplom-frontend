export function errorEmail(popup, item, err) {
  popup.addEventListener('input', function () {
    if (item.value.length === 0) {
      err.textContent = 'Это обязательное поле',
      err.style.visibility = 'visible';
    }
  });
}

export function errorPass(popup, item, err) {
  popup.addEventListener('input', function () {
    if (item.value.length === 0) {
      err.textContent = 'Это обязательное поле',
      err.style.visibility = 'visible';
    } else if (item.value.length < 8 || item.value.length > 30) {
      err.textContent = 'Должно быть от 8 до 30 символов',
      err.style.visibility = 'visible';
    } else {
      err.style.visibility = 'hidden';
    }
  });
}

export function errorRegEmail(popup, item, err) {
  popup.addEventListener('input', function () {
    if (item.value.length === 0) {
      err.textContent = 'Это обязательное поле',
      err.style.visibility = 'visible';
    }
  });
}

export function errorRegPass(popup, item, err) {
  popup.addEventListener('input', function () {
    if (item.value.length === 0) {
      err.textContent = 'Это обязательное поле',
      err.style.visibility = 'visible';
    } else if (item.value.length < 8 || item.value.length > 30) {
      err.textContent = 'Должно быть от 8 до 30 символов',
      err.style.visibility = 'visible';
    } else {
      err.style.visibility = 'hidden';
    }
  });
}

export function errorName(popup, item, err) {
  popup.addEventListener('input', function () {
    if (item.value.length < 1) {
      err.textContent = 'Это обязательное поле',
      err.style.visibility = 'visible';
    } else {
      err.style.visibility = 'hidden';
    }
  });
}