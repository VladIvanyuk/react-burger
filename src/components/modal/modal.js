import styles from "./modal.module.css";
import { ModalOverlay } from "../modal-overlay/modal-overlay";
import { createPortal } from "react-dom";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useEffect } from 'react';

export const Modal = ({ onCloseModal, ...props }) => {

  useEffect(() => {
    // по нажатию на ESC закрываем модалку
    const closeModal = (e) => {
      if(e.keyCode === 27) {
        onCloseModal();
      }
    };
    window.addEventListener('keydown', closeModal);
    // при закрытии модалки удаляем обработчик
    return () => {
      window.removeEventListener('keydown', closeModal);
    }
  }, [onCloseModal]);

  return createPortal(
    (
      <>
        <div className={`${styles.modal} pt-10 pl-10 pr-10`}>
          <div className={`${styles.modalHeader}`}>
            <h3 className="text text_type_main-large">Детали ингридиента</h3>
            <CloseIcon onClick={onCloseModal} type="secondary" />
          </div>
          {props.children}
        </div>
        <ModalOverlay onCloseModal={onCloseModal} />
      </>
    ),
    document.getElementById("modal")
  );
};
