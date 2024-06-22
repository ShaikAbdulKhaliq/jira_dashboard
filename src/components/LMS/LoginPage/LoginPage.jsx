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
  const [submit, setSubmit] = useState(false);
  const [formDataLoaded, setFormDataLoaded] = useState(false); // To track if formData is loaded

  const { darkMode } = useContext(MainContext);
  const { loginResponse, setLoginResponse, formData, setFormData, loginStatus, setLoginStatus } = useContext(LMSContext);

  // const notify = () => toast.loginStatus.statuus(loginStatus.message)
  ;
  const navigate = useNavigate();


  const notify = () => {
    if (loginStatus.status === 'success') {
      toast.success(loginStatus.message);
    } else if (loginStatus.status === 'error') {
      toast.error(loginStatus.message);
    }
  };



  const handleChange = (e) => {
    const { name, value } = e.target;
    setSubmit(false);
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value.toUpperCase()
    }));
    if (errors[name]) {
      setErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length === 0) {
      try {
        const response = await getloginCredentials(formData);
        console.log(response, "response");
        if (response != null) {
          setLoginResponse(response);

          // Store formData in local storage
          localStorage.setItem('formData', JSON.stringify(formData));

          // Set login status and notify
          setLoginStatus({ status: 'success', message: 'Login Successful' });

          setTimeout(() => {
            navigate(`/lms/${formData.EmployeeID}/courses`);
          }, 1000);
        } else {
          setFormData(() => ({
            Name: '', EmployeeID: ''
          }));

          // Set login status and notify
          setLoginStatus({ status: 'error', message: 'Enter Valid Details' });

          setSubmit(true);
          console.error("Login failed: No response data");
        }


      } catch (error) {
        console.error("Login failed", error);
      }
    } else {
      setErrors(validationErrors);
    }
  };

  const validate = () => {
    let validationErrors = {};
    if (!formData.Name.trim()) validationErrors.Name = 'Name is required';
    if (!formData.EmployeeID.trim()) validationErrors.EmployeeID = 'Employee ID is required';
    return validationErrors;
  };

  useEffect(() => {
    setSubmit(false);
    setFormData({ Name: '', EmployeeID: '' });
    // setLoginStatus({ status: '', message: '' })

    const loadingTimeout = setTimeout(() => {
      const storedFormData = localStorage.getItem('formData');
      if (storedFormData) {
        const parsedFormData = JSON.parse(storedFormData);
        setFormData(parsedFormData);
        setFormDataLoaded(true);
      }
    }, 1000);

    return () => clearTimeout(loadingTimeout);
  }, []);

  useEffect(() => {
    notify();

  }, [loginStatus])

  useEffect(() => {

    if (formDataLoaded) {
      const navigationTimeout = setTimeout(() => {
        navigate(`/lms/${formData.EmployeeID}/courses`);
      }, 1000);

      return () => clearTimeout(navigationTimeout);
    }
  }, [formDataLoaded, formData, navigate]);

  return (
    <div className={styles.loginPage} id={!darkMode && styles.lightMode}>
      <div className={styles.loginFormWrapper}>
        <form className={styles.loginForm} onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="Name">Name</label>
            <input
              type="text"
              id="Name"
              name="Name"
              placeholder="Name"
              className={classNames(styles.input, { [styles.error]: errors.Name })}
              value={formData.Name}
              onChange={handleChange}
            />
            {errors.Name && <span className={styles.errorMessage}>{errors.Name}</span>}
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="EmployeeID">Employee ID</label>
            <input
              type="text"
              id="EmployeeID"
              name="EmployeeID"
              placeholder="Employee ID"
              className={classNames(styles.input, { [styles.error]: errors.EmployeeID })}
              value={formData.EmployeeID}
              onChange={handleChange}
            />
            {errors.EmployeeID && <span className={styles.errorMessage}>{errors.EmployeeID}</span>}
          </div>
          {submit ? (<p className={styles.errorMessage}>Invalid Name or Employee ID</p>) : ""}

          <button type="submit" className={styles.loginButton}>Login</button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
