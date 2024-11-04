var deck = [];
var playersHand = [];
var computerHand = [];
var playPile = [];
var colours = [["R", "0"], ["B", "1080"], ["G", "720"], ["Y", "360"]];
var powerCards = [["Reverse", "2640"], ["Block", "2400"], ["+2", "2880"]];
var wildCards = [["anyColour", "0"], ["+4", "1440"]];
var specialCards = ["Reverse", "Block", "+2", "anyColour", "+4"];


function generateDeck() {
    for (let numberLoop = 0; numberLoop <= 9; numberLoop++) {
        if (numberLoop == 0) {
            for (let colourLoop = 0; colourLoop < colours.length; colourLoop++) {
                deck.push([colours[colourLoop][0],  String(numberLoop), String(0), colours[colourLoop][1]]);
            }
        } else {
            for (let colourLoop = 0; colourLoop < colours.length; colourLoop++){
                deck.push([colours[colourLoop][0], String(numberLoop), String(numberLoop * 240), colours[colourLoop][1]]);
                deck.push([colours[colourLoop][0], String(numberLoop), String(numberLoop * 240), colours[colourLoop][1]]);
            }
        }
    }

    for (let powerCardsLoop = 0; powerCardsLoop <= 2; powerCardsLoop++){
        for (let colourLoop = 0; colourLoop < colours.length; colourLoop++){
            deck.push([colours[colourLoop][0], powerCards[powerCardsLoop][0], powerCards[powerCardsLoop][1], colours[colourLoop][1]]);
            deck.push([colours[colourLoop][0], powerCards[powerCardsLoop][0], powerCards[powerCardsLoop][1], colours[colourLoop][1]]);
        }
    }

    
    for (let wildCardLoop = 0; wildCardLoop <= 1; wildCardLoop++){
        for (let cardLoop = 0; cardLoop <= 3; cardLoop++){
            deck.push(["Wild", wildCards[wildCardLoop][0], "3120", wildCards[wildCardLoop][1]]);
        }
    }
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

function deal() {
   shuffleArray(deck);
   let topCard = 0;
   for (let deckLoop = 0; playersHand.length <= 6; deckLoop++) {
    playersHand.push(deck.shift());
    computerHand.push(deck.shift());
   } 
   while (specialCards.includes(deck[topCard][1])) {
    topCard++;
   }
   playPile.push(deck[topCard]);
   deck.splice(topCard, 1);
}


generateDeck();
deal();
console.log(playersHand);
console.log(computerHand);
console.log(playPile);
console.log(deck.length);     