const Diesel = require("./Diesel");
const Premium = require("./Premium");
const Regular = require("./Regular");

const Gasolinera = (function() {
    let gasolinas = [new Regular(), new Premium(), new Diesel()];

    function getGasolina(nombre) {
        var i;
        for (i = 0; i < gasolinas.length; i++) {
            if (gasolinas[i].tipo === nombre) {
                return gasolinas[i];
            }
        }
    }

    return {
        gasolinas,
        getGasolina
    }
})();

module.exports = Gasolinera;
