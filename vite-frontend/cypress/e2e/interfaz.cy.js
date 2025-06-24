describe('Test para la interfaz', () => {
  beforeEach(() => {
    cy.visit('/'); 
  });  

  it('Hay "Registrar Producto"', () => {
    cy.visit('/'); 
    cy.get("h6").contains('Registrar Producto');
  });

});