import styles from "./modal.module.css";
import { ModalOverlay } from "../modal-overlay/modal-overlay";
import { createPortal } from "react-dom";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";

export const Modal = (props) => {
  return createPortal(
    (
      <>
        <div className={`${styles.modal} pt-10 pl-10 pr-10`}>
          <div className={`${styles.modalHeader}`}>
            <h3 className="text text_type_main-large">Детали ингридиента</h3>
            <CloseIcon type="secondary" />
          </div>
          {props.children}
        </div>
        <ModalOverlay />
      </>
    ),
    document.getElementById("modal")
  );
};
