const readline = require("readline");
const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
const preguntar = (texto) => new Promise(res => rl.question(texto, res));

const ExpresAmericano  = { nombre: "Expres Americano",    precio: 45,  disponible: true };
const Capuccino        = { nombre: "Capuccino",           precio: 60,  disponible: true };
const Latte            = { nombre: "Latte",               precio: 65,  disponible: true };
const SandwichJamon    = { nombre: "Sandwich de Jamon",   precio: 75,  disponible: true };
const EnsaladaCeser    = { nombre: "Ensalada Cesar",      precio: 90,  disponible: true };
const Hamburguesa      = { nombre: "Hamburguesa",         precio: 120, disponible: true };
const Croissant        = { nombre: "Croissant",           precio: 35,  disponible: true };
const DonaChocolate    = { nombre: "Dona de Chocolate",   precio: 30,  disponible: true };
const Muffin           = { nombre: "Muffin de Vainilla",  precio: 40,  disponible: true };

const bebidas   = [ExpresAmericano, Capuccino, Latte];
const alimentos = [SandwichJamon, EnsaladaCeser, Hamburguesa];
const panaderia = [Croissant, DonaChocolate, Muffin];

const todos = [...bebidas, ...alimentos, ...panaderia].map((p, i) => ({ id: i + 1, ...p }));

let pedido        = [];
let pedidosGuardados = [];  
let contadorFolio = 100;

const calcularTotal = () =>
  pedido.reduce((total, item) => total + item.precio * item.cantidad, 0);

const mostrarMenu = () => {
  console.log("         MENU CAFECITO          ");
 
  console.log("\n  -- BEBIDAS --");
  bebidas.forEach(p => {
    const item = todos.find(t => t.nombre === p.nombre);
    console.log(`  [${item.id}] ${p.nombre.padEnd(22)} $${p.precio}`);
  });

  console.log("\n  -- ALIMENTOS --");
  alimentos.forEach(p => {
    const item = todos.find(t => t.nombre === p.nombre);
    console.log(`  [${item.id}] ${p.nombre.padEnd(22)} $${p.precio}`);
  });

  console.log("\n  -- PANADERIA --");
  panaderia.forEach(p => {
    const item = todos.find(t => t.nombre === p.nombre);
    console.log(`  [${item.id}] ${p.nombre.padEnd(22)} $${p.precio}`);
  });

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
  console.log("\n");
};

const mostrarPedidosGuardados = () => {
  console.log("\nPEDIDOS");
  if (pedidosGuardados.length === 0) {
    console.log("  (sin pedidos aun)");
  } else {
    pedidosGuardados.forEach(p => {
      console.log(`\n  Folio : ${p.folio}`);
      console.log(`  Cliente: ${p.cliente}`);
      p.items.forEach(item =>
        console.log(`    - ${item.nombre} x${item.cantidad}  $${item.precio * item.cantidad}`)
      );
      console.log(`  Total : $${p.total}`);
    });
  }
  console.log("\n ");
};

const agregarProducto = (id, cantidad) => {
  const producto = todos.find(p => p.id === id);
  if (!producto) {
    console.log(`  Producto ${id} no existe.`);
    return;
  }
  const existente = pedido.find(p => p.id === id);
  if (existente) {
    existente.cantidad += cantidad;
  } else {
    pedido.push({ ...producto, cantidad });
  }
  console.log(`  Agregado: ${producto.nombre} x${cantidad}`);
};

const eliminarProducto = (posicion) => {
  if (posicion < 1 || posicion > pedido.length) {
    console.log("  Posicion no valida.");
    return;
  }
  const eliminado = pedido.splice(posicion - 1, 1)[0];
  console.log(`  Eliminado: ${eliminado.nombre}`);
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

  console.log(`\n  Pedido confirmado.`);
  console.log(`  Folio  : ${folio}`);
  console.log(`  Cliente: ${nombreCliente}`);
  console.log(`  Total  : $${pedidoFinal.total}`);
  console.log(`  Gracias ${nombreCliente}, tu pedido estara listo en breve.`);
  pedido = [];
};

const iniciar = async () => {
  console.log("\nBienvenido a Cafecito");

  const nombreCliente = await preguntar("¿Cual es tu nombre? ");
  console.log(`\nHola ${nombreCliente}! ¿Que vas a ordenar hoy?`);

  mostrarMenu();

  let activo = true;

  while (activo) {
    mostrarPedido();
    console.log("\n A - Agregar producto");
    console.log("  E -  Eliminar producto");
    console.log("  P - Pedidos");
    console.log("  C - Confirmar pedido");
    console.log("  S - Salir");

    const opcion = (await preguntar("\n  Opcion: ")).toUpperCase().trim();

    if (opcion === "A") {
      const id  = parseInt(await preguntar("  ID del producto : "));
      const cnt = parseInt(await preguntar("  Cantidad        : ")) || 1;
      agregarProducto(id, cnt);

    } else if (opcion === "E") {
      const pos = parseInt(await preguntar("  Numero de linea : "));
      eliminarProducto(pos);

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