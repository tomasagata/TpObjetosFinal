const Diesel = require("./Diesel");
const Premium = require("./Premium");
const Regular = require("./Regular");

const Gasolinera = (function() {
    let gasolinas = [new Regular(), new Premium(), new Diesel()];

    function getGasolina(nombre) {
        return gasolinas.filter(gasolina => gasolina.tipo === nombre)[0];
    }

    return {
        gasolinas,
        getGasolina
    }
})();

module.exports = Gasolinera;
