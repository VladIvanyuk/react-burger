import styles from './ingredients-list.module.css';
import { useContext } from 'react';
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import { ingredientsListTypes } from '../../utils/prop-types';
import PropTypes from 'prop-types';
import { AppContext } from '../../services/appContext';

export const IngredientList = ({ name, id, ingredientsInfo }) => {

  const { getModalTypeHandler, getIngredientHandler, onShowModalHandler } = useContext(AppContext);

  // по клику на ингредиент находим его в общем списке и сохраняем
  const findCurrentIngredient = (id) => {
    const clickedIngredient = ingredientsInfo.find((el) => el._id === id);
    onShowModalHandler(true);
    getIngredientHandler(clickedIngredient);
    getModalTypeHandler('ingredient');
  }

  const ingredientsList = ingredientsInfo.map((item) => (
    <li onClick={() => findCurrentIngredient(item._id)} key={item._id} className={styles.item}>
      <Counter count={1} size='default' extraClass="m-1"/>
      <img className='mb-1' src={item.image} alt="Ингредиент"/>
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
      <h2 id={id} className="text text_type_main-medium">{name}</h2>
      <ul className={`${styles.list} pt-6 pr-1 pl-4`}>
        {ingredientsList}
      </ul>
    </div>
  );
};

IngredientList.propTypes = {
  ingredientsInfo: ingredientsListTypes.data,
  name: PropTypes.string,
  id: PropTypes.string
};