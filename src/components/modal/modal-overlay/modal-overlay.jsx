import styles from "./modal-overlay.module.css";
import { modalTypes } from "../../../utils/prop-types.js";

export const ModalOverlay = ({ onShowModal }) => {
  return (
    <div onClick={() => onShowModal(false)} className={styles.backdrop}></div>
  )
};

ModalOverlay.propTypes = {
  onShowModal: modalTypes.onShowModal
}