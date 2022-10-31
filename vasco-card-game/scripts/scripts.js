const div = document.querySelector(".card_container");
const image_list = [`1`,`2`,`3`,`4`,`5`,`6`,`7`]
let card_list = []
let image = 0
let selected_list = []
let card1 = ""
let card2 = ""
let played = 0
let order = 1
let clickCount = 0
let endCount = 0
let cards = 0
let time = 0;
let restart = ""

function randomizeList(){
    return Math.random() - 0.5;
}

function addCard(){
    cards = 
        Number(prompt("Quantas cartas você quer jogar? (entre 4 e 14, número par)"));
    let i = 0
    if (cards >= 4 && cards <= 14 && cards % 2 == 0){
        image_list.sort(randomizeList)
        while (i < cards){
            let card = 
                    `<div id="${Math.floor(order)}" onclick="turnCard(this)" class="parrot_card">
                        <img class="parrot_back" src="./assets/escudo.png">
                        <img class="parrot_front hidden" src="./assets/${image_list[Math.floor(image)]}.gif">
                    </div>`
            card_list.push(card)
            i++
            image += 0.5
            order++
        } 
    }else{
        return addCard()
    }
    card_list.sort(randomizeList)
    for (let i=0; i < card_list.length; i++){        
        div.innerHTML += card_list[i]
    }

}

function turnCard(parrot){

    if (clickCount % 2 == 0){
        parrot.classList.add("hidden")
        parrot.classList.add(`selected1`)
        selected_list.push(parrot)
    }else{
        parrot.classList.add("hidden")
        parrot.classList.add(`selected2`)
        selected_list.push(parrot)
    }

        clickCount ++
    checkCard()
}

function checkCard(){
    card1 = document.querySelector(".selected1")
    card2 = document.querySelector(".selected2")
    if(selected_list.length == 2 && card1.innerHTML !== card2.innerHTML){
        played += 1;
        div.classList.add("disable")
        setTimeout(() =>{
            card1.classList.remove("hidden")
            card2.classList.remove("hidden")
            card1.classList.remove("selected1")
            card2.classList.remove("selected2")
            div.classList.remove("disable")
        },1000)
        selected_list = []
    }else if (selected_list.length == 2 && card1.innerHTML === card2.innerHTML){
        played += 1;
        div.classList.add("disable")
        setTimeout(() =>{
            div.classList.remove("disable")
            card1.classList.remove("selected1")
            card2.classList.remove("selected2")
        }, 1000)
        endCount += 2
        selected_list = []
    }
    if (endCount === cards){
        endGame()
    }
}

function endGame(){
    setTimeout(() =>{
        alert(`Você ganhou em ${played} jogadas e em ${time} segundos!`)
        restartGame()
    }, 1500)
}

function restartGame(){
    restart = prompt("Você gostaria de reiniciar a partida? (sim ou não)")
    clearInterval(add)
    if (restart === "sim"){
        location.reload()
    }else if (restart === "não"){
        return;
    }else{
        return restartGame();
    }
}

function timeCount() {
    add = setInterval(timeProgression, 1000);

    function timeProgression() {
      time++;
      const div = document.querySelector(".time");
      div.innerHTML = time;
    }
}
