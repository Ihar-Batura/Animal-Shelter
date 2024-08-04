// import '../styles/pets.css'

// Burger navigation

const nav = document.querySelector('.navigation')
const navToggle = document.querySelector('.mobile-nav-toggle')
const body = document.querySelector('body')

const shadow = document.createElement('div')
shadow.id = 'shadow-window'

// when someone clicks the hamburger button
navToggle.addEventListener('click', () => {
  body.classList.toggle('unscroll') // add unscroll
  body.append(shadow) // create shadow window
  const shadowWindow = document.getElementById('shadow-window') // when click on shadow all close
  shadowWindow.addEventListener('click', () => {
    nav.setAttribute('data-visible', false) // close burger
    navToggle.setAttribute('aria-expanded', false) // change/return icon
    body.classList.toggle('unscroll') // delete unscroll
    shadow.remove() // delete shadow window
  })

  const visiblity = nav.getAttribute('data-visible')
  // if the nav is closed, open it
  if (visiblity === 'false') {
    nav.setAttribute('data-visible', true) // open burger
    navToggle.setAttribute('aria-expanded', true) // change icon
  } else {
    nav.setAttribute('data-visible', false) // close burger
    navToggle.setAttribute('aria-expanded', false) // change/return icon
    shadow.remove() // delete shadow window
  }

  // if the nav is open, close it
})

//Close burger when click on link
const links = document.querySelectorAll('ul > li')
links.forEach((el) =>
  el.addEventListener('click', () => {
    nav.setAttribute('data-visible', false) // close burger
    navToggle.setAttribute('aria-expanded', false) // change/return icon
    body.classList.toggle('unscroll') // delete unscroll
    shadow.remove() // delete shadow window
  })
)

// Pagination

async function getData() {
  // запрос данных
  const response = await fetch('../data/pets.json')
  const data = await response.json()
  return data
}

async function main() {
  const cardsData = await getData() // получаем данные
  let currentPage = 1 // номер страницы
  let cards = 8 // количество карточек на странице

  function displayList(arrData, cardsPerPage, pageNumber) {
    const cardsContainer = document.querySelector('.friends-container')

    const start = cardsPerPage * pageNumber // откуда начинать обрезать данные
    const end = start + cardsPerPage //
    const paginatedData = arrData.slice(start, end) // обрезка данных для 1 страницы

    paginatedData.forEach((el) => {
      // обработка каждого элемента и отрисовка карт
      const animalCard = document.createElement('div')
      animalCard.classList.add('card') // animalCard.className = 'card'
      animalCard.innerHTML = `
      <img src=${el.img} alt="animal picture"/>
      <h4>${el.name}</h4>
      <button id=${el.id} class="button light-button">Learn more</button>
      `
      cardsContainer.appendChild(animalCard)
    })
  }
  function displayPagination() {}
  function displayPaginationBtn() {}
  displayList(cardsData.animalsCards, cards, currentPage)
}

main()
