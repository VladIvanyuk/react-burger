import {
  Button,
  EmailInput,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useState } from "react";
import styles from "./profile-reset.module.css";
import { useDispatch } from "react-redux";
import { updateUser } from "../../services/actions/user";
import { useSelector } from "react-redux";

export const ProfileReset = (props) => {
  const { user } = useSelector((store) => store.user);
  const [emailValue, setEmailValue] = useState(user?.email);
  const [nameValue, setNameValue] = useState(user?.name);
  const [passwordValue, setPasswordValue] = useState('');
  const dispatch = useDispatch();
  
  const resetUserInfo = (e) => {
    e.preventDefault();
    dispatch(updateUser({
      email: emailValue,
      name: nameValue,
      password: passwordValue
    }));
  }

  const resetFields = () => {
    setEmailValue('');
    setNameValue('');
    setPasswordValue('');
  }

  return (
    <form onSubmit={resetUserInfo}>
      <Input
        value={nameValue}
        placeholder={'Имя'}
        icon="EditIcon"
        name={"name"}
        extraClass="mb-6"
        onChange={(e) => setNameValue(e.target.value)}
      />
      <EmailInput
        value={emailValue}
        placeholder={'Email'}
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
        <button type="button" className={`${styles.cancel} text text_type_main-default mr-7`} onClick={resetFields}>
          Отмена
        </button>
        <Button
            htmlType="submit"
            type="primary"
            size="medium"
          >
            Сохранить
          </Button>
      </div>
    </form>
  );
};
