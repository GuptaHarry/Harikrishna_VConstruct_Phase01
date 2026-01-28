const products = [
  {
    id: "P101",
    name: "Wireless Headphones",
    price: 2999,
    category: "Electronics",
    image: "headphones.jpg",
  },
  {
    id: "P102",
    name: "Smart Watch",
    price: 4999,
    category: "Electronics",
    image: "smartwatch.jpg",
  },
  {
    id: "P103",
    name: "Running Shoes",
    price: 1999,
    category: "Footwear",
    image: "shoes.jpg",
  },
  {
    id: "P104",
    name: "Backpack",
    price: 1499,
    category: "Accessories",
    image: "backpack.jpg",
  },
  {
    id: "P105",
    name: "Bluetooth Speaker",
    price: 2499,
    category: "Electronics",
    image: "speaker.jpg",
  },
  {
    id: "P106",
    name: "Laptop Stand",
    price: 999,
    category: "Accessories",
    image: "laptop-stand.jpg",
  },
];

// Demonstrated two ways of rendering the data
// 1. Products Array and then creating HTML markup
// 2. already have ready-to-made HTML elements.
function displayItemsManually(arr, container) {
  arr.forEach((item) => {
    const itemDiv = document.createElement("div");
    itemDiv.className = "item";
    itemDiv.setAttribute("value", item.id);

    itemDiv.textContent = `Product ID : ${item.id} 
      Name : ${item.name}
      Price : ${item.price} $ 
      Cateogry : ${item.category}
      `;
    container.appendChild(itemDiv);
  });
}

function displayItemsDirectly(arr, container) {
  container.innerHTML = "";
  arr.forEach((item) => {
    container.appendChild(item);
  });
}

// local storage
function loadProducts() {
  const data = JSON.parse(localStorage.getItem("recentlyViewedItems"));
  return Array.isArray(data) ? data : []; // JSON returs null if didnt find the data.
}

function saveProducts(recentlyViewedItems) {
  const data = recentlyViewedItems.map((item) => ({
    id: item.getAttribute("value"), // for the id
    text: item.textContent,
  }));
  localStorage.setItem("recentlyViewedItems", JSON.stringify(data));
}

// session storage
function loadSessionData() {
  try {
    const data = JSON.parse(sessionStorage.getItem("sessionMeta"));
    return (
      data || {
        viewedCount: 0,
        lastViewedId: null,
      }
    );
  } catch {
    return {
      viewedCount: 0,
      lastViewedId: null,
    };
  }
}

function saveSessionData(sessionData) {
  sessionStorage.setItem("sessionMeta", JSON.stringify(sessionData));
}

// intialise the sessionData as page loads.
let sessionData = loadSessionData();
saveSessionData(sessionData);



const messageBox = document.getElementById("message");

function showMessage(msg){
  messageBox.textContent = msg;
  messageBox.style.display = "block";

  setTimeout(() => {
    messageBox.style.display = "none";
  }, 2000);   // 2 seconds
}


// all - items - container
const allItemsContainer = document.getElementById("all-items-list");
displayItemsManually(products, allItemsContainer); //  because we are rendering it first time .

// recently - viewed - container
const recentlyViewedItems = [];
const recentItemsContainer = document.getElementById("recent-items-list");

const alreadyStoredItems = loadProducts();
// create the HTML markup
alreadyStoredItems.forEach((item) => {
  const div = document.createElement("div");
  div.className = "item";
  div.setAttribute("value", item.id);
  div.textContent = item.text;
  recentlyViewedItems.push(div);
});
// call directly
displayItemsDirectly(recentlyViewedItems, recentItemsContainer);

allItemsContainer.addEventListener("click", (e) => {
  // event bubbling.
  const selectedItem = e.target.closest(".item"); // if clicked on the textContent still we can get the targeted Div.
  if (!selectedItem) return;

  const selectedId = selectedItem.getAttribute("value");

  // duplicate check
  const alreadyPresent = recentlyViewedItems.some(
    (item) => item.getAttribute("value") === selectedId,
  );

  if (alreadyPresent) {

		// method -1 to notify
    /*
		alert("Cannnot View already viewed items ");
    return;
		*/


		// method -2 to notify => dynamic dom updation 
   showMessage("Item already viewed!");
   return;

  }

  // creation of new element.
  const newDiv = document.createElement("div");
  newDiv.className = "item";
  newDiv.setAttribute("value", selectedId);
  newDiv.textContent = selectedItem.textContent;

  // Most Efficient logic for recent 5
  /*
	Time complexity is constant for your fixed size (5)
  No extra arrays are created
  No memory waste
  */
  if (recentlyViewedItems.length < 5)
    recentlyViewedItems.push(newDiv); // less than 5 pop from back.
  else {
    recentlyViewedItems.shift(); // more than 5 remove from start.
    recentlyViewedItems.push(newDiv);
  }

  // Less Efficient Logic
  // storing and using slice for recent 5 . bcz returns new array.

  // Most Efficient Logic for DOM
  // const newDiv = selectedItem.cloneNode(true);
  //It copies structure blindly
  // Might copy unwanted states

  // update DOM
  recentItemsContainer.innerHTML = ""; // clear all otherwise it will form stacked appearance.
  displayItemsDirectly(recentlyViewedItems, recentItemsContainer); // passing bcz we have already built the HTML part only rendering required.

  sessionData.viewedCount += 1;
  sessionData.lastViewedId = selectedId;
  saveSessionData(sessionData);
  saveProducts(recentlyViewedItems);
	showMessage("Item added to Recently Viewed!");

});
