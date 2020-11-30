# Introduction

## What we're going to build
The goal of this project it to create a "pinboard" of images that you can collect, categorise with tags and reflect on later.

You will be able to create new cards with custom tags, and then filter tags via the search bar or by clicking on a tag.

Before we jump into the code, let's start by creating a wireframe to plan the layout and functionality of our project.

![Landing page displaying cards with images and tags.](./wireframe.png)

This will be a single-page website with a header, a search bar and an "add card" button.

Some initial card data is stored in a .json file, which will be displayed by default. Each card has a unique image url, as well as custom, user generated tags. Clicking on a tag should filter through all the cards to display only the cards that contain the same tag. Using the search bar should also filter through the tags and display only the relevant cards.

To add a new card, a modal will pop up wich will allow the user to enter an image url and custom tags.

![Popup modal with a form which allows a user to create new cards.](./modal-wireframe.png)

HTML basics
We'll start off with a basic HTML skeleton, hard-coding the elements in our wireframe, which we are going to populate with data later on in this tutorial. You may find it useful to start adding your class names to each element, since we'll need this later when adding our styling. 

```
<html>
  <head>
    <meta charset="utf-8" />
    <title>My Moodboard</title>
  </head>

  <body>
    <h1 class="header">My Moodboard</h1>
    <div class="searchContainer">
      <label class="searchLabel">search</label>
      <input
        class="searchInput"
      />
      <p class="searchResult"></p>
      <button class="newCardButton">Add a card</button>
    </div>
    <div class="cardContainer">
      <div class="card">
        <img/>
        <div class="tagContainer">
          <button class="tagButton">
            tagButton
          </button>
        </div>
      </div>
    </div>
    <div class="modal">
      <div class="modal-content">
        <span class="close">&times;</span>
        <form>
          <label>Image source</label>
          <input
            class="newCardInput"
          />
          <label>Tags</label>
          <input
            class="newCardInput"
          />
          <button class="submitButton">
            Submit
          </button>
        </form>
      </div>
    </div>
  </body>
</html>
```

After writing our initial html, we need to start adding some styling to make it pretty and add some interactivity such as hover animations. 
You could copy the styling from [this CSS file](https://github.com/ritza-co/simple-pinterest/blob/main/style.css), but it's encouraged to make this project your own, so don't be shy to customise the layout, colors and animations to make it your own. 

## Adding styling

Create a new file called `style.css`, which will contain all of your styling code. 
Remember to link it within the <head /> of your `index.html` file: 
`<link rel="stylesheet" href="style.css" />`


Here are a few ideas to get you started. 
Remember that you can select an element directly, for example:

```h1 {
  font-size: 4rem;
  text-align: center;
  font-family: "Bungee Shade", cursive;
  color: #fc47bb;
  text-shadow: 0 0 5px #fc47bb;
}
```

Alternatively, selecting an element by its class name:
```.submitButton {
  width: 100%;
  background-color: #fc47bb;
  color: white;
  padding: 14px 20px;
  margin: 8px 0;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
```

Add animations by using pseudo-selectors such as :hover, as shown in this example:

```.submitButton :hover {
  background-color: #b92985;
}
```

[Google Fonts](https://fonts.google.com/) is a great resource for typography. Simply select the font you'd like to use, copy the link and paste it below your stylesheet within the  <head/>. You will then be able to use the font within your CSS file like this:
  `font-family: "Bungee Shade", cursive;`

## Writing data to your HTML

Ideally, we'd like to dynamically populate our front-end with some data. We can do this by using the Javascript fetch() function to fetch the array in our `pins.json` file. 


## Javascript 

```<script>
      const cardContainer = document.querySelector("cardContainer");
      let cards = [];
      fetch("pins.json")
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          cards = data;
          appendData(cards);
        })
        .catch(function (err) {
          console.log(err);
        });

      function appendData(data) {
        var cardContainer = document.getElementById("cardContainer");
        cardContainer.innerHTML = "";

        for (var i = 0; i < data.length; i++) {
          var card = document.createElement("div");
          card.className = "card";
          cardContainer.appendChild(card);

          var img = document.createElement("img");
          img.src = data[i].src;
          card.appendChild(img);

          var tagContainer = document.createElement("div");
          tagContainer.className = "tagContainer";
          card.appendChild(tagContainer);
          const tagButtons = data[i].tags.map((tag) => {
            const tagButton = document.createElement("button");
            tagButton.onclick = () => {
              const filteredCards = cards.filter((card) => {
                return (
                  card.tags.find((tag) => {
                    return tag.includes(tagButton.innerHTML);
                  }) !== undefined
                );
              });
              appendData(filteredCards);
            };
            tagButton.innerHTML = tag;
            return tagButton;
          });
          for (const tagButton of tagButtons) {
            tagButton.className = "tagButton";
            tagContainer.appendChild(tagButton);
          }
        }
      }
      function filterTags() {
        var searchTerm = document.getElementById("searchInput").value;
        document.getElementById("searchResult").innerHTML =
          "You searched for: " + searchTerm;
        const searchTermLower = searchTerm.toLowerCase();
        const filteredCards = cards.filter((card) => {
          return (
            card.tags.find((tag) => {
              const tagLower = tag.toLowerCase();
              return tagLower.includes(searchTermLower);
            }) !== undefined
          );
        });
        appendData(filteredCards);
      }
      function saveNewCard() {
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
        newCardModal.style.display = "none";
      }
      var newCardButton = document.getElementById("newCardButton");

      var newCardModal = document.getElementById("newCardModal");
      newCardButton.onclick = function () {
        newCardModal.style.display = "block";
      };

      var closeModal = document.getElementsByClassName("close")[0];
      closeModal.onclick = function () {
        newCardModal.style.display = "none";
      };
      window.onclick = function (event) {
        if (event.target == newCardModal) {
          newCardModal.style.display = "none";
        }
      };
    </script>
    ```

### Additional reasources

Google Fonts: https://fonts.google.com/

