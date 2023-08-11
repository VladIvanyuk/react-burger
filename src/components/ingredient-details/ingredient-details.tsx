import styles from './ingredient-details.module.css';
import { useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { getBurgerIngredients } from '../../services/actions/burgerIngredients';
import { RootState, TDispatchActions, TIngredient, TLocation } from '../../services/types/types';
import { DELETE_DETAILS } from '../../services/constants/constants';
import { useDispatch, useSelector } from '../../services/hooks/hooks';

export const IngredientDetails: React.FC = () => {

  const dispatch: TDispatchActions = useDispatch();
  const location: TLocation = useLocation();
  const { ingredientId } = useParams();
  const burgerIngredients = useSelector((store) => store.burgerIngredients.data);
  const ingredient: TIngredient[] = burgerIngredients.filter((el: TIngredient) => el._id === ingredientId);
  const { name = '', image_large = '', calories = '', fat = '', carbohydrates = '', proteins = '' } = ingredient[0] ? ingredient[0] : {};
  useEffect(() => {
    if(!location.state) {
      dispatch(getBurgerIngredients());
    }
    return () => {
      dispatch({
        type: DELETE_DETAILS
      })
    }
  }, [dispatch, location.state])

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
