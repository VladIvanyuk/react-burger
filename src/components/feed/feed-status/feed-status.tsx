import styles from './feed-status.module.css';

export const FeedStatus = () => {
  const doneOrders = [111111, 222222, 333333, 444444, 555555, 666666, 777777, 888888, 101010, 202020, 303030, 404040, 505050];
  const notDoneOrders = [666666, 777777, 888888];
  return (
    <div className={styles.feedStatusBlock}>
      <div className={`${styles.feedStatus} mb-15`}>
        <div className={styles.statuses}>
          <p className='text text_type_main-medium mb-6'>Готовы:</p>
          <ul className={styles.numbersList}>
            {doneOrders.map((el) => (
              <li key={el} className={`${styles.activeOrder} text text_type_digits-default mb-2`}>{el}</li>
            ))}
          </ul>
        </div>
        <div className={styles.statuses}>
          <p className='text text_type_main-medium mb-6'>В работе:</p>
          <ul className={styles.numbersList}>
            {notDoneOrders.map((el) => (
              <li key={el} className='text text_type_digits-default mb-2'>{el}</li>
            ))}
          </ul>
        </div>
      </div>
      <div className='mb-15'>
        <p className='text text_type_main-medium'>Выполнено за все время:</p>
        <p className={`${styles.allPrice} text text_type_digits-large`}>28 752</p>
      </div>
      <div className='mb-15'>
        <p className='text text_type_main-medium'>Выполнено за сегодня:</p>
        <p className={`${styles.allPrice} text text_type_digits-large`}>138</p>
      </div>
    </div>
  );
};