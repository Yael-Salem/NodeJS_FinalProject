"use strict";

/* In this file we validate the user's information when they sign up to create an account then we send it to the backend and add it to the DB
a username is valid when: it contains no numbers and is made up of at least 2 letters 
a password is valid when: it's made up of only letters and number and is between 3-8 characters long
we also verify if the user provided the same password twice to confirm it */

/**
 *
 * @param {string} username
 * @param {string} password
 * @returns {boolean} True if both the username and password are valid and false otherwise
 */
function validateUsernameAndPass(username, password) {
  if (username.length < 2) return false;

  // Checking if the username has any numbers in it
  for (let i = 0; i < username.length; i++) {
    if (!isNaN(Number(username[i]))) return false;
  }

  if (password.length < 3 || password.length > 8) return false;

  // Array to contain special characters in which we can compare and check if they are found in the password
  let specialChars = ["@", "!", "$", "#", "%", "&", "*", "(", ")"];

  for (let i = 0; i < password.length; i++)
    if (specialChars.indexOf(password[i]) !== -1) return false;

  // If we got to this point then we know that both the username and password are valid
  return true;
}

/**
 * @param {string} password
 * @param {string} confirm
 * @returns {boolean} true if the password and confirmPass match and false otherwise
 */
function confimPass(password, confirm) {
  return password === confirm;
}

/**
 * @param {string} email
 * @returns {boolean} True if the email is valid and false otherwise
 */
function validateMail(email) {
  if (email.indexOf("@") === -1 || !email.endsWith(".com")) return false;

  return true;
}

// Function to display in case the user displays incorrect information
/**
 * @param {string} modalText
 * @returns {void} displays modal with the text provided
 */
function showModal(modalText) {}

/**
 * @param {string} username
 * @param {string} email
 * @param {string} password
 * @param {string} confirm
 * @returns {boolean} true if all the values provided by the user
 * (using the functions above to validate the email and passwords and validate(username, password) function from verify.js file to validate username and password)
 */
function validateUserInfo(username, email, password, confirm) {
  return (
    confimPass(password, confirm) &&
    validateMail(email) &&
    validateUsernameAndPass(username, password)
  );
}

/**
 * @param {string} email
 * @param {string} username
 * @param {string} password
 * @returns {void} sends the user's information to the backend to add it to the DB
 */
async function addToDb(email, username, password) {
  const response = await fetch("/html/signup.html", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email: email, name: username, password: password }),
  });

  if (!response.ok) {
    showModal("Internal server error please try again later");
  } else {
    console.log("Info added redirecting to log-in page");
    window.location.href = "../html/index.html";
  }
}

document.querySelector(".formSubmitBtn").addEventListener("click", () => {

  const username = document.getElementById("username").value.trim();

  const email = document.getElementById("email").value.trim();

  const password = document.getElementById("password").value.trim();
  const confirm = document.getElementById("confirmPassword").value.trim();

  if (validateUserInfo(username, email, password, confirm)) {
    addToDb(email, username, password);
  } else {
    showModal("Invalid information please try again");
  }
});
