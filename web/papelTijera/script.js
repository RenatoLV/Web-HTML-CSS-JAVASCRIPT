// Variables para almacenar las elecciones de los jugadores
let jugador1Eleccion = '';
let jugador2Eleccion = '';
function seleccionar(opcion) {
    // Asignar la elección al jugador 1
    jugador1Eleccion = opcion;
    document.getElementById('jugador1-eleccion').innerHTML = `<img src="${opcion}.png" alt="${opcion}" />`;
    // crear respuesta bot
    jugador2Eleccion = elegirOpcionAleatoria();
    document.getElementById('jugador2-eleccion').innerHTML = `<img src="${jugador2Eleccion}.png" alt="${jugador2Eleccion}" />`;
    determinarResultado();
}

function elegirOpcionAleatoria() {
    const opciones = ['piedra', 'papel', 'tijera']; 
    const aleatorio = Math.floor(Math.random() * opciones.length);
    return opciones[aleatorio];
}

function determinarResultado() {
    const resultado = document.getElementById('resultado');
    if (jugador1Eleccion === jugador2Eleccion) {
        resultado.textContent = '¡Es un empate!';
    } else if (
        (jugador1Eleccion === 'piedra' && jugador2Eleccion === 'tijera') ||
        (jugador1Eleccion === 'papel' && jugador2Eleccion === 'piedra') ||
        (jugador1Eleccion === 'tijera' && jugador2Eleccion === 'papel')
    ) {
        resultado.textContent = '¡Jugador 1 gana!';
    } else {
        resultado.textContent = '¡Jugador 2 gana!';
    }
    animacionChoque();
}

function animacionChoque() {
    // creamos unos contenedores que haran la animación
    const animacionContainer = document.createElement('div');
    animacionContainer.id = "animacion-container";
    document.body.appendChild(animacionContainer);
    // Clonar las imágenes para la animación
    const img1 = document.getElementById('jugador1-eleccion').querySelector('img').cloneNode(true);
    const img2 = document.getElementById('jugador2-eleccion').querySelector('img').cloneNode(true);
    img1.classList.add('animacion-img');
    img2.classList.add('animacion-img');
    animacionContainer.appendChild(img1);
    animacionContainer.appendChild(img2);
    // Configuración de la animación
    img1.style.animation = "choque 1s ease-in-out";
    img2.style.animation = "choque 1s ease-in-out reverse";
    setTimeout(() => {
        // se eliminan los contenedores que hicieron la animacion
        document.body.removeChild(animacionContainer);
        document.getElementById('jugador1-eleccion').innerHTML = `<img src="${jugador1Eleccion}.png" alt="${jugador1Eleccion}" />`;
        document.getElementById('jugador2-eleccion').innerHTML = `<img src="${jugador2Eleccion}.png" alt="${jugador2Eleccion}" />`;
        determinarGanador();
    }, 1000); 
}

document.querySelector('.volver').addEventListener('click', function() {
    window.location.href = 'index.html'; 
});
