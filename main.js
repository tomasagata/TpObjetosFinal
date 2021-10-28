// Gasolinas

/* Gasolina */
{
    function Gasolina() {

        if (!(this instanceof Gasolina)) {
            return new Gasolina();
        }

        Gasolina.contador = ++Gasolina.contador | 1;
        var _id = Gasolina.contador;

        Object.defineProperty(this, "id", {
            get() {
                return _id;
            }
        });

    }

}

/* Regular extends Gasolina */
{

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

}

/* Premium extends Gasolina*/
{

    function Premium(costo = 2.3, almacenajeMax = 750, almacenajeActual = almacenajeMax) {

        if (!(this instanceof Premium)) {
            return new Premium(costo, almacenajeMax, almacenajeActual);
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
                    console.log("[!] Se necesita reponer combustible premium");
                } else { throw new Error("[-] Almacenaje actual negativo"); }
            },
            get() { return _almacenajeActual; }
        });

        this.costo = costo;
        this.almacenajeMax = almacenajeMax;
        this.almacenajeActual = almacenajeActual;
    }

    Premium.prototype = Object.create(Gasolina.prototype);
    Premium.prototype.constructor = Premium.prototype;

}

/* Diesel extends Gasolina */
{

    function Diesel(costo = 0.7, almacenajeMax = 2000, almacenajeActual = almacenajeMax) {

        if (!(this instanceof Diesel)) {
            return new Diesel(costo, almacenajeMax, almacenajeActual);
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
                    console.log("[!] Se necesita reponer combustible diesel");
                } else { throw new Error("[-] Almacenaje actual negativo"); }
            },
            get() { return _almacenajeActual; }
        });

        this.costo = costo;
        this.almacenajeMax = almacenajeMax;
        this.almacenajeActual = almacenajeActual;

    }

    Diesel.prototype = Object.create(Gasolina.prototype);
    Diesel.prototype.constructor = Diesel.prototype;
}

/* Vehículos */

/* Vehículo */
{

    function Vehiculo() {

        if (!(this instanceof Vehiculo)) {
            return new Vehiculo();
        }

    }

}

/* Auto extends Vehiculo */
{
    function Auto(tipoCombustible = "Regular", capacidad = 50, cantCombustible = 0) {

        if (!(this instanceof Auto)) {
            return new Auto(tipoCombustible, capacidad, cantCombustible);
        }

        var _tipoCombustible;
        var _capacidad;
        var _cantCombustible;

        Object.defineProperty(this, "tipoCombustible", {
            set(valor) {
                if (valor === "Regular" || valor === "Premium") {
                    _tipoCombustible = valor;
                } else {
                    throw new Error("[-] Tipo de combustible inválido para Auto");
                }
            },
            get() { return _tipoCombustible; }
        });

        Object.defineProperty(this, "capacidad", {
            set(valor) {
                if (valor >= 0) {
                    _capacidad = valor;
                } else {
                    throw new Error("[-] Capacidad inválida");
                }
            },
            get() { return _capacidad; }
        });

        Object.defineProperty(this, "cantCombustible", {
            set(valor) {
                if (valor > capacidad) {
                    throw new Error("[-] Combustible disponible supera máximo");
                } else if (valor >= 0) {
                    _cantCombustible = valor;
                } else {
                    throw new Error("[-] Cantidad de combustible negativa");
                }
            },
            get() { return _cantCombustible; }
        });

        this.tipoCombustible = tipoCombustible;
        this.capacidad = capacidad;
        this.cantCombustible = cantCombustible;
    }

    Auto.prototype = Object.create(Vehiculo.prototype);
    Auto.prototype.constructor = Auto.prototype;
}

