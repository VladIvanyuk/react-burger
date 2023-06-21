import { Button, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { AppHeader } from '../../components/app-header/app-header';
import styles from './authorization.module.css';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export const ResetPassword = (props) => {
  const [emailValue, setEmailValue] = useState('');
  const [code, setCode] = useState('');
  return (
    <>
      <AppHeader />
      <div className={`${styles.window} container`}>
        <div className={styles.mainBlock}>
          <h3 className={`${styles.title} text text_type_main-medium mb-6`}>Восстановить пароль</h3>
          <PasswordInput
            placeholder='Введите новый пароль'
            value={emailValue}
            name={'email'}
            extraClass="mb-6"
            onChange={(e) => setEmailValue(e.target.value)}
          />
           <Input
            value={code}
            placeholder="Введите код из письма"
            name={'code'}
            extraClass="mb-6"
            onChange={(e) => setCode(e.target.value)}
          />
          <Button htmlType="button" type="primary" size="medium" extraClass="mb-20">
            Сохранить
          </Button>
          <p className='text text_type_main-default text_color_inactive mb-4'>Вспомнили пароль? <Link to='/login' className={styles.link}>Войти</Link></p>
        </div>
      </div>
    </>
  );
};