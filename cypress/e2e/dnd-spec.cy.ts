describe('Тестирование D&D', () => {
    it('Ингредиенты должны перетаскиваться в конструктор, а булка должна отображаться сверху и снизу', () => {
        cy.visit('http://localhost:3000/');
        // ингредиент
        cy.get('[data-test="Соус Spicy-X"]').trigger('dragstart');
        cy.get('[data-test="BurgerConstructor"]').trigger('drop');
        cy.get('[data-test="BurgerConstructor"]').contains('Соус Spicy-X');
        // булка
        cy.get('[data-test="Краторная булка N-200i"]').trigger('dragstart');
        cy.get('[data-test="BurgerConstructor"]').trigger('drop');
        cy.get('[data-test="BurgerConstructor"]').contains('Краторная булка N-200i (верх)');
        cy.get('[data-test="BurgerConstructor"]').contains('Краторная булка N-200i (низ)');
    })

})