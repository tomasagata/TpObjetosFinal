const OperacionCarga = require("./OperacionCarga");

function OperacionCargaIncompleta(operacion) {
    if (!(this instanceof OperacionCargaIncompleta)) {
        return new OperacionCargaIncompleta(operacion);
    }

    OperacionCarga.call(this, operacion);

    // Setteo de valores de los atributos
    this.tipoOperacion = "Carga Incompleta";
    this.volumenCargado = 0;
    this.balanceCombustibleNuevo = this.balanceCombustibleAnterior;
}

OperacionCargaIncompleta.prototype = Object.create(OperacionCarga.prototype);
OperacionCargaIncompleta.prototype.contructor = OperacionCargaIncompleta.prototype;

module.exports = OperacionCargaIncompleta;
