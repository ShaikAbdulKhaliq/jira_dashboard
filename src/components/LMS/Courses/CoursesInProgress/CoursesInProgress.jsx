import React from 'react';
import css from './CoursesInProgress.module.scss';
import CourseCard from '../CourseCard/CourseCard';
import courses from './CourseInProgress.js';

const CoursesInProgress = () => {
  return (
    <div className={css.courses_in_progress}>
      <p>Courser In Progress</p>
      <div>
      {courses.map((course, index) => (
        <CourseCard key={index} course={course} />
      ))}
      </div>
    </div>
  );
};

export default CoursesInProgress;
