import {
  Button,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useState, useEffect, SyntheticEvent } from "react";
import styles from "./profile-reset.module.css";
import { updateUser } from "../../services/actions/user";
import { TDispatchActions } from "../../services/types/types";
import { useDispatch, useSelector } from "../../services/hooks/hooks";

export const ProfileReset: React.FC = () => {
  const user = useSelector((store: any) => store.user.user);
  const [emailValue, setEmailValue] = useState(user?.email);
  const [nameValue, setNameValue] = useState(user?.name);
  const [passwordValue, setPasswordValue] = useState("");
  const [isShowButtons, setIsShowButtons] = useState(false);
  const dispatch: TDispatchActions = useDispatch();

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
        autoComplete="on"
      />
      <Input
        value={emailValue}
        placeholder={"Email"}
        icon="EditIcon"
        name={"email"}
        extraClass="mb-6"
        onChange={(e) => setEmailValue(e.target.value)}
        autoComplete="on"
      />
      <PasswordInput
        value={passwordValue}
        icon="EditIcon"
        name={"password"}
        extraClass="mb-6"
        autoComplete="on"
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
