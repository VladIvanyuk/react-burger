import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./constructor-ingredient.module.css";
import { useRef } from 'react';
import { useDispatch } from "react-redux";
import { useDrag, useDrop } from "react-dnd";
import { constructorIngredientType } from "../../utils/prop-types";
import { DELETE_INGREDIENT } from "../../services/actions/burgerConstructor";

export const ConstructorIngredient = ({ name, price, image, unique_id, type, moveCard, index }) => {
  const dispatch = useDispatch();
  const dragRef = useRef(null)
  const [{ handlerId }, drop] = useDrop({
    accept: ['sauce', 'main'],
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      }
    },

    hover(item, monitor) {
      if (!dragRef.current) {
        return
      }

      // убиваем если перетаскиваемый ингридиент летит из общего списка
      if (item.action === 'add') return;

      const dragIndex = item.index
      const hoverIndex = index
      if (dragIndex === hoverIndex) {
        return
      }
      const hoverBoundingRect = dragRef.current?.getBoundingClientRect()
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
      const clientOffset = monitor.getClientOffset()
      const hoverClientY = clientOffset.y - hoverBoundingRect.top
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return
      }
      moveCard(dragIndex, hoverIndex)
      item.index = hoverIndex
    },
  })

  const [{ isDragging }, drag] = useDrag({
    type: type,
    item: () => {
      return { index }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  })

  const opacity = isDragging ? 0 : 1;

  drag(drop(dragRef))

  const deleteIngredient = (unique_id) => {
    dispatch({
      type: DELETE_INGREDIENT,
      payload: unique_id,
    });
  };

  return (
    <div>
      <div ref={dragRef} className={styles.element} style={{opacity}} data-handler-id={handlerId}>
        <DragIcon />
        <ConstructorElement
          text={name}
          price={price}
          thumbnail={image}
          handleClose={() => deleteIngredient(unique_id)}
        />
      </div>
    </div>
  );
};

ConstructorIngredient.propTypes = constructorIngredientType;