const OperacionRestock = require("./OperacionRestock");

function OperacionSolicitudRestock(operacion) {
    if (!(this instanceof OperacionSolicitudRestock)) {
        return new OperacionSolicitudRestock(operacion);
    }
    
    OperacionRestock.call(this, operacion);

    // Setteo de valores de los atributos
    this.tipoOperacion = "Solicitud Restock";
    this.volumenCargado = 0;
    this.balanceCombustibleNuevo = this.balanceCombustibleAnterior;
}

OperacionSolicitudRestock.prototype = Object.create(OperacionRestock.prototype);
OperacionSolicitudRestock.prototype.contructor = OperacionSolicitudRestock.prototype;

module.exports = OperacionSolicitudRestock;