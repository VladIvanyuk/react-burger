import styles from './authorization.module.css';
import { AppHeader } from '../../components/app-header/app-header';
import { EmailInput, Button, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { useState, SyntheticEvent} from 'react';
import { Link } from 'react-router-dom';
import { loginUser } from '../../services/actions/user';
import { useDispatch } from 'react-redux';

export const Login: React.FC = (): JSX.Element => {
  const [emailValue, setEmailValue] = useState<string>('');
  const [passwordValue, setPasswordValue] = useState<string>('');
  const dispatch = useDispatch();
  const login = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(loginUser({
      email: emailValue,
      password: passwordValue
    }))
  }

  return (
    <>
      <AppHeader />
      <main className={`${styles.window} container`}>
        <form className={styles.mainBlock} onSubmit={login}>
          <h3 className={`${styles.title} text text_type_main-medium mb-6`}>Вход</h3>
          <EmailInput 
            value={emailValue}
            name={'email'}
            extraClass="mb-6"
            onChange={(e) => setEmailValue(e.target.value)}
          />
          <PasswordInput 
            value={passwordValue}
            name={'password'}
            extraClass="mb-6"
            onChange={(e) => setPasswordValue(e.target.value)}
          />
          <Button htmlType="submit" type="primary" size="medium" extraClass="mb-20">
            Войти
          </Button>
          <p className='text text_type_main-default text_color_inactive mb-4'>Вы - новый пользователь? <Link to='/register' className={styles.link}>Зарегистрироваться</Link></p>
          <p className='text text_type_main-default text_color_inactive'>Забыли пароль? <Link to='/forgot-password' className={styles.link}>Восстановить пароль</Link></p>
        </form>
      </main>
    </>
  );
};