const cartItems = document.querySelector('.cart__items');
const count = document.querySelector('.count');
const total = document.querySelector('.total-price');
const input = document.querySelector('.search');


const closeCart = () => {
  const icon = document.querySelector('.material-icons');
  const div = document.querySelector('.container-cartTitle');
  const section = document.querySelector('.cart');
  icon.addEventListener('click', () => {
    section.classList.toggle('close');
    div.classList.toggle('close');
  });
};

const createProductImageElement = (imageSource) => {
  const img = document.createElement('img');
  const imageHD = imageSource.replace(/I.jpg/g, 'W.jpg'); 
  img.className = 'item__image';
  img.src = imageHD;
  return img;
};

const createCustomElement = (element, className, innerText) => {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
};

const sum = () => {
  const carts = document.querySelectorAll('.cart__item');
  const prices = [];
  carts.forEach((element) => {
    const array = element.textContent.split('$');
    prices.push(parseFloat(array[1]));
  });
  const result = prices.reduce((acc, curr) => acc + curr, 0);
  total.innerHTML = `${result.toFixed(2)}`;
  localStorage.setItem('valor', total.innerHTML);
  return result;
};

const cartItemClickListener = (event) => {
  event.target.remove();
  saveCartItems(cartItems.innerHTML);
  sum();
  countItem();
};

const createCartItemElement = ({ image, name, salePrice }) => {
  const li = document.createElement('li');
  li.className = 'cart__item list-tag';
  li.innerText = `${name} 
  R$${salePrice}`;
  li.appendChild(createProductImageElement(image));
  li.addEventListener('click', cartItemClickListener);
  return li;
};

const getSkuFromProductItem = (item) => item.querySelector('span.item__sku').innerText;

const addProductCart = async ({ target }) => {
  const item = document.querySelector('.cart__items');
  const itemId = target.parentNode.querySelector('.item__sku');
  const { id, title, thumbnail, price } = await fetchItem(itemId.innerText);
  const result = { 
    sku: id, 
    image: thumbnail, 
    name: title, 
    salePrice: price,
  };

  item.appendChild(createCartItemElement(result));
  saveCartItems(cartItems.innerHTML);
  sum();
  countItem();
};

const createProductItemElement = ({ sku, name, image, salePrice }) => {
  const section = document.createElement('section');
  const btn = (createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));
  section.className = 'item';
  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createCustomElement('span', 'item__price', `R$ ${salePrice} `));
  section.appendChild(btn);
  btn.addEventListener('click', addProductCart);
  return section;
};

const countItem = () => {
  if (cartItems.childNodes === '') count.innerHTML = 0;
  else {
    count.innerHTML = cartItems.childNodes.length;
  }
};

const loading = () => {
  const item = document.querySelector('.items');
  const div = document.createElement('div');
  div.innerText = 'carregando...';
  div.className = 'loading';
  item.appendChild(div);
};

const removeLoading = () => {
  const div = document.querySelector('.loading');
  div.remove();
};

const listProducts = async () => {
  loading();
  let param = 'computador';
  const section = document.querySelector('.items');
  const input = document.querySelector('.search');

  if (input.value) param = input.value;
  const json = await fetchProducts(param);
  const { results } = json;
  results.forEach((element) => {
    const object = { sku: element.id, name: element.title, image: element.thumbnail, salePrice: element.price, };
    section.appendChild(createProductItemElement(object));
  });
  removeLoading();
};

const inputListener = () => {
  const input = document.querySelector('.search');
  const section = document.querySelector('.items');
  input.addEventListener('change', async () => {
    while (section.firstChild) section.firstChild.remove();
    const data = await fetchProducts(input.value);
    const { results } = data;
    results.forEach((element) => { 
    const object = { sku: element.id, name: element.title, image: element.thumbnail, salePrice: element.price, };
    section.appendChild(createProductItemElement(object));
  });
  });
};

const restoreCart = () => {
    cartItems.innerHTML = getSavedCartItems();
    countItem();  
  };
  cartItems.addEventListener('click', cartItemClickListener);

const cleanCart = () => {
  cartItems.innerHTML = ''; 
  total.innerHTML = '0';
  saveCartItems(cartItems.innerHTML);
  localStorage.setItem('valor', total.innerHTML);
  countItem();
};
const btncleanCart = document.querySelector('.empty-cart');
btncleanCart.addEventListener('click', cleanCart);



window.onload = () => { 
  listProducts(); 
  addProductCart();
  restoreCart();
  inputListener();
  sum();
  closeCart();

};
