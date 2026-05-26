const readline = require("readline");
const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
const preguntar = (texto) => new Promise(res => rl.question(texto, res));

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

const calcularTotal = () =>
  pedido.reduce((total, item) => total + item.precio * item.cantidad, 0);

// map() — construye el menu desde el arreglo
const mostrarMenu = () => {
  const disponibles = productos.filter(p => p.disponible === true);
  console.log("\n         MENU CAFECITO");
  console.log("  #   Producto                Categoria    Precio");
  disponibles.map((p, i) =>
    `  [${i + 1}] ${p.nombre.padEnd(22)}  ${p.categoria.padEnd(10)}  $${p.precio}`
  ).forEach(linea => console.log(linea));
  console.log("");
};

// forEach() — muestra productos en promocion
const mostrarPromociones = () => {
  const enPromocion = productos.filter(p => p.promocion === true);
  console.log("  -- PROMOCIONES DEL DIA (15% descuento) --");
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

const eliminarDelPedido = async () => {
  if (pedidosGuardados.length === 0) {
    console.log("  No hay pedidos guardados.");
    return;
  }
  const folio  = (await preguntar("  Folio a eliminar : ")).trim().toUpperCase();
  const indice = pedidosGuardados.findIndex(p => p.folio === folio);
  if (indice !== -1) {
    pedidosGuardados.splice(indice, 1);
    console.log(`  Pedido ${folio} eliminado.`);
  } else {
    console.log(`  Folio ${folio} no encontrado.`);
  }
};

// Promesa auxiliar que envuelve setTimeout para usar con await
const esperar = (ms, mensaje) => new Promise(res => {
  const pasos     = 20;
  const intervalo = ms / pasos;
  let actual      = 0;

  const barra = setInterval(() => {
    actual++;
    const porcentaje = Math.round((actual / pasos) * 100);
    const relleno    = "*".repeat(actual);
    const vacio      = " ".repeat(pasos - actual);
    process.stdout.write(`\r  ${mensaje}  [${relleno}${vacio}] ${porcentaje}%`);

    if (actual === pasos) {
      clearInterval(barra);
      process.stdout.write(`\r  ${mensaje}  [${"*".repeat(pasos)}] 100%\n`);
      res();
    }
  }, intervalo);
});

// async/await — Transcure los procesos conforme a los tiempos definidos.
const mostrarEstados = async (folio) => {
  console.log(`\n  Folio ${folio} — seguimiento:`);

  await esperar(1000,  "Pedido recibido");
  await esperar(10000, "Preparando el pedido");
  await esperar(10000, "Empacando su pedido");
  await esperar(1500,  "                  ");

  const entregado = Math.random() > 0.2;
  if (entregado) {
    console.log("  Pedido entregado");
  } else {
    console.log("  Pedido cancelado");
  }
};

const confirmarPedido = async (nombreCliente) => {
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
  pedido.forEach(item =>
    console.log(`    - ${item.nombre} x${item.cantidad}  $${item.precio * item.cantidad}`)
  );
  console.log(`  Total  : $${pedidoFinal.total}`);
  console.log(`\n  Gracias ${nombreCliente}! Tu pedido estara listo en breve.`);

  await mostrarEstados(folio);

  pedido = [];
};

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
    console.log("  2 - Eliminar pedido guardado");
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
      await eliminarDelPedido();

    } else if (opcion === "3") {
      mostrarMenu();
      mostrarPromociones();

    } else if (opcion === "4") {
      mostrarPedidosGuardados();

    } else if (opcion === "5") {
      await confirmarPedido(nombre);

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
