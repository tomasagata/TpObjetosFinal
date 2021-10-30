const Auto = require("./Auto");

function GeneradorVehiculos() {

    if (!(this instanceof GeneradorVehiculos)) {
        return new GeneradorVehiculos();
    }

    this.generarVehiculo = function() {
        let auto = Auto();
        return auto;
    }

    this.generarVehiculos = function(cant) {
        let arr = [];
        for (let i = 0; i < cant; i++) {
            arr.push(this.generarVehiculo());
        }
        return arr;
    }

}

module.exports = GeneradorVehiculos;