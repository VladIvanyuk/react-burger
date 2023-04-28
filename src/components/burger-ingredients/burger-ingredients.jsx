import styles from "./burger-ingredients.module.css";
import React from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import { IngredientList } from "../ingredients-list/ingredients-list";

export const BurgerIngredients = ({ data }) => {
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
      <div className='pt-6 pl-4 pb-10 pr-4'>
        <h2 className="text text_type_main-medium">Булки</h2>
        <div style={{display: 'flex'}}>
          <IngredientList ingredientInfo={bunFilter}/>
        </div>
      </div>
      <div className='pt-6 pl-4 pb-10 pr-4'>
        <h2 className="text text_type_main-medium">Соусы</h2>
        <div style={{display: 'flex'}}>
          <IngredientList ingredientInfo={sauceFilter}/>
        </div>
      </div>
      <div className='pt-6 pl-4 pb-10 pr-4'>
        <h2 className="text text_type_main-medium">Начинки</h2>
        <div style={{display: 'flex'}}>
          <IngredientList ingredientInfo={mainFilter}/>
        </div>
      </div>
    </section>
  );
};
