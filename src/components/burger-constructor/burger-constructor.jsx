import styles from './burger-constructor.module.css';
import { useContext, useEffect, useReducer } from 'react';
import { ConstructorElement, CurrencyIcon, Button, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
// import { ingredientsListTypes, modalTypes } from "../../utils/prop-types";
import { AppContext } from '../../services/appContext';

const initialOrderSum = {sum: 0};

function reducer(state, action) {
  switch(action.type) {
    case 'calculate':
      return {sum: state.sum + action.sum}
    default:
      throw new Error(`Wrong type of action: ${action.type}`);
  }
}

export const BurgerConstructor = () => {

  const { constructorList, getModalTypeHandler, onShowModalHandler } = useContext(AppContext);
  const [orderSum, orderSumDispatcher] = useReducer(reducer, initialOrderSum);

  const showModal = () => {
    onShowModalHandler(true);
    getModalTypeHandler('order');
  };

  useEffect(() => {
    let result = constructorList.reduce((acc, cur) => acc + cur.price, 0);
    orderSumDispatcher({type: 'calculate', sum: result})
  }, [constructorList]);

  // фильтруем и сохраняем все ингридиенты кроме булок
  const ingredientsList = constructorList.filter((el) => el.type !== 'bun').map((el) => (
    <div key={el._id} className={styles.element}>
      <DragIcon />
      <ConstructorElement
        text={el.name}
        price={el.price}
        thumbnail={el.image}
      />
    </div>
  ));

  // отдельно сохраняем булки
  const bun = constructorList.find((el) => el.type === 'bun');

  return (
    <section className={`${styles.constructorBlock} pr-1 pl-2`}>
      <div className={`${styles.constructor} mb-10`}>
        <div className='mr-4'>
          <ConstructorElement
            className='mb-4'
            type="top"
            isLocked={true}
            text={`${bun.name} (верх)`}
            price={bun.price}
            thumbnail={bun.image}
          />
        </div>
        <div className={`${styles.scrollBlock} mb-4 pt-4 pr-2`}>
          {ingredientsList}
        </div>
        <div className='mr-4'>
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text={`${bun.name} (низ)`}
            price={bun.price}
            thumbnail={bun.image}
          />
        </div>
      </div>
      <div className={styles.priceBlock}>
        <p className={`${styles.price} text text_type_digits-medium`}>{orderSum.sum}<CurrencyIcon /></p>
        <Button htmlType="button" type="primary" size="large" onClick={showModal}>
          Нажми на меня
        </Button>
      </div>
    </section>
  );
};

// BurgerConstructor.propTypes = { 
//   ...ingredientsListTypes,
//   ...modalTypes
// }