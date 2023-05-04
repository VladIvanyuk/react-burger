import styles from "./modal-overlay.module.css";
import { createPortal } from "react-dom";

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
