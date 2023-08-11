import { FeedOrder } from '../feed/feed-order/feed-order';
import styles from './orders-list.module.css';
import { TDispatchActions, TFeedOrdersList } from '../../services/types/types';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from '../../services/hooks/hooks';
import { useEffect } from 'react';
import { connectPublicFeed, disconnectPublicFeed } from '../../services/actions/wsPublicFeed';
import { connectProfileFeed, disconnectProfileFeed } from '../../services/actions/wsProfileFeed';

export const OrdersList: React.FC<TFeedOrdersList> = () => {
  const location = useLocation();
  const store = useSelector((store) => store);
  const dispatch: TDispatchActions = useDispatch();
  const token = localStorage.getItem('accessToken');
  const tokenForWs = token?.replace('Bearer ', '');
  const isPublicFeedLocation = location.pathname === '/feed';
  let feed;

  useEffect(() => {
    if(isPublicFeedLocation) {
    dispatch(connectPublicFeed('wss://norma.nomoreparties.space/orders/all'))
    } else {
    dispatch(connectProfileFeed(`wss://norma.nomoreparties.space/orders?token=${tokenForWs}`))
    }
    // при анмаунте отсоединяем сокет
    return () => {
      if(isPublicFeedLocation) {
        dispatch(disconnectPublicFeed())
      } else {
        dispatch(disconnectProfileFeed())
      }
    }
  }, [dispatch, isPublicFeedLocation, tokenForWs])

  if(isPublicFeedLocation) {
    feed = store.publicOrdersFeed.data.orders
  } else {
    feed = [...store.profileOrdersFeed.data.orders].reverse();
  }
  return (
    <div className={styles.orderListWrapper}>
      {feed && feed?.map((el) => (
        <FeedOrder key={el._id} orderData={el} />
      ))}
    </div>
  );
};