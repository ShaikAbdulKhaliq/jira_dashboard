import React, { useState, useContext, useEffect } from 'react';
import classNames from 'classnames';
import styles from './LoginPage.module.scss';
import { useNavigate } from 'react-router-dom';
import { MainContext } from '../../../MainContext/MainContext';
import { getloginCredentials } from '../../MobiusIntelliBoard/service/service';
import { LMSContext } from '../LMSContext/LMSContext';
import toast from 'react-hot-toast';

const LoginPage = () => {
  const [errors, setErrors] = useState({});
  const [formDataLoaded, setFormDataLoaded] = useState(false);

  const { darkMode } = useContext(MainContext);
  const { loginResponse, setLoginResponse, setFormData, loginStatus, setLoginStatus } = useContext(LMSContext);
  const navigate = useNavigate();

  const notify = () => {
    if (loginStatus.status === 'success') {
      toast.success(loginStatus.message);
    } else if (loginStatus.status === 'error') {
      toast.error(loginStatus.message);
    }
  };

  useEffect(() => {
    // Automatically set the form data to your credentials
    const predefinedFormData = { Name: 'SHAIK ABDUL KHALEED', EmployeeID: 'GS108' };
    setFormData(predefinedFormData);
    setFormDataLoaded(true);
  }, [setFormData]);

  useEffect(() => {
    if (formDataLoaded) {
      const login = async () => {
        try {
          const response = await getloginCredentials({ Name: 'SHAIK ABDUL KHALEED', EmployeeID: 'GS108' });
          setLoginResponse(response);

          localStorage.setItem('formData', JSON.stringify({ Name: 'SHAIK ABDUL KHALEED', EmployeeID: 'GS108' }));

          setLoginStatus({ status: 'success', message: 'Login Successful' });

          setTimeout(() => {
            navigate(`/lms/GS108/courses`);
          }, 1000);
        } catch (error) {
          console.error("Login failed", error);
          setLoginStatus({ status: 'error', message: 'Login Failed' });
        }
      };
      login();
    }
  }, [formDataLoaded, setLoginResponse, setLoginStatus, navigate]);

  useEffect(() => {
    notify();
  }, [loginStatus]);

  return (
    <div className={styles.loginPage} id={!darkMode && styles.lightMode}>
      <div className={styles.loginFormWrapper}>
        <form className={styles.loginForm}>
          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="Name">Name</label>
            <input
              type="text"
              id="Name"
              name="Name"
              placeholder="Name"
              className={classNames(styles.input)}
              value="SHAIK ABDUL KHALEED"
              readOnly
            />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="EmployeeID">Employee ID</label>
            <input
              type="text"
              id="EmployeeID"
              name="EmployeeID"
              placeholder="Employee ID"
              className={classNames(styles.input)}
              value="GS108"
              readOnly
            />
          </div>
          <button type="submit" className={styles.loginButton} disabled>Login</button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
