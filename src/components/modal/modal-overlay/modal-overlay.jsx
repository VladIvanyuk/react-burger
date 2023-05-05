import styles from "./modal-overlay.module.css";
import { createPortal } from "react-dom";
import { modalTypes } from "../../../utils/prop-types.js";

export const ModalOverlay = ({ onShowModal }) => {
  return createPortal(
    (
      <>
        <div onClick={() => onShowModal(false)} className={styles.backdrop}></div>
      </>
    ),
    document.getElementById("overlay")
  );
};

ModalOverlay.propTypes = {
  onShowModal: modalTypes.onShowModal
}