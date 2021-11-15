const Operacion = require("./Operacion");

function OperacionCarga(operacion) {
    if (!(this instanceof OperacionCarga)) {
        return new OperacionCarga(operacion);
    }
    
    Operacion.call(this, operacion.beneficio);

    this.tipoOperacion = "Carga";
    this.idVehiculo = operacion.vehiculo.id;
    this.tipoCombustible = operacion.vehiculo.tipoCombustible.tipo;
    this.volumenCargado = operacion.vehiculo.capacidad - operacion.vehiculo.cantCombustible;
    this.balanceCombustibleAnterior = operacion.vehiculo.tipoCombustible.almacenajeActual;
    this.balanceCombustibleNuevo = this.balanceCombustibleAnterior - this.volumenCargado;
}

OperacionCarga.prototype = Object.create(Operacion.prototype);
OperacionCarga.prototype.contructor = OperacionCarga.prototype;

module.exports = OperacionCarga;