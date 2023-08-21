import { addBunAction, addIngridientAction, clearConstructorAction, deleteIngredientAction, sortIngredientsAction } from "../services/actions/burgerConstructor";
import { burgerConstructor, burgerConstructorIState } from "../services/reducers/burgerConstructor";
import update from "immutability-helper";


describe('Тестирование редьюсера конструктора бургера', () => {
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

    const constructorIngredientsList = [
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
    
    it('Тест должен вернуть начальное состояние', () => {
        expect(burgerConstructor(undefined, {})).toEqual(burgerConstructorIState)
    })

    it('При использовании "addIngridientAction" ингредиент должен корректно добавляться в массив ингридиентов', () => {
        const result = burgerConstructor(burgerConstructorIState, addIngridientAction(ingredient));
        expect(result).toEqual({
            ...burgerConstructorIState,
            ingredients: [
                {
                    ...ingredient,
                    uniqueId: result.ingredients[0].uniqueId
                }
            ]
        })
    })

    it('При использовании "deleteIngredientAction" ингредиент должен коректно удаляться из массива ингредиентов', () => {
        const state = {
            ...burgerConstructorIState,
            ingredients: [ingredient]
        };
        const result = burgerConstructor(state, deleteIngredientAction('777'))
        expect(result).toEqual(burgerConstructorIState)
    })

    it('При перетаскивании ингредиента с первого места на второе в конструкторе, массив корректно сортируется', () => {
        const state = {
            ...burgerConstructorIState,
            ingredients: [...constructorIngredientsList]
        }
        const dragIndex = 0;
        const hoverIndex = 1;
        const sorted = update(constructorIngredientsList, {
            $splice: [
              [dragIndex, 1],
              [hoverIndex, 0, constructorIngredientsList[dragIndex]],
            ],
          });

          const result = burgerConstructor(state, sortIngredientsAction(sorted));
          expect(result.ingredients).toEqual(sorted)
    })

    it('При использовании "addBunAction" булка должна корректно добавляться', () => {
        const result = burgerConstructor(burgerConstructorIState, addBunAction(ingredient));
        expect(result).toEqual({
            ...burgerConstructorIState,
            buns: ingredient
        })
    })

    it('При использовании контсруктор бургера должен корректно очищаться от всех ингридиентов', () => {
        const state = {
            ingredients: constructorIngredientsList,
            buns: ingredient
        }

        const result = burgerConstructor(state, clearConstructorAction());
        expect(result).toEqual(burgerConstructorIState)
    })
})