import { FeedOrder } from '../feed/feed-order/feed-order';
import styles from './orders-list.module.css';
import { TFeedOrdersList } from '../../services/types/types';

export const OrdersList: React.FC<TFeedOrdersList> = ({ feed }) => {
  // console.log(feed)
  return (
    <div>
      {feed?.map((el) => (
        <FeedOrder key={el._id} orderData={el} />
      ))}
    </div>
  );
};