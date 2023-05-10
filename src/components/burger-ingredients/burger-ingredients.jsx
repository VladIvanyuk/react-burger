import styles from "./burger-ingredients.module.css";
import React, { useMemo, useContext } from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import { IngredientList } from "../ingredients-list/ingredients-list";
import { AppContext } from "../../services/appContext";

export const BurgerIngredients = () => {
  const { data } = useContext(AppContext);
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
        <IngredientList ingredientsInfo={bunFilter} name='Булки'/>
        <IngredientList ingredientsInfo={sauceFilter} name='Соусы'/>
        <IngredientList ingredientsInfo={mainFilter} name='Начинки'/>
      </div>
    </section>
  );
};
