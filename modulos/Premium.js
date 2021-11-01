const Gasolina = require("./Gasolina");

/* Premium extends Gasolina*/
function Premium(costo = 2.3, almacenajeMax = 750, almacenajeActual = almacenajeMax) {

    if (!(this instanceof Premium)) {
        return new Premium(costo, almacenajeMax, almacenajeActual);
    }

    Gasolina.call(this, costo, almacenajeMax, almacenajeActual);
}

Premium.prototype = Object.create(Gasolina.prototype);
Premium.prototype.constructor = Premium.prototype;

module.exports = Premium;