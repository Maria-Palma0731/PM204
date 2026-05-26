const readline = require("readline");
const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
const preguntar = (texto) => new Promise(res => rl.question(texto, res));

var ExpresAmericano = new Object();
ExpresAmericano.nombre     = "Expres Americano";
ExpresAmericano.precio     = 45;
ExpresAmericano.categoria  = "bebida";
ExpresAmericano.disponible = true;
ExpresAmericano.promocion  = true;

var Capuccino = new Object();
Capuccino.nombre     = "Capuccino";
Capuccino.precio     = 60;
Capuccino.categoria  = "bebida";
Capuccino.disponible = true;
Capuccino.promocion  = false;

var Latte = new Object();
Latte.nombre     = "Latte";
Latte.precio     = 65;
Latte.categoria  = "bebida";
Latte.disponible = false;
Latte.promocion  = false;

var SandwichJamon = new Object();
SandwichJamon.nombre     = "Sandwich de Jamon";
SandwichJamon.precio     = 75;
SandwichJamon.categoria  = "alimento";
SandwichJamon.disponible = true;
SandwichJamon.promocion  = false;

var EnsaladaCeser = new Object();
EnsaladaCeser.nombre     = "Ensalada Cesar";
EnsaladaCeser.precio     = 90;
EnsaladaCeser.categoria  = "alimento";
EnsaladaCeser.disponible = true;
EnsaladaCeser.promocion  = true;

var Hamburguesa = new Object();
Hamburguesa.nombre     = "Hamburguesa";
Hamburguesa.precio     = 120;
Hamburguesa.categoria  = "alimento";
Hamburguesa.disponible = false;
Hamburguesa.promocion  = false;

var Croissant = new Object();
Croissant.nombre     = "Croissant";
Croissant.precio     = 35;
Croissant.categoria  = "postre";
Croissant.disponible = true;
Croissant.promocion  = false;

var DonaChocolate = new Object();
DonaChocolate.nombre     = "Dona de Chocolate";
DonaChocolate.precio     = 30;
DonaChocolate.categoria  = "postre";
DonaChocolate.disponible = true;
DonaChocolate.promocion  = true;

var Muffin = new Object();
Muffin.nombre     = "Muffin de Vainilla";
Muffin.precio     = 40;
Muffin.categoria  = "postre";
Muffin.disponible = true;
Muffin.promocion  = false;

var bebidas   = [ExpresAmericano, Capuccino, Latte];
var alimentos = [SandwichJamon, EnsaladaCeser, Hamburguesa];
var panaderia = [Croissant, DonaChocolate, Muffin];

var catalogo  = [ExpresAmericano, Capuccino, Latte,
                 SandwichJamon, EnsaladaCeser, Hamburguesa,
                 Croissant, DonaChocolate, Muffin];

// MODULO CLIENTE

const DESCUENTO = 0.15;
const IVA       = 0.16;

let pedido           = [];
let pedidosGuardados = [];
let contadorFolio    = 100;

// [CLIENTE] map() — genera el menu solo desde el arreglo
const mostrarMenu = () => {
  const disponibles = catalogo.filter(p => p.disponible === true);
  console.log("\n         MENU CAFECITO");
  console.log("  #   Producto                Categoria    Precio");
  disponibles.map((p, i) =>
    `  [${i + 1}] ${p.nombre.padEnd(22)}  ${p.categoria.padEnd(10)}  $${p.precio}`
  ).forEach(linea => console.log(linea));
  console.log("");
};

// [CLIENTE] forEach() — muestra solo productos en promocion
const mostrarPromociones = () => {
  const enPromocion = catalogo.filter(p => p.promocion === true);
  console.log("  -- PROMOCIONES DEL DIA (15% descuento) --");
  enPromocion.forEach(p => {
    const precioFinal = (p.precio * (1 - DESCUENTO)).toFixed(2);
    console.log(`  ${p.nombre.padEnd(22)}  $${p.precio} -> $${precioFinal}`);
  });
  console.log("");
};

