// var xCo_ordinate = '3120';
// var yCo_ordinate = '1440';
// var cardDiv = 'playerCards';
var deck = [];
var playersHand = [];
var computerHand = [];
var playPile = []; 
var colours = [["R", "0"], ["B", "1080"], ["G", "720"], ["Y", "360"]];
var powerCards = [["Reverse", "2640"], ["Block", "2400"], ["+2", "2880"]];
var wildCards = [["anyColour", "0"], ["+4", "1440"]];
var specialCards = ["Reverse", "Block", "+2", "anyColour", "+4"];
var playerTurn = true;
var computerTurn = false;

window.onload = function() {
    generateDeck();
    deal();
    displayHands();
    displayPlayCard();
}

while (!(playersHand.length == 0 || computerHand == 0)) {
    if (computerTurn) {
        
    }
}

// function addCard(xCo_ordinate, yCo_ordinate, targrtDiv, cardId){
function addCard(targetCard){
    
    fetch('resources/images/UNO_cards_deck.svg')
    .then(response => response.text())
    .then(svg => {
        document.getElementById('svg-container').innerHTML = svg;
        
            xCo_ordinate = targetCard[2];
            yCo_ordinate = targetCard[3];
            targrtDiv = "playerCards";
            cardId = targetCard[0] + '_' + targetCard[1];
            const svgElement = document.querySelector('#svg-container svg');
            svgElement.style.display = 'none';
            svgElement.setAttribute('viewBox',  xCo_ordinate + ' ' + yCo_ordinate + ' 241 360');
    
            const serializer = new XMLSerializer();
            const svgString = serializer.serializeToString(svgElement);
            const svgdataUrl = 'data:image/svg+xml;base64,' + btoa(svgString);
            let cardImg = document.createElement("img");
            cardImg.src = svgdataUrl;
            cardImg.id = cardId;
            cardImg.addEventListener('click', () => playCard(cardId));
            document.getElementById(targrtDiv).append(cardImg);
        })
        .catch(error => console.error('Error', error)
        );  
}

function generateDeck() {
    // Generate numbered cards
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
    // Generate power cards
    for (let powerCardsLoop = 0; powerCardsLoop <= 2; powerCardsLoop++){
        for (let colourLoop = 0; colourLoop < colours.length; colourLoop++){
            deck.push([colours[colourLoop][0], powerCards[powerCardsLoop][0], powerCards[powerCardsLoop][1], colours[colourLoop][1]]);
            deck.push([colours[colourLoop][0], powerCards[powerCardsLoop][0], powerCards[powerCardsLoop][1], colours[colourLoop][1]]);
        }
    }
    // Generate Wild cards
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

function displayHands() {
    for (let displayArray = 0; displayArray < playersHand.length; displayArray++) {
        // addCard(playersHand[displayArray][2], playersHand[displayArray][3], "playerCards", playersHand[displayArray][0] + '_' + playersHand[displayArray][1]);
        addCard(playersHand[displayArray]);
    }
    for (let displayArray = 0; displayArray < computerHand.length; displayArray++) {
        let cardImg = document.createElement('img');
        cardImg.src = "resources/images/UNO_back.png";
        document.getElementById('computerCards').append(cardImg);
    }
}

function displayPlayCard() {
    xCo_ordinate = playPile[playPile.length - 1][2];
    yCo_ordinate = playPile[playPile.length - 1][3];
    fetch('resources/images/UNO_cards_deck.svg')
    .then(response => response.text())
    .then(svg => {
        document.getElementById('svg-container').innerHTML = svg;

        const svgElement = document.querySelector('#svg-container svg');
        svgElement.style.display = 'none';
        svgElement.setAttribute('viewBox',  xCo_ordinate + ' ' + yCo_ordinate + ' 241 360');

        const serializer = new XMLSerializer();
        const svgString = serializer.serializeToString(svgElement);
        const svgdataUrl = 'data:image/svg+xml;base64,' + btoa(svgString);
         document.getElementById('playCard').src = svgdataUrl;
    })
    .catch(error => console.error('Error', error)
    ); 
}
 
function playCard(cardId) {
   if (playerTurn) {
        nextCard = 0;
        let newCardId = cardId.split('_');
        while (!(playersHand[nextCard][0] == newCardId[0] && playersHand[nextCard][1] == newCardId[1])) {
            nextCard++
        }
        if (playLogic(playersHand[nextCard], playPile[playPile.length - 1], cardId)) {
            document.getElementById('playCard').src = document.getElementById(cardId).src;
            document.getElementById(cardId).remove();
            playPile.push(playersHand[nextCard]);
            playersHand.splice(nextCard, 1);
            // switchTurn();
            // playerTurn = false;
            // computerTurn = true;
        }
   }

}

function playLogic(playedCard, pileCard, cardId) {
    if (playedCard[0] == pileCard[0] || playedCard[1] == pileCard[1]) {
        if (specialCards.includes(playedCard[1])) {
            switch (playedCard[1]) {
                case '+4':
                    pickUpCards(4);
                    keepTurn();
                    break;
                    
                case 'Block', 'Reverse':
                    keepTurn();
                    break;
                        
                case '+2':
                    pickUpCards(2);
                    keepTurn();
                    break;
                    
                case 'anyColour':
                    keepTurn();
            }
            return true;
        }
        return true;
    }
}

function switchTurn() {
    if (playerTurn) {
        playerTurn = false;
        computerTurn = true;
    }else {
        computerTurn = false;
        playerTurn = true;
    }
}
function keepTurn() {
    if (playerTurn) {
        playerTurn = true;
        computerTurn = false;
    }else {
        computerTurn = true;
        playerTurn = false;
    }
}

function pickUpCards(amount) {
    if (playerTurn) {
        for (let addLoop = 0; addLoop <= amount; addLoop++) {
            computerHand.push(deck.shift());
            let cardImg = document.createElement('img');
            cardImg.src = "resources/images/UNO_back.png";
            document.getElementById('computerCards').append(cardImg);
        }        
    }else {
        for (let addLoop = 0; addLoop <= amount; addLoop++) {
            addCard(deck[0]);
            playersHand.push(deck.shift());
        }
    }
}
