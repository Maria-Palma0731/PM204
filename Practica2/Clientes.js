const menu = [
    /*Agrgar productos de menu*/
];

let pedido = [];

const calcularTotal = () =>
  pedido.reduce((total, item) => total + item.precio * item.cantidad, 0);

const mostrarMenu = () => {
  console.log("        MENU        "); 
  menu.forEach(p => console.log(`  [${p.id}] ${p.nombre.padEnd(20)} $${p.precio}`));
};

const mostrarPedido = () => {
  console.log("\n--- Pedido ---");
  if (pedido.length === 0) {
    console.log("  (vacio)");
  } else {
    pedido.forEach((item, i) =>
      console.log(`  ${i + 1}. ${item.nombre} x${item.cantidad}  $${item.precio * item.cantidad}`)
    );
    console.log(`  Total: $${calcularTotal()}`);
  }
  console.log("     ");
};

const mostrarOpciones = () => {
  console.log("\n  [A] Agregar producto");
  console.log("  [E] Eliminar producto");
  console.log("  [C] Confirmar pedido");
  console.log("  [S] Salir");
};

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
const preguntar = (texto) => new Promise(res => rl.question(texto, res));

const iniciar = async () => {
  console.log("\n  Bienvenido a Cafesito");
  mostrarMenu();

  let activo = true;

  while (activo) {
    mostrarPedido();
    mostrarOpciones();
    const opcion = (await preguntar("\n  Opcion: ")).toUpperCase().trim();

    if (opcion === "A") {
      const id  = parseInt(await preguntar("  Producto : "));
      const cnt = parseInt(await preguntar("  Cantidad        : ")) || 1;
      agregarProducto(id, cnt);

    } else if (opcion === "E") {
      const pos = parseInt(await preguntar("  Posicion : "));
      eliminarProducto(pos);

    } else if (opcion === "C") {
      confirmarPedido();

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
