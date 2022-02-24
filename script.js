var red_points = 0;
var blue_points = 0;

async function reset(){
    var response = await fetch("https://deckofcardsapi.com/api/deck/14ig0imkhdue/shuffle/?deck_count=1");
    var card_data = await response.json();

    //reset stats
    red_points = 0;
    blue_points = 0;
    document.getElementById("remaining").innerText = "Cards Remaining: " + card_data.remaining;
    document.getElementById("red_points").innerText = `${red_points}`
    document.getElementById("blue_points").innerText = `${blue_points}`
    document.getElementById("cards").innerHTML = `
    <div class="card_border br"></div>
    <div class="card_border br"></div>
    `
}

async function deal(){
    var response = await fetch("https://deckofcardsapi.com/api/deck/14ig0imkhdue/draw/?count=2");
    var card_data = await response.json();

    //tracks cards remaining
    document.getElementById("remaining").innerText = "Cards Remaining: " + card_data.remaining;

    //displays card images
    document.getElementById("cards").innerHTML = `
    <img id="red_card" class="br" src="${card_data.cards[0].image}">
    <img id="blue_card" class="br" src="${card_data.cards[1].image}">
    `

    //gives value to face cards
    for(var i=0; i<card_data.cards.length; i++){
        if(card_data.cards[i].value == "JACK"){
            card_data.cards[i].value = 11;
        }
        else if(card_data.cards[i].value == "QUEEN"){
            card_data.cards[i].value = 12;
        }
        else if(card_data.cards[i].value == "KING"){
            card_data.cards[i].value = 13;
        }
        else if(card_data.cards[i].value == "ACE"){
            card_data.cards[i].value = 14;
        }
    }

    //tracks score
    if(parseInt(card_data.cards[0].value) > parseInt(card_data.cards[1].value)){
        red_points += 1;
    }
    else if(parseInt(card_data.cards[0].value) < parseInt(card_data.cards[1].value)){
        blue_points += 1;
    }

    //displays score
    document.getElementById("red_points").innerText = `${red_points}`
    document.getElementById("blue_points").innerText = `${blue_points}`

    //end game prompt
    if (card_data.remaining == 0 && blue_points > red_points){
        setTimeout(function(){alert("Blue Wins!");},500);
        setTimeout(function(){reset();},1000);
    }
    else if(card_data.remaining == 0 && red_points > blue_points){
        setTimeout(function(){alert("Red Wins!");},500);
        setTimeout(function(){reset();},1000);
    }
    else if(card_data.remaining == 0 && red_points == blue_points){
        setTimeout(function(){alert("Tie!");},500);
        setTimeout(function(){reset();},1000);
    }
}