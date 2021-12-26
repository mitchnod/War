var player_points = 0;
var cp_points = 0;

async function reset(){
    var response = await fetch("https://deckofcardsapi.com/api/deck/d69pp227jhwv/shuffle/?deck_count=1");
    var card_data = await response.json();

    //reset stats
    player_points = 0;
    cp_points = 0;
    document.getElementById("remaining").innerText = "Cards Remaining: " + card_data.remaining;
    document.getElementById("player_points").innerText = `Your Points: ${player_points}`
    document.getElementById("cp_points").innerText = `Opponent Points: ${cp_points}`
    document.getElementById("cards").innerHTML = `
    <div class="card_border"></div>
    <div class="card_border"></div>
    `
}

async function deal(){
    var response = await fetch("https://deckofcardsapi.com/api/deck/d69pp227jhwv/draw/?count=2");
    var card_data = await response.json();

    //tracks cards remaining
    document.getElementById("remaining").innerText = "Cards Remaining: " + card_data.remaining;

    //displays card images
    document.getElementById("cards").innerHTML = `
    <img src="${card_data.cards[0].image}">
    <img src="${card_data.cards[1].image}">
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
    if(parseInt(card_data.cards[1].value) > parseInt(card_data.cards[0].value)){
        player_points += 1;
    }
    else if(parseInt(card_data.cards[0].value) > parseInt(card_data.cards[1].value)){
        cp_points += 1;
    }

    //displays score
    document.getElementById("player_points").innerText = `Your Points: ${player_points}`
    document.getElementById("cp_points").innerText = `Opponent Points: ${cp_points}`

    //end game prompt
    if (card_data.remaining == 0 && cp_points > player_points){
        setTimeout(function(){alert("You Lost!");},500);
        setTimeout(function(){reset();},1000);
    }
    else if(card_data.remaining == 0 && player_points > cp_points){
        setTimeout(function(){alert("You Won!");},500);
        setTimeout(function(){reset();},1000);
    }
    else if(card_data.remaining == 0 && player_points == cp_points){
        setTimeout(function(){alert("Tie!");},500);
        setTimeout(function(){reset();},1000);
    }
}