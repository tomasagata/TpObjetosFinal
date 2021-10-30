function GeneradorVehiculos() {

    if (!(this instanceof GeneradorVehiculos)) {
        return new GeneradorVehiculos();
    }

    this.generarVehiculo = function() {
        // ...
    }

    this.generarVehiculos = function(cant) {
        // ...
    }

}

module.exports = GeneradorVehiculos;