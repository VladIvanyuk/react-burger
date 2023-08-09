import { FeedOrder } from '../feed/feed-order/feed-order';
import styles from './orders-list.module.css';
import { RootState, TFeedOrdersList } from '../../services/types/types';
import { useLocation } from 'react-router-dom';
import { useSelector as selectorHook } from '../../services/hooks/hooks';
import { TypedUseSelectorHook } from 'react-redux';

export const OrdersList: React.FC<TFeedOrdersList> = () => {
  const location = useLocation();
  const useSelector: TypedUseSelectorHook<RootState> = selectorHook;
  const store = useSelector((store) => store);
  let feed;

  if(location.pathname === '/feed') {
    feed = store.publicOrdersFeed.data.orders
  } else {
    feed = [...store.profileOrdersFeed.data.orders].reverse();
  }
  return (
    <div className={styles.orderListWrapper}>
      {/* @ts-ignore */}
      {feed && feed?.map((el) => (
        // @ts-ignore
        <FeedOrder key={el._id} orderData={el} />
      ))}
    </div>
  );
};