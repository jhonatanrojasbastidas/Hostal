/**
 * This code validate the "input__persons-number"; this validation is
 * done throught a regular expression that allow enter only numbers,
 * besides it makes the field mandatory.
 */
const validationNumPerson = function() {
  if (!inputPersonsNumFormat.test(this.value)) {
    this.classList.add("error__style");
    personsNumberError.textContent = "El dato ingresado no es un número";
    return false;
  } else if (this.value === "") {
    this.classList.add("error__style");
    personsNumberError.textContent = "Todos los campos son obligatorios";
    return false;
  } else {
    this.classList.remove("error__style");
    personsNumberError.textContent = "";
    return false;
  }
};
let inputPersonsNumFormat = /^([0-9])*$/;
let personsNumEntered = document.getElementById("txtNumPeople");
let personsNumberError = document.getElementById("personsNumber-error");
personsNumEntered.addEventListener("blur", validationNumPerson);
personsNumEntered.addEventListener("input", validateButton);

/*
 * This code assign the calendar to "txtNumNigth" and gives it a date format.
 */

flatpickr("#txtNumNigth", {
  minDate: "today",
  mode: "range",
  dateFormat: "F, d, Y ",
  onChange: function(selectedDates) {
    let totalDays = Math.round(
      (selectedDates[1] - selectedDates[0]) / (1000 * 60 * 60 * 24)
    );
    document.getElementById("numNigth").value = totalDays;
    validateButton();
  },
  locale: "es"
});
function validateButton() {
  if (document.getElementById("numNigth").value && personsNumEntered.value  >= 1) {
    document.getElementById("btnCalculate").disabled = false;
  } else {
    document.getElementById("btnCalculate").disabled = true;
  }
}

/**
 * This code show or hide option "include guide for hike".
 */
document.getElementById("g1").style.display = "none";
let showGuideOption = document.getElementById("h1");
let guideOption = document.getElementById("g1");
const guideOptionValidation = showGuideOption => {
  if (guideOption.style.display === "block") {
    guideOption.style.display = "none";
  } else {
    guideOption.style.display = "block";
  }
};

// Qouting tool logic should be placed here.

// Remember to import consts.js if you will use this file

/* calculateCost calculates the value of the package that the user prefers
 * by giving a value of each one of the options selected by the user
 *
 * The expected objet structure is :
 * {
 *  numberOfPeople: integer,
 *  numberOfNigth: integer,
 *  trasnport: object,
 *  tour: object,
 *  food: object
 *  hike: object,
 * }
 *
 * trasnport: {
 *  medNec: boolean,
 *  necCap: boolean,
 *  capNec: boolean,
 *  necMed: boolean,
 * }
 * food{
 *   breakfast: boolean;
 *   dinner: boolean;
 * }
 * tour: {
 *  aguacatePlayasoledad: boolean,
 *  sapzurroLamiel: boolean,
 * }
 * hike: {
 *  elCieloEltrebol: boolean,
 *  elParaiso: boolean,
 *  laCoquerita: object,
 * }
 * laCoquerita: {
 *  hike: boolean,
 *  guide: boolean,
 * }
 */
/**
 * PeopleAndNigth It contains the number of people multiplied the number of
 * nights and then multiply the result by the heat of each night.
 */
function calculateCost(form) {
  let total = 0;
  let peopleAndNigth;
  peopleAndNigth = form.numberOfPeople * form.numberOfNigth;
  total += PRICENIGTH * peopleAndNigth;

  total += form.transport.medNec ? BUSTRANS * form.numberOfPeople : 0;
  total += form.transport.necCap ? BOATTRANS * form.numberOfPeople : 0;
  total += form.transport.capNec ? BOATTRANS * form.numberOfPeople : 0;
  total += form.transport.necMed ? BUSTRANS * form.numberOfPeople : 0;

  total += form.food.breakFast ? BREAKFAST * peopleAndNigth : 0;
  total += form.food.dinner ? DINNER * peopleAndNigth : 0;

  total += form.tour.aguacatePlayasoledad ? TOURAPS * form.numberOfPeople : 0;
  total += form.tour.sapzurroLamiel ? TOURSLM * form.numberOfPeople : 0;

  total += form.hike.elCieloEltrebol ? HIKEECET * form.numberOfPeople : 0;
  total += form.hike.elParaiso ? HIKEP * form.numberOfPeople : 0;
  if (form.hike.laCoquerita.hike) {
    total += HIKECO * form.numberOfPeople;
    if (form.hike.laCoquerita.guide) {
      total += HIKEGUI * form.numberOfPeople;
    }
  }
  total += INSURANCE * peopleAndNigth;
  return total;
}

/* call the elements of from */
const submitData = () => {
  cleanErrors();
  let form = {};
  form.transport = {};
  form.food = {};
  form.tour = {};
  form.hike = {};
  form.hike.laCoquerita = {};

  form.numberOfPeople = document.getElementById("txtNumPeople").value;
  form.numberOfNigth = document.getElementById("numNigth").value;

  form.transport.medNec = document.getElementById("ts1").checked;
  form.transport.necCap = document.getElementById("ts2").checked;
  form.transport.capNec = document.getElementById("ts3").checked;
  form.transport.necMed = document.getElementById("ts4").checked;

  form.food.breakFast = document.getElementById("f1").checked;
  form.food.dinner = document.getElementById("f2").checked;

  form.tour.sapzurroLamiel = document.getElementById("t1").checked;
  form.tour.aguacatePlayasoledad = document.getElementById("t2").checked;

  form.hike.elCieloEltrebol = document.getElementById("h1").checked;
  form.hike.elParaiso = document.getElementById("h2").checked;
  form.hike.laCoquerita.hike = document.getElementById("h3").checked;

  form.hike.laCoquerita.guide = document.getElementById("gu1").checked;

  //calculate error
  let errorList = validateData(form);
  // Sends the collected data to the calculateCost funtion
  let finalPrice = calculateCost(form);
  // Print the information whit the total cost
  document.getElementById("txtResult").innerHTML = finalPrice;

  if (errorList) {
    document.getElementById("txtErrors").appendChild(errorList);
  }
  showMessage();
};

// validate the opted data to verify the number of tours and nights.
const validateData = form => {
  var errors = [];
  if (form.numberOfNigth < getTrues(form.tour) + getTrues(form.hike)) {
    errors.push(
      "El número seleccionado de días es poco para la suma de tours y/o caminatas acumuladas, ten en cuenta que cada evento toma un día."
    );
  }

  if (errors.length > 0) {
    var errorsContainer = [];
    var divErrors = document.createElement("div");
    divErrors.classList.add("list-of-errors");
    var ulErrors = document.createElement("ul");
    for (const error of errors) {
      var liErrors = document.createElement("li");
      var textLi = document.createTextNode(error);
      liErrors.appendChild(textLi);
      ulErrors.appendChild(liErrors);
    }

    divErrors.appendChild(ulErrors);
  } else {
    divErrors = false;
  }
  return divErrors;
};

const getTrues = list => {
  const listValues = Object.values(list);
  let count = 0;
  for (let item of listValues) {
    if (typeof item == "object") {
      item = item.hike ? item.hike : item.tour;
    }
    if (item == true) {
      count += 1;
    }
  }
  return count;
};

const cleanErrors = () => {
  let errosDiv = document.getElementById("txtErrors");
  errosDiv.innerHTML = "";
};

let successMessage = document.getElementById("successMessage");

const showMessage = () => {
  successMessage.classList.remove('hide');
}

//when you give the button to quote calls the function to fill the data
let btncalculate = document.getElementById("btnCalculate");
btncalculate.addEventListener("click", submitData);