// [CLIENTE] muestra los productos del pedido en curso
const mostrarPedido = () => {
  console.log("\n--- Pedido actual ---");
  if (pedido.length === 0) {
    console.log("  (vacio)");
  } else {
    pedido.forEach((item, i) =>
      console.log(`  ${i + 1}. ${item.nombre.padEnd(22)} x${item.cantidad}  $${item.precio * item.cantidad}`)
    );
    console.log(`  Subtotal: $${calcularSubtotal().toFixed(2)}`);
  }
  console.log("");
};

// [CLIENTE] agrega un producto al pedido actual
const agregarAlPedido = (seleccion, cantidad) => {
  const disponibles = catalogo.filter(p => p.disponible === true);
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

// MODULO CAJA

// [CAJA] reduce + destructuring — suma el subtotal del pedido
const calcularSubtotal = () =>
  pedido.reduce((acumulador, producto) => {
    var { precio } = producto;
    return acumulador + precio * producto.cantidad;
  }, 0);

// [CAJA] muestra todos los pedidos confirmados con IVA y total
const mostrarPedidosGuardados = () => {
  console.log("\nPEDIDOS GUARDADOS");
  if (pedidosGuardados.length === 0) {
    console.log("  (sin pedidos aun)");
  } else {
    pedidosGuardados.forEach(p => {
      console.log(`\n  Folio   : ${p.folio}`);
      console.log(`  Cliente : ${p.cliente}`);
      p.items.forEach(item => {
        var { nombre, precio } = item;   // destructuring
        console.log(`    - ${nombre} x${item.cantidad}  $${precio * item.cantidad}`);
      });
      console.log(`  Subtotal: $${p.subtotal.toFixed(2)}`);
      console.log(`  IVA 16% : $${p.iva.toFixed(2)}`);
      console.log(`  Total   : $${p.total.toFixed(2)}`);
    });
  }
  console.log("");
};

// [CAJA] elimina un pedido guardado buscandolo por folio
const eliminarPedidoGuardado = async () => {
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

// [CAJA] confirma el pedido, calcula IVA y guarda con folio
const confirmarPedido = (nombreCliente) => {
  if (pedido.length === 0) {
    console.log("  El pedido esta vacio.");
    return;
  }
  const folio    = `PED-${++contadorFolio}`;
  const subtotal = calcularSubtotal();
  const iva      = subtotal * IVA;
  const total    = subtotal + iva;

  const pedidoFinal = { folio, cliente: nombreCliente, items: [...pedido], subtotal, iva, total };
  pedidosGuardados.push(pedidoFinal);

  console.log(`\n  Pedido confirmado.`);
  console.log(`  Folio   : ${folio}`);
  console.log(`  Cliente : ${nombreCliente}`);
  pedido.forEach(item => {
    var { nombre, precio } = item;   // destructuring
    console.log(`    - ${nombre} x${item.cantidad}  $${precio * item.cantidad}`);
  });
  console.log(`\n  Subtotal: $${subtotal.toFixed(2)}`);
  console.log(`  IVA 16% : $${iva.toFixed(2)}`);
  console.log(`  Total   : $${total.toFiMARxed(2)}`);
  console.log(`\n  Gracias ${nombreCliente}! Tu pedido estara listo en breve.`);

  pedido = [];
};

// MODULO COCINA

// [COCINA] muestra todos los productos del catalogo
function mostrarCatalogo() {
  console.log("\n========= CATALOGO =========");
  catalogo.forEach(function(producto) {
    console.log("Nombre: " + producto.nombre + " | Precio: $" + producto.precio + " | Disponible: " + producto.disponible);
  });
}

// [COCINA] agrega un producto nuevo al catalogo
function agregarProducto(producto) {
  catalogo.push(producto);
  console.log("Producto agregado correctamente");
}

// [COCINA] busca un producto por nombre y actualiza sus datos
function actualizarProducto(nombreProducto, nuevosDatos) {
  var producto = catalogo.find(function(item) {
    return item.nombre === nombreProducto;
  });
  if (producto) {
    Object.assign(producto, nuevosDatos);
    console.log("Producto actualizado");
  } else {
    console.log("Producto no encontrado");
  }
}

// [COCINA] elimina un producto del catalogo por nombre
function eliminarDelCatalogo(nombreProducto) {
  var indice = catalogo.findIndex(function(item) {
    return item.nombre === nombreProducto;
  });
  if (indice !== -1) {
    catalogo.splice(indice, 1);
    console.log("Producto eliminado del catalogo");
  } else {
    console.log("Producto no encontrado");
  }
}

// [COCINA] filter() — busqueda interactiva por precio o categoria
async function buscar() {
  console.log("\nQue quieres buscar?");
  console.log("1. Productos baratos");
  console.log("2. Productos caros");
  console.log("3. Bebidas");
  console.log("4. Postres");

  var tipo = await preguntar("\nElige una opcion: ");

  if (tipo === "1") {
    var input    = await preguntar("Mostrar productos menores a: $");
    var limite   = Number(input);
    var resultado = catalogo.filter(function(producto) { return producto.precio < limite; });
    console.log(`\nProductos menores a $${limite}:`);
    resultado.forEach(function(p) { console.log(p.nombre + " - $" + p.precio); });

  } else if (tipo === "2") {
    var input    = await preguntar("Mostrar productos mayores a: $");
    var limite   = Number(input);
    var resultado = catalogo.filter(function(producto) { return producto.precio > limite; });
    console.log(`\nProductos mayores a $${limite}:`);
    resultado.forEach(function(p) { console.log(p.nombre + " - $" + p.precio); });

  } else if (tipo === "3") {
    var resultado = catalogo.filter(function(producto) { return producto.categoria === "bebida"; });
    console.log("\nBebidas:");
    resultado.forEach(function(p) { console.log(p.nombre + " - $" + p.precio); });

  } else if (tipo === "4") {
    var resultado = catalogo.filter(function(producto) { return producto.categoria === "postre"; });
    console.log("\nPostres:");
    resultado.forEach(function(p) { console.log(p.nombre + " - $" + p.precio); });

  } else {
    console.log("Opcion no valida.");
  }
}

// INICIO

const iniciar = async () => {
  console.log("\nBienvenido a Cafecito");

  const nombre = await preguntar("\n¿Cual es tu nombre? ");
  console.log(`\nHola, ${nombre}!`);

  mostrarMenu();
  mostrarPromociones();

  let activo = true;

  while (activo) {
    mostrarPedido();
    console.log("  PEDIDO:");
    console.log("  1 - Agregar producto");
    console.log("  2 - Confirmar pedido");
    console.log("  CAJA:");
    console.log("  3 - Pedidos guardados");
    console.log("  4 - Eliminar pedido por folio");
    console.log("  COCINA:");
    console.log("  5 - Ver catalogo");
    console.log("  6 - Buscar productos");
    console.log("  7 - Agregar al catalogo");
    console.log("  8 - Actualizar producto");
    console.log("  9 - Eliminar del catalogo");
    console.log("  0 - Salir");

    const opcion = (await preguntar("\n  Opcion: ")).trim();

    switch (opcion) {
      case "1":
        const id  = parseInt(await preguntar("  Numero de producto : "));
        const cnt = parseInt(await preguntar("  Cantidad           : ")) || 1;
        agregarAlPedido(id, cnt);
        break;

      case "2":
        confirmarPedido(nombre);
        break;

      case "3":
        mostrarPedidosGuardados();
        break;

      case "4":
        await eliminarPedidoGuardado();
        break;

      case "5":
        mostrarCatalogo();
        break;

      case "6":
        await buscar();
        break;

      case "7":
        var nomb = await preguntar("  Nombre     : ");
        var prec = await preguntar("  Precio     : $");
        var cat  = await preguntar("  Categoria  (bebida / alimento / postre): ");
        var nuevo = new Object();
        nuevo.nombre     = nomb;
        nuevo.precio     = Number(prec);
        nuevo.categoria  = cat;
        nuevo.disponible = true;
        nuevo.promocion  = false;
        agregarProducto(nuevo);
        break;

      case "8":
        var nomb = await preguntar("  Nombre del producto : ");
        var prec = await preguntar("  Nuevo precio        : $");
        actualizarProducto(nomb, { precio: Number(prec) });
        break;

      case "9":
        var nomb = await preguntar("  Nombre del producto : ");
        eliminarDelCatalogo(nomb);
        break;

      case "0":
        console.log(`\n  Hasta pronto, ${nombre}.\n`);
        activo = false;
        rl.close();
        break;

      default:
        console.log(`  Opcion "${opcion}" no valida.`);
    }
  }
};

iniciar();