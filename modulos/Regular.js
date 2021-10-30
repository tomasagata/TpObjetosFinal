const Gasolina = require("./Gasolina");

/* Regular extends Gasolina */
function Regular(costo = 1, almacenajeMax = 1000, almacenajeActual = almacenajeMax) {

    if (!(this instanceof Regular)) {
        return new Regular(costo, almacenajeMax, almacenajeActual);
    }

    Gasolina.call(this);

    var _costo;
    var _almacenajeMax;
    var _almacenajeActual;

    Object.defineProperty(this, "costo", {
        set(valor) {
            if (valor > 0) {
                _costo = valor;
            } else {
                throw new Error("[-] Costo inválido.");
            }
        },
        get() { return _costo; }
    });

    Object.defineProperty(this, "almacenajeMax", {
        set(valor) {
            if (valor >= 0) {
                _almacenajeMax = valor;
            } else {
                throw new Error("[-] Almacenaje máximo inválido.");
            }
        },
        get() { return _almacenajeMax; }
    });

    Object.defineProperty(this, "almacenajeActual", {
        set(valor) {
            if (valor > _almacenajeMax) {
                throw new Error("[-] Almacenaje actual supera máximo permitido");
            } else if (valor >= _almacenajeMax / 2) {
                _almacenajeActual = valor;
            } else if (valor >= 0) {
                _almacenajeActual = valor;
                console.log("[!] Se necesita reponer combustible regular");
            } else { throw new Error("[-] Almacenaje actual negativo"); }
        },
        get() { return _almacenajeActual; }
    });

    this.costo = costo;
    this.almacenajeMax = almacenajeMax;
    this.almacenajeActual = almacenajeActual;
}

Regular.prototype = Object.create(Gasolina.prototype);
Regular.prototype.constructor = Regular.prototype;

module.exports = Regular;