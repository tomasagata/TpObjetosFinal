function Gasolina(costo, almacenajeMax, almacenajeActual) {

    if (!(this instanceof Gasolina)) {
        return new Gasolina();
    }

    
    Gasolina.contador = ++Gasolina.contador || 1;
    var _id = Gasolina.contador;
    var _costo;
    var _almacenajeMax;
    var _almacenajeActual;
    
    Object.defineProperty(this, "id", {
        get() {
            return _id;
        }
    });

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
                console.log("[!] Se necesita reponer combustible diesel");
            } else { throw new Error("[-] Almacenaje actual negativo"); }
        },
        get() { return _almacenajeActual; }
    });

    this.costo = costo;
    this.almacenajeMax = almacenajeMax;
    this.almacenajeActual = almacenajeActual;
}

module.exports = Gasolina;