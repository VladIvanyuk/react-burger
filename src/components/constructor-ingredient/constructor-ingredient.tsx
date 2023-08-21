import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./constructor-ingredient.module.css";
import { useRef } from 'react';
import { XYCoord, useDrag, useDrop } from "react-dnd";
import { TDispatchActions, TConstructorIngredient, TDragCollectedProps, TDragObj, TDragObjWithoutCounter, TDropCollectedProps } from "../../services/types/types";
import { useDispatch } from "../../services/hooks/hooks";
import { deleteIngredientAction } from "../../services/actions/burgerConstructor";

export const ConstructorIngredient: React.FC<TConstructorIngredient> = ({ name, price, image, uniqueId = '', type, moveCard, index }) => {
  const dispatch: TDispatchActions = useDispatch();
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

      const dragIndex: number = item.index
      const hoverIndex: number = index

      if (dragIndex === hoverIndex) {
        return;
      }

      const hoverBoundingRect: DOMRect = dragRef.current.getBoundingClientRect();
      const hoverMiddleY: number = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset: XYCoord | null = monitor.getClientOffset();
      const hoverClientY: number = clientOffset!.y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return
      }

      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return
      }

      moveCard(dragIndex, hoverIndex);
      item.index = hoverIndex;
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

  const opacity: number = isDragging ? 0 : 1;

  drag(drop(dragRef))

  const deleteIngredient = (uniqueId: string): void => {
    dispatch(deleteIngredientAction(uniqueId));
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