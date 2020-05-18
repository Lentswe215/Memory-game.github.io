let clickedCard = null;
let preventClick = false;
let count = 0;

let colorsOfCards = [
    "red",
    "blue",
    "pink",
    "yellow",
    "purple",
    "green",
    "aqua",
    "orange"
];

let cards = [...document.querySelectorAll(".card")];

for (let color of colorsOfCards) {
    let cardAIndex = parseInt(Math.random() * cards.length);
    let cardA = cards[cardAIndex];
    cards.splice(cardAIndex, 1);
    cardA.className += ` ${color}`;
    cardA.setAttribute("card-color", color);

    let cardBIndex = parseInt(Math.random() * cards.length);
    let cardB = cards[cardBIndex];
    cards.splice(cardBIndex, 1);
    cardB.className += ` ${color}`;
    cardB.setAttribute("card-color", color);
}
function onCardClicked(event) {
    let currentCard = event.currentTarget;
console.log(currentCard)
    if (preventClick || currentCard === clickedCard || target.className.includes("flipped")){
        return;
    }
    
    currentCard.className = currentCard.className.replace("frontCard-hidden", "").trim();

    currentCard.className += " flipped";

    if (!clickedCard) {
        clickedCard = currentCard;
    } else if (clickedCard) {
        if (clickedCard.getAttribute("card-color") !== currentCard.getAttribute("card-color")) {
            preventClick = true;
            setTimeout(() => {
                clickedCard.className = clickedCard.className.replace("flipped", "").trim() + " frontCard-hidden";
                currentCard.className = currentCard.className.replace("flipped", "").trim() + " frontCard-hidden";
                clickedCard = null;
                preventClick = false;
            }, 1000);
        } else {
            clickedCard = null;
            count++;
        }
    }
    if (count == 8) {
        alert("Congrats You Won!!");
    }
}
