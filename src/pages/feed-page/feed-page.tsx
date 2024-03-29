import { AppHeader } from "../../components/app-header/app-header";
import { FeedStatus } from "../../components/feed/feed-status/feed-status";
import styles from "./feed-page.module.css";
import { useSelector } from "../../services/hooks/hooks";
import { OrdersList } from "../../components/orders-list/orders-list";

export const FeedPage: React.FC = (props) => {
  const store = useSelector((store: any ) => store);
  const orders = store.publicOrdersFeed.data.orders;
  
  return (
    <>
      <AppHeader />
      <main className="container">
        <h2 className="text text_type_main-large mb-5">Лента заказов</h2>
        <div className={styles.feedContainer}>
          <div className={styles.orderListWrapper}>
            <OrdersList />
          </div>
          <FeedStatus feed={orders}/>
        </div>
      </main>
    </>
  );
};
