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

let width

function init() {
  width = document.querySelector('.friends-container').offsetWidth //give width
}
window.addEventListener('resize', init) //check change window width
init()

async function main() {
  const cardsData = await getData() // получаем данные
  let currentPage = 1 // номер страницы
  let cards = width > 800 ? 8 : width < 550 ? 3 : 6 // количество карточек на странице

  function displayList(arrData, cardsPerPage, pageNumber) {
    const cardsContainer = document.querySelector('.friends-container')
    cardsContainer.innerHTML = '' // при каждом запуске очищает контейнер для карточек
    pageNumber-- // уменьшаем страницу на 1 что бы первая страница нормально отрисовывалась с 0 элемента

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

  const pageCount = Math.ceil(cardsData.length / cards) // количество страниц

  const startPageBtn = document.getElementById('start-page')
  startPageBtn.addEventListener('click', () => {
    currentPage = 1
    displayPaginationBtn(currentPage) //изменяет цифру номера страницы пагинации
    displayList(cardsData, cards, currentPage) //отрисовывает первую страницу
  })

  const lastPageBtn = document.getElementById('last-page')
  lastPageBtn.addEventListener('click', () => {
    currentPage = pageCount
    displayPaginationBtn(currentPage) //изменяет цифру номера страницы пагинации
    displayList(cardsData, cards, pageCount) //отрисовывает последнюю страницу
  })

  const nextBtn = document.getElementById('next')
  nextBtn.addEventListener('click', () => {
    // перелистывает на новую страницу
    if (currentPage < pageCount) {
      currentPage++
      displayPaginationBtn(currentPage)
      displayList(cardsData, cards, currentPage)
    }
  })

  const prevBtn = document.getElementById('prev')
  prevBtn.addEventListener('click', () => {
    // перелистывает обратно
    if (currentPage <= pageCount && currentPage !== 1) {
      currentPage--
      displayPaginationBtn(currentPage)
      displayList(cardsData, cards, currentPage)
    }
  })

  function displayPaginationBtn(page) {
    const numberPage = document.querySelector('.pagination-number')
    numberPage.innerText = page
  }
  displayList(cardsData, cards, currentPage)
}

main()
