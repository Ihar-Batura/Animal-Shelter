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
