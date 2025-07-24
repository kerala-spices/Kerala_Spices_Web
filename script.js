let cart = [];

fetch('products.json')
  .then(response => response.json())
  .then(data => {
    const grid = document.getElementById('product-grid');
    const grouped = {};

    data.forEach(item => {
      const name = item['Item'];
      if (!grouped[name]) grouped[name] = [];
      grouped[name].push(item);
    });

    for (let name in grouped) {
      const card = document.createElement('div');
      card.className = 'product-card';
      card.innerHTML = `
        <img src="https://via.placeholder.com/250x180.png?text=${encodeURIComponent(name)}" alt="${name}">
        <div class="info">
          <h3>${name}</h3>
          <button onclick='viewDetails(${JSON.stringify(grouped[name])})'>View Options</button>
        </div>
      `;
      grid.appendChild(card);
    }
  });

function viewDetails(productData) {
  const sizes = Object.entries(productData[0])
    .filter(([key, val]) => key !== "Item" && val)
    .map(([key, val]) => `<button onclick="addToCart('${productData[0].Item}', '${key}', ${val})">${key} - ₹${val}</button>`);

  const html = sizes.join('<br>');
  const popup = window.open('', 'Product Options', 'width=400,height=600');
  popup.document.write(`<h2>Select a size for ${productData[0].Item}</h2><div>${html}</div>`);
}

function addToCart(item, size, price) {
  cart.push({ item, size, price });
  document.getElementById('cart-count').innerText = cart.length;
  alert(`${item} (${size}) added to cart!`);
}
