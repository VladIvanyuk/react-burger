import { FeedOrder } from '../feed/feed-order/feed-order';
import styles from './orders-list.module.css';
import { TFeedOrdersList } from '../../services/types/types';
import { useEffect } from 'react';

export const OrdersList: React.FC<TFeedOrdersList> = ({ feed }) => {
  useEffect(() => {
    
  })
  return (
    <div>
      {feed?.map((el) => (
        <FeedOrder key={el._id} orderData={el} />
      ))}
    </div>
  );
};