# Recap

In part one, we created a pinboard of cards with an image and some tags, that we could search or filter for. We also added the ability for a user to add a caerd to the collection, but if the user refreshed their browser, the newly added cards would disappear.

This is because we only fetched the JSON data on render in part one, and new data doesn't get stored anywhere. How do we store data?

## What we're going to build

One option is to create a database for this project, but that can get overly complex for the purposes of this excersise.
A better option for our use case is to save our new card data to localstorage instead.

The main feature we'll be focussing on is adding localStorage functionality to our project. We'll also add the ability to clear search results and show all our cards.

### What is local storage?

Local storage is a read-only way of storing data with no expiration date to the users web browser, using key-value pairs. This mean that your data will still be stored even after your browser is refreshed or closed.
This differs from sessionStorage, which loses data when the browser tab is closed.

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

## Using localStorage

- Check if there is existing data. If yes, load DOM with this content.
- When adding a new card, get initial data, if initial data is null (so doesn't exist yet), set to empty array.
- Add the new card entry to local storage within it's own key
- Push the new card data to the existing data array.
- Set the initial pins key equal to the array we just created.

  ### Adding some initial data to local storage

  ### Displaying

## Adding the clear search button

Add a button similar to the "Add a card" button, under the search bar. We'll keep the styling the same, you can customise this later. 

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
### Javascript:

```
  clearSearchButton.onclick = function () {
  appendData(cards);
  };
```

## What's next?

Can you add the ability to remove a card from local storage?
