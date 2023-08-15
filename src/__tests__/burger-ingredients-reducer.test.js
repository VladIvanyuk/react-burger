import { getIngredientsAction, getIngredientsRequestFailedAction, getIngredientsRequestSuccessAction } from "../services/actions/burgerIngredients";
import { burgerIngredients, burgerIngredientsIState } from "../services/reducers/burgerIngredients";

describe('Тестирование редьюсера списка ингредиентов бургера', () => {
    const ingredientsFromResponse = {
        data: [
            {
                _id:"643d69a5c3f7b9001cfa093e",
                name:"Ингредиент 1",
                type:"main",
                proteins:44,
                fat:26,
                carbohydrates:85,
                calories:643,
                price:988,
                image:"https://code.s3.yandex.net/react/code/meat-03.png",
                image_mobile:"https://code.s3.yandex.net/react/code/meat-03-mobile.png",
                image_large:"https://code.s3.yandex.net/react/code/meat-03-large.png",
                uniqueId: '777'
            },
            {
                _id:"643d69a5c3f7b9001cfa0935",
                name:"Ингредиент 2",
                type:"main",
                proteins:44,
                fat:26,
                carbohydrates:85,
                calories:643,
                price:988,
                image:"https://code.s3.yandex.net/react/code/meat-03.png",
                image_mobile:"https://code.s3.yandex.net/react/code/meat-03-mobile.png",
                image_large:"https://code.s3.yandex.net/react/code/meat-03-large.png",
                uniqueId: '666'
            },
            {
                _id:"643d69a5c3f7b9001cfa0932",
                name:"Ингредиент 3",
                type:"main",
                proteins:44,
                fat:26,
                carbohydrates:85,
                calories:643,
                price:988,
                image:"https://code.s3.yandex.net/react/code/meat-03.png",
                image_mobile:"https://code.s3.yandex.net/react/code/meat-03-mobile.png",
                image_large:"https://code.s3.yandex.net/react/code/meat-03-large.png",
                uniqueId: '444'
            }
        ]
    }

    it('Должен возвращать изначальный стейт если ничего не передали в редьюсер', () => {
        const result = burgerIngredients(undefined, {});
        expect(result).toEqual(burgerIngredientsIState)
    })

    it('При начале получения ингредиентов, поля ошибки и загрузки должны быть в статусе false', () => {
        const state = {
            data: [],
            isLoaded: true,
            isError: true
        }

        const result = burgerIngredients(state, getIngredientsAction());
        expect(result).toEqual({
            data: [],
            isLoaded: false,
            isError: false
        });
    })

    it('При успешном запросе получения ингредиентов, в data записывается список ингредиентов, а isLoaded устанавливается в false', () => {
        const result = burgerIngredients(burgerIngredientsIState, getIngredientsRequestSuccessAction(ingredientsFromResponse));
        expect(result).toEqual({
            ...burgerIngredientsIState,
                data: ingredientsFromResponse.data,
                isLoaded: true,
        })
    })

    it('При неудачном запросе получения ингредиентов, поле isError устанавливается в true', () => {
        const result = burgerIngredients(burgerIngredientsIState, getIngredientsRequestFailedAction());
        expect(result).toEqual({
            ...burgerIngredientsIState,
            isError: true
        })
    })
})