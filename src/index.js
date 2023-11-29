const cards = [
  { name: "aquaman", img: "aquaman.jpg" },
  { name: "batman", img: "batman.jpg" },
  { name: "captain america", img: "captain-america.jpg" },
  { name: "fantastic four", img: "fantastic-four.jpg" },
  { name: "flash", img: "flash.jpg" },
  { name: "green arrow", img: "green-arrow.jpg" },
  { name: "green lantern", img: "green-lantern.jpg" },
  { name: "ironman", img: "ironman.jpg" },
  { name: "spiderman", img: "spiderman.jpg" },
  { name: "superman", img: "superman.jpg" },
  { name: "the avengers", img: "the-avengers.jpg" },
  { name: "thor", img: "thor.jpg" },
  { name: "aquaman", img: "aquaman.jpg" },
  { name: "batman", img: "batman.jpg" },
  { name: "captain america", img: "captain-america.jpg" },
  { name: "fantastic four", img: "fantastic-four.jpg" },
  { name: "flash", img: "flash.jpg" },
  { name: "green arrow", img: "green-arrow.jpg" },
  { name: "green lantern", img: "green-lantern.jpg" },
  { name: "ironman", img: "ironman.jpg" },
  { name: "spiderman", img: "spiderman.jpg" },
  { name: "superman", img: "superman.jpg" },
  { name: "the avengers", img: "the-avengers.jpg" },
  { name: "thor", img: "thor.jpg" },
];

const memoryGame = new MemoryGame(cards);
let cardLock = false;
memoryGame.shuffleCards();
console.log(memoryGame.cards);

window.addEventListener("load", (event) => {
  let html = "";
  memoryGame.cards.forEach((pic) => {
    html += `
      <div class="card" data-card-name="${pic.name}">
        <div class="back" name="${pic.img}"></div>
        <div class="front" style="background: url(img/${pic.img}) no-repeat"></div>
      </div>
    `;
  });

  // Add all the divs to the HTML
  document.querySelector("#memory-board").innerHTML = html;

  // Bind the click event of each element to a function
  document.querySelectorAll(".card").forEach((card) => {
    card.addEventListener("click", () => {
      // TODO: write some code here
      console.log(`Card clicked: ${card}`);

      if (memoryGame.pickedCards.length < 2) {
        card.classList.add("turned");
        memoryGame.pickedCards.push(card);
      } //added locking condition to ensure this function only runs once until array is cleared
      if (memoryGame.pickedCards.length === 2 && cardLock === false) {
        cardLock = true;
        let isPair = memoryGame.checkIfPair(
          memoryGame.pickedCards[0].dataset.cardName,
          memoryGame.pickedCards[1].dataset.cardName
        );
        if (isPair) {
          memoryGame.pickedCards[0].classList.add("blocked");
          memoryGame.pickedCards[1].classList.add("blocked");
        } else {
          setTimeout(() => {
            memoryGame.pickedCards[0].classList.remove("turned");
            memoryGame.pickedCards[1].classList.remove("turned");
          }, 1000);
        }
        setTimeout(() => {
          memoryGame.pickedCards.splice(0, 2);
          cardLock = false;
        }, 1000);
        document.querySelector(
          "#pairs-clicked"
        ).innerText = `${memoryGame.pairsClicked}`;
        document.querySelector(
          "#pairs-guessed"
        ).innerText = `${memoryGame.pairsGuessed}`;
        if (memoryGame.checkIfFinished()) {
          setTimeout(
            () =>
              alert(
                `YOU WON! You found all pairs in ${memoryGame.pairsClicked} guesses!`
              ),
            2000
          );
        }
      }

      //if statement: if picked cards.length is less than 2 we can turn the card
      //on click we should add card to picked cards array
      //once second card is picked - timeout function until they are turned back over
      //if they match -> leave them turned over but call function to add points and clear out array
      //if they dont match -> clear array and turn cards back over

      //
    });
  });
});
