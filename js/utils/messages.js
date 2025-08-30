const body = document.querySelector('body');

export function showMessage(type) {
  const template = document.querySelector(`#${type}`).content.cloneNode(true);
  const message = template.querySelector(type === 'success' ? '.success' : '.error');

  body.appendChild(message);

  const closeButton = message.querySelector(type === 'success' ? '.success__button' : '.error__button');

  function removeMessage() {
    message.remove();
    document.removeEventListener('keydown', onEsc);
    message.removeEventListener('click', onClickOutside);
  }

  function onEsc(evt) {
    if (evt.key === 'Escape') {
      removeMessage();
    }
  }

  function onClickOutside(evt) {
    if (!evt.target.closest(type === 'success' ? '.success__inner' : '.error__inner')) {
      removeMessage();
    }
  }

  closeButton.addEventListener('click', removeMessage);
  document.addEventListener('keydown', onEsc);
  message.addEventListener('click', onClickOutside);
}

export function showDataError() {
  const template = document.querySelector('#data-error').content.cloneNode(true);
  document.body.append(template);
}

