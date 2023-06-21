import '../../index.css';
import styles from './login.module.css';
import { AppHeader } from '../../components/app-header/app-header';
import { EmailInput, Button, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { useState } from 'react';

export const Login = (props) => {
  const [emailValue, setEmailValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');

  return (
    <div>
      <AppHeader />
      <div className={`${styles.window} container`}>
        <div className={styles.mainBlock}>
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
          <Button htmlType="button" type="primary" size="medium" extraClass="mb-20">
            Нажми на меня
          </Button>
          <p className='text text_type_main-default text_color_inactive mb-4'>Вы - новый пользователь? <span className={styles.registry}>Зарегистрироваться</span></p>
          <p className='text text_type_main-default text_color_inactive'>Забыли пароль? <span className={styles.registry}>Восстановить пароль</span></p>
        </div>
      </div>
    </div>
  );
};