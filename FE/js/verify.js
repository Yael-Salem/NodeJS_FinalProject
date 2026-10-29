"use strict";

/* In this file we validate the log in information provided by the user before sending it to the backend 
A username is valid when: it has at least 2 letters and its made of only letters
 A password is valid when: it is made up of only letters and numbers and it's length is between 3-8 letters/numbers */

// Function to validate user's log in information
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
 * @param {string} modalText
 * @returns {void} displays modal with the text provided
 */
function showModal(modalText) {
  const modal = document.querySelector(".errorModal");

  const modalContent = document.querySelector(".modalContent");
  document.body.style.overflow = "hidden";

  modal.style.display = "block";

  modalContent.innerHTML = `<h2>An error occured</h2>
        <p>${modalText}</p>
        <button class="closeModal">Ok</button>`;

  // Closing the modal once the user click the okay button
  document.querySelector(".closeModal").addEventListener("click", () => {
    modal.style.display = "none";
    document.body.style.overflow = "auto";
  });
}
/**
 * @param {string} username
 * @param {string} password
 * @returns {void} sends the information to the back end for authentication
 */
async function authUserInfo(username, password) {
  try {
    const response = await fetch("/html/index.html", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: username, password: password }),
    });

    if (!response.ok) {
      if (response.status === 404) {
        showModal(
          "Username not found please sign up if you have do not have an account",
        );
        console.log("Invalid info");
      }
    } else {
      console.log("Valid info redirecting....");
      window.location.href = "../html/home.html";
    }
  } catch (err) {
    console.log(err);
  }
}

// Validating log in information
document.querySelector(".formSubmitBtn").addEventListener("click", () => {
  console.log("in eventlistener");

  const username = document.getElementById("username").value.trim();

  const password = document.getElementById("password").value.trim();

  if (validateUsernameAndPass(username, password)) {
    authUserInfo(username, password);
  } else {
    showModal("Invalid information please double-check and try again");
  }
});
