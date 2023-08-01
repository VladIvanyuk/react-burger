import { FeedOrder } from './feed-order/feed-order';
import { FeedStatus } from './feed-status/feed-status';
import styles from './feed.module.css';

export const Feed: React.FC = (props) => {
  return (
    <div className={styles.feedContainer}>
      <FeedOrder />
      <FeedStatus />
    </div>
  );
};