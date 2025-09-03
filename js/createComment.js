function createComment({ avatar, name, message }) {
  const li = document.createElement('li');
  const img = document.createElement('img');
  const p = document.createElement('p');

  li.classList.add('social__comment');

  img.classList.add('social__picture');
  img.src = avatar;
  img.alt = name;
  img.width = 35;
  img.height = 35;

  p.classList.add('social__text');
  p.textContent = message;

  li.appendChild(img);
  li.appendChild(p);
  return li;
}

export { createComment };
