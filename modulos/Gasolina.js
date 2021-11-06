const generadorId = (() => {
    let id = 0;

    const incrementarId = () => {
        id++;
    }

    const genId = () => {
        incrementarId();
        return id;
    }

    return {
        genId
    }
})();

function Gasolina(costo, almacenajeMax, almacenajeActual, tipo) {

    if (!(this instanceof Gasolina)) {
        return new Gasolina();
    }

    
    var _id = generadorId.genId();
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
                console.log(`[!] Se necesita reponer combustible ${this.tipo}`);
            } else { throw new Error("[-] Almacenaje actual negativo"); }
        },
        get() { return _almacenajeActual; }
    });

    Object.defineProperty(this, "tipo", {
        set(tipo) {
            if (tipo.trim() == '') {
                console.log("[-] Ingrese el tipo de la gasolina");
            } else {
                // Eliminación de espacios en blanco innecesarios
                this.tipoGasolina = tipo.trim().split(/\s+/).join(' ');
            }
        },
        get() { return this.tipoGasolina }
    });

    this.costo = costo;
    this.almacenajeMax = almacenajeMax;
    this.almacenajeActual = almacenajeActual;
    this.tipo = tipo;
}

module.exports = Gasolina;