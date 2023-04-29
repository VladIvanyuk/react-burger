import styles from "./burger-ingredients.module.css";
import React from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import { IngredientList } from "../ingredients-list/ingredients-list";
import PropTypes from 'prop-types';

export const BurgerIngredients = ({ data }) => {
  console.log(data)
  const [current, setCurrent] = React.useState("one");
  const bunFilter = data.filter((item) => item.type === 'bun');
  const sauceFilter = data.filter((item) => item.type === 'sauce');
  const mainFilter = data.filter((item) => item.type === 'main');

  const tabs = [
    {
      text: 'Булки',
      code: 'one'
    },
    {
      text: 'Cоусы',
      code: 'two'
    },
    {
      text: 'Начинки',
      code: 'three'
    },
  ];

  const tabsList = tabs.map((el, index) => (
    <Tab key={index} value={el.code} active={current === el.code} onClick={setCurrent}>
      {el.text}
    </Tab>
  ));

  return (
    <section className={styles.ingredientsBlock}>
      <div className={`${styles.tabs} mb-10`}>
        {tabsList}
      </div>
      <div className={styles.listBlock}>
        <IngredientList ingredientsInfo={bunFilter} name='Булки'/>
        <IngredientList ingredientsInfo={sauceFilter} name='Соусы'/>
        <IngredientList ingredientsInfo={mainFilter} name='Начинки'/>
      </div>
    </section>
  );
};

BurgerIngredients.propTypes = {
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