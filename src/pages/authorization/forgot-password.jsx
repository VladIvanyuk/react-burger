import { Button, EmailInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { AppHeader } from '../../components/app-header/app-header';
import styles from './authorization.module.css';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export const ForgotPassword = (props) => {
  const [emailValue, setEmailValue] = useState('');
  return (
    <>
      <AppHeader />
      <div className={`${styles.window} container`}>
        <div className={styles.mainBlock}>
          <h3 className={`${styles.title} text text_type_main-medium mb-6`}>Восстановить пароль</h3>
          <EmailInput
            value={emailValue}
            name={'email'}
            extraClass="mb-6"
            onChange={(e) => setEmailValue(e.target.value)}
          />
          <Button htmlType="button" type="primary" size="medium" extraClass="mb-20">
            Восстановить
          </Button>
          <p className='text text_type_main-default text_color_inactive mb-4'>Вспомнили пароль? <Link to='/login' className={styles.link}>Войти</Link></p>
        </div>
      </div>
    </>
  );
};