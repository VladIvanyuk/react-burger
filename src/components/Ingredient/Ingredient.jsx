import styles from "./Ingredient.module.css";
import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDrag } from "react-dnd";

export const Ingredient = ({ onFindCurrentIngredient, id, image, price, name, type }) => {
  const [{isDrag}, dragRef] = useDrag({
    type: type,
    item: {id, type},
    collect: monitor => ({
      isDrag: monitor.isDragging()
  })
  })
  return (
    !isDrag &&
    <div>
      <li
        ref={dragRef}
        onClick={() => onFindCurrentIngredient(id)}
        key={id}
        className={styles.item}
      >
        <Counter count={1} size="default" extraClass="m-1" />
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
