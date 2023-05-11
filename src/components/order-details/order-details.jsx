import styles from "./order-details.module.css";
import { CheckMarkIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import checkBackground from '../../img/check.png';
import PropTypes from 'prop-types';

export const OrderDetails = ({ orderNumber }) => {
  return (
    <div className={styles.orderBlock}>
      <p className="text text_type_digits-large mb-8 pt-10">{orderNumber}</p>
      <p className="text text_type_main-medium mb-15">идентификатор заказа</p>
      <div className={`${styles.check} mb-15`} style={{backgroundImage: `url(${checkBackground})`}}>
        <CheckMarkIcon type="primary" />
      </div>
      <p className="text text_type_main-medium mb-2">Ваш заказ начали готовить</p>
      <p className="text text_type_main-medium text_color_inactive mb-30">Дождитесь готовности на орбитальной станции</p>
    </div>
  );
};

OrderDetails.propTypes = {
  orderNumber: PropTypes.number.isRequired
}