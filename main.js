const block = document.querySelector('.block')
const box = document.querySelector('.box')

const render = (data) => {
    box.innerHTML = data.map((i) => `
    <div class="card">
        <div class="content">
            <h3 class="username">${i.username}</h3>
            <p class="name">${i.name}</p>
            <a class="email" href="#">${i.email}</a>
        </div>
        <button class="button" data-id="${i.id}">Info</button>
        </div>
    `).join("")
}

const getData = () => {
    fetch('https://jsonplaceholder.typicode.com/users')
        .then((res) => res.json())
        .then((data) => {
            render(data)
        })
}
getData()

const getNumber = (str) => {
    let newStr = "";
    for (let i of str) {
        if (i != " ") {
            newStr += i;
        } else {
            return newStr;
        }
    }
    return newStr;
}

const getUser = () => {
    let user = JSON.parse(localStorage.getItem("user"))
    let idf = user[user.length - 1];
    block.innerHTML = `
    <div class="userCard">
        <h1 class="title">${idf.username}</h1>
        <p class="cap">${idf.name}</p>
        <a class="info" href="#">${idf.email}</a>
        <address>
            <p><strong>City:</strong> ${idf.address.city}</p>
            <p><strong>Street:</strong> ${idf.address.street}</p>
        </address>
        <a href="#" class="webSite"><strong>Web-site:</strong> ${idf.website}</a>
        <a href="tel:${getNumber(idf.phone)}" id="link"><strong>Phone Number:</strong> ${getNumber(idf.phone)}</a>
    </div>
    `
}
getUser()

let arr = []
box.addEventListener("click", (e) => {
    fetch(`https://jsonplaceholder.typicode.com/users/${e.target.dataset.id}`)
        .then((res) => res.json())
        .then((data) => {
            arr.push(data)
            localStorage.setItem("user", JSON.stringify(arr))
            getUser()
        })
})