const Diesel = require("./Diesel");
const Premium = require("./Premium");
const Regular = require("./Regular");

const Gasolinera = (function () {
    let gasolinas = {
        regular: Regular(),
        premium: Premium(),
        diesel: Diesel()
    };

    return {
        gasolinas
    }
})();

module.exports = Gasolinera;