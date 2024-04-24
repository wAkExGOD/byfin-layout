// modals
const modals = () => {
  function bindModal(
    triggerSelector,
    modalSelector,
    closeSelector,
    overlaySelector,
    destroy = false
  ) {
    const trigger = document.querySelectorAll(triggerSelector),
      modal = document.querySelector(modalSelector),
      overlay = modal.querySelector(overlaySelector),
      close = document.querySelector(closeSelector),
      windows = document.querySelectorAll("[data-modal]"),
      scroll = calcScroll()

    trigger.forEach((item) => {
      item.addEventListener("click", (e) => {
        if (e.target) {
          e.preventDefault()
        }

        if (destroy) {
          item.remove()
        }

        windows.forEach((item) => {
          item.style.display = "none"
        })

        modal.style.display = "block"
        document.body.style.overflow = "hidden"
        document.body.style.marginRight = `${scroll}px`
      })
    })

    close.addEventListener("click", () => {
      windows.forEach((item) => {
        item.style.display = "none"
      })

      modal.style.display = "none"
      document.body.style.overflow = ""
      document.body.style.marginRight = `0px`
    })

    modal.addEventListener("click", (e) => {
      if (e.target === overlay) {
        windows.forEach((item) => {
          item.style.display = "none"
        })

        modal.style.display = "none"
        document.body.style.overflow = ""
        document.body.style.marginRight = `0px`
      }
    })
  }

  function calcScroll() {
    let div = document.createElement("div")

    div.style.width = "50px"
    div.style.height = "50px"
    div.style.overflowY = "scroll"
    div.style.visibility = "hidden"

    document.body.appendChild(div)
    let scrollWidth = div.offsetWidth - div.clientWidth
    div.remove()

    return scrollWidth
  }

  // triggerSelector, modalSelector, closeSelector, overlaySelector
  try {
    bindModal(
      ".contact-us",
      "#contact-form",
      "#contact-form .close-modal",
      "#contact-form .overlay"
    )
  } catch (e) {}
  if (document.querySelector("#contact-form")) {
    let checkbox = document.querySelector("#contact-form #agree"),
      submitBtn = document.querySelector('#contact-form [type="submit"]')

    submitBtn.addEventListener("click", (e) => {
      if (submitBtn.classList.contains("disabled-btn")) {
        e.preventDefault()
      } else {
      }
    })

    checkbox.addEventListener("change", () => {
      console.log(submitBtn)
      if (checkbox.checked === true) {
        submitBtn.classList.remove("disabled-btn")
      } else {
        submitBtn.classList.add("disabled-btn")
        submitBtn.addEventListener("click")
      }
    })
  }
}
modals()

// phone mask
function setCursorPosition(pos, e) {
  e.focus()
  if (e.setSelectionRange) e.setSelectionRange(pos, pos)
  else if (e.createTextRange) {
    var range = e.createTextRange()
    range.collapse(true)
    range.moveEnd("character", pos)
    range.moveStart("character", pos)
    range.select()
  }
}

function mask(e) {
  let matrix = this.placeholder, // .defaultValue
    i = 0,
    def = matrix.replace(/\D/g, ""),
    val = this.value.replace(/\D/g, "")
  def.length >= val.length && (val = def)
  matrix = matrix.replace(/[_\d]/g, function (a) {
    return val.charAt(i++) || "_"
  })
  this.value = matrix
  i = matrix.lastIndexOf(val.substr(-1))
  i < matrix.length && matrix != this.placeholder
    ? i++
    : (i = matrix.indexOf("_"))
  setCursorPosition(i, this)
}
window.addEventListener("DOMContentLoaded", function () {
  var inputs = document.querySelectorAll('input[type="tel"]')
  inputs.forEach((input) => {
    input.addEventListener("input", mask, false)
    input.focus()
    setCursorPosition(3, input)
  })
})

// turning on animations
window.addEventListener("DOMContentLoaded", () => {
  const body = document.querySelector("body"),
    navLinks = document.querySelectorAll("aside#aside a"),
    toggleMenuBtn = document.querySelector("#toggle-menu > .menu__btn")

  const screenWidth = window.screen.availWidth

  // adding class for body after click on #toggle_menu
  if (toggleMenuBtn) {
    toggleMenuBtn.addEventListener("click", () => {
      if (body.classList.contains("showed_menu")) {
        body.classList.remove("showed_menu")
      } else {
        body.classList.add("showed_menu")
      }
    })
  }

  // closing menu after link menu click
  if (screenWidth < 768) {
    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        body.classList.remove("showed_menu")
      })
    })
  }

  window.addEventListener("scroll", () => {
    let scroll = window.scrollY + window.innerHeight
    let elem = document.querySelector(".about-decoration")
    if (elem) {
      let elemScroll = elem.offsetTop
      let images = document.querySelectorAll("#about-us img[data-about]")
      if (scroll > elemScroll) {
        images.forEach((image) => {
          image.style.animationPlayState = "running"
        })
      }
    }
  })
})
