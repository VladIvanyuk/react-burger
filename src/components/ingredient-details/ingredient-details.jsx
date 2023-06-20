import styles from './ingredient-details.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { DELETE_DETAILS } from '../../services/actions/ingredientDetails';

export const IngredientDetails = () => {

  const ingredient = useSelector((store) => store.ingredientDetails)
  const { name, image_large, calories, fat, carbohydrates, proteins } = ingredient;
  const dispatch = useDispatch();
  
  useEffect(() => {
    return () => {
      dispatch({
        type: DELETE_DETAILS
      })
    }
  }, [dispatch])

  return (
    <div className={styles.ingredientBlock}>
      <img src={image_large} alt={name} className='mb-4' />
      <p className="text text_type_main-medium mb-8">{name}</p>
      <ul className={`${styles.list} mb-15`}>
        <li className={`${styles.item} text text_type_main-default mr-5`}>
          <p>Калории, ккал</p>
          <p>{calories}</p>
        </li>
        <li className={`${styles.item} text text_type_main-default mr-5`}>
          <p>Белки, г</p>
          <p>{proteins}</p>
        </li>
        <li className={`${styles.item} text text_type_main-default mr-5`}>
          <p>Жиры, г</p>
          <p>{fat}</p>
        </li>
        <li className={`${styles.item} text text_type_main-default`}>
          <p>Углеводы, г</p>
          <p>{carbohydrates}</p>
        </li>
      </ul>
    </div>
  );
};
