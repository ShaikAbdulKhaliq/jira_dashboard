import React, { useState, useContext, useRef, useEffect } from 'react';
import css from "./CourseVideo.module.scss";
import { MainContext } from '../../../../MainContext/MainContext';
import { GetCourseDataForEachEmployee } from '../../LmsServiceApis/LmsServiceApis.js';

const CourseVideo = () => {
  const [CourseList,setCourseList]=useState([])
  const [selectedCourse, setSelectedCourse] = useState(null); // Currently selected course
  const [currentChapter, setCurrentChapter] = useState(null); // Currently selected chapter
  const [completedChaptersMap, setCompletedChaptersMap] = useState({}); // Map of completed chapters for each course
  const [pausedTimes, setPausedTimes] = useState({}); // Map of paused times for each chapter
  const videoRef = useRef(null); // Reference to the video element

  useEffect(() => {
    const employeeDataString = localStorage.getItem('formData');
    const employeeData = JSON.parse(employeeDataString);
    const employeeID = employeeData.EmployeeID;

    GetCourseDataForEachEmployee(employeeID)
      .then(coursesAligned => {
        setCourseList(coursesAligned);
        setSelectedCourse(coursesAligned[0]); // Set the first course as selected
        console.log("Retrieved courses:", coursesAligned);
      })
      .catch(error => {
        console.error("Error:", error);
      });
  }, []);

  useEffect(() => {
    console.log("CourseList:", CourseList);
  }, [CourseList]);

  const handleChapterClick = (chapter, index) => {
    if (!completedChaptersMap[selectedCourse.id]?.includes(index)) {
      setCurrentChapter(chapter);
      if (videoRef.current) {
        videoRef.current.currentTime = 0;
      }
    }
  };

  const handleVideoEnd = (index) => {
    setCompletedChaptersMap((prevMap) => {
      const updatedMap = { ...prevMap };
      if (!updatedMap[selectedCourse.id]) {
        updatedMap[selectedCourse.id] = [];
      }
      updatedMap[selectedCourse.id].push(index);
      return updatedMap;
    });
  };

  const handlePause = () => {
    const currentTime = videoRef.current.currentTime;
    setPausedTimes((prevTimes) => ({
      ...prevTimes,
      [`${selectedCourse.id}-${currentChapter.name}`]: currentTime,
    }));
  };

  useEffect(() => {
    if (currentChapter && videoRef.current) {
      const pausedTime = pausedTimes[`${selectedCourse.id}-${currentChapter.name}`];
      if (pausedTime) {
        videoRef.current.currentTime = pausedTime;
      }
    }
  }, [currentChapter, selectedCourse, pausedTimes]);

  const { darkMode } = useContext(MainContext);

  return (
    <div className={css.course_viewer} id={!darkMode && css.lightMode}>
      <div className={css.sidebar}>
        <h3>Courses</h3>
        <ul>
          {CourseList.map(course => (
            <li 
              key={course.id} 
              onClick={() => {
                setSelectedCourse(course);
                setCurrentChapter(null);
              }}
            >
              {course.name}
            </li>
          ))}
        </ul>
      </div>
      <div className={css.content}>
        <div className={css.video_section}>
          {currentChapter ? (
            <>
              <h2>{currentChapter.name}</h2>
              <video 
                ref={videoRef}
                src={currentChapter.url} 
                controls 
                onEnded={() => handleVideoEnd(selectedCourse.chapter.indexOf(currentChapter))}
                onPause={handlePause} 
              />
              <p>{selectedCourse.description}</p>
            </>
          ) : (
            <h2>Select a chapter to view</h2>
          )}
        </div>
        <div className={css.chapters_section}>
          <h3>Chapters</h3>
          <ul>
            {selectedCourse && selectedCourse.chapter.map((chapter, index) => (
              <li 
                key={index} 
                className={completedChaptersMap[selectedCourse.id]?.includes(index) ? css.completed : ''} 
                onClick={() => handleChapterClick(chapter, index)}
              >
                {chapter.name}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CourseVideo;
