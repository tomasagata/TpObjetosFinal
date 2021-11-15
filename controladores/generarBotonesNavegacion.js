const generarBotonesNavegacion = (anterior, siguiente) => {
    // Inicilizo un string vacío
    let botones = "";

    // Cargo el string con los botones en función de si hay o no una página siguiente/anterior
    if (anterior != undefined) {
        botones += `
        <li class="page-item"><a class="page-link" href="./generar_tickets?pagina=${anterior.pagina}&limite=${anterior.limite}">Anterior</a></li>
        `;
    }
    
    if (siguiente != undefined) {
        botones += `
        <li class="page-item"><a class="page-link" href="./generar_tickets?pagina=${siguiente.pagina}&limite=${siguiente.limite}">Siguiente</a></li>
        `;
    }
    
    // Armo el panel
    let navegacion = `
        <nav aria-label="Botones Navegacion">
            <ul class="pagination">
                ${botones}
            </ul>
        </nav>
    `;
    return navegacion;
}

module.exports = generarBotonesNavegacion;