describe('Test para mostrar productos', () => {
  beforeEach(() => {
    cy.visit('/'); 
  });  

  it('Mostrar Producto', () => {
    cy.get('[data-testid="select-categoria"]').click()
    cy.get('li[role="option"]').contains('Lacteos').click()
 
  });

});