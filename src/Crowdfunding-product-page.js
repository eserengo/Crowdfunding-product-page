import { data } from "./data.js";

(function () {

  function createContent() {
    data.map(item => {
      if (Object.hasOwn(item, 'name')) {
        if (item.name === 'image') {
          return document.querySelector(`.${item.query}`).insertAdjacentHTML('beforeend', `<${item.tag} class='${item.class}' src=${item.src} alt='${item.alt}' />`);
        } else if (item.name === 'menu') {
          document.querySelector('.bars').addEventListener('click', createMenu);
        } else {
          document.querySelectorAll('.openModal').forEach(item => {
            item.addEventListener('click', createModal);
          })
        }
      } else {
        return document.querySelector(`.${item.query}`).insertAdjacentHTML('beforeend', `<${item.tag} class='${item.class}'>${item.content}</${item.tag}>`);
      }
    })
  }

  function createModal() {
    data.map(item => {
      if (Object.hasOwn(item, 'name')) {
        if (item.name === 'modal') {
          document.querySelector(`.${item.query}`).insertAdjacentHTML('beforeend', `<${item.tag} class='${item.class}'></${item.tag}>`);
          addBlurEffect();
          item.content.map(subitem => {
            if (subitem.name === 'image') {
              return document.querySelector(`.${subitem.query}`).insertAdjacentHTML('beforeend', `<${subitem.tag} class='${subitem.class}' src=${subitem.src} alt='${subitem.alt}' />`);
            } else if (subitem.name === 'form') {
              return document.querySelector(`.${subitem.query}`).insertAdjacentHTML('beforeend', `<${subitem.tag} class='${subitem.class}' ${subitem.attributes}>${subitem.content}</${subitem.tag}>`);
            } else if (subitem.name === 'modal-completed') {
              document.querySelectorAll('.submitBtn').forEach(button => {
                button.addEventListener('click', (event) => {
                  event.preventDefault();
                  document.querySelector('.modal').remove();
                  document.querySelector(`.${subitem.query}`).insertAdjacentHTML('beforeend', `<${subitem.tag} class='${subitem.class}'></${subitem.tag}>`);
                  subitem.content.map(ultitem => {
                    if (ultitem.name === 'image') {
                      return document.querySelector(`.${ultitem.query}`).insertAdjacentHTML('beforeend', `<${ultitem.tag} class='${ultitem.class}' src=${ultitem.src} alt='${ultitem.alt}' />`);
                    } else {
                      return document.querySelector(`.${ultitem.query}`).insertAdjacentHTML('beforeend', `<${ultitem.tag} class='${ultitem.class}'>${ultitem.content}</${ultitem.tag}>`);
                    }
                  })
                  document.querySelector('.closeCompletedBtn').addEventListener('click', () => {
                    document.querySelector('.modal').remove();
                    removeBlurEffect();
                  })
                })
              })
            } else {
              return document.querySelector(`.${subitem.query}`).insertAdjacentHTML('beforeend', `<${subitem.tag} class='${subitem.class}'>${subitem.content}</${subitem.tag}>`);
            }
          })
        }
      }
    })
    document.querySelectorAll('.radio').forEach(item => {
      item.addEventListener('click', (event) => {
        event.stopPropagation();
        document.querySelectorAll('.hidding').forEach(subitem => {
          subitem.classList.add('hidden');
        })
        document.querySelectorAll('.activating').forEach(subitem => {
          subitem.classList.remove('active');
        })
        document.getElementById(`${event.target.id}`).parentElement.querySelectorAll('.hidding').forEach(subitem => {
          subitem.classList.remove('hidden');
        })
        document.getElementById(`${event.target.id}`).parentElement.classList.add('active');
      })
    })
    document.querySelector('.closeModalBtn').addEventListener('click', () => {
      document.querySelector('.modal').remove();
      removeBlurEffect();
    })
  }

  function createMenu() {
    data.map(item => {
      if (Object.hasOwn(item, 'name')) {
        if (item.name === 'menu') {
          document.querySelector(`.${item.query}`).insertAdjacentHTML('beforeend', `<${item.tag} class='${item.class}'></${item.tag}>`);
          addBlurEffect();
          document.querySelector('.bars').classList.add('hidden');
          item.content.map(subitem => {
            if (subitem.name === 'image') {
              return document.querySelector(`.${subitem.query}`).insertAdjacentHTML('beforeend', `<${subitem.tag} class='${subitem.class}' src=${subitem.src} alt='${subitem.alt}' />`);
            } else {
              return document.querySelector(`.${subitem.query}`).insertAdjacentHTML('beforeend', `<${subitem.tag} class='${subitem.class}'>${subitem.content}</${subitem.tag}>`);
            }
          })
        }
      }
    })
    document.querySelector('.closeMenuBtn').addEventListener('click', () => {
      document.querySelector('.popup').remove();
      document.querySelector('.bars').classList.remove('hidden');
      removeBlurEffect();
    })
  }

  function displayOnResize() {
    if (window.matchMedia("(width<=375px)").matches) {
      // RULES
      document.querySelectorAll('.desktop').forEach(item => {
        item.classList.add('hidden');
      })
      document.querySelectorAll('.mobile').forEach(item => {
        item.classList.remove('hidden');
      })
      document.querySelectorAll('.floating').forEach(item => {
        item.classList.remove('right');
      })
      document.querySelector('.card-2').classList.remove('flex-row');
      document.querySelector('.card-2').classList.add('flex-col');
      document.querySelectorAll('.moving').forEach(item => {
        item.classList.remove('inline');
      })
    }
    if (window.matchMedia("(width>375px)").matches) {
      // RULES
      document.querySelectorAll('.mobile').forEach(item => {
        item.classList.add('hidden');
      })
      document.querySelectorAll('.desktop').forEach(item => {
        item.classList.remove('hidden');
      })
      document.querySelectorAll('.floating').forEach(item => {
        item.classList.add('right');
      })
      document.querySelector('.card-2').classList.remove('flex-col');
      document.querySelector('.card-2').classList.add('flex-row');
      document.querySelectorAll('.moving').forEach(item => {
        item.classList.add('inline');
      })
    }
  }

  function addBlurEffect() {
    document.querySelectorAll('.header, .main, .footer').forEach(item => {
      item.classList.add('blur')
    });
    document.querySelector('.body').classList.add('fixed');
  }
  
  function removeBlurEffect() {
    document.querySelectorAll('.header, .main, .footer').forEach(item => {
      item.classList.remove('blur')
    });
    document.querySelector('.body').classList.remove('fixed');
  }

  window.addEventListener('resize', () => {
    let timer;
    window.clearTimeout(timer);
    timer = window.setTimeout(displayOnResize(), 500);
  });

  window.addEventListener('DOMContentLoaded', () => {
    // FUNCTIONS
    createContent();
    displayOnResize();
  })
})();