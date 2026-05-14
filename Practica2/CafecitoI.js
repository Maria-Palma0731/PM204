const readline = require("readline");
const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
const preguntar = (texto) => new Promise(res => rl.question(texto, res));

var ExpresAmericano = new Object();
ExpresAmericano.nombre = "Expres Americano";
ExpresAmericano.precio = 45;
ExpresAmericano.tamaño = "Mediano";
ExpresAmericano.disponible = true;

var Capuccino = new Object();
Capuccino.nombre = "Capuccino";
Capuccino.precio = 60;
Capuccino.tamaño = "Grande";
Capuccino.disponible = true;

var Latte = new Object();
Latte.nombre = "Latte";
Latte.precio = 65;
Latte.tamaño = "Grande";
Latte.disponible = true;

var SandwichJamon = new Object();
SandwichJamon.nombre = "Sandwich de Jamon";
SandwichJamon.precio = 75;
SandwichJamon.disponible = true;

var EnsaladaCeser = new Object();
EnsaladaCeser.nombre = "Ensalada Cesar";
EnsaladaCeser.precio = 90;
EnsaladaCeser.disponible = true;

var Hamburguesa = new Object();
Hamburguesa.nombre = "Hamburguesa";
Hamburguesa.precio = 120;
Hamburguesa.disponible = true;

var Croissant = new Object();
Croissant.nombre = "Croissant";
Croissant.precio = 35;
Croissant.disponible = true;

var DonaChocolate = new Object();
DonaChocolate.nombre = "Dona de Chocolate";
DonaChocolate.precio = 30;
DonaChocolate.disponible = true;

var Muffin = new Object();
Muffin.nombre = "Muffin de Vainilla";
Muffin.precio = 40;
Muffin.disponible = true;

var bebidas   = [ExpresAmericano, Capuccino, Latte];
var alimentos = [SandwichJamon, EnsaladaCeser, Hamburguesa];
var panaderia = [Croissant, DonaChocolate, Muffin];

var todos = [ExpresAmericano, Capuccino, Latte,
             SandwichJamon, EnsaladaCeser, Hamburguesa,
             Croissant, DonaChocolate, Muffin];

function agregarProducto(producto) {
    todos.push(producto);
    console.log("Producto agregado correctamente");
}

function actualizarProducto(nombreProducto, nuevosDatos) {
    var producto = todos.find(function(item) {
        return item.nombre === nombreProducto;
    });
    if (producto) {
        Object.assign(producto, nuevosDatos);
        console.log("Producto actualizado");
    } else {
        console.log("Producto no encontrado");
    }
}

const eliminarDelCatalogo = (nombreProducto) => {
    var indice = todos.findIndex(item => item.nombre === nombreProducto);
    if (indice !== -1) {
        todos.splice(indice, 1);
        console.log("Producto eliminado del catalogo");
    } else {
        console.log("Producto no encontrado");
    }
};

let pedido           = [];
let pedidosGuardados = [];
let contadorFolio    = 100;

const calcularTotal = () =>
    pedido.reduce((total, item) => total + item.precio * item.cantidad, 0);

const mostrarMenu = () => {
    console.log("         MENU CAFECITO          ");

    console.log("\n  -- BEBIDAS --");
    bebidas.forEach((p, i) =>
        console.log(`  [${i + 1}] ${p.nombre.padEnd(22)} $${p.precio}`)
    );

    console.log("\n  -- ALIMENTOS --");
    alimentos.forEach((p, i) =>
        console.log(`  [${i + 4}] ${p.nombre.padEnd(22)} $${p.precio}`)
    );

    console.log("\n  -- PANADERIA --");
    panaderia.forEach((p, i) =>
        console.log(`  [${i + 7}] ${p.nombre.padEnd(22)} $${p.precio}`)
    );

    console.log("\n ");
};

const mostrarPedido = () => {
    console.log("\n--- Pedido actual ---");
    if (pedido.length === 0) {
        console.log("  (vacio)");
    } else {
        pedido.forEach((item, i) =>
            console.log(`  ${i + 1}. ${item.nombre.padEnd(22)} x${item.cantidad}  $${item.precio * item.cantidad}`)
        );
        console.log(`  Total: $${calcularTotal()}`);
    }
    console.log("");
};

