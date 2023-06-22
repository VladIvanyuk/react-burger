import styles from "./ingredients-list.module.css";
import { useState, useCallback } from "react";
import { ingredientsListTypes } from "../../utils/prop-types";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { Ingredient } from "../ingredient/ingredient";
import { ON_CLICK_INGREDIENT } from "../../services/actions/ingredientDetails";

export const IngredientList = ({ name, id, ingredientsInfo }) => {
  const [isModal, setIsModal] = useState(false);
  const dispatch = useDispatch();

  const onShowModalHandler = useCallback((value) => {
    setIsModal(value);
  }, []);
  // по клику на ингредиент находим его в общем списке и сохраняем
  const findCurrentIngredient = useCallback(
    (id) => {
      const clickedIngredient = ingredientsInfo.find((el) => el._id === id);
      dispatch({
        type: ON_CLICK_INGREDIENT,
        ingredient: clickedIngredient,
      });
      onShowModalHandler(true);
    },
    [dispatch, ingredientsInfo, onShowModalHandler]
  );

  const ingredientsList = ingredientsInfo.map((item) => (
    <Ingredient
      onFindCurrentIngredient={findCurrentIngredient}
      type={item.type}
      key={item._id}
      id={item._id}
      image={item.image}
      price={item.price}
      name={item.name}
    />
  ));
  return (
    <div>
      <h2 id={id} className="text text_type_main-medium">
        {name}
      </h2>
      <ul className={`${styles.list} pt-6 pr-1 pl-4`}>{ingredientsList}</ul>
    </div>
  );
};

IngredientList.propTypes = {
  ingredientsInfo: ingredientsListTypes.data,
  name: PropTypes.string,
  id: PropTypes.string,
};
