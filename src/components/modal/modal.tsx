import styles from "./modal.module.css";
import { ModalOverlay } from "./modal-overlay/modal-overlay";
import { createPortal } from "react-dom";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import React, { useEffect } from "react";
import { TModal } from "../../services/types/types";

export const Modal: React.FC<React.PropsWithChildren<TModal>> = ({ onShowModal, modalHeaderText, ...props }) => {
  useEffect(() => {
    // по нажатию на ESC закрываем модалку
    const closeModalWithESC = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onShowModal(false);
      }
    };
    window.addEventListener("keydown", closeModalWithESC);
    // при закрытии модалки удаляем обработчик
    return () => {
      window.removeEventListener("keydown", closeModalWithESC);
    };
  }, [onShowModal]);

  return createPortal(
    <>
      <div className={`${styles.modal} pt-10 pl-10 pr-10`}>
        <div className={`${styles.modalHeader}`}>
          <h3 className="text text_type_main-large">{modalHeaderText}</h3>
          <CloseIcon onClick={() => onShowModal(false)} type="secondary" />
        </div>
        {props.children}
      </div>
      <ModalOverlay onShowModal={onShowModal} modalHeaderText={""} />
    </>,
    document.getElementById("modal") as HTMLElement
  );
};
