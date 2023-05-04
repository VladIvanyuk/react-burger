import styles from "./modal-overlay.module.css";
import { createPortal } from "react-dom";

export const ModalOverlay = (props) => {
  return createPortal(
    (
      <>
        <div className={styles.backdrop}></div>
      </>
    ),
    document.getElementById("overlay")
  );
};
