const { Gasolina } = require("./Gasolina.js");

/* Regular extends Gasolina */
function Regular(costo = 1, almacenajeMax = 1000, almacenajeActual = almacenajeMax) {

    if (!(this instanceof Regular)) {
        return new Regular(costo, almacenajeMax, almacenajeActual);
    }

    Gasolina.call(this, costo, almacenajeMax, almacenajeActual, "Regular", 6);
}

Regular.prototype = Object.create(Gasolina.prototype);
Regular.prototype.constructor = Regular.prototype;

module.exports = Regular;
