const Operacion = require("./Operacion");

function OperacionRestock(operacion) {
    if (!(this instanceof OperacionRestock)) {
        return new OperacionRestock(operacion);
    }
    
    Operacion.call(this, operacion.beneficio);

    // Setteo de valores de los atributos
    this.tipoOperacion = "Restock";
    this.idVehiculo = "---";
    this.tipoCombustible = operacion.gasolina.tipo;
    this.volumenCargado = operacion.gasolina.litrosProximoRelleno;
    this.balanceCombustibleAnterior = operacion.gasolina.almacenajeActual;
    this.balanceCombustibleNuevo = operacion.gasolina.litrosProximoRelleno + this.balanceCombustibleAnterior;
}

OperacionRestock.prototype = Object.create(Operacion.prototype);
OperacionRestock.prototype.contructor = OperacionRestock.prototype;

module.exports = OperacionRestock;