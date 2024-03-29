import styles from "./ingredient.module.css";
import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useState, useEffect } from "react";
import { useDrag } from "react-dnd";
import { Link, useLocation } from "react-router-dom";
import { TIngredient, TLocation, TSmallIngredient } from "../../services/types/types";
import { useSelector } from "../../services/hooks/hooks";

export const Ingredient: React.FC<TSmallIngredient> = ({ onFindCurrentIngredient, id, image, price, name, type }) => {
  const [ingredientCounter, setIngredientCounter] = useState(0);
  const burgerConstructor = useSelector((store) => store.burgerConstructor);
  const location: TLocation = useLocation();
  let count: number = 0;
  // считаем количество ингридиентов в конструкторе
  if(type !== 'bun') {
    burgerConstructor.ingredients.forEach((el: TIngredient) => {
      if (el._id === id) {
        count += 1;
      }
    });
  } else {
    if(burgerConstructor.buns._id === id) {
      count += 2;
    }
  }

  useEffect(() => {
    setIngredientCounter(count)
  }, [burgerConstructor, count])

  const [{opacity}, dragRef] = useDrag({
    type: type,
    item: {
      id,
      type, 
      setIngredientCounter,
      action: 'add',
    },
    collect: monitor => ({
      opacity: monitor.isDragging() ? 0.5 : 1
  })
  })
  

  return (
    <div>
      <Link
        to={`/ingredients/${id}`}
        // а также сохраняем в свойство background роут,
        // на котором была открыта наша модалка
        state= {{ background: location, id: id }}
        ref={dragRef}
        onClick={() => onFindCurrentIngredient(id)}
        key={id}
        className={styles.item}
        style={{opacity}}
        data-test={name}
      >
        {ingredientCounter > 0 && 
        <Counter count={ingredientCounter} size="default" extraClass="m-1" />}
        <img className="mb-1" src={image} alt="Ингредиент" />
        <div className={`${styles.price} mb-1`}>
          <span className="text text_type_digits-default mr-2">
            {price}
          </span>
          <CurrencyIcon type={"secondary"} />
        </div>
        <p className={`${styles.itemText} text text_type_main-default mb-8`}>
          {name}
        </p>
      </Link>
    </div>
  );
};