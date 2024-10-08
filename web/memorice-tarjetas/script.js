const imagenes = [
    'imagenes/imagen1.png', 'imagenes/imagen2.png', 'imagenes/imagen3.png', 
    'imagenes/imagen4.png', 'imagenes/imagen5.png'
];
let nivelActual = '';
let pares = 0;
let tiempoRestante = 0;
let tiempoTotal = 0;
let intervalo;
let cartasSeleccionadas = [];
let paresEncontrados = 0;

document.querySelector(".iniciarJuego").addEventListener("click", iniciarJuego);

function iniciarJuego() {
    const nivel = document.querySelector(".niveles").value;
    nivelActual = nivel;

    switch(nivel) {
        case 'facil':
            pares = 3;
            tiempoRestante = tiempoTotal = 30;
            break;
        case 'intermedio':
            pares = 4;
            tiempoRestante = tiempoTotal = 25;
            break;
        case 'dificil':
            pares = 5;
            tiempoRestante = tiempoTotal = 20;
            break;
    }
    
    iniciarMemorice();
    setTimeout(mostrarCartas, 1000);
}

function iniciarMemorice() {
    const juego = document.querySelector(".juego");
    juego.innerHTML = '';

    let imagenesNivel = imagenes.slice(0, pares);
    imagenesNivel = imagenesNivel.concat(imagenesNivel);
    imagenesNivel = mezclaArray(imagenesNivel);

    imagenesNivel.forEach(imagen => {
        const carta = document.createElement("img");
        carta.src = 'imagenes/imagen-carta.jpg';
        carta.dataset.imagen = imagen;
        carta.addEventListener("click", girarCarta);
        juego.appendChild(carta);
    });
    
    juego.style.gridTemplateColumns = `repeat(${pares}, 150px)`;
}

function mostrarCartas() {
    const cartas = document.querySelectorAll(".juego img");
    
    cartas.forEach(carta => {
        carta.src = carta.dataset.imagen;
    });

    setTimeout(() => {
        cartas.forEach(carta => {
            carta.src = 'imagenes/imagen-carta.jpg';
        });
        iniciarTemporizador();
    }, 3000); 
}

function mezclaArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const x = Math.floor(Math.random() * (i + 1));
        [array[i], array[x]] = [array[x], array[i]];
    }
    return array;
}

function girarCarta() {
    if (cartasSeleccionadas.length < 2) {
        this.src = this.dataset.imagen;
        cartasSeleccionadas.push(this);
        
        if (cartasSeleccionadas.length === 2) {
            verificarPareja();
        }
    }
}

function iniciarTemporizador() {
    clearInterval(intervalo);
    document.querySelector(".temporizador").textContent = `Tiempo: ${tiempoRestante} segundos`;

    intervalo = setInterval(() => {
        tiempoRestante--;
        document.querySelector(".temporizador").textContent = `Tiempo: ${tiempoRestante} segundos`;

        if (tiempoRestante <= 0) {
            finalizarJuego('Perdiste, se acabó el tiempo.');
        }
    }, 500);
}

function verificarPareja() {
    const [carta1, carta2] = cartasSeleccionadas;

    if (carta1.dataset.imagen === carta2.dataset.imagen) {
        paresEncontrados++;
        cartasSeleccionadas = [];
        
        if (paresEncontrados === pares) {
            finalizarJuego('¡Ganaste!');
        }
    } else {
        setTimeout(() => {
            carta1.src = 'imagenes/imagen-carta.jpg';
            carta2.src = 'imagenes/imagen-carta.jpg';
            cartasSeleccionadas = [];
        }, 500);
    }
}

function finalizarJuego(mensaje) {
    clearInterval(intervalo);
    document.querySelector(".resultado").textContent = mensaje;
    document.querySelector(".juego").innerHTML = '';
    paresEncontrados = 0;
}
