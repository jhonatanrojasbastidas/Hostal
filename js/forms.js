/**
 * This code validate the labels; if in the inputs there are one or more characters,
 * the label should stay in the position assigned by the class "fix-label".
 */
let inputs = document.getElementsByClassName("form-field__input");
const fixLabel = inputs => {
  for (let i = 0; i < inputs.length; i++) {
    inputs[i].addEventListener("input", function() {
      if (this.value.length >= 1) {
        this.nextElementSibling.classList.add("fix-label");
      } else {
        this.nextElementSibling.classList.remove("fix-label");
      }
    });
  }
};
fixLabel(inputs);

/**
 * This code validate the "input-name"; this validation is
 * done throught a regular expression that allow enter only letters and
 * letters whit special characters, besides it makes the field mandatory.
 */
const validationName = function() {
  if (!inputNameFormat.test(this.value)) {
    this.classList.add("error__style");
    nameError.textContent = "El nombre ingresado parece ser muy corto o contiene caracteres poco comunes";
    return false;
  } else if (this.value === "") {
    this.classList.add("error__style");
    nameError.textContent = "Estos datos son necesarios";
    return false;
  } else {
    this.classList.remove("error__style");
    nameError.textContent = "";
    return false;
  }
};
let inputNameFormat = /^([a-zA-Z áéíóúÁÉÍÓÚñÑ]{2,30})*$/;
let nameEntered = document.getElementById("input-name");
nameEntered.addEventListener("blur", validationName);
let nameError = document.getElementById("name-error");

/**
 * This code validate the "input-email"; this validation is
 * done throught a regular expression that allow enter only characters
 * corresponding to an email, besides it makes the field mandatory.
 */
const validationEmail = function() {
  if (this.value.length >= 1 && !inputEmailFormat.test(this.value)) {
    this.classList.add("error__style");
    emailError.textContent = "El correo electrónico ingresado no parece ser correcto";
    return false;
  } else if (this.value === "") {
    this.classList.add("error__style");
    emailError.textContent = "Estos datos son necesarios";
    return false;
  } else {
    this.classList.remove("error__style");
    emailError.textContent = "";
    return false;
  }
};
let inputEmailFormat = /\w+@\w+\.+[a-z]/;
let emailEntered = document.getElementById("input-email");
let emailError = document.getElementById("email-error");
emailEntered.addEventListener("blur", validationEmail);

/**
 * This code validate the "input-Phone"; this validation is
 * done throught a regular expression that allow enter only numbers,
 * besides it makes the field mandatory.
 */
const validationPhone = function() {
  if (!inputPhoneFormat.test(this.value)) {
    this.classList.add("error__style");
    phoneError.textContent = "El teléfono ingresado no parece ser correcto";
    return false;
  } else if (this.value === "") {
    this.classList.add("error__style");
    phoneError.textContent = "Estos datos son necesarios";
    return false;
  } else {
    this.classList.remove("error__style");
    phoneError.textContent = "";
    return false;
  }
};
let inputPhoneFormat = /^([0-9]{7,10})*$/;
let phoneEntered = document.getElementById("input-phone");
let phoneError = document.getElementById("phone-error");
phoneEntered.addEventListener("blur", validationPhone);
