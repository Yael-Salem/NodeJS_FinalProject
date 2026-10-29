"use strict";

/* In this file we request and recieve the list of characters found within the DB
    with the option to let the user add his own character */

async function getGameData() {
  try {
    const response = await fetch("/html/characters");

    if (!response.ok) {
      console.log("Error getting list");
      return [];
    } else {
      return await response.json();
    }
  } catch (err) {
    console.log(err);
  }
}

// Array of characters and items we get from the backend
let charArr = [];
let itemArr = [];

(async () => {
  const gameData = await getGameData();

  charArr = gameData.characters;
  itemArr = gameData.items;

  buildCharList(charArr);
  buildItemList(itemArr);
})();

const listElem = document.querySelector(".charList");

const itemList = document.querySelector(".itemList");

/**
 * @param {Array[Object]} charArr
 * @returns {void} builds the list of characters with all the relavent info
 */
function buildCharList(charArr) {
  // Resetting list content
  listElem.innerHTML = "";

  charArr.map((elem, index) => {
    const li = document.createElement("li");

    li.setAttribute("data-id", elem.id);

    li.innerHTML = `<div class="listElem">
    <h2>${elem.name}</h2>
    <h3>Strength: ${elem.strength}</h3>
    <p>${elem.description}</p>
    <button class="deleteBtn">Delete</button>
    </div>`;

    listElem.append(li);
  });
}

function buildItemList(itemArr) {
  // Resetting list content
  itemList.innerHTML = "";

  itemArr.map((elem, index) => {
    const li = document.createElement("li");

    li.setAttribute("data-id", elem.id);

    li.innerHTML = `<div class="listElem">
    <h2>${elem.name}</h2>
    <p>${elem.description}</p>
    </div>`;

    itemList.append(li);
  });
}

/**
 * @param {string} charName
 * @param {number} strength
 * @param {string} description
 * @returns {void} adds character to DB/Array and updates the list
 */
async function addCharToList(charName, strength, description) {
  const response = await fetch("/html/characters", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: charName,
      strength: strength,
      description: description,
    }),
  });

  if (!response.ok) {
    console.log("Error adding to DB");
  } else {
    console.log("Character added refreshing list");
    const data = await getGameData();

    charArr = data.characters;
    itemArr = data.items;

    buildCharList(charArr);
    buildItemList(itemArr);
  }
}

// Adding a new character whenever the user submits the form
document.querySelector(".formSubmitBtn").addEventListener("click", () => {
  const charName = document.getElementById("charName");
  const charStrength = document.getElementById("charStrength");
  const charDescription = document.getElementById("charDescription");
  addCharToList(
    charName.value.trim(),
    charStrength.value.trim(),
    charDescription.value.trim(),
  );

  charName.value = "";
  charStrength.value = "";
  charDescription.value = "";
});

// Function to delete character from list
async function deleteCharacter(idToDelete) {
  const response = await fetch("/html/characters/" + idToDelete, {
    method: "DELETE",
  });

  if (!response.ok) {
    console.log("Error deleting from DB");
  } else {
    console.log("Character deleted, refreshing list");
    const data = await getGameData();

    charArr = data.characters;
    itemArr = data.items;

    buildCharList(charArr);
    buildItemList(itemArr);
  }
}
// Deleting a character when the user clicks the delete button
listElem.addEventListener("click", (e) => {
  e.preventDefault();

  if (e.target && e.target.classList.contains("deleteBtn")) {
    const charId = e.target.closest("li").getAttribute("data-id");

    deleteCharacter(charId);
  }
});

