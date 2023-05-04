import styles from './ingredient-details.module.css';

export const IngredientDetails = ({ ingredient }) => {

  const { name, image_large, calories, fat, carbohydrates, proteins } = ingredient;

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