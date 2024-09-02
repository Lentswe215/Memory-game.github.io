let clickedCard = null;
let preventClick = false;
let count = 0;
let isFirstClick = true;
let moves = 0;
let flipped = 0;
let colorsOfCards = [
  "red",
  "blue",
  "pink",
  "yellow",
  "purple",
  "green",
  "aqua",
  "orange",
];

let cards = [...document.querySelectorAll(".memory-card")];

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

  if (isFirstClick) {
    isFirstClick = false;
    StartClock();
  }
  if (
    preventClick ||
    target === clickedCard ||
    target.className.includes("done")
  ) {
    return;
  }
  target.className = target.className
    .replace("frontCard-hidden", "done")
    .trim();

  //   target.className += " ";

  if (!clickedCard) {
    clickedCard = target;
  } else if (clickedCard) {
    if (
      clickedCard.getAttribute("card-color") !==
      target.getAttribute("card-color")
    ) {
      preventClick = true;
      console.log("colors not match");
      setTimeout(() => {
        clickedCard.className = clickedCard.className
          .replace("done", "frontCard-hidden")
          .trim();
        target.className = target.className
          .replace("done", "frontCard-hidden")
          .trim();
        clickedCard = null;
        preventClick = false;
      }, 600);
    } else {
      clickedCard.className = clickedCard.className
        .replace("done", "flipped")
        .trim();
      target.className = target.className
        .replace("done", "flipped")
        .trim();
      clickedCard = null;
      count++;
      if (count == 8) {
        StopClock();
      }
    }
    moves++;

    $("#movesID").html(moves);
  }
}

$(function () {
  var currentYear = new Date().getFullYear();
  $("#footer-year").html(currentYear.toString());
});

var timeCount = 30;
var theTimer = null;
$("#timeID").html(timeCount);
function showTimer() {
  timeCount--;
  $("#timeID").html(timeCount);

  if (timeCount == 0) {
    StopClock();


    swal({
      title: "Game Over",
      html: true,
      text: "<h1>Hellpo workd</h1>"
    })
    // swal({
    //     text: 'Search for a movie. e.g. "La La Land".',
    //     content: "input",
    //     button: {
    //       text: "Search!",
    //       closeModal: false,
    //     },
    //   })
    //   .then(name => {
    //     if (!name) throw null;

    //     return fetch(`https://itunes.apple.com/search?term=${name}&entity=movie`);
    //   })
    //   .then(results => {
    //     return results.json();
    //   })
    //   .then(json => {
    //     const movie = json.results[0];

    //     if (!movie) {
    //       return swal("No movie was found!");
    //     }

    //     const name = movie.trackName;
    //     const imageURL = movie.artworkUrl100;

    //     swal({
    //       title: "Top result:",
    //       text: name,
    //       icon: imageURL,
    //     });
    //   })
    //   .catch(err => {
    //     if (err) {
    //       swal("Oh noes!", "The AJAX request failed!", "error");
    //     } else {
    //       swal.stopLoading();
    //       swal.close();
    //     }
    //   });
  }
}

function StartClock() {
  theTimer = setInterval(showTimer, 1000);
}

function StopClock() {
  $(".memory-card").addClass('inactive');
  $(".done").each((idx, item) => {
    $(item).removeClass("done");
    $(item).addClass("frontCard-hidden");
  })
  clearInterval(theTimer);
}
