import styles from "./burger-ingredients.module.css";
import React, { useMemo } from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import { IngredientList } from "../ingredients-list/ingredients-list";
import { ingredientTypes } from "../../utils/prop-types";

export const BurgerIngredients = ({ data, onShowModal, getIngredient, getModalType }) => {
  const [current, setCurrent] = React.useState("one");
  const bunFilter = useMemo(() => data.filter((item) => item.type === 'bun'), [data]);
  const sauceFilter = useMemo(() => data.filter((item) => item.type === 'sauce'), [data]);
  const mainFilter = useMemo(() => data.filter((item) => item.type === 'main'), [data]);

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
        <IngredientList ingredientsInfo={bunFilter} name='Булки' onShowModal={onShowModal} getIngredient={getIngredient} getModalType={getModalType}/>
        <IngredientList ingredientsInfo={sauceFilter} name='Соусы' onShowModal={onShowModal} getIngredient={getIngredient} getModalType={getModalType}/>
        <IngredientList ingredientsInfo={mainFilter} name='Начинки' onShowModal={onShowModal} getIngredient={getIngredient} getModalType={getModalType}/>
      </div>
    </section>
  );
};

BurgerIngredients.propTypes = ingredientTypes;