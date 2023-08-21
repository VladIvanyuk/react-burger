import styles from "./order-details.module.css";
import { CheckMarkIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import checkBackground from "../../img/check.png";
import { useEffect } from 'react';
import { TDispatchActions, TOrderDetails } from "../../services/types/types";
import { useDispatch, useSelector } from "../../services/hooks/hooks";
import { clearConstructorAction } from "../../services/actions/burgerConstructor";
import { deleteOrderDetailsAction } from "../../services/actions/orderDetails";

export const OrderDetails: React.FC<TOrderDetails> = ({ orderNumber }) => {
  const isLoaded: boolean = useSelector((store: any) => store.orderDetails.isOrderLoaded);
  const isError: boolean = useSelector((store: any) => store.orderDetails.isOrderError);
  const dispatch: TDispatchActions = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(deleteOrderDetailsAction())

      dispatch(clearConstructorAction())
    }
  }, [dispatch])

  return (
    <>
      {(!isLoaded && !isError) && (
        <div>
          <p
            className={`${styles.loadingText} text text_type_main-large mb-15`}
          >
            ОФОРМЛЯЕМ ЗАКАЗ...
          </p>
        </div>
      )}

      {(isLoaded && !isError) && (
        <div className={styles.orderBlock}>
          <p className="text text_type_digits-large mb-8 pt-10">
            {orderNumber}
          </p>
          <p className="text text_type_main-medium mb-15">
            идентификатор заказа
          </p>
          <div
            className={`${styles.check} mb-15`}
            style={{ backgroundImage: `url(${checkBackground})` }}
          >
            <CheckMarkIcon type="primary" />
          </div>
          <p className="text text_type_main-medium mb-2">
            Ваш заказ начали готовить
          </p>
          <p className="text text_type_main-medium text_color_inactive mb-30">
            Дождитесь готовности на орбитальной станции
          </p>
        </div>
      )}

      {(isError && !isLoaded) && (
        <p className={`text text_type_main-default mb-15`}>
          Произошла ошибка при отправке заказа. Пожалуйста, попробуйте ещё раз.
        </p>
      )}
    </>
  );
};
