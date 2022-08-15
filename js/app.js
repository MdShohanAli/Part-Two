const main = document.getElementById('main');
const searchButton = () => {
    const searchInput = document.getElementById('search-input');
    const error = document.getElementById('error');
    const searchValue = searchInput.value;
    // error handle
    if (isNaN(searchValue) || searchValue == '') {
        error.innerText = 'please enter a  number';
        searchInput.value = '';
        main.textContent = '';

    }
    else if (searchValue <= 0) {
        error.innerText = 'please enter a positive number';
        searchInput.value = '';
        main.textContent = '';
    }
    else {
        main.textContent = '';
        const url = `https://www.deckofcardsapi.com/api/deck/new/draw/?count=${searchValue}`;
        fetch(url)
            .then(res => res.json())
            .then(data => searchDisplay(data.cards))
        searchInput.value = '';
        error.innerHTML = '';

    }

}

const searchDisplay = cards => {

    for (const card of cards) {
        console.log(card);
        const div = document.createElement('div');
        div.classList.add('col-lg-4');
        div.classList.add('mb-5');

        div.innerHTML = `
       <div class="card" style="width: 18rem;">
    <img src="${card.image}" class="card-img-top" alt="">
    <div class="card-body">
    <h5 class="card-title">${card.code}</h5>
    <p class="card-text">${card.suit}.</p>
      <button onclick ="cardDetail('${card.code}')" class="btn btn-primary">Go somewhere</button>
     </div>
    </div>
       `;
        main.appendChild(div)
    }

}

const cardDetail = (code) => {
    const url = 'https://www.deckofcardsapi.com/api/deck/new/draw/?count=52';
    fetch(url)
        .then(res => res.json())
        .then(data => {
            const allCards = data.cards;
            const singelCard = allCards.find(card => card.code === code)
            const div = document.createElement('div');
            main.innerHTML = '';
            div.innerHTML = `
            <div class="card" style="width: 18rem;">
     <img src="${singelCard.image}" class="card-img-top" alt="">
     <div class="card-body">
     <h5 class="card-title">${singelCard.code}</h5>
     <p class="card-text">${singelCard.suit}.</p>
     </div>
    </div>
            `;
            main.appendChild(div)
        })
}