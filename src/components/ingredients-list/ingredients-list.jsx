import styles from './ingredients-list.module.css';
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import { ingredientTypes } from '../../utils/prop-types';
import PropTypes from 'prop-types';

export const IngredientList = ({ ingredientsInfo, name }) => {
  const ingredientsList = ingredientsInfo.map((item) => (
    <li key={item._id} className={styles.item}>
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
  ingredientsInfo: ingredientTypes.data,
  name: PropTypes.string
};