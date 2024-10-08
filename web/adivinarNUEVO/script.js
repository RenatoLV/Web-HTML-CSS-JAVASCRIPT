// genera el numero aleatorio
function getRandomNum(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// par o impar
function esPar(num) {
    return num % 2 === 0;
}

// verifica si es primo o no
function esPrimo(num) {
    if (num <= 1) return false;
    for (let i = 2; i <= Math.sqrt(num); i++) {
        if (num % i === 0) return false;
    }
    return true;
}

// verifica si el numero es de un digito o de dos
function deUnDigito(num) {
    return num >= 0 && num <= 9;
}

// verifica si el numero es multiplo de x numero
function esMultiplo(num, divisor) {
    return num % divisor === 0;
}

// genera 20 numeros y elige 1 aleatoriamente
let numArray = [];
for (let i = 0; i < 20; i++) { 
    numArray.push(getRandomNum(1, 100));
}

let randomNum = numArray[Math.floor(Math.random() * numArray.length)];
let intentos = 0;
let pistas = 0; 

// muestra los numeros en la pantalla y les da colores aleatorios
const listaNumeros = document.getElementById('lista-numeros');

function mostrarNumeros() {
    listaNumeros.innerHTML = '';  // limpia la lista antes de mostrar
    numArray.forEach((num, index) => {
        const span = document.createElement('span');
        span.textContent = num;
        span.style.backgroundColor = getColor(); 
        span.style.color = 'white'; 
        span.style.padding = '10px'; 
        span.style.margin = '8px'; 
        span.style.borderRadius = '100px'; 
        listaNumeros.appendChild(span);

        // salto de linea
        if (index === 9) {
            listaNumeros.appendChild(document.createElement('br'));
            listaNumeros.appendChild(document.createElement('br'));
        }
    });
}

mostrarNumeros();

function getColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

// pistas
const pistasArray = [
    () => `El número es de ${deUnDigito(randomNum) ? 'un solo dígito.' : 'dos dígitos.'}`,
    () => `El número es ${esPar(randomNum) ? 'par' : 'impar'}.`,
    () => esPrimo(randomNum) ? 'El número es primo.' : 'El número no es primo.',
    () => esMultiplo(randomNum, 3) ? 'El número es divisible por 3.' : 'El número no es divisible por 3.',
    () => esMultiplo(randomNum, 5) ? 'El número es divisible por 5.' : 'El número no es divisible por 5.',
    () => esMultiplo(randomNum, 4) ? 'El número es múltiplo de 4.' : 'El número no es múltiplo de 4.',
    () => esMultiplo(randomNum, 10) ? 'El número es múltiplo de 10.' : 'El número no es múltiplo de 10.'
];

// filtrar los numeros que no cumplen con la pista actual
function filtrarNum() {
    if (pistas === 0) {
        numArray = numArray.filter(num => esPar(num) === esPar(randomNum));
    } else if (pistas === 1) {
        numArray = numArray.filter(num => deUnDigito(num) === deUnDigito(randomNum));
    } else if (pistas === 2) {
        numArray = numArray.filter(num => esPrimo(num) === esPrimo(randomNum));
    } else if (pistas === 3) {
        numArray = numArray.filter(num => esMultiplo(num, 3) === esMultiplo(randomNum, 3));
    } else if (pistas === 4) {
        numArray = numArray.filter(num => esMultiplo(num, 5) === esMultiplo(randomNum, 5));
    } else if (pistas === 5) {
        numArray = numArray.filter(num => esMultiplo(num, 4) === esMultiplo(randomNum, 4));
    } else if (pistas === 6) {
        numArray = numArray.filter(num => esMultiplo(num, 10) === esMultiplo(randomNum, 10));
    }
    mostrarNumeros();  
}

// muestra la pista actual
function mostrarPista() {
    const pista = document.getElementById('pista');
    if (pistas < pistasArray.length) {
        pista.textContent = pistasArray[pistas]();
        filtrarNum();  
        pistas++;
    } else {
        pista.textContent = "No hay más pistas disponibles. Has perdido.";
        document.getElementById('adivinanza').disabled = true;  // bloquea los intentos
    }
}

// verifica la adivinanza
function verAdivinanza() {
    const inputUsuario = document.getElementById('adivinanza');
    const adivinanza = Number(inputUsuario.value);
    const resultado = document.getElementById('resultado');
    intentos++;

    if (!adivinanza || !numArray.includes(adivinanza)) {
        resultado.textContent = "Por favor, introduce un número valido del grupo mostrado.";
        return;
    }

    if (adivinanza === randomNum) {
        resultado.textContent = `¡Felicidades! Adivinaste el número en ${intentos} intentos.`;
        resultado.style.color = 'green';
        document.getElementById('pista').textContent = ''; 
    } else {
        resultado.textContent = adivinanza < randomNum ? "Intenta con un número mayor." : "Intenta con un número menor.";
        resultado.style.color = 'red';
        mostrarPista(); 
    }

    inputUsuario.value = '';  // limpia el campo de entrada 
    inputUsuario.focus();     // coloca automaticamente el cursor en el campo de entrada
}
