const apiurl = "https://fakestoreapi.com/products/"
let cards = document.getElementById('cards')
let search = document.getElementById('search')
let conteudo = [];
let filtrado = [];
let newfiltrado = [];


search.addEventListener("input", () => {
    filtrar(search.value)
})

fetch(apiurl)
    .then(res => res.json())
    .then(data => {
        conteudo = data;
        backupData = data;
        gerarCard()
    })
    .catch(error => {
        console.log(`erro ${error}`);
    })

function gerarCard() {
    cards.innerHTML = '';
    conteudo.forEach(element => {
        let id = element.id;
        let title = element.title;
        let category = element.category;
        let description = element.description;
        let img = element.image;
        let price = element.price;
        let rate = element.rating.rate;

        if (title.length > 25) {
            title = title.slice(0, 25)
            title += ' ...'
        }

        cards.innerHTML +=
            `
            <li class="card">
                <div class = "img">
                    <img src="${img}" alt="">
                </div>
                <div class="h">
                    <h4>${title}</h4>
                    <h2>R$${price}</h2>
                    <h4>rate: ${rate}</h2>
                </div>
            </li>`

    });

}

function filtrar(search) {
    newfiltrado = [];
    filtrado = backupData;
    filtrado.forEach((element) => {
        element.title = element.title.toLowerCase();
        if (element.title.includes(search)) {
            newfiltrado.push(element)
        }
    })
    conteudo = newfiltrado
    gerarCard()
}

document.getElementById('ordem').addEventListener('click', function ordenar(event) {
    switch (document.getElementById('ordem').value) {

        case 'valor1':
            conteudo.sort(function (a, b) {
                if (a.title > b.title) {
                    return 1;
                }
                if (a.title < b.title) {
                    return -1;
                }
                return 0;
            })
            break;

        case 'valor2':
            conteudo.sort(function (a, b) {
                if (a.title < b.title) {
                    return 1;
                }
                if (a.title > b.title) {
                    return -1;
                }
                return 0;
            })
            break;

        case 'valor3':
            conteudo.sort((a, b) => {
                return b.price - a.price
            })
            break;

        case 'valor4':
            conteudo.sort((a, b) => {
                return a.price - b.price;
            })
            break;
        default:
            break;
    }

    gerarCard()

})
