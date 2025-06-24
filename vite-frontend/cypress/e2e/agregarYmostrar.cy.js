describe('Formulario y Mostrar Producto integrados', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('Registra un producto y lo muestra en la lista', () => {
    const nombre = 'Piña';
    const unidad = 'Kilos'; // coincide con el value en tu select
    const categoria = 'Frutas';
    const actual = '50';
    const minimo = '10';

    // Llenar el formulario
    cy.get('[data-testid="input-nombre"]').type(nombre);
    cy.get('[data-testid="input-unidad"]').click();
    cy.contains('li', 'Kg').click(); // Aquí tu UI muestra 'Kg' pero el value es 'Kilos', puede causar confusión
    cy.get('[data-testid="input-categoria"]').click();
    cy.contains('li', categoria).click();
    cy.get('[data-testid="input-actual"]').type(actual);
    cy.get('[data-testid="input-minimo"]').type(minimo);
    cy.get('[data-testid="submit-submit"]').click();

    // Esperar mensaje de éxito
    cy.contains('Producto registrado correctamente').should('be.visible');

    // Seleccionar la categoría para filtrar y mostrar el producto
    cy.get('[data-testid="select-categoria"]').click();
    cy.contains('li', categoria).click();

    // Esperar que el producto aparezca en la lista (hasta 10 segundos)
    cy.get('[data-testid="Piña"]', { timeout: 10000 }).should('exist');
    cy.contains('Kilos').should('exist');
    cy.contains('Frutas').should('exist');
  });
});
