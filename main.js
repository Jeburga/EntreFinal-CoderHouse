const bebidasAlcoholicas = [
    {
      codigo: "W001",
      nombre: "Johnnie Walker Black Label",
      precio: 89.99,
      tipo: "Whisky",
      img: "https://example.com/images/johnnie-walker-black.jpg"
    },
    {
      codigo: "C001",
      nombre: "Corona Extra",
      precio: 2.99,
      tipo: "Cerveza",
      img: "https://example.com/images/corona-extra.jpg"
    },
    {
      codigo: "R001",
      nombre: "Bacardi Superior",
      precio: 19.99,
      tipo: "Ron",
      img: "https://example.com/images/bacardi-superior.jpg"
    },
    {
      codigo: "V001",
      nombre: "Grey Goose",
      precio: 39.99,
      tipo: "Vodka",
      img: "https://example.com/images/grey-goose.jpg"
    },
    {
      codigo: "T001",
      nombre: "Don Julio Blanco",
      precio: 49.99,
      tipo: "Tequila",
      img: "https://example.com/images/don-julio-blanco.jpg"
    },
    {
      codigo: "G001",
      nombre: "Tanqueray London Dry",
      precio: 29.99,
      tipo: "Gin",
      img: "https://example.com/images/tanqueray.jpg"
    },
    {
      codigo: "W002",
      nombre: "Macallan 12 Years",
      precio: 79.99,
      tipo: "Whisky",
      img: "https://example.com/images/macallan-12.jpg"
    },
    {
      codigo: "C002",
      nombre: "Guinness Draught",
      precio: 3.99,
      tipo: "Cerveza",
      img: "https://example.com/images/guinness.jpg"
    },
    {
      codigo: "R002",
      nombre: "Havana Club 7 Años",
      precio: 24.99,
      tipo: "Ron",
      img: "https://example.com/images/havana-club-7.jpg"
    },
    {
      codigo: "L001",
      nombre: "Baileys Original Irish Cream",
      precio: 22.99,
      tipo: "Licor",
      img: "https://example.com/images/baileys.jpg"
    }
  ];

const btnAumento = document.getElementById('btnAumento');
const btnDisminuir = document.getElementById('btnDisminucion');
const precio = document.getElementById('precioActualizado');
const btnComprar = document.getElementById('btnComprar-Arroz');
const showNumberItems = document.getElementById('cantidadProducto');

precio.innerHTML = `${5}`;


// función para operar todos los + y - de cualquier producto añadido
function controlarCantidadProductos(producto, precioInicial) {
    const btnAumento = document.getElementById(`btnAumento-${producto}`);
    const btnDisminuir = document.getElementById(`btnDisminucion-${producto}`);
    const inputNumeroItems = document.getElementById(`cantidadProducto-${producto}`);
    const precioActualizado = document.getElementById(`precioActualizado-${producto}`);
    
    let precio = precioInicial;
    precioActualizado.innerHTML = precio.toFixed(2);
    
    btnAumento.addEventListener('click', () => {
        let numeroItems = parseInt(inputNumeroItems.value) + 1;
        inputNumeroItems.value = numeroItems;
        precioActualizado.innerHTML = (precio * numeroItems).toFixed(2);
    });
    
    btnDisminuir.addEventListener('click', () => {
        if (parseInt(inputNumeroItems.value) > 1) {
            let numeroItems = parseInt(inputNumeroItems.value) - 1;
            inputNumeroItems.value = numeroItems;
            precioActualizado.innerHTML = (precio * numeroItems).toFixed(2);
        }
    });
}

controlarCantidadProductos('cerveza', 3);

// función de imprimir en pantalla, a través de cards, el array de bebidas.

// aumentar el valor del showNumberItems en 1 al presionar el botón +
btnAumento.addEventListener('click', ()=> {
    let numeroItems = parseInt(showNumberItems.value) + 1;
    showNumberItems.value = numeroItems;
    precio.innerHTML = `${5.50 * numeroItems}`;
});

btnDisminuir.addEventListener('click', () => {
    if (showNumberItems.value > 0) {
        let numeroItems = parseInt(showNumberItems.value) - 1;
        showNumberItems.value = numeroItems;
        precio.innerHTML = `${5.50 * numeroItems}`;
    } else {
        showNumberItems.value = 0;
    }
});



// Configurar botón Comprar para botar un alert con librería de alerts
btnComprar.addEventListener('click', ()=> showNumberItems.value > 0 ? alert('Producto añadido al carrito') : console.log('No hay producto'));


// Crear array para carrito y pushear después de comprar