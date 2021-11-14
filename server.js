const express = require('express');
const hbs = require('hbs');
const CentroDeControl = require("./modulos/CentroDeControl");
const generadorVehiculos = require("./modulos/GeneradorVehiculos");
const generarTabla = require("./controladores/generarTabla");
const generarBotonesNavegacion = require("./controladores/generarBotonesNavegacion");
const port = 3000;

let app = express();
app.set('view-engine', 'hbs');

const cdc = new CentroDeControl();
let arrVei = [];
let tickets = [];

const generarPaginacion = (pagina, limite) => {
    pagina = parseInt(pagina) > 0 ? parseInt(pagina) : 1;
    limite = parseInt(limite) >= 0 ? parseInt(limite) : 1;
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
    let tablaDeTickets = generarTabla(paginacion.resultados);
    let botonesNavegacion = generarBotonesNavegacion(paginacion.anterior, paginacion.siguiente);
    res.render("ticket.hbs", {
        tablaDeTickets, 
        botonesNavegacion
    });
});

app.post("/generar_vehiculo", (req, res) => {
    arrVei = generadorVehiculos.generarVehiculos(parseInt(req.query.cant));
    res.sendStatus(200);
});

app.get("/generar_vehiculo", (req, res) => {
    res.send(arrVei);
});

app.listen(port, () => {
    console.log("Server Running in port ", port);
})
