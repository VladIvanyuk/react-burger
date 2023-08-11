import { AppHeader } from "../../components/app-header/app-header";
import styles from "./order-page.module.css";
import { Order } from "../../components/order/order";

export const OrderPage = () => {
  return (
    <main>
      <AppHeader />
      <Order />
    </main>
  );
};
