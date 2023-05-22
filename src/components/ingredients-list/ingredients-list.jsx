import styles from "./ingredients-list.module.css";
import { useState, useCallback, useRef, useEffect } from "react";
import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { ingredientsListTypes } from "../../utils/prop-types";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { Modal } from "../modal/modal";
import { IngredientDetails } from "../ingredient-details/ingredient-details";

export const IngredientList = ({ name, id, ingredientsInfo }) => {
  const ingredientForModal = useSelector((store) => store.ingredientDetails)
  const [isModal, setIsModal] = useState(false);
  const dispatch = useDispatch();

  const onShowModalHandler = useCallback((value) => {
    setIsModal(value);
  }, []);

  useEffect(() => {
  })

  // по клику на ингредиент находим его в общем списке и сохраняем
  const findCurrentIngredient = (id) => {
    const clickedIngredient = ingredientsInfo.find((el) => el._id === id);
    dispatch({
      type: "ON_CLICK_INGREDIENT",
      ingredient: clickedIngredient,
    });
    onShowModalHandler(true);
  };

  const ingredientsList = ingredientsInfo.map((item) => (
    <li
      onClick={() => findCurrentIngredient(item._id)}
      key={item._id}
      className={styles.item}
    >
      <Counter count={1} size="default" extraClass="m-1" />
      <img className="mb-1" src={item.image} alt="Ингредиент" />
      <div className={`${styles.price} mb-1`}>
        <span className="text text_type_digits-default mr-2">{item.price}</span>
        <CurrencyIcon />
      </div>
      <p className={`${styles.itemText} text text_type_main-default mb-8`}>
        {item.name}
      </p>
    </li>
  ));
  return (
    <div>
      {isModal && (
        <Modal onShowModal={onShowModalHandler}>
          <IngredientDetails ingredient={ingredientForModal}></IngredientDetails>
        </Modal>
      )}
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
