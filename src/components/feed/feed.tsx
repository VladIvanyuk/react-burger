import { FeedOrder } from './feed-order/feed-order';
import styles from './feed.module.css';

export const Feed: React.FC = (props) => {
  return (
    <div>
      <FeedOrder />
    </div>
  );
};