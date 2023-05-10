import styles from "./modal.module.css";
import { ModalOverlay } from "./modal-overlay/modal-overlay";
import { createPortal } from "react-dom";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useEffect } from "react";
import { modalTypes } from "../../utils/prop-types";
import PropTypes from 'prop-types'

export const Modal = ({ onShowModal, ...props }) => {
  useEffect(() => {
    // по нажатию на ESC закрываем модалку
    const closeModalWithESC = (e) => {
      if (e.keyCode === 27) {
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
          <h3 className="text text_type_main-large">Детали ингредиента</h3>
          <CloseIcon onClick={() => onShowModal(false)} type="secondary" />
        </div>
        {props.children}
      </div>
      <ModalOverlay onShowModal={onShowModal} />
    </>,
    document.getElementById("modal")
  );
};

Modal.propTypes = {
  onShowModal: modalTypes.onShowModal,
  children: PropTypes.object
}