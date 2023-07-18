import {
  Button,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useState, useEffect, SyntheticEvent } from "react";
import styles from "./profile-reset.module.css";
import { useDispatch } from "react-redux";
import { updateUser } from "../../services/actions/user";
import { useSelector } from "react-redux";

export const ProfileReset: React.FC = (): JSX.Element => {
  const user = useSelector((store: any) => store.user.user);
  const [emailValue, setEmailValue] = useState<string>(user?.email);
  const [nameValue, setNameValue] = useState<string>(user?.name);
  const [passwordValue, setPasswordValue] = useState<string>("");
  const [isShowButtons, setIsShowButtons] = useState<boolean>(false);
  const dispatch = useDispatch();

  const resetUserInfo = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(
      updateUser({
        email: emailValue,
        name: nameValue,
        password: passwordValue,
      })
    );
  };

  useEffect(() => {
    if(user.email === emailValue && user.name === nameValue && passwordValue === '') {
      setIsShowButtons(false)
    } else {
      setIsShowButtons(true);
    }
  }, [emailValue, nameValue, passwordValue, user])

  const resetFields = (): void => {
    setEmailValue(user.email);
    setNameValue(user.name);
    setPasswordValue("");
  };

  return (
    <form onSubmit={resetUserInfo}>
      <Input
        value={nameValue}
        placeholder={"Имя"}
        icon="EditIcon"
        name={"name"}
        extraClass="mb-6"
        onChange={(e) => setNameValue(e.target.value)}
      />
      <Input
        value={emailValue}
        placeholder={"Email"}
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
      {isShowButtons && (
        <div className={styles.buttonBlock}>
          <button
            type="button"
            className={`${styles.cancel} text text_type_main-default mr-7`}
            onClick={resetFields}
          >
            Отмена
          </button>
          <Button htmlType="submit" type="primary" size="medium">
            Сохранить
          </Button>
        </div>
      )}
    </form>
  );
};
