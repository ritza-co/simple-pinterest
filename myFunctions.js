var initialPins = [
  {
    id: 1,
    src:
      "https://mk0internationadm2x7.kinstacdn.com/wp-content/uploads/2018/10/ben-mullins-785443-unsplash-768x432.jpg",
    tags: ["headphones", "smile"],
  },
  {
    id: 2,
    src:
      "https://i.pinimg.com/originals/2a/65/f3/2a65f33890ff03e08954a76d0a3d1865.jpg",
    tags: ["headphones", "smile", "laptop"],
  },
  {
    id: 3,
    src:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfhYdIplE-UtslZHzzjdM5zJkCir1atAvgXg&usqp=CAU",
    tags: ["laptop", "focussed"],
  },
  {
    id: 4,
    src:
      "https://miro.medium.com/max/10368/1*QDuUtggUKQxKA0pg8iCsyA.jpeg",
    tags: ["laptop", "teamwork", "smile"],
  },
  {
    id: 5,
    src:
      "https://thegctv.com/wp-content/uploads/2018/11/BlackGirlsCode_main.jpg",
    tags: ["laptop", "teamwork"],
  },
  {
    id: 6,
    src: "https://i.ytimg.com/vi/Q6NiqRqGePU/maxresdefault.jpg",
    tags: ["laptop", "headphones", "focussed"],
  },
];

const cardContainer = document.querySelector("cardContainer");

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

function appendData(cards) {
  var cardContainer = document.getElementById("cardContainer");
  cardContainer.innerHTML = "";

  for (var i = 0; i < cards.length; i++) {
    const pin = cards[i];

    var card = document.createElement("div");
    card.className = "card";
    cardContainer.appendChild(card);

    var img = document.createElement("img");
    img.src = pin.src;
    card.appendChild(img);

    var tagContainer = document.createElement("div");
    tagContainer.className = "tagContainer";
    card.appendChild(tagContainer);

    const tagButtons = pin.tags.map((tag) => {
      const tagButton = document.createElement("button");
      tagButton.onclick = () => {
        const filteredCards = cards.filter((card) => {
          return (
            card.tags.find((cardTag) => {
              return cardTag.includes(tag);
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
var newCardButton = document.getElementById("newCardButton");

var newCardModal = document.getElementById("newCardModal");
newCardButton.onclick = function () {
  newCardModal.style.display = "block";
};
clearSearchButton.onclick = function () {
  appendData(cards);
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