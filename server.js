// Improtación de dependencias
const express = require('express');
const hbs = require('hbs');
const CentroDeControl = require("./modulos/CentroDeControl");
const generadorVehiculos = require("./modulos/GeneradorVehiculos");
const generarTabla = require("./controladores/generarTabla");
const generarBotonesNavegacion = require("./controladores/generarBotonesNavegacion");
const calculoTotal = require("./controladores/calculoTotal");
// Puerto
const port = 3000;
// Inicialización de la App
let app = express();
app.set('view-engine', 'hbs');
app.use(express.urlencoded())
app.use(express.json())
// Inicialización de estructuras y Objetos a usar
const cdc = new CentroDeControl();
let arrVei = [];
let tickets = [];

// Función para la generación de la paginación
const generarPaginacion = (pagina, limite) => {
    // Cálculo de las variables que determinan los valores de la paginación
    pagina = parseInt(pagina) > 0 ? parseInt(pagina) : 1;
    limite = parseInt(limite) >= 0 ? parseInt(limite) : tickets.length;
    const offsetInicio = (pagina - 1) * limite;
    const offsetFin = pagina * limite;
    let resultado = {};

    // Solo en caso de que los offset sean válidos se genera el siguiente / anterior
    if (offsetFin < tickets.length) {
        resultado.siguiente = {
            pagina: pagina + 1,
            limite,
        };
    }

    if (offsetInicio > 0) {
        resultado.anterior = {
            pagina: pagina - 1,
            limite,
        };
    }

    // Se agrega al objeto de resultados los tickets que se utilizarán
    resultado.resultados = tickets.slice(offsetInicio, offsetFin);
    return resultado;
}

app.post("/generar_tickets", (req, res) => {
    tickets = tickets.concat(cdc.facturarCargas(arrVei, true));
    arrVei = [];
    res.sendStatus(200);
});

// Vista de los tickets
app.get("/generar_tickets", (req, res) => {
    let paginacion = generarPaginacion(req.query.pagina, req.query.limite);
    let tablaDeTickets = generarTabla(paginacion.resultados, calculoTotal(paginacion.resultados));
    let botonesNavegacion = generarBotonesNavegacion(paginacion.anterior, paginacion.siguiente);
    // Renderización del .hbs con los valores obtenidos
    res.render("ticket.hbs", {
        tablaDeTickets,
        botonesNavegacion
    });
});

// Generar CANT vehiculos de manera aleatoria
app.get("/generar_vehiculos_random", (req, res) => {
    arrVei = arrVei.concat(generadorVehiculos.generarVehiculosRandom(parseInt(req.query.cant)));
    res.sendStatus(200);
});

app.get("/vehiculos", (req, res) => {
    res.send(arrVei);
});

// Vista del sistema de creación manual de vehículos
app.get("/crear_vehiculo", (req, res) => {
    res.render("creacionDeVehiculos.hbs");
});

// Creación del vehículo
app.post("/crear_vehiculo", (req, res) => {
    // Armado del objeto a usar para la creación de este
    let vehiculo = {
        tipoVehiculo: req.body.tipoVehiculo,
        tipoCombustible: req.body.tipoCombustible,
    };

    if (req.body.capacidad != '') {
        vehiculo.capacidad = parseFloat(req.body.capacidad);
    }
    if (req.body.cantidadCombustible != '') {
        vehiculo.cantCombustible = parseFloat(req.body.cantidadCombustible);
    }
    // Creación del vehículo
    let nuevoVehiculo = generadorVehiculos.generarVehiculo(vehiculo);
    arrVei.push(nuevoVehiculo);

    // Renderizado del mensaje de realización
    res.render("vehiculoCreado.hbs", {
        id: nuevoVehiculo.id,
        capacidad: nuevoVehiculo.capacidad,
        cantidadCombustible: nuevoVehiculo.cantCombustible,
        tipoCombustible: nuevoVehiculo.tipoCombustible.tipo,
    });
});

// Inicialización de la App
app.listen(port, () => {
    console.log("Server Running in port ", port);
})
