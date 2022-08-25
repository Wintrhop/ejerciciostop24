/* Ejercicio 1
Estás diseñando un sistema de facturación. Debes representar la lista de facturas, 
donde cada factura está compuesta de un número, el nombre del cliente, la fecha, y
 unos ítems. Cada ítem tiene un id de producto, un precio por unidad y una cantidad.

¿Cómo representarías esta lista utilizando arreglos y objetos? */


var facturas= [];


function factura(idFactura,clientName,date,producto) {
    this.idFactura= idFactura;
    this.clientName=clientName;
    this.date=date;
    this.producto= producto;
}
function producto (idProducto,price,stock) {
    this.idProducto= idProducto;
    this.price= price;
    this.stock=stock;
};
var producto1= new producto(1,1000,1);


var factura1= new factura (1,"pepe","1 marz",producto1);


facturas.push(factura1);
facturas.push(factura1);
console.log(facturas);

/*
Ejercicio 2
Escribir una función crearContador que retorne una nueva función que incremente un número y lo retorne cada vez que es invocada:

const contar = createContador()
contar() // 1
contar() // 2
contar() // 3
Recuerda de hacer uso de closures para evitar el uso de variables globales. */

function crearContador (){
    let i = 0;
    return function(){
        i++
        return console.log(i);
    }
};

var contar = crearContador();

contar();
contar();
contar();
/*
Ejercicio 3
Escribir una función createGame que retorne una nueva función que reciba un número y permita 
adivinar un número secreto del 1 al 100. Si el número es mayor al número secreto la función 
retorna la cadena “Muy alto!”, si el número es menor retorna la cadena “Muy bajo!”. Si el número 
es el correcto retorna “Lo adivinaste, felicitaciones!”

const guess = createGame() // numero secreto: 5
guess(8) // "Muy alto!"
guess(4) // "Muy bajo!"
guess(5) // "Lo adivinaste, felicitaciones!" */

function createGame (){
    let numeroSecreto = 5;
    return function(num1){
        if (numeroSecreto>num1) {
            console.log("muy bajo");
        } else if(numeroSecreto<num1){
            console.log("muy alto");
        } else if (numeroSecreto === num1){
            console.log("felicidades acertaste");
        }
    }
};

var juego = createGame()
juego(3);