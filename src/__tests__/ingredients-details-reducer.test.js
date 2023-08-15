import { deleteIngredientDetailsAction, onClickIngredientDetailsAction } from "../services/actions/ingredientsDetails"
import { ingredientDetails } from "../services/reducers/ingredientDetails"

describe('Тестирование редьюсера деталей ингредиента', () => {
    const ingredient = {
        _id:"643d69a5c3f7b9001cfa093e",
        name:"Филе Люминесцентного тетраодонтимформа",
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
    }
    it('При вызове onClickIngredientDetailsAction ингредиент корректно добавляется в хранилище', () => {
        const result = ingredientDetails({}, onClickIngredientDetailsAction(ingredient));
        expect(result).toEqual(ingredient)
    })

    it('При вызове deleteIngredientDetailsAction объект с деталями ингредиента очищается', () => {
        const result = ingredientDetails(ingredient, deleteIngredientDetailsAction());
        expect(result).toEqual({});
    })

    it('Должен возвращать изначальный стейт если ничего не передали в редьюсер', () => {
        const result = ingredientDetails(undefined, {});
        expect(result).toEqual({});
    })
})