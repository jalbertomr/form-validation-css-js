const form = document.getElementById('formulary');
const inputs = document.querySelectorAll('#formulary input');

const expressions = {
    user: /^[a-zA-Z0-9\_\-]{4,16}$/,    // letters, numbers, _ , -
    name: /^[a-zA-ZÀ-ÿ\s]{1,40}$/,      // letters, spaces, accents
    password: /^.{4,12}$/,              // 4 and 12 digits
    email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-.]+$/,
    telephone: /^\d{7,14}$/             // 7 to 14 numbers
}

const fields = {
    user: false,
    name: false,
    password: false,
    email: false,
    telephone: false
}

const validForm = (e) => {
    document.getElementById('formulary__message').classList.remove('formulary__message-active');
    switch (e.target.name) {
        case 'user':
           validField(expressions.user, e.target, 'user');
        break;
        case 'name':
           validField(expressions.name, e.target, 'name');
        break;
        case 'password':
           validField(expressions.password, e.target, 'password');
           validPassword2();
        break;
        case 'password2':
           validPassword2();
        break;
        case 'email':
           validField(expressions.email, e.target, 'email');
        break;
        case 'telephone':
           validField(expressions.telephone, e.target, 'telephone');
        break;
    }
}

const validField = (expression, input, field) => {
    if(expression.test(input.value)){
        document.getElementById(`group__${field}`).classList.remove('formulary__group-incorrect');
        document.getElementById(`group__${field}`).classList.add('formulary__group-correct');
        document.querySelector(`#group__${field} i`).classList.add('fa-check-circle');
        document.querySelector(`#group__${field} i`).classList.remove('fa-times-circle');
        document.querySelector(`#group__${field} .formulary__input-error`).classList.remove('formulary__input-error-active');
        fields[field] = true;
    } else {
        document.getElementById(`group__${field}`).classList.add('formulary__group-incorrect');
        document.getElementById(`group__${field}`).classList.remove('formulary__group-correct');
        document.querySelector(`#group__${field} i`).classList.add('fa-times-circle');
        document.querySelector(`#group__${field} i`).classList.remove('fa-check-circle');
        document.querySelector(`#group__${field} .formulary__input-error`).classList.add('formulary__input-error-active');
        fields[field] = false;
    }
}

const validPassword2 = () => {
    const inputPassword1 = document.getElementById('password');
    const inputPassword2 = document.getElementById('password2');

    if(inputPassword1.value != inputPassword2.value){
        document.getElementById(`group__password2`).classList.add('formulary__group-incorrect');
		document.getElementById(`group__password2`).classList.remove('formulary__group-correct');
		document.querySelector(`#group__password2 i`).classList.add('fa-times-circle');
		document.querySelector(`#group__password2 i`).classList.remove('fa-check-circle');
		document.querySelector(`#group__password2 .formulary__input-error`).classList.add('formulary__input-error-active');
		fields['password'] = false;
    } else {
        document.getElementById(`group__password2`).classList.remove('formulary__group-incorrect');
		document.getElementById(`group__password2`).classList.add('formulary__group-correct');
		document.querySelector(`#group__password2 i`).classList.remove('fa-times-circle');
		document.querySelector(`#group__password2 i`).classList.add('fa-check-circle');
		document.querySelector(`#group__password2 .formulary__input-error`).classList.remove('formulary__input-error-active');
		fields['password'] = true;
    }
}

inputs.forEach((input) => {
    input.addEventListener('keyup', validForm);
    input.addEventListener('blur', validForm);
});

formulary.addEventListener('submit', (e) => {
	e.preventDefault();

	const terms = document.getElementById('terms');
	if(fields.user && fields.name && fields.password && fields.email && fields.telephone && terms.checked ){
		formulary.reset();

		document.getElementById('formulary__message-success').classList.add('formulary__message-success-active');
		setTimeout(() => {
			document.getElementById('formulary__message-success').classList.remove('formulary__message-success-active');
		}, 10000);

		document.querySelectorAll('.formulary__group-correct').forEach((icon) => {
			icon.classList.remove('formulary__group-correct');
		});
	} else {
		document.getElementById('formulary__message').classList.add('formulary__message-active');
	}
});