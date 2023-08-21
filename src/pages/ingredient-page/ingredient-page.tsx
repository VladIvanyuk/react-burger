import { AppHeader } from "../../components/app-header/app-header";
import { IngredientDetails } from "../../components/ingredient-details/ingredient-details";

export const IngredientPage: React.FC = () => {

  return (
    <>
      <AppHeader />
      <main>
        <IngredientDetails />
      </main>
    </>
  );
};
