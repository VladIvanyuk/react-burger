import styles from "./Ingredient.module.css";
import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useState, useEffect } from "react";
import { useDrag } from "react-dnd";
import { useSelector } from "react-redux";

export const Ingredient = ({ onFindCurrentIngredient, id, image, price, name, type }) => {
  const [ingredientCounter, setIngredientCounter] = useState(0);
  const { burgerConstructor } = useSelector((store) => store);

  let count = 0;

  burgerConstructor.forEach((el) => {
    if (el._id === id) {
      count += (el.type === 'bun') ? 2 : 1;
    }
  }); 

  useEffect(() => {
    setIngredientCounter(count)
  }, [burgerConstructor, count])

  const [{opacity}, dragRef] = useDrag({
    type: type,
    item: {id, type, setIngredientCounter},
    collect: monitor => ({
      opacity: monitor.isDragging() ? 0.5 : 1
  })
  })

  return (
    <div>
      <li
        ref={dragRef}
        onClick={() => onFindCurrentIngredient(id)}
        key={id}
        className={styles.item}
        style={{opacity}}
      >
        {ingredientCounter > 0 && 
        <Counter count={ingredientCounter} size="default" extraClass="m-1" />}
        <img className="mb-1" src={image} alt="Ингредиент" />
        <div className={`${styles.price} mb-1`}>
          <span className="text text_type_digits-default mr-2">
            {price}
          </span>
          <CurrencyIcon />
        </div>
        <p className={`${styles.itemText} text text_type_main-default mb-8`}>
          {name}
        </p>
      </li>
    </div>
  );
};
