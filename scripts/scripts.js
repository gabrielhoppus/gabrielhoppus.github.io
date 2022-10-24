const div = document.querySelector(".card_container");
let image_list = [`1`,`2`,`3`,`4`,`5`,`6`,`7`]
let card_list = []
let image = 0
let selected_list = []
let first_card = ""
let second_card = ""
let played_count = 0
let card_order = 1
let click_count = 0
let end_counter = 0
let card_quantity = 0
let time_counter = 0;

function randomizeList(){
    //função para randomizar os elementos do jogo
    return Math.random() - 0.5;
}

function addCard(){
    /*Função que adiciona a quantidade de cartas ao jogo
    1. Pede um número
    2. Embaralha as imagens das cartas
    3. Cria a div com a imagem criada, de duas em duas imagens e adiciona isso a uma lista
    4. Embaralha as cartas e coloca no campo*/

    card_quantity = 
        Number(prompt("Quantas cartas você quer jogar? (entre 4 e 14, número par)"));
    let i = 0
    if (card_quantity >= 4 && card_quantity <= 14 && card_quantity % 2 == 0){
        image_list.sort(randomizeList)
        while (i < card_quantity){
            let card = 
                    `<div id="${Math.floor(card_order)}" onclick="turnCard(this)" class="parrot_card">
                        <img class="parrot_back" src="./assets/back.png">
                        <img class="parrot_front hidden" src="./assets/${image_list[Math.floor(image)]}.gif">
                    </div>`
            card_list.push(card)
            i++
            image += 0.5
            card_order++
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
    /*Função que marca as cartas viaradas para comparação */

    if (click_count % 2 == 0){
        parrot.classList.add("hidden")
        parrot.classList.add(`selected1`)
        selected_list.push(parrot)
    }else{
        parrot.classList.add("hidden")
        parrot.classList.add(`selected2`)
        selected_list.push(parrot)
    }

        click_count ++
    checkCard()
}

function checkCard(){
    /*Função que compara as cartas e checa se elas são iguais 
    1. Se as cartas forem iguais, mantém o atributo hidden que mantém a carta desvirada
        e remove a maracação de selecionada para poder aplicar no próximo set de cartas
    2. Se as cartas forem diferentes, remove todos os atributos para o estado original
    3. mantém um contador de jogadas
    4. Condicional de fim de jogo que compara quantas cartas estão desviradas e quantas
        cartas tem no total*/
    first_card = document.querySelector(".selected1")
    second_card = document.querySelector(".selected2")
    if(selected_list.length == 2 && first_card.innerHTML !== second_card.innerHTML){
        played_count += 1;
        div.classList.add("disable")
        setTimeout(() =>{
            first_card.classList.remove("hidden")
            second_card.classList.remove("hidden")
            first_card.classList.remove("selected1")
            second_card.classList.remove("selected2")
            div.classList.remove("disable")
        },1000)
        selected_list = []
    }else if (selected_list.length == 2 && first_card.innerHTML === second_card.innerHTML){
        played_count += 1;
        div.classList.add("disable")
        setTimeout(() =>{
            div.classList.remove("disable")
            first_card.classList.remove("selected1")
            second_card.classList.remove("selected2")
        }, 1000)
        end_counter += 2
        selected_list = []
    }
    if (end_counter === card_quantity){
        endGame()
    }
}

function endGame(){
    /*Alerta de fim de jogo */
    setTimeout(() =>{
        alert(`Você ganhou em ${played_count} jogadas e em ${time_counter} segundos!`)
        restartGame()
    }, 1500)
}

function restartGame(){
    /*Prompt após o fim do jogo para reiniciar a partida */
    const restart = prompt("Você gostaria de reiniciar a partida? (sim ou não)")
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
    /*Contador de tempo do jogo */
    add = setInterval(timeProgression, 1000);

    function timeProgression() {
      time_counter++;
      const div = document.querySelector(".time");
      div.innerHTML = time_counter;
      if (time_counter == 0) {
        clearInterval(add);
      }
    }
}
