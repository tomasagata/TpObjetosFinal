const calculoTotal = arrTickets => {
    let inicializador = 0;
    // Se calcula el total en el array de tickets
    return arrTickets.reduce((acumulador, ticket) => acumulador + ticket.beneficio, inicializador);
}

module.exports = calculoTotal;