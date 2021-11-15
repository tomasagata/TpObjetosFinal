const Diesel = require("./Diesel");
const Premium = require("./Premium");
const Regular = require("./Regular");

const Gasolinera = (function() {
    // Array de Gasolinas a usar
    let gasolinas = [new Regular(), new Premium(), new Diesel()];

    // Función para obtener la Gasolina en función del nombre
    function getGasolina(nombre) {
        return gasolinas.filter(gasolina => gasolina.tipo === nombre)[0];
    }

    return {
        gasolinas,
        getGasolina
    }
})();

module.exports = Gasolinera;
