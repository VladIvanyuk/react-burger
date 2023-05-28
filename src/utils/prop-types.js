import PropTypes from 'prop-types';

const ingredientType = {
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    onFindCurrentIngredient: PropTypes.func.isRequired
}

const constructorIngredientType = {
        name: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        image: PropTypes.string.isRequired,
        unique_id: PropTypes.string.isRequired,
        moveCard: PropTypes.func.isRequired,
        index: PropTypes.number.isRequired,
}

const ingredientFullTypes = {
    ingredient: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired,
        proteins: PropTypes.number.isRequired,
        fat: PropTypes.number.isRequired,
        carbohydrates: PropTypes.number.isRequired,
        calories: PropTypes.number.isRequired,
        price: PropTypes.number.isRequired,
        image: PropTypes.string.isRequired,
        image_mobile: PropTypes.string.isRequired,
        image_large: PropTypes.string.isRequired,
        __v: PropTypes.number.isRequired
    })
}

const ingredientsListTypes = {
    data: PropTypes.arrayOf(ingredientFullTypes.ingredient).isRequired
}

const modalTypes = {
    onShowModal: PropTypes.func,
    getModalType: PropTypes.func
}

export { ingredientsListTypes, modalTypes, ingredientType, constructorIngredientType, ingredientFullTypes }