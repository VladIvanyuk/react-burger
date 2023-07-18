import styles from "./ingredient-page.module.css";
import { AppHeader } from "../../components/app-header/app-header";
import { IngredientDetails } from "../../components/ingredient-details/ingredient-details";

export const IngredientPage: React.FC = (): JSX.Element => {

  return (
    <>
      <AppHeader />
      <main>
        <IngredientDetails />
      </main>
    </>
  );
};
