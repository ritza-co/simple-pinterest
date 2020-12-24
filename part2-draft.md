# Recap

In part one, we created a pinboard of cards with an image and some tags, that we could search or filter according to their tag categories. We also added the ability for a user to add a card to the collection. We reccomend that you work through [this](https://repl.it/@ritza/inspiration-board) tutorial first, if you haven't already. After you finished part one, you might have noticed however, that should the user have refreshed their browser, the newly added cards would disappear.

This is because we only fetched the JSON data on render in part one, and the new card data doesn't get stored anywhere. 

## What we're going to build

One option of storing our data would be to create a simple database for this project. For such a small data set however, that can get overly complex. 
Another option is to use local- or sessionStorage to store a small amount of data within our browser. For our use case, the  [localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage) property would be ideal. 

The main feature we'll be focussing on for part 2 of this project, is adding and fetching data from localStorage. Secondly, we'll also add the ability to clear previous search results and reset our landing page to show all cards.

### What is localStorage?

The localStorage property is a read-only way of storing data with *no expiration date* to the users web browser, using key-value pairs. This allows your data to be stored after your browser is refreshed or closed.
This differs from sessionStorage, which saves data for the users current session, but clears the data when the browser tab is closed.

To SAVE data to localStorage:

```
  localStorage.setItem("key", "value");
```

To GET data from localStorage:

```
  localStorage.getItem("key");
```

To REMOVE data from localStorage:

```
  localStorage.removeItem("key");
```

## Extracting the javascript to a new file

Thus far, we've been coding our javascript within a script tag at the bottom of our HTML file. 
While this is perfectly acceptable, the file can become very large and tedious to work with. 

An easy way to mitigate this, is to extract the javascript code into a separate file (we'll call it muFunctions.js), and link to it at the end of your HTML file, like this:

```
  <script src="myFunctions.js"></script>
```

## Using localStorage

To load our landing page with our existing collection of cards, we need to add our initial JSON data to localStorage. 
LocalStorage only supports strings as values, so data that we get from localStorage would be in string format, and data that we save to localStorage, need to be in string format. 
We can get around this by using `JSON.stringify()` to convert a data array to a string, and `JSON.parse()` to convert the contents of localStorage back to our original format. 

Add an eventListener to check if there is existing data on page load. In the case that no data has been stored on localStorage before, `localStorage.getItem("initialPins")` will be equal to null. 

Then, within our if statement, check `if (localStorage.getItem("initialPins") === null)` and set the initial data on localStorage with `localStorage.setItem("initialPins", JSON.stringify(initialPins))`.

If data already exists on localStorage, get the initial data from localStorage and display the cards accordingly by using `appendData(cards)`. 

Add this function at the top of your `script.js` file, below your data array. 

```
  document.addEventListener("DOMContentLoaded", function (event) {
  if (localStorage.getItem("initialPins") === null) {
    localStorage.setItem("initialPins", JSON.stringify(initialPins))
    cards = JSON.parse(localStorage.getItem("initialPins"));
    appendData(cards);
  } else {
    cards = JSON.parse(localStorage.getItem("initialPins"));
    appendData(cards);
  }
});
```
When adding a card, we need to get the initial data from localStorage, if any.
Set the result equal to an `existingPins` variable that we'll use later. 
In the case that we have no initial data, this variable would return "null". In order to add data to localStorage later, we'll need to set the `existingPins` variable to an empty array.
Add this to the top of your `saveNewCard()` function:

```
  var existingPins = JSON.parse(localStorage.getItem("initialPins"));
    if (existingPins == null) {
      existingPins = [];
    }
```
When adding a new card entry, we'll first need to stringify and add the new card to localStorage. To add it to the existingPins array, we'll use the `.push()` method. 
Add these two lines at the end of the `saveNewCard()` function. 

```
  localStorage.setItem("newCard", JSON.stringify(newCard));
  existingPins.push(newCard);
```
The last step is to append the existingPins array to our main array called initialPins, in order to add our new card to the main array that will be rendered on page load. 

```
  localStorage.setItem("initialPins", JSON.stringify(existingPins));
```

Finally, our saveNewCard() function would look like this:

```
  function saveNewCard() {
    var existingPins = JSON.parse(localStorage.getItem("initialPins"));
    if (existingPins == null) {
      existingPins = [];
    }
    var newImgSrc = document.getElementById("imgsrc").value;
    var newTags = document.getElementById("tags").value.split(";");
    var lastCardId = cards[cards.length - 1].id;

    var newCard = {
      id: lastCardId + 1,
      src: newImgSrc,
      tags: newTags,
    };
    cards = [...cards, newCard];
    appendData(cards);
    localStorage.setItem("newCard", JSON.stringify(newCard));
    // Save all entries to local storage
    existingPins.push(newCard);
    localStorage.setItem("initialPins", JSON.stringify(existingPins));
    newCardModal.style.display = "none";
  }
```

## Adding the clear search button

Add a button similar to the "Add a card" button from part 1, under the search bar. For now, we'll use the same styling as for the "Add a card" button. 

### HTML: 

```
  <button id="clearSearchButton" class="clearSearchButton">Clear Search</button>
```

### CSS:
```
  .clearSearchButton {
    font-family: "Montserrat", sans-serif;
    font-size: large;
    margin: 0 0.2rem;
  }
```

Next, we'll need to add an `onClick()` function to the new button, specifying that we want to append and display all the available cards in our data array. Add this function to your `script.js` file, somewhere below the `saveCard()` function. 

### Javascript:

```
  clearSearchButton.onclick = function () {
  appendData(cards);
  };
```
So in effect, to "clear" our filtered or searched items, we are setting our displayed data back to it's original state.

## What's next?

In this tutorial, we did not build any functionality that will allow a user to remove a card from the collection. 

To do this, you will need to build a button that gets populated on each card, with an `onClick()` function that will remove the card from local storage. 
