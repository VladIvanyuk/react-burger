import {
  Button,
  EmailInput,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useState } from "react";
import styles from "./profile-reset.module.css";

export const ProfileReset = (props) => {
  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [nameValue, setNameValue] = useState("");
  const reset = () => {
    
  }

  return (
    <form>
      <Input
        value={nameValue}
        placeholder="Имя"
        icon="EditIcon"
        name={"name"}
        extraClass="mb-6"
        onChange={(e) => setNameValue(e.target.value)}
      />
      <EmailInput
        value={emailValue}
        icon="EditIcon"
        name={"email"}
        extraClass="mb-6"
        onChange={(e) => setEmailValue(e.target.value)}
      />
      <PasswordInput
        value={passwordValue}
        icon="EditIcon"
        name={"password"}
        extraClass="mb-6"
        onChange={(e) => setPasswordValue(e.target.value)}
      />
      <div className={styles.buttonBlock}>
        <button type="button" className={`${styles.cancel} text text_type_main-default mr-7`}>
          Отмена
        </button>
        <Button
            htmlType="button"
            type="primary"
            size="medium"
            onClick={reset}
          >
            Сохранить
          </Button>
      </div>
    </form>
  );
};
