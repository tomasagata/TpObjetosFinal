const express = require('express');
const CentroDeControl = require("./modulos/CentroDeControl");
const generadorVehiculos = require("./modulos/GeneradorVehiculos");
const app = express();
const port = 3000;

let cdc = new CentroDeControl();


app.get("/generar_vehiculo", (req, res) => {
    let arrVei = generadorVehiculos.generarVehiculos(parseInt(req.query.cant));
    let arrRes = [];
    arrVei.forEach((vei) => {
        arrRes = arrRes.concat(cdc.facturarCarga(vei));
    });

    res.send(arrRes);
});


app.listen(port, () => {
    console.log("Server Running in port ", port);
})
