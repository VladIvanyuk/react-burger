import { RootState, TFeedData, TFeedOrdersList } from '../../../services/types/types';
import styles from './feed-status.module.css';
import { useSelector as selectorHook } from '../../../services/hooks/hooks';
import { TypedUseSelectorHook } from 'react-redux';

export const FeedStatus: React.FC<TFeedOrdersList> = ({ feed }) => {
  const useSelector: TypedUseSelectorHook<RootState> = selectorHook;
  const store = useSelector((store) => store);
  const data: TFeedData = store.publicOrdersFeed.data;
  const doneOrders: number[] = [];
  const pendingOrders: number[] = [];
  feed?.forEach((el) => {
    if(el.status === 'done' && doneOrders.length < 20) {
      doneOrders.push(el.number)
    }

    if(el.status === 'pending') {
      pendingOrders.push(el.number)
    }
  })

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
            {pendingOrders.map((el) => (
              <li key={el} className='text text_type_digits-default mb-2'>{el}</li>
            ))}
          </ul>
        </div>
      </div>
      <div className='mb-15'>
        <p className='text text_type_main-medium'>Выполнено за все время:</p>
        <p className={`${styles.allPrice} text text_type_digits-large`}>{data?.total}</p>
      </div>
      <div className='mb-15'>
        <p className='text text_type_main-medium'>Выполнено за сегодня:</p>
        <p className={`${styles.allPrice} text text_type_digits-large`}>{data.totalToday}</p>
      </div>
    </div>
  );
};