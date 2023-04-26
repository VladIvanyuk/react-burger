import { AppHeader } from '../AppHeader/AppHeader';
import styles from './App.module.css';

export const App = (props) => {
  return (
    <div className={styles.app}>
      <AppHeader />
    </div>
  );
};