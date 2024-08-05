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

    // Открывает попап
    //при каждой отрисовки страницы создается массив кнопок и на них вешается слушатель
    const cardBtn = document.querySelectorAll('.light-button') // при каждой отрисовки создает новый массив
    cardBtn.forEach((el) =>
      el.addEventListener('click', (e) => {
        let id = e.target.id //получаем номер кнопки
        popup.classList.toggle('active')
        body.classList.add('unscroll') // add unscroll

        // делаем запрос и прокидываем номер id через который собираем карточку
        fetch('../data/pets.json')
          .then((response) => response.json())
          .then((data) => generateModal(data, id))
      })
    )
  }

  const pageCount = Math.ceil(cardsData.length / cards) // количество страниц

  const startPageBtn = document.getElementById('start-page')
  startPageBtn.addEventListener('click', () => {
    currentPage = 1
    displayPaginationBtn(currentPage) //изменяет цифру номера страницы пагинации
    displayList(cardsData, cards, currentPage) //отрисовывает первую страницу
    prevBtn.classList.add('arrow__not-active')
    startPageBtn.classList.add('arrow__not-active') // turn off button

    nextBtn.classList.remove('arrow__not-active')
    lastPageBtn.classList.remove('arrow__not-active') // turn on button
  })

  const lastPageBtn = document.getElementById('last-page')
  lastPageBtn.addEventListener('click', () => {
    currentPage = pageCount
    displayPaginationBtn(currentPage) //изменяет цифру номера страницы пагинации
    displayList(cardsData, cards, pageCount) //отрисовывает последнюю страницу
    nextBtn.classList.add('arrow__not-active')
    lastPageBtn.classList.add('arrow__not-active') // turn off button

    prevBtn.classList.remove('arrow__not-active')
    startPageBtn.classList.remove('arrow__not-active') // turn on button
  })

  const nextBtn = document.getElementById('next')
  nextBtn.addEventListener('click', () => {
    // перелистывает на новую страницу вперед
    if (currentPage < pageCount) {
      currentPage++
      displayPaginationBtn(currentPage)
      displayList(cardsData, cards, currentPage)
      if (currentPage === pageCount) {
        // отключает кнопки на последней странице
        nextBtn.classList.add('arrow__not-active') // turn off button
        lastPageBtn.classList.add('arrow__not-active')
      }
    }
    prevBtn.classList.remove('arrow__not-active')
    startPageBtn.classList.remove('arrow__not-active') // turn on button
  })

  const prevBtn = document.getElementById('prev')
  prevBtn.addEventListener('click', () => {
    // перелистывает обратно
    if (currentPage <= pageCount && currentPage !== 1) {
      currentPage--
      displayPaginationBtn(currentPage)
      displayList(cardsData, cards, currentPage)
    }
    if (currentPage === 1) {
      prevBtn.classList.add('arrow__not-active') // turn off button
      startPageBtn.classList.add('arrow__not-active')
    }

    nextBtn.classList.remove('arrow__not-active')
    lastPageBtn.classList.remove('arrow__not-active') // turn on button
  })

  function displayPaginationBtn(page) {
    const numberPage = document.querySelector('.pagination-number')
    numberPage.innerText = page
  }
  displayList(cardsData, cards, currentPage)

  // POPUP

  const popup = document.querySelector('.popup')
  const closePopup = document.querySelector('.close-btn')
  const closeShadow = document.querySelector('.overlay')

  // Close popup
  closePopup.addEventListener('click', () => {
    const childModalCard = document.querySelector('.modal-card')
    childModalCard.remove() // delete old card
    popup.classList.toggle('active')
    body.classList.remove('unscroll') // delete unscroll
  })

  closeShadow.addEventListener('click', (event) => {
    // Проверяет на тот ли я элемент нажал!
    if (event.target.classList.contains('overlay')) {
      const childModalCard = document.querySelector('.modal-card')
      childModalCard.remove() // delete old card
      popup.classList.toggle('active')
      body.classList.remove('unscroll') // delete unscroll
    }
  })

  //Функция отрисовки всех елементов в карточке в модальном окне
  const generateModal = (data, id) => {
    data.forEach((animal) => {
      if (animal.id == id) {
        const modalContainer = document.querySelector('.modal-container')

        const modalCard = document.createElement('div')
        modalCard.className = 'modal-card'
        modalContainer.append(modalCard)

        modalCard.innerHTML = `<img src=${animal.img} alt="animal photo">`

        const modalText = document.createElement('div')
        modalText.className = 'modal-card__text'
        modalCard.append(modalText)

        modalText.innerHTML = `
      <h3>${animal.name}</h3> 
      <h4>${animal.type} - ${animal.breed}</h4>
      <h5>${animal.description}</h5>
      <ul class ="modal-list">
      <li><span><b>Age:</b> ${animal.age}</span></li>
      <li><span><b>Inoculations:</b> ${animal.inoculations}</span></li>
      <li><span><b>Diseases:</b> ${animal.diseases}</span></li>
      <li><span><b>Parasites:</b> ${animal.parasites}</span></li>
      </ul>
      `
      }
    })
  }
}

main()
