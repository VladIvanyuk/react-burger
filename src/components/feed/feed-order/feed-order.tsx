import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./feed-order.module.css";

export const FeedOrder: React.FC = (props) => {
  const imgMockList = [
    "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
    "https://code.s3.yandex.net/react/code/meat-01-mobile.png",
    "https://code.s3.yandex.net/react/code/meat-03-mobile.png",
    "https://code.s3.yandex.net/react/code/sauce-01-mobile.png",
    "https://code.s3.yandex.net/react/code/sauce-02-mobile.png",
    "https://code.s3.yandex.net/react/code/meat-02-mobile.png",
  ];
  return (
    <div className={`${styles.order} p-6`}>
      <div className={`${styles.orderHeader} mb-6`}>
        <p className="text text_type_digits-default">#034535</p>
        <p className="text text_type_main-default text_color_inactive">
          Сегодня, 16:20
        </p>
      </div>
      <div className="mb-6">
        <h3 className="text text_type_main-medium">
          Death Star Starship Main бургер
        </h3>
      </div>
      <div className={styles.orderFooter}>
          {imgMockList.map((img, index) => {

            return (
            <div className={styles.orderImageWrapper}>
              <img key={index} className={styles.orderImage} src={img} alt="Картинка продукта" />
            </div>
            )
          })}
        <div className={styles.orderPrice}>
          <span className="text text_type_digits-default mr-2">123</span>
          <CurrencyIcon type={"primary"} />
        </div>
      </div>
    </div>
  );
};
