import styles from './burger-constructor.module.css';
import { ConstructorElement, CurrencyIcon, Button, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ingredientsListTypes, modalTypes } from "../../utils/prop-types";

export const BurgerConstructor = ({ data, getModalType, onShowModal }) => {

  const showModal = () => {
    onShowModal(true);
    getModalType('order');
  };

  const mainsList = data.filter((el) => el.type === 'main').map((el) => (
    <div key={el._id} className={styles.element}>
      <DragIcon />
      <ConstructorElement
        text={el.name}
        price={el.price}
        thumbnail={el.image}
      />
    </div>
  ));
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
        <Button htmlType="button" type="primary" size="large" onClick={showModal}>
          Нажми на меня
        </Button>
      </div>
    </section>
  );
};

BurgerConstructor.propTypes = { 
  ...ingredientsListTypes,
  ...modalTypes
}