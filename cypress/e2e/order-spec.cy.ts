describe('Тестирование отправки заказа', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/');
        cy.intercept("GET", "api/auth/user", { fixture: "user.json" });
        cy.intercept("POST", "api/orders", { fixture: "order.json" }).as("postOrder");
      
      // Устанавливаем токены:
        window.localStorage.setItem(
          "accessToken",
          JSON.stringify("test-accessToken")
        );
      });
      
      it('Заказ должен успешно отправляться с добавленными ингредиентами', () => {
        // ингредиент
        cy.get('[data-test="Соус Spicy-X"]').trigger('dragstart');
        cy.get('[data-test="BurgerConstructor"]').trigger('drop');
        // булка
        cy.get('[data-test="Краторная булка N-200i"]').trigger('dragstart');
        cy.get('[data-test="BurgerConstructor"]').trigger('drop');

        cy.get('[data-test="SendOrder"]').click();
        cy.get('[id="modal"]').contains('123');
      })
})