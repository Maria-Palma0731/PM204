console.log("Hola Mundo JS desde el servidor ");
/* Promedio 2 variables */
let edad1= 24;
let edad2= 35;
console.log("Edad promedio")
console.log((edad1 + edad2)/2);

/*Medir tiempo de procesos */

console.time("miproceso");

    for(let i=0; i<1000000; i++){}

console.timeEnd("miproceso");

/* Objetos tipo tabla */
let usuarios= [
    {nombre: "Maria", edad: 30},
    {nombre: "Angeles", edad: 25},
]

console.table(usuarios);
console.log(usuarios);