const carrito = document.querySelector('.carrito-grid');

const productos = JSON.parse(localStorage.getItem('cart')) || [];

if (productos.length === 0) {
  carrito.innerHTML = '<p>No hay productos en el carrito</p>';
} else {

  let productosHTML = '';

  productos.forEach(producto => {
    productosHTML += `
      <div class="producto-card">
          <img src="${producto.imagen}" alt="${producto.titulo}">
          <h3>${producto.titulo}</h3>
          <p>$${producto.precio}</p>
          <a href="producto.html?id=${producto.id}" class="btn-ver-mas">Ver más</a>
          <div class="counter">
            <button onClick="addOne(${producto.id})" class="btn-comprar">+</button>
            <p> ${producto.quantity} </p>
            <button onClick="removeOne(${producto.id})" class="btn-comprar">-</button>
          </div>
      </div>
    `;
  });

  carrito.innerHTML = productosHTML;
}

