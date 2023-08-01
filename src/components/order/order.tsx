import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./order.module.css";

export const Order = () => {
  const mockOrders = [
    {
      _id: "643d69a5c3f7b9001cfa093c",
      name: "Краторная булка N-200i",
      type: "bun",
      proteins: 80,
      fat: 24,
      carbohydrates: 53,
      calories: 420,
      price: 1255,
      image: "https://code.s3.yandex.net/react/code/bun-02.png",
      image_mobile: "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
      image_large: "https://code.s3.yandex.net/react/code/bun-02-large.png",
      __v: 0,
    },
    {
      _id: "643d69a5c3f7b9001cfa0941",
      name: "Биокотлета из марсианской Магнолии",
      type: "main",
      proteins: 420,
      fat: 142,
      carbohydrates: 242,
      calories: 4242,
      price: 424,
      image: "https://code.s3.yandex.net/react/code/meat-01.png",
      image_mobile: "https://code.s3.yandex.net/react/code/meat-01-mobile.png",
      image_large: "https://code.s3.yandex.net/react/code/meat-01-large.png",
      __v: 0,
    },
    {
      _id: "643d69a5c3f7b9001cfa093e",
      name: "Филе Люминесцентного тетраодонтимформа",
      type: "main",
      proteins: 44,
      fat: 26,
      carbohydrates: 85,
      calories: 643,
      price: 988,
      image: "https://code.s3.yandex.net/react/code/meat-03.png",
      image_mobile: "https://code.s3.yandex.net/react/code/meat-03-mobile.png",
      image_large: "https://code.s3.yandex.net/react/code/meat-03-large.png",
      __v: 0,
    },
    {
      _id: "643d69a5c3f7b9001cfa0943",
      name: "Соус фирменный Space Sauce",
      type: "sauce",
      proteins: 50,
      fat: 22,
      carbohydrates: 11,
      calories: 14,
      price: 80,
      image: "https://code.s3.yandex.net/react/code/sauce-04.png",
      image_mobile: "https://code.s3.yandex.net/react/code/sauce-04-mobile.png",
      image_large: "https://code.s3.yandex.net/react/code/sauce-04-large.png",
      __v: 0,
    },
  ];
  return (
    <div className={`${styles.order} container`}>
      <p
        className={`${styles.orderNumber} text text_type_digits-default mb-10`}
      >
        #034533
      </p>
      <h4 className="text text_type_main-medium mb-3">
        Black Hole Singularity острый бургер
      </h4>
      <p className={`${styles.orderStatus} text text_type_main-default mb-15`}>
        Выполнен
      </p>
      <p className="text text_type_main-medium mb-6">Состав:</p>
      <ul className="mb-10">
        {mockOrders.map((el) => (
          <li key={el._id} className={`${styles.ingredient} mb-4`}>
            <div className={`${styles.ingredientInfo}`}>
              <div className={`${styles.orderImgWrapper} mr-4`}>
                <img
                  src={el.image_mobile}
                  alt={el.name}
                  className={styles.orderImg}
                />
              </div>
              <h5 className={`text text_type_main-default`}>{el.name}</h5>
            </div>
            <div className={`${styles.ingredientsCount}`}>
              <p className="text text_type_digits-default mr-2">1 x 30</p>
              <CurrencyIcon type={"primary"} />
            </div>
          </li>
        ))}
      </ul>
      <div className={`${styles.orderFooterInfo} mb-10`}>
        <p className="text text_type_main-default text_color_inactive">
          Вчера, 13:50
        </p>
        <div className={`${styles.orderPrice}`}>
          <p className="text text_type_digits-default mr-2">510</p>
          <CurrencyIcon type={"primary"} />
        </div>
      </div>
    </div>
  );
};
