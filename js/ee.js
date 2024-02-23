let cards = null;
let selectedCard = null;
let selectedCardHtml = null;
let occasion = null;
let occasionCards = null;

async function loadMetaData() {
    const response = await fetch('./metadata/metadata.json');
    const data = await response.json();
    cards = data.cards;

    document.getElementById('title').innerText = data.title;

    // give the user options to choose from for occasion
    showOccasion();
}

function showOccasion() {
    document.getElementById('modal-body').innerHTML = '';
    document.getElementById('downloadButton').style.display = 'none'; // Show the download button

    // Give the user occasion
    // the options are Ramadan, Eid al-Fitr , and Eid al-Adha
    document.getElementById('modal-body').innerHTML = `
    <div id="0" class="card" data-img-link="https://iee.imgix.net/bg1-2.jpg" data-title="رمضان">
        <a href="#" onclick="selectOccasion(1)" style="color: inherit; text-decoration: none;">
            <div class="card-body d-flex flex-column align-items-center">
                <h5 class="card-title mt-3">رمضان</h5>
            </div>
        </a>
    </div>
    <br>
    <div id="1" class="card" data-img-link="https://iee.imgix.net/bg2-2.jpg" data-title="عيد الفطر">
        <a href="#" onclick="selectOccasion(2)" style="color: inherit; text-decoration: none;">
            <div class="card-body d-flex flex-column align-items-center">
                <h5 class="card-title mt-3">عيد الفطر</h5>
            </div>
        </a>
    </div>
    <br>
    <div id="2" class="card" data-img-link="https://iee.imgix.net/bg3-2.jpg" data-title="عيد الأضحى">
        <a href="#" onclick="selectOccasion(3)" style="color: inherit; text-decoration: none;">
            <div class="card-body d-flex flex-column align-items-center">
                <h5 class="card-title mt-3">عيد الأضحى</h5>
            </div>
        </a>
    </div>
    <br>
`;
}

function selectOccasion(l_occasion) {
    occasion = l_occasion;
    switch (l_occasion) {
        case 1:
            occasionCards = cards.filter(card => card.occasion === 'رمضان');
            showCards(occasionCards);
            break;
        case 2:
            occasionCards = cards.filter(card => card.occasion === 'عيد الفطر');
            showCards(occasionCards);
            break;
        case 3:
            occasionCards = cards.filter(card => card.occasion === 'عيد الأضحى');
            showCards(occasionCards);
            break;
        default:
            break;
    }
}

function showCards(cards) {
    if (cards.length > 0) {
        document.getElementById('modal-body').innerHTML = '';
        document.getElementById('downloadButton').style.display = 'block'; // Show the download button
    } else {
        document.getElementById('modal-body').innerHTML = `
            <h1>قريبا</h1>
        `;
    }

    cards.map((card, index) => {
        // modify modal-body
        document.getElementById('modal-body').innerHTML += `
            <div id="${index}" class="card" data-img-link="${card.imgLink}" data-title="${card.title}">
                <img src="${card.imgLink}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${card.title}</h5>
                    <button class="btn btn-primary" onclick="selectImage('${card.imgLink}', ${index})">اختر</button>
                </div>
            </div>
            <br>
        `;
    });
}

function selectImage(imgLink, cardId) {
    selectedCard = occasionCards[cardId];
    
    // Reset the previously selected card
    if (selectedCardHtml) {
        selectedCardHtml.innerHTML = `
            <img src="${selectedCardHtml.dataset.imgLink}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${selectedCardHtml.dataset.title}</h5>
                <button class="btn btn-primary" onclick="selectImage('${selectedCardHtml.dataset.imgLink}', '${selectedCardHtml.id}')">اختر</button>
            </div>
        `;
    }

    // Modify the selected card
    selectedCardHtml = document.getElementById(cardId);
    selectedCardHtml.innerHTML = `
        <img src="${imgLink}" class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">${selectedCardHtml.dataset.title}</h5>
            <button class="btn btn-success" onclick="selectImage('${imgLink}', '${cardId}')">تم الاختيار</button>
        </div>
    `;
}

function generateImage() {
    if (!occasion) {
        alert('الرجاء اختيار المناسبة');
        return;
    }

    if (!selectedCard) {
        alert('الرجاء اختيار البطاقة');
        return;
    }

    const name = document.getElementById('name').value;

    // Encode the name in Base64
    let encodedName = utf8_to_b64(name);

    // Make the Base64 string URL safe
    encodedName = encodedName.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');

    let parameters = {
        txt64: encodedName,
        'txt-size': selectedCard.txtSize,
        'txt-align': 'center',
        'txt-font': 'AlTarikh',
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

    if (selectedCard.txtColor) {
        parameters['txt-color'] = selectedCard.txtColor;
    }
    console.log(parameters);
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