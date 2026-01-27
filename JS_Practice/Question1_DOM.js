const form = document.getElementById("registerForm");



function isUsernameValid(value) {
                                          // Only letters, minimum 3 characters
  const usernameRegex = /^[A-Za-z]{3,}$/; 
  return usernameRegex.test(value);
}

function isEmailValid(value) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(value);
}

function validatePassword(value) {

    // implementation of Password Policy 
  const rules = {
    lower: /[a-z]/.test(value),
    upper: /[A-Z]/.test(value),
    number: /[0-9]/.test(value),
    special: /[^A-Za-z0-9]/.test(value),
    length: value.length >= 8
  };
                                       
  updateRuleUI("lower", rules.lower);       // here automatically the function are called for the return values.
  updateRuleUI("upper", rules.upper);
  updateRuleUI("number", rules.number);
  updateRuleUI("special", rules.special);
  updateRuleUI("length", rules.length); 
  
  const resultAfterChange = Object.values(rules); // gives us array of[ true , false , true , false]. etc
  // check if all true are present otherwise fasle.

  return resultAfterChange.every(Boolean);
}

function updateRuleUI(id, isValid) {
  const el = document.getElementById(id);
  const text = el.textContent.slice(2); // remove tick or cross.

  if (isValid) {
    el.textContent = "✔ " + text;
    el.className = "valid-rule";
  } else {
    el.textContent = "❌ " + text;
    el.className = "invalid-rule";
  }
}


// main function of validation

function validateInput(input) {
  const value = input.value.trim();
  const group = input.parentElement;
  let valid = false;

  if (input.name === "username") {
    valid = isUsernameValid(value);
  }

  if (input.name === "email") {
    valid = isEmailValid(value);
  }

  if (input.name === "password") {
    valid = validatePassword(value);
  }

  if (valid) {
    group.classList.remove("invalid");
    group.classList.add("valid");
  } else {
    group.classList.remove("valid");
    group.classList.add("invalid");
  }

  return valid;
}

// Vlaidation for every real-time Change using event bubbling . 

form.addEventListener("input", (event) => {
  const element = event.target;
  if (element.tagName === "INPUT") {
    validateInput(element);
  }
});

// validation for on submitting the change

form.addEventListener("submit", (event) => {
  const inputs = form.querySelectorAll("input");
  let formIsValid = true;

  inputs.forEach(input => {
    if (!validateInput(input)) {
      formIsValid = false;
    }
  });

  if (!formIsValid) {
    event.preventDefault();   // default browser is to refresh page once submitted , to avoid that we can use preventDefault.
    alert("Please fix the errors before submitting.");
  } else {
    alert("Form submitted successfully!");
  }
});
