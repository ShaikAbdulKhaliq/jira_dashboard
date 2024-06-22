import React from 'react'
import css from "./Courses.module.scss"
import { useContext } from 'react'
import { MainContext } from '../../../MainContext/MainContext'
import CoursesInProgress from './CoursesInProgress/CoursesInProgress'
import LoginPage from '../LoginPage/LoginPage'
import CourseVideo from './CourseVideo/CourseVideo'
import { useNavigate } from 'react-router-dom'
import { LMSContext } from '../LMSContext/LMSContext'


const Courses = () => {
  const { loginStatus, setLoginStatus } = useContext(LMSContext)

  const navigate = useNavigate();

  const handleLogOut = () => {
    localStorage.clear();
    navigate(`/lms/login`);
    setLoginStatus({ status: 'success', message: 'Logout Successful' })
    console.log("Local storage cleared");
  };

  const { darkMode, setDarkMode, sprintProgressToolTip, setSprintProgressToolTip } = useContext(MainContext)
  return (
    <div id={!darkMode && css.lightMode} className={css.Lms_main_container}>
      <div className={css.lms_nav} >
        <button className={css.logut} onClick={() => { handleLogOut() }}>Signout</button>
      </div>
      <CoursesInProgress />
    </div>
  )
}

export default Courses