import styles from "./ingredients-list.module.css";
import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { Ingredient } from "../ingredient/ingredient";
import { ON_CLICK_INGREDIENT } from "../../services/actions/ingredientDetails";
import { TIngredient, TIngredientsList } from "../../types/types";
import { AnyAction, Dispatch } from "redux";


export const IngredientList = ({ name, id, ingredientsInfo }: TIngredientsList<TIngredient>) => {
  const dispatch: Dispatch<AnyAction> = useDispatch();

  // по клику на ингредиент находим его в общем списке и сохраняем
  const findCurrentIngredient = useCallback(
    (id: string): void => {
      const clickedIngredient = ingredientsInfo.find((el) => el._id === id);
      dispatch({
        type: ON_CLICK_INGREDIENT,
        ingredient: clickedIngredient,
      });
    },
    [dispatch, ingredientsInfo]
  );

  const ingredientsList: JSX.Element[] = ingredientsInfo.map((item) => (
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