const mostrarTotal = (nombreCliente) => {
    console.log("\n  --- TU PEDIDO ---");
    pedido.forEach((item, i) =>
        console.log(`  ${i + 1}. ${item.nombre} x${item.cantidad}  $${item.precio * item.cantidad}`)
    );
    console.log(`\n  TOTAL A PAGAR: $${calcularTotal()}`);
    console.log(`\nGracias ${nombreCliente}! Tu pedido estara listo en breve.`);
};

const mostrarPedidosGuardados = () => {
    console.log("\n=== PEDIDOS GUARDADOS ===");
    if (pedidosGuardados.length === 0) {
        console.log("  (sin pedidos aun)");
    } else {
        pedidosGuardados.forEach(p => {
            console.log(`\n  Folio  : ${p.folio}`);
            console.log(`  Cliente: ${p.cliente}`);
            p.items.forEach(item =>
                console.log(`    - ${item.nombre} x${item.cantidad}  $${item.precio * item.cantidad}`)
            );
            console.log(`  Total  : $${p.total}`);
        });
    }
    console.log("=========================");
};

const agregarAlPedido = (seleccion, cantidad) => {
    if (seleccion < 1 || seleccion > todos.length) {
        console.log(`  Opcion ${seleccion} no valida.`);
        return;
    }
    const producto  = todos[seleccion - 1];
    const existente = pedido.find(p => p.nombre === producto.nombre);
    if (existente) {
        existente.cantidad += cantidad;
    } else {
        pedido.push({ ...producto, cantidad });
    }
    console.log(`  Agregado: ${producto.nombre} x${cantidad}`);
};

const eliminarDelPedido = (posicion) => {
    if (posicion < 1 || posicion > pedido.length) {
        console.log("  Posicion no valida.");
        return;
    }
    const eliminado = pedido.splice(posicion - 1, 1)[0];
    console.log(`  Eliminado del pedido: ${eliminado.nombre}`);
};

const confirmarPedido = (nombreCliente) => {
    if (pedido.length === 0) {
        console.log("  El pedido esta vacio.");
        return;
    }

    const folio = `PED-${++contadorFolio}`;

    const pedidoFinal = {
        folio,
        cliente : nombreCliente,
        items   : [...pedido],
        total   : calcularTotal(),
    };

    pedidosGuardados.push(pedidoFinal);
    mostrarTotal(nombreCliente);
    console.log(`  Folio: ${folio}`);

    pedido = [];
};

const iniciar = async () => {
    console.log("\nHola Bienvenidos a Cafecito");

    const nombreCliente = await preguntar("\nCual es tu nombre? ");
    console.log(`\nHola ${nombreCliente}! Que vas a ordenar hoy?`);

    mostrarMenu();

    let activo = true;

    while (activo) {
        mostrarPedido();
        console.log("\n  [A] Agregar producto");
        console.log("  [E] Eliminar del pedido");
        console.log("  [P] Ver pedidos guardados");
        console.log("  [C] Confirmar pedido");
        console.log("  [S] Salir");

        const opcion = (await preguntar("\n  Opcion: ")).toUpperCase().trim();

        if (opcion === "A") {
            const id  = parseInt(await preguntar("  Numero de producto : "));
            const cnt = parseInt(await preguntar("  Cantidad           : ")) || 1;
            agregarAlPedido(id, cnt);

        } else if (opcion === "E") {
            const pos = parseInt(await preguntar("  Numero de linea    : "));
            eliminarDelPedido(pos);

        } else if (opcion === "P") {
            mostrarPedidosGuardados();

        } else if (opcion === "C") {
            confirmarPedido(nombreCliente);

        } else if (opcion === "S") {
            console.log("\n  Hasta pronto.\n");
            activo = false;
            rl.close();

        } else {
            console.log(`  Opcion "${opcion}" no valida.`);
        }
    }
};

iniciar();