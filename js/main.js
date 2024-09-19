const seccionProductos = document.getElementById("seccionProductos");
const productos = "/data/productos.json";
const carrito = [];
const seccionCarrito = document.getElementById("lista-carrito");
const totalCarrito = document.getElementById("total-precio");

// Cargar lista de productos desde un archivo JSON
fetch(productos)
  .then((response) => response.json())
  .then((data) => {
    imprimirProductos(data.bebidasAlcoholicas);
  })
  .catch((error) => {
    console.error("No se pudieron cargar los productos: ", error);
    seccionProductos.innerHTML =
      "<p>Error al cargar los productos. Por favor, intente más tarde</p>";
  });

// Imprimir productos en el DOM
function imprimirProductos(productos) {
  seccionProductos.innerHTML = "";
  productos.forEach((element) => {
    const { codigo, nombre, precio, img } = element;

    const tarjetaProducto = document.createElement("div");
    tarjetaProducto.className = "col-sm-6 col-md-4 mb-4";
    seccionProductos.appendChild(tarjetaProducto);

    tarjetaProducto.innerHTML = `
      <div id="cardProducto" class="card h-100">
        <img src="${img}" class="card-img-top" alt="${nombre}">
        <div class="card-body">
          <h5 class="card-title">${nombre}</h5>
          <p class="card-text">Precio: S/ <span id="parrafoPrecio-${codigo}">${precio.toFixed(2)}</span></p>
          <div class="input-group mb-3">
            <button id="btnDisminuir-${codigo}" class="btn btn-outline-secondary" type="button">-</button>
            <input id="cantidadProducto-${codigo}" type="text" class="form-control text-center" value="1" min="1" aria-label="Cantidad">
            <button id="btnAumentar-${codigo}" class="btn btn-outline-secondary" type="button">+</button>
          </div>
          <button id="btnComprar-${codigo}" class="btn btn-primary w-100">¡Comprar!</button>
        </div>
      </div>
    `;

    // Evento para comprar el producto
    const btnComprar = tarjetaProducto.querySelector(`#btnComprar-${codigo}`);
    btnComprar.addEventListener("click", () => {
      const cantidad = parseInt(document.getElementById(`cantidadProducto-${codigo}`).value);
      const productoSeleccionado = {
        codigo,
        nombre,
        precio: precio.toFixed(2),
        cantidad,
        total: (precio * cantidad).toFixed(2)
      };

      // Agregar producto al carrito
      carrito.push(productoSeleccionado);

      // Actualizar el DOM del carrito
      actualizarCarritoDOM();

      // Mostrar alerta de éxito
      Swal.fire({
        title: "¡Éxito!",
        text: "Se añadió el producto a tu carrito!",
        icon: "success",
        confirmButtonText: "Genial",
      });
    });

    // Eventos para aumentar/disminuir la cantidad
    const btnAumentar = tarjetaProducto.querySelector(`#btnAumentar-${codigo}`);
    const btnDisminuir = tarjetaProducto.querySelector(`#btnDisminuir-${codigo}`);
    const inputNumeroProductos = tarjetaProducto.querySelector(`#cantidadProducto-${codigo}`);
    const mostrarPrecioPorProductos = tarjetaProducto.querySelector(`#parrafoPrecio-${codigo}`);

    btnAumentar.addEventListener("click", () => {
      let numeroItems = parseInt(inputNumeroProductos.value) + 1;
      inputNumeroProductos.value = numeroItems;
      let precioActualizado = precio * numeroItems;
      mostrarPrecioPorProductos.innerHTML = precioActualizado.toFixed(2);
    });

    btnDisminuir.addEventListener("click", () => {
      if (inputNumeroProductos.value > 1) {
        let numeroItems = parseInt(inputNumeroProductos.value) - 1;
        inputNumeroProductos.value = numeroItems;
        let precioActualizado = precio * numeroItems;
        mostrarPrecioPorProductos.innerHTML = precioActualizado.toFixed(2);
      }
    });
  });
}

// Función para actualizar el carrito en el DOM
function actualizarCarritoDOM() {
  seccionCarrito.innerHTML = ""; // Limpiar el carrito antes de actualizar
  let total = 0;

  if (carrito.length === 0) {
    seccionCarrito.innerHTML = "<p>Tu carrito está vacío.</p>";
  } else {
    carrito.forEach((producto, index) => {
      const filaCarrito = document.createElement("div");
      filaCarrito.classList.add("producto-carrito", "row", "mb-3");
      filaCarrito.innerHTML = `
        <div class="col-md-6">
          <p><strong>${producto.nombre}</strong> (x${producto.cantidad})</p>
        </div>
        <div class="col-md-4">
          <p>Precio: S/ ${producto.precio}</p>
        </div>
        <div class="col-md-2">
          <p>Total: S/ ${producto.total}</p>
        </div>
        <div class="col-md-12">
          <button class="btn btn-danger btn-sm eliminar-producto" data-index="${index}">Eliminar</button>
          <button class="btn btn-success btn-sm btn-confirma-comprar">Comprar</button>
        </div>
      `;

      seccionCarrito.appendChild(filaCarrito);
      total += parseFloat(producto.total); // Sumar el total
    });
    
    totalCarrito.innerText = total.toFixed(2);
    agregarEventosEliminar();
  }
}

// Función para eliminar productos del carrito
function agregarEventosEliminar() {
  const botonesEliminar = document.querySelectorAll(".eliminar-producto");

  botonesEliminar.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const indiceProducto = e.target.getAttribute("data-index");
      carrito.splice(indiceProducto, 1); // Eliminar producto del carrito
      actualizarCarritoDOM(); // Actualizar el carrito en el DOM
    });
  });
}