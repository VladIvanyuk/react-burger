import styles from "./modal-overlay.module.css";
import { createPortal } from "react-dom";

export const ModalOverlay = ({ onCloseModal }) => {
  return createPortal(
    (
      <>
        <div onClick={onCloseModal} className={styles.backdrop}></div>
      </>
    ),
    document.getElementById("overlay")
  );
};
