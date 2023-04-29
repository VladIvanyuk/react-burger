import styles from './burger-constructor.module.css';
import { ConstructorElement, CurrencyIcon, Button, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';

export const BurgerConstructor = ({ data }) => {
  const mainsList = data.filter((el) => el.type === 'main').map((el) => (
    <div key={el._id} className={styles.element}>
      <DragIcon />
      <ConstructorElement
        text={el.name}
        price={el.price}
        thumbnail={el.image}
      />
    </div>
  ))
  return (
    <section className={`${styles.constructorBlock} pr-1 pl-2`}>
      <div className={`${styles.constructor} mb-10`}>
        <div className='mr-4'>
          <ConstructorElement
            className='mb-4'
            type="top"
            isLocked={true}
            text="Краторная булка N-200i (верх)"
            price={200}
            thumbnail={'https://code.s3.yandex.net/react/code/bun-02.png'}
          />
        </div>
        <div className={`${styles.scrollBlock} mb-4 pt-4 pr-2`}>
          {mainsList}
        </div>
        <div className='mr-4'>
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text="Краторная булка N-200i (низ)"
            price={200}
            thumbnail={'https://code.s3.yandex.net/react/code/bun-02.png'}
          />
        </div>
      </div>
      <div className={styles.priceBlock}>
        <p className={`${styles.price} text text_type_digits-medium`}>610 <CurrencyIcon /></p>
        <Button htmlType="button" type="primary" size="large">
          Нажми на меня
        </Button>
      </div>
    </section>
  );
};

BurgerConstructor.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
      _id: PropTypes.string,
      name: PropTypes.string,
      type: PropTypes.string,
      proteins: PropTypes.number,
      fat: PropTypes.number,
      carbohydrates: PropTypes.number,
      calories: PropTypes.number,
      price: PropTypes.number,
      image: PropTypes.string,
      image_mobile: PropTypes.string,
      image_large: PropTypes.string,
      __v: PropTypes.number
  }))
};