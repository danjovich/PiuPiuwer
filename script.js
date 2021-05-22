// appended recebe um elemento e uma array e retorna
// true se o elemento estiver na array, false caso contrário:
const appended = (e, array) => {
    for (let i = 0; i < array.length; i++) {
        if (e == array[i])
            return true
    }
    return false
}

// randomNumber recebe dois inteiros n e max e retorna 
// uma array com n inteiros diferentes, cada um entre 0 e max,
// em uma ordem aleatória:
const randomNumbers = (n, max) => {
    if (n > max)
        throw "Valores inválidos"
    let numbers = []
    for (let i = 0; i < n; i++) {
        let number
        do {
            number = Math.floor(Math.random() * (max - 0.001))
        } while (appended(number, numbers))
        numbers.push(number)
    }
    return numbers
}

fetch('https://next.json-generator.com/api/json/get/EkyZfHLU_', { method: 'GET' })
    .then(response => response.json())
    .then((data) => {
        console.log(data) /*********** */
        
        let pius = document.getElementsByClassName('pius')[0]
        let friends = document.getElementsByClassName('friends')[0]
        let threeRamdomIndexes = randomNumbers(3, data.length)
        console.log(threeRamdomIndexes) /************* */

        for(let i = 0; i < data.length; i++) {
            let currentData = data[i]

            /* Criação de piu baseados nos dados retirados da API: */
            let piu = document.createElement('li')
            /* Criação da div info: */
            let info = document.createElement('div')
            info.setAttribute('class', 'info')
            /* Criação da div que envolve a imagem: */
            let square = document.createElement('div')
            square.setAttribute('class', 'square')
            /* Criação da tag img que recebrá a foto de perfil, verifica antes se a imagem existe: */
            let img = document.createElement('img')
            let image = (currentData.imagem.length > 0) ? currentData.imagem : 'images/pefil.svg'
            img.setAttribute('src', image)
            img.setAttribute('alt', 'Foto de Perfil')
            square.appendChild(img)
            /* Criação da div name-and-username: */
            let nameAndUsername = document.createElement('div')
            nameAndUsername.setAttribute('class', 'name-and-username')
            nameAndUsername.innerHTML = `<strong>${currentData.nome} <span>${currentData.username}</span></strong>`
            /* Adição de square e name-and-username à div info: */
            info.appendChild(square)
            info.appendChild(nameAndUsername)
            /* Criação do p que recebe o texto do piu: */
            let p = document.createElement('p')
            p.innerHTML = currentData.mensagem
            /* Adição dos elementos acima ao piu: */
            piu.appendChild(info)
            piu.appendChild(p)
            /* Adição das interações ao piu: */
            piu.innerHTML += `<div class="interactions">
                                <img src="images/like.svg" alt="Like">
                                <img src="images/destacar.svg" alt="Destacar">
                                <img src="images/deletar.svg" alt="Deletar">
                            </div>`
            /* Adição do piu ao HTML: */
            pius.appendChild(piu)

            /* Adição de perfis aleatórios a friends: */
            if (i == threeRamdomIndexes[0] || i == threeRamdomIndexes[1] || i == threeRamdomIndexes[2]) {
                let profile = document.createElement('div')
                profile.setAttribute('class', 'profile')
                profile.appendChild(square)
                let button = document.createElement('button')
                button.innerHTML = 'Ver Perfil'
                let info = document.createElement('div')
                info.setAttribute('class', 'info')
                info.appendChild(nameAndUsername)
                info.appendChild(button)
                profile.appendChild(info)
                friends.appendChild(profile)
            }
        }
    })
    .catch(err => console.log(err.message))