let cards = null;
let selectedCard = null;
let selectedCardHtml = null;


async function loadMetaData () {
    const response = await fetch('./metadata/metadata.json');
    const data = await response.json();
    cards = data.cards;

    titleElement.innerText = data.title;
    if (data.cards.length > 0) {
        modalBody.innerHTML = '';
    }

    data.cards.forEach((card, index) => {
        modalBody.innerHTML += createCardHTML(card, index);
    });
}

function selectImage(imgLink, cardId) {
    selectedCard = cards[cardId];

    // Reset the previously selected card
    if (selectedCardHtml) {
        selectedCardHtml.innerHTML = createCardHTML(selectedCard, selectedCardHtml.id);
    }

    // Modify the selected card
    selectedCardHtml = document.getElementById(cardId);
    selectedCardHtml.innerHTML = createSelectedCardHTML(imgLink, cardId);
}

function createCardHTML(card, index) {
    return `
        <div id="${index}" class="card" data-img-link="${card.imgLink}" data-title="${card.title}">
            <img src="${card.imgLink}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${card.title}</h5>
                <button class="btn btn-primary" onclick="selectImage('${card.imgLink}', '${index}')">اختر</button>
            </div>
        </div>
        <br>
    `;
}

function createSelectedCardHTML(imgLink, cardId) {
    return `
        <img src="${imgLink}" class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">${selectedCardHtml.dataset.title}</h5>
            <button class="btn btn-success" onclick="selectImage('${imgLink}', '${cardId}')">اختير</button>
        </div>
    `;
}

function generateImage() {
    if (!selectedCard) {
        alert('الرجاء اختيار الكارت');
        return;
    }

    const name = document.getElementById('name').value;
    console.log(name);
    
    // Encode the name in Base64
    let encodedName = utf8_to_b64(name);
    
    // Remove any padding characters (=)
    encodedName = encodedName.replace(/=/g, '');
    
    let parameters = {
        txt64: encodedName,
        'txt-size': selectedCard.txtSize,
        'txt-align': 'center',
        'txt-font': 'Farah',
        'txt-fit': 'max'
    }

    if (selectedCard.y) {
        parameters['txt-y'] = selectedCard.y;
    }

    if (selectedCard.x) {
        parameters['txt-x'] = selectedCard.txtX;
    }

    if (selectedCard.txtColor) {
        parameters['txt-color'] = selectedCard.txtColor;
    }

    // fetch the image then download it    
    fetch(`${selectedCard.imgLink}?${new URLSearchParams(parameters)}`)
        .then(response => response.blob())
        .then(blob => {
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `${name}.jpg`;
            a.click();
        });

}

function utf8_to_b64(str) {
    return window.btoa(unescape(encodeURIComponent(str)));
}

loadMetaData();