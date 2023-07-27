import { AppHeader } from "../../components/app-header/app-header";
import { Feed } from "../../components/feed/feed";
import styles from "./feed-page.module.css";

export const FeedPage: React.FC = (props) => {
  return (
    <>
      <AppHeader />
      <main className="container">
        <h2 className="text text_type_main-large mb-5">Лента заказов</h2>
        <section className={styles.feedSection}>
          <Feed />
        </section>
      </main>
    </>
  );
};
