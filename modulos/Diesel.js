const Gasolina = require("./Gasolina");

/* Diesel extends Gasolina */
function Diesel(costo = 0.7, almacenajeMax = 2000, almacenajeActual = almacenajeMax) {

    if (!(this instanceof Diesel)) {
        return new Diesel(costo, almacenajeMax, almacenajeActual);
    }

    Gasolina.call(this, costo, almacenajeMax, almacenajeActual, "Diesel");
}

Diesel.prototype = Object.create(Gasolina.prototype);
Diesel.prototype.constructor = Diesel.prototype;

module.exports = Diesel;