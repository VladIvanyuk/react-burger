import styles from './ingredient-details.module.css';

export const IngredientDetails = (props) => {
  return (
    <div className={styles.ingredientBlock}>
      <img src="https://code.s3.yandex.net/react/code/bun-02-large.png" alt="Краторная булка N-200i" className='mb-4' />
      <p className="text text_type_main-medium mb-8">Краторная булка N-200i</p>
      <ul className={`${styles.list} mb-15`}>
        <li className={`${styles.item} text text_type_main-default mr-5`}>
          <p>Калории, ккал</p>
          <p>2674</p>
        </li>
        <li className={`${styles.item} text text_type_main-default mr-5`}>
          <p>Белки, г</p>
          <p>80</p>
        </li>
        <li className={`${styles.item} text text_type_main-default mr-5`}>
          <p>Жиры, г</p>
          <p>800</p>
        </li>
        <li className={`${styles.item} text text_type_main-default`}>
          <p>Углеводы, г</p>
          <p>300</p>
        </li>
      </ul>
    </div>
  );
};