const saveCartItems = (e) => localStorage.setItem('cartItems', e);

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
