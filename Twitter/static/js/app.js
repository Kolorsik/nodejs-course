async function ShowComments(idPost) {
    alert(idPost);
}

function checkPasswords() {
    const password1 = document.getElementById('password');
    const password2 = document.getElementById('confirmPassword');
    const registerButton = document.getElementById('registerButton');

    if (password1.value === password2.value) {
        document.getElementById('checkPassword').innerHTML = 'Пароли совпадают';
        password1.classList.remove('is-error');
        password2.classList.remove('is-error');
        registerButton.disabled = false;
    } else {
        document.getElementById('checkPassword').innerHTML = 'Пароли не совпадают';
        password1.classList.add('is-error');
        password2.classList.add('is-error');
        registerButton.disabled = true;
    }
}