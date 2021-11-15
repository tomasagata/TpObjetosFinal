const express = require('express');
const hbs = require('hbs');
const CentroDeControl = require("./modulos/CentroDeControl");
const generadorVehiculos = require("./modulos/GeneradorVehiculos");
const generarTabla = require("./controladores/generarTabla");
const generarBotonesNavegacion = require("./controladores/generarBotonesNavegacion");
const calculoTotal = require("./controladores/calculoTotal");
const port = 3000;

let app = express();
app.set('view-engine', 'hbs');
app.use(express.urlencoded())
app.use(express.json())

const cdc = new CentroDeControl();
let arrVei = [];
let tickets = [];

const generarPaginacion = (pagina, limite) => {
    pagina = parseInt(pagina) > 0 ? parseInt(pagina) : 1;
    limite = parseInt(limite) >= 0 ? parseInt(limite) : tickets.length;
    const offsetInicio = (pagina - 1) * limite;
    const offsetFin = pagina * limite;
    let resultado = {};

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

    resultado.resultados = tickets.slice(offsetInicio, offsetFin);
    return resultado;
}

app.post("/generar_tickets", (req, res) => {
    tickets = cdc.facturarCargas(arrVei, true);
    res.sendStatus(200);
});

app.get("/generar_tickets", (req, res) => {
    let paginacion = generarPaginacion(req.query.pagina, req.query.limite);
    let tablaDeTickets = generarTabla(paginacion.resultados, calculoTotal(paginacion.resultados));
    let botonesNavegacion = generarBotonesNavegacion(paginacion.anterior, paginacion.siguiente);
    res.render("ticket.hbs", {
        tablaDeTickets, 
        botonesNavegacion
    });
});

app.post("/generar_vehiculos_random", (req, res) => {
    arrVei = arrVei.concat(generadorVehiculos.generarVehiculosRandom(parseInt(req.query.cant)));
    res.sendStatus(200);
});

app.get("/generar_vehiculo", (req, res) => {
    res.send(arrVei);
});

app.get("/crear_vehiculo", (req, res) => {
    res.render("creacionDeVehiculos.hbs");
});

app.post("/crear_vehiculo", (req, res) => {
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
    // console.log(req.body, vehiculo);
    let nuevoVehiculo = generadorVehiculos.generarVehiculo(vehiculo);
    arrVei.push(nuevoVehiculo);

    
    res.render("vehiculoCreado.hbs", {
        id: nuevoVehiculo.id,
        capacidad: nuevoVehiculo.capacidad,
        cantidadCombustible: nuevoVehiculo.cantCombustible,
        tipoCombustible: nuevoVehiculo.tipoCombustible.tipo,
    });
});

app.listen(port, () => {
    console.log("Server Running in port ", port);
})
