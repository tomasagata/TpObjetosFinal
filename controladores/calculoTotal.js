const calculoTotal = arrTickets => {
    let inicializador = 0;
    return arrTickets.reduce((acumulador, ticket) => acumulador + ticket.beneficio, inicializador);
}

module.exports = calculoTotal;