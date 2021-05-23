let nameEl = document.getElementById("name");
let name_errmsgEl = document.getElementById("name-errmsg");

let emailEl = document.getElementById("email");
let email_errmsgEl = document.getElementById("emailerrmsg");

let passwordEl = document.getElementById("password");
let password_errmsgEl = document.getElementById("passworderrmsg");

let dobEl = document.getElementById("dob");
let gendermaleEl = document.getElementById("genderMale");
let genderfemaleEl = document.getElementById("genderFemale");
let genderothersEl = document.getElementById("genderothers");

let myformEl = document.getElementById("my-form");

let formData = {
  name: "",
  email: "",
  password: "",
  dob: "",
  gender: "",
};

nameEl.addEventListener("change", function(event) {
  if (event.target.value === "") {
    name_errmsgEl.textContent = "Required*";
    console.log("hello")
  } else {
    name_errmsgEl.textContent = "";
  }
  formData.name = event.target.value;
});

emailEl.addEventListener('change', function(event) {
  if (event.target.value === "") {
    email_errmsgEl.textContent = "Required*";
  } else {
    email_errmsgEl.textContent = "";
  }
  formData.email = event.target.value;
});

passwordEl.addEventListener('change', function(event) {
  if (event.target.value === "") {
    password_errmsgEl.textContent = "Required*";
  } else {
    password_errmsgEl.textContent = "";
  }
  formData.password = event.target.value;
});

dobEl.addEventListener("change", function(event) {
  formData.dob = event.target.value;
});

gendermaleEl.addEventListener("change", function(event) {
  formData.gender = event.target.value;
});

genderfemaleEl.addEventListener("change", function(event) {
  formData.gender = event.target.value;
});

genderothersEl.addEventListener("change", function(event) {
  formData.gender = event.target.value;
});


function validateFormData(formData) {
  let {
    name,
    email,
    password
  } = formData;
  if (name === "") {
    name_errmsgEl.textContent = "Required*";
  }
  if (email === "") {
    email_errmsgEl.textContent = "Required*";
  }
  if (password === "") {
    password_errmsgEl.textContent = "Required";
  }
}

function submitFormData(formData) {
  let options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer a3d7d4811e4f275a8376615455cfaccd1f802159631bc7a2aa85a37520a9227e",
    },
    body: JSON.stringify(formData)
  };

  let url = "userdata.html";

  fetch(url, options)
    .then(function(response) {
      return response.json();
    })
    .then(function(jsonData) {
      console.log(jsonData);
      if (jsonData.code === 422) {
        if (jsonData.data[0].message === "has already been taken") {
          email_errmsgEl.textContent = "Email Already Exists";
        }
      }
    });
}

// function submitFormData(formData){
// localStorage.setItem('formData', JSON.stringify(formData));
// console.log(localStorage.getItem('formData'));
// }

myformEl.addEventListener("submit", function(event) {
  event.preventDefault();
  validateFormData(formData);
  submitFormData(formData);
});

// localStorage.setItem('formData', JSON.stringify(formData));
// console.log(localStorage.getItem('formData'));
