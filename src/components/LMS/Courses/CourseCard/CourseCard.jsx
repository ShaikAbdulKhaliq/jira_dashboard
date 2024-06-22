import React from 'react';
import css from './CourseCard.module.scss';
import { useNavigate } from 'react-router-dom';
const CourseCard = ({ course }) => {
  let navigate=useNavigate()
  return (
    <div className={css.course_card}>
      <img src={course.image} alt={course.title} className={css.course_image} />
      <div className={`${css.deadline} ${course.isOverdue ? css.overdue : ''}`}>
        {course.isOverdue ? 'Overdue' : `Deadline in ${course.deadline} days`}
      </div>

        <h3>{course.title}</h3>
        <div className={css.progress_bar}>
          <div className={css.progress} style={{ width: `${(course.completedLessons / course.totalLessons) * 100}%` }}></div>
        </div>
        <p>{`${course.completedLessons}/${course.totalLessons} lessons completed`}</p>
      <button onClick={()=>navigate("/lms/coursesvideolist")}>Resume Course</button>
    </div>
  );
};

export default CourseCard;
