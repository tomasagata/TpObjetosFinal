const express = require('express');
const CentroDeControl = require("./modulos/CentroDeControl");
const generadorVehiculos = require("./modulos/GeneradorVehiculos");
const app = express();
const port = 3000;

const cdc = new CentroDeControl();


app.get("/generar_vehiculo", (req, res) => {
    let arrVei = generadorVehiculos.generarVehiculosRandom(parseInt(req.query.cant));

    res.send(cdc.facturarCargas(arrVei, true));
});


app.listen(port, () => {
    console.log("Server Running in port ", port);
})
