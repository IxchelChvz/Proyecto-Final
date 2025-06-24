describe('Test para el formulario', () => {
  beforeEach(() => {
    cy.visit('/'); 
  });  

  it('Registrar Producto', () => {
    cy.get('[data-testid="input-nombre"]').type('Sandia');
    cy.get('[data-testid="input-unidad"]').click()
    cy.get('li[role="option"]').contains('Kg').click()
    cy.get('[data-testid="input-categoria"]').click()
    cy.get('li[role="option"]').contains('Frutas').click()
    cy.get('[data-testid="input-actual"]').type('30');
    cy.get('[data-testid="input-minimo"]').type('20');
    cy.get('[data-testid="submit-submit"]').click();

    cy.contains('Producto registrado correctamente').should('be.visible');
  });

});