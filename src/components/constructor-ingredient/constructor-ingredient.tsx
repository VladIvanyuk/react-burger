import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./constructor-ingredient.module.css";
import { useRef } from 'react';
import { useDispatch } from "react-redux";
import { useDrag, useDrop } from "react-dnd";
import { DELETE_INGREDIENT } from "../../services/actions/burgerConstructor";
import { TConstructorIngredient, TDragCollectedProps, TDragObj, TDragObjWithoutCounter, TDropCollectedProps } from "../../types/types";

export const ConstructorIngredient = ({ name, price, image, uniqueId, type, moveCard, index }: TConstructorIngredient) => {
  const dispatch = useDispatch();
  const dragRef = useRef<HTMLDivElement | null>(null)
  const [{ handlerId }, drop] = useDrop<TDragObj, unknown, TDropCollectedProps>({
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
      const hoverBoundingRect = dragRef.current.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset!.y - hoverBoundingRect.top;
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

  const [{ isDragging }, drag] = useDrag<TDragObjWithoutCounter, unknown, TDragCollectedProps>({
    type: type,
    item: (): TDragObjWithoutCounter => {
      return { index }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  })

  const opacity = isDragging ? 0 : 1;

  drag(drop(dragRef))

  const deleteIngredient = (uniqueId: string | undefined) => {
    dispatch({
      type: DELETE_INGREDIENT,
      payload: uniqueId,
    });
  };

  return (
    <div>
      <div ref={dragRef} className={styles.element} style={{opacity}} data-handler-id={handlerId}>
        <DragIcon type={"secondary"} />
        <ConstructorElement
          text={name}
          price={price}
          thumbnail={image}
          handleClose={() => deleteIngredient(uniqueId)}
        />
      </div>
    </div>
  );
};