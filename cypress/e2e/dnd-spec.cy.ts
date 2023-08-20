describe('Тестирование открытия модального окна ингредиента при клике на него', () => {
  it('passes', () => {
    cy.visit('http://localhost:3000/');
    cy.contains('Лента заказов').click();
  })
})