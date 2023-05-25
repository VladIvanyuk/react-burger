import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./constructor-ingredient.module.css";
import { useDispatch } from "react-redux";
import { useDrag } from "react-dnd";

export const ConstructorIngredient = ({ name, price, image, id, delete_id, type }) => {
  const dispatch = useDispatch();
  const [, dragRef] = useDrag({
    type: type,
    item: {
      id,
      action: 'sort'
    }

  })
  const deleteIngredient = (delete_id) => {
    dispatch({
      type: "DELETE_INGREDIENT",
      payload: delete_id,
    });
  };

  return (
    <div>
      <div ref={dragRef} className={styles.element}>
        <DragIcon />
        <ConstructorElement
          text={name}
          price={price}
          thumbnail={image}
          handleClose={() => deleteIngredient(delete_id)}
        />
      </div>
    </div>
  );
};