/* Moto extends Vehiculo */
{
    function Moto(tipoCombustible = "Regular", capacidad = 10, cantCombustible = 0) {

        if (!(this instanceof Moto)) {
            return new Moto(tipoCombustible, capacidad, cantCombustible);
        }

        var _tipoCombustible;
        var _capacidad;
        var _cantCombustible;

        Object.defineProperty(this, "tipoCombustible", {
            set(valor) {
                if (valor === "Regular" || valor === "Premium") {
                    _tipoCombustible = valor;
                } else {
                    throw new Error("[-] Tipo de combustible inválido para Moto");
                }
            },
            get() { return _tipoCombustible; }
        });

        Object.defineProperty(this, "capacidad", {
            set(valor) {
                if (valor >= 0) {
                    _capacidad = valor;
                } else {
                    throw new Error("[-] Capacidad inválida");
                }
            },
            get() { return _capacidad; }
        });

        Object.defineProperty(this, "cantCombustible", {
            set(valor) {
                if (valor > capacidad) {
                    throw new Error("[-] Combustible disponible supera máximo");
                } else if (valor >= 0) {
                    _cantCombustible = valor;
                } else {
                    throw new Error("[-] Cantidad de combustible negativa");
                }
            },
            get() { return _cantCombustible; }
        });

        this.tipoCombustible = tipoCombustible;
        this.capacidad = capacidad;
        this.cantCombustible = cantCombustible;
    }

    Moto.prototype = Object.create(Vehiculo.prototype);
    Moto.prototype.constructor = Moto.prototype;
}

/* Camion extends Vehiculo */
{
    function Camion(tipoCombustible = "Diesel", capacidad = 100, cantCombustible = 0) {

        if (!(this instanceof Camion)) {
            return new Camion(tipoCombustible, capacidad, cantCombustible);
        }

        var _tipoCombustible;
        var _capacidad;
        var _cantCombustible;

        Object.defineProperty(this, "tipoCombustible", {
            set(valor) {
                if (valor === "Diesel") {
                    _tipoCombustible = valor;
                } else {
                    throw new Error("[-] Tipo de combustible inválido para Camion");
                }
            },
            get() { return _tipoCombustible; }
        });

        Object.defineProperty(this, "capacidad", {
            set(valor) {
                if (valor >= 0) {
                    _capacidad = valor;
                } else {
                    throw new Error("[-] Capacidad inválida");
                }
            },
            get() { return _capacidad; }
        });

        Object.defineProperty(this, "cantCombustible", {
            set(valor) {
                if (valor > capacidad) {
                    throw new Error("[-] Combustible disponible supera máximo");
                } else if (valor >= 0) {
                    _cantCombustible = valor;
                } else {
                    throw new Error("[-] Cantidad de combustible negativa");
                }
            },
            get() { return _cantCombustible; }
        });

        this.tipoCombustible = tipoCombustible;
        this.capacidad = capacidad;
        this.cantCombustible = cantCombustible;
    }

    Camion.prototype = Object.create(Vehiculo.prototype);
    Camion.prototype.constructor = Camion.prototype;
}

// Objetos Auxiliares: GeneradorVehiculos y CentroDeControl

/* GeneradorVehiculos */
{

    function GeneradorVehiculos() {

        if (!(this instanceof GeneradorVehiculos)) {
            return new GeneradorVehiculos();
        }

        this.generarVehiculo = function() {
            // ...
        }

        this.generarVehiculos = function(cant) {
            // ...
        }

    }

}

/* CentroDeControl */
{

    function CentroDeControl() {

        if (CentroDeControl.instancia != undefined) {
            return CentroDeControl.instancia;
        }

        if (!(this instanceof CentroDeControl)) {
            CentroDeControl.instancia = new CentroDeControl();
            return CentroDeControl.instancia;
        }

        var _idOperacion = 1;
        var _ultimasDiezOperaciones = [];

        function facturar(vehiculo) {

            // ...

            // if _idOperacion % 10 == 0: cierreDeCaja()
            // _idOperacion++
        }

        function cierreDeCaja() {
            // ...

            // vaciar _ultimasDiezOperaciones
        }

        return {
            facturar: facturar
        }
    }
}

module.exports = { Regular, Premium, Diesel, Vehiculo, Auto, Moto, Camion, GeneradorVehiculos, CentroDeControl };