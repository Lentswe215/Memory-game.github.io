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
function onCardClicked(e) {
    let target = e.currentTarget;

    if (preventClick || target === clickedCard || target.className.includes("done")) {
        return;
    }
    target.className = target.className.replace("frontCard-hidden", "").trim();

    target.className += " done";

    if (! clickedCard) {
        clickedCard = target;
    } else if (clickedCard) {
        if (clickedCard.getAttribute("card-color") !== target.getAttribute("card-color")) {
            preventClick = true;
            console.log("colors not match");
            setTimeout(() => {
                clickedCard.className = clickedCard.className.replace("done", "").trim() + " frontCard-hidden";
                target.className = target.className.replace("done", "").trim() + " frontCard-hidden";
                clickedCard = null;
                preventClick = false;
            }, 1000);
        } else {
            clickedCard = null;
            count++;
        }
    }
    if (count == 8) {
        alert("You Won!!!");
    }
}
