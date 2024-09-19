// Variables para cambiar el fondo
const backgrounds = ["bg1.jpg", "bg2.jpg", "bg3.jpg", "bg4.jpg", "bg5.jpg", "bg6.jpg", "bg7.jpg", "bg8.jpg", "bg9.jpg", "bg10.jpg", "bg11.jpg", "bg12.jpg"];
const body = document.body;

// Cambiar la imagen de fondo al cargar la página y cada 30 segundos
function cambiarImagen() {
  const random = Math.floor(Math.random() * backgrounds.length);
  body.style.backgroundImage = `url('../img/bg/${backgrounds[random]}')`;
}
window.addEventListener('load', cambiarImagen);
setInterval(cambiarImagen, 30000);

// Almacenar credenciales en localStorage
localStorage.setItem('jesus', 'burga');

// Verificar credenciales
document.getElementById('loginForm').addEventListener('submit', function (e) {
  e.preventDefault();
  const usuario = document.getElementById('usuario').value;
  const password = document.getElementById('password').value;

  // Verificar si el usuario y la contraseña son correctos
  if (localStorage.getItem(usuario) === password) {
    window.location.href = '../index.html';
  } else {
    document.getElementById('mensajeAlerta').textContent = 'Usuario o contraseña incorrectos.';
  }
});
