// import '../styles/style.css'

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

// Реализация слайдера-карусели на странице main
let offset = 0
const sliderLine = document.querySelector('.slider-line')
const btnArrowLeft = document.querySelector('.arrow-left')
const btnArrowRight = document.querySelector('.arrow-right')

let width

function init() {
  width = document.querySelector('.friends-slider__wrapper').offsetWidth //give slider width
}
window.addEventListener('resize', init) //check change window width
init()

let step = 0
btnArrowLeft.addEventListener('click', () => {
  if (width === 990) {
    step += 360
    if (step > 0) {
      step = -1800
    }
  }
  if (width < 990 && width > 270) {
    step += 310
    if (step > 0) {
      step = -1860
    }
  }
  if (width === 270) {
    step += 270
    if (step > 0) {
      step = -1890
    }
  }
  sliderLine.style.left = step + 'px'
})

btnArrowRight.addEventListener('click', () => {
  if (width === 990) {
    step -= 360
    if (step === -1800) {
      step = 0
    }
  }
  if (width < 990 && width > 270) {
    step -= 310
    if (step === -2170) {
      step = 0
    }
  }
  if (width === 270) {
    step -= 270
    if (step === -2160) {
      step = 0
    }
  }
  sliderLine.style.left = step + 'px'
})

// POPUP

const cardBtn = document.querySelectorAll('.light-button')
const popup = document.querySelector('.popup')
const closePopup = document.querySelector('.close-btn')
const closeShadow = document.querySelector('.overlay')

// Open popup

cardBtn.forEach((el) =>
  el.addEventListener('click', (e) => {
    let id = e.target.id //получаем номер кнопки
    popup.classList.toggle('active')
    body.classList.toggle('unscroll') // add unscroll

    // делаем запрос и прокидываем номер id через который собираем карточку
    fetch('data/data.json')
      .then((response) => response.json())
      .then((data) => generateModal(data, id))
  })
)

// Close popup
closePopup.addEventListener('click', () => {
  const childModalCard = document.querySelector('.modal-card')
  childModalCard.remove() // delete old card
  popup.classList.toggle('active')
  body.classList.toggle('unscroll') // delete unscroll
})

closeShadow.addEventListener('click', (event) => {
  // Проверяет на тот ли я элемент нажал!
  if (event.target.classList.contains('overlay')) {
    const childModalCard = document.querySelector('.modal-card')
    childModalCard.remove() // delete old card
    popup.classList.toggle('active')
    body.classList.toggle('unscroll') // delete unscroll
  }
})

//Функция отрисовки всех елементов в карточке в модальном окне
const generateModal = (data, id) => {
  data.animalsCards.forEach((animal) => {
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
