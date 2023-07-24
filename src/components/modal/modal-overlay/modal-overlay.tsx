import styles from "./modal-overlay.module.css";
import { TModal } from "../../../services/types/types";

export const ModalOverlay: React.FC<TModal> = ({ onShowModal }: TModal) => {
  return (
    <div onClick={() => onShowModal(false)} className={styles.backdrop}></div>
  )
};
