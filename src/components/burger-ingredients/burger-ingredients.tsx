import styles from "./burger-ingredients.module.css";
import React, { useMemo } from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import { IngredientList } from "../ingredients-list/ingredients-list";
import { useSelector } from "react-redux";
import { TIngredient, TTabs } from "../../types/types";

export const BurgerIngredients: React.FC = (): JSX.Element => {
  const { data } = useSelector((store: any) => store.burgerIngredients);
  const [currentTab, setCurrentTab] = React.useState("bun");
  const bunFilter = useMemo(() => data.filter((item: TIngredient) => item.type === 'bun'), [data]);
  const sauceFilter = useMemo(() => data.filter((item: TIngredient) => item.type === 'sauce'), [data]);
  const mainFilter = useMemo(() => data.filter((item: TIngredient) => item.type === 'main'), [data]);

  // скролл по клику на таб (в будущем можно переделать на ref'ы)
  const onTabClick = (tab: string) => {
    setCurrentTab(tab);
    const elem: HTMLElement | null = document.getElementById(tab);
    if (elem) elem.scrollIntoView({ behavior: 'smooth'  });
  }
  // меняем активный таб при скролле
  const changeActiveTabsOnScroll = (pos: number) => {
    if (pos <= 130) {
      setCurrentTab('bun')
    } else if (pos > 130 && pos < 600) {
      setCurrentTab('sauce')
    } else {
      setCurrentTab('main');
    }
  }

  const tabs: TTabs[] = [
    {
      text: 'Булки',
      code: 'bun'
    },
    {
      text: 'Cоусы',
      code: 'sauce'
    },
    {
      text: 'Начинки',
      code: 'main'
    },
  ];

  const tabsList: JSX.Element[] = tabs.map((el, index) => (
    <Tab key={index} value={el.code} active={currentTab === el.code} onClick={onTabClick}>
      {el.text}
    </Tab>
  ));

  return (
    <section className={styles.ingredientsBlock}>
      <div className={`${styles.tabs} mb-10`}>
        {tabsList}
      </div>
      <div className={styles.listBlock} onScroll={(e) => changeActiveTabsOnScroll((e.target as HTMLElement).scrollTop)}>
        <IngredientList ingredientsInfo={bunFilter} name='Булки' id={`bun`}/>
        <IngredientList ingredientsInfo={sauceFilter} name='Соусы' id={`sauce`}/>
        <IngredientList ingredientsInfo={mainFilter} name='Начинки' id={`main`}/>
      </div>
    </section>
  );
};
