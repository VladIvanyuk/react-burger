import styles from './ingredients-list.module.css';
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import { ingredientsListTypes, modalTypes } from '../../utils/prop-types';
import PropTypes from 'prop-types';

export const IngredientList = ({ getModalType, getIngredient, onShowModal, ingredientsInfo, name }) => {

  // по клику на ингредиент находим его в общем списке и сохраняем
  const findCurrentIngredient = (id) => {
    const clickedIngredient = ingredientsInfo.find((el) => el._id === id);
    onShowModal(true);
    getIngredient(clickedIngredient);
    getModalType('ingredient');
  }

  const ingredientsList = ingredientsInfo.map((item) => (
    <li onClick={() => findCurrentIngredient(item._id)} key={item._id} className={styles.item}>
      <Counter count={1} size='default' extraClass="m-1"/>
      <img className='mb-1' src={item.image} alt="Ингридиент"/>
      <div className={`${styles.price} mb-1`}>
        <span className='text text_type_digits-default mr-2'>
          {item.price}
        </span>
          <CurrencyIcon />
      </div>
      <p className={`${styles.itemText} text text_type_main-default mb-8`}>
        {item.name}
      </p>
    </li>
  ))
  return (
    <div>
      <h2 className="text text_type_main-medium">{name}</h2>
      <ul className={`${styles.list} pt-6 pr-1 pl-4`}>
        {ingredientsList}
      </ul>
    </div>
  );
};

IngredientList.propTypes = {
  ...modalTypes,
  ingredientsInfo: ingredientsListTypes.data,
  name: PropTypes.string,
  getIngredient: PropTypes.func,
};