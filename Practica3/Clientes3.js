const readline = require("readline");
const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
const preguntar = (texto) => new Promise(res => rl.question(texto, res));

// Menu
const productos = [
  { nombre: "Expres Americano",  precio: 45,  categoria: "Bebida",    disponible: true,  promocion: true  },
  { nombre: "Capuccino",         precio: 60,  categoria: "Bebida",    disponible: true,  promocion: false },
  { nombre: "Latte",             precio: 65,  categoria: "Bebida",    disponible: false, promocion: false },
  { nombre: "Sandwich de Jamon", precio: 75,  categoria: "Alimento",  disponible: true,  promocion: false },
  { nombre: "Ensalada Cesar",    precio: 90,  categoria: "Alimento",  disponible: true,  promocion: true  },
  { nombre: "Hamburguesa",       precio: 120, categoria: "Alimento",  disponible: false, promocion: false },
  { nombre: "Croissant",         precio: 35,  categoria: "Panaderia", disponible: true,  promocion: false },
  { nombre: "Dona de Chocolate", precio: 30,  categoria: "Panaderia", disponible: true,  promocion: true  },
  { nombre: "Muffin de Vainilla",precio: 40,  categoria: "Panaderia", disponible: true,  promocion: false },
];

const DESCUENTO = 0.15;

let pedido           = [];
let pedidosGuardados = [];
let contadorFolio    = 100;

// Funciones
const calcularTotal = () =>
  pedido.reduce((total, item) => total + item.precio * item.cantidad, 0);

// map()
const mostrarMenu = () => {
  const disponibles = productos.filter(p => p.disponible === true);

  console.log("\n         MENU CAFECITO");
  console.log("  #   Producto                Categoria    Precio");

  disponibles.map((p, i) =>
    `  [${i + 1}] ${p.nombre.padEnd(22)}  ${p.categoria.padEnd(10)}  $${p.precio}`
  ).forEach(linea => console.log(linea));

  console.log("");
};

// forEach()
const mostrarPromociones = () => {
  const enPromocion = productos.filter(p => p.promocion === true);

  console.log("\n  -- PROMOCIONES DEL DIA (15% descuento) --");
  enPromocion.forEach(p => {
    const precioFinal = (p.precio * (1 - DESCUENTO)).toFixed(2);
    console.log(`  ${p.nombre.padEnd(22)}  $${p.precio} -> $${precioFinal}`);
  });
  console.log("");
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

const mostrarPedidosGuardados = () => {
  console.log("\nPEDIDOS GUARDADOS");
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
  console.log("");
};

const agregarAlPedido = (seleccion, cantidad) => {
  const disponibles = productos.filter(p => p.disponible === true);
  if (seleccion < 1 || seleccion > disponibles.length) {
    console.log(`  Opcion ${seleccion} no valida.`);
    return;
  }
  const producto  = disponibles[seleccion - 1];
  const existente = pedido.find(p => p.nombre === producto.nombre);
  if (existente) {
    existente.cantidad += cantidad;
  } else {
    pedido.push({ ...producto, cantidad });
  }
  console.log(`  Agregado: ${producto.nombre} x${cantidad}`);
};

// Elimina un pedido guardado buscandolo por su folio
const eliminarPedidoPorFolio = (folio) => {
  const indice = pedidosGuardados.findIndex(p => p.folio === folio);
  if (indice === -1) {
    console.log(`  Folio ${folio} no encontrado.`);
    return;
  }
  pedidosGuardados.splice(indice, 1);
  console.log(`  Pedido ${folio} eliminado.`);
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
  pedido.forEach((item, i) =>
    console.log(`    ${i + 1}. ${item.nombre} x${item.cantidad}  $${item.precio * item.cantidad}`)
  );
  console.log(`  Total  : $${pedidoFinal.total}`);
  console.log(`\n  Gracias ${nombreCliente}! Tu pedido estara listo en breve.`);

  pedido = [];
};

// Inicio

const iniciar = async () => {
  console.log("\nBienvenido a Cafecito");

  const nombre = await preguntar("\n¿Cual es tu nombre? ");
  console.log(`\nHola, ${nombre}!`);

  mostrarMenu();
  mostrarPromociones();

  let activo = true;

  while (activo) {
    mostrarPedido();
    console.log("  1 - Agregar producto");
    console.log("  2 - Eliminar pedido por folio");
    console.log("  3 - Mostrar menu");
    console.log("  4 - Pedidos guardados");
    console.log("  5 - Confirmar pedido");
    console.log("  6 - Salir");

    const opcion = (await preguntar("\n  Opcion: ")).trim();

    if (opcion === "1") {
      const id  = parseInt(await preguntar("  Numero de producto : "));
      const cnt = parseInt(await preguntar("  Cantidad           : ")) || 1;
      agregarAlPedido(id, cnt);

    } else if (opcion === "2") {
      mostrarPedidosGuardados();
      const folio = (await preguntar("  Folio a eliminar   : ")).trim().toUpperCase();
      eliminarPedidoPorFolio(folio);

    } else if (opcion === "3") {
      mostrarMenu();
      mostrarPromociones();

    } else if (opcion === "4") {
      mostrarPedidosGuardados();

    } else if (opcion === "5") {
      confirmarPedido(nombre);

    } else if (opcion === "6") {
      console.log(`\n  Hasta pronto, ${nombre}.\n`);
      activo = false;
      rl.close();

    } else {
      console.log(`  Opcion "${opcion}" no valida.`);
    }
  }
};

iniciar();