import React, { useContext, useState } from 'react';
import css from './TicketsTable.module.scss';
import bookMark from '../../../assets/bookmark.svg';
import inprogress from '../../../assets/stopwatch.png';
import todo from '../../../assets/todo.png';
import done from '../../../assets/done.png';
import code from '../../../assets/code.png';
import LinkIcon from '../../../assets/link.svg'
import nodata from '../../../assets/nodata.png'

import moment from 'moment';
import { SrdpContext } from '../Context/SrdpContext';
import { use } from 'echarts';
import { useParams } from 'react-router-dom';
import { MainContext } from '../../../MainContext/MainContext';

const TicketsTable = ({ stories_data }) => {
    const { boardId } = useParams()
    const uniqueStatusNames = [...new Set(stories_data.map(item => item.status_name))];
    const { storyData, story_id, setStoryData } = useContext(SrdpContext);
    const { darkMode } = useContext(MainContext);
    const [selected, setSelected] = useState({
        [stories_data.length > 0 ? stories_data[0].story_id : null]: true
    });
     const { filteredStoriesLength, setFilteredStoriesLength } = useState([]);
    const toggleSelected = (storyId) => {
        setSelected(prevState => ({
            [storyId]: !prevState[storyId]
        }));
    };

    // console.log(storyData, "setStoryData(story)");
    const getDate = (date) => moment(date).format("MMM Do YYYY, h:mm:ss A");

    return (
        <div className={css.mainContainer} id={!darkMode && css.lightMode}>
            {stories_data.length ? (

                uniqueStatusNames.map((statusName) => {
                    const filteredStories = stories_data.filter(story => story.status_name === statusName);
                    const length = filteredStories.length;
                    return (
                        <div className={css.columns} key={statusName}>
                            <div className={css.heading}>
                                <span>
                                    {
                                        statusName == "To Do" ? <img src={todo} alt="" /> : statusName == "In Progress" ? <img src={inprogress} alt="" /> : statusName == "Done" ? <img src={done} alt="" /> : <img src={code} alt="" />
                                    }
                                    <p>{statusName}</p>
                                </span>
                                <p>{length}</p>
                            </div>
                            <div className={css.content}>
                                {filteredStories.map((story) => {
                                    return <div
                                        key={story.story_id}
                                        className={`${css.ticket} ${selected[story.story_id] ? css.selected : null}`}
                                        id={`${statusName == "To Do" ? css.todo : statusName == "In Progress" ? css.inprogress : statusName == "Done" ? css.done : css.normal}`}
                                        onClick={() => {
                                            toggleSelected(story.story_id);
                                            setStoryData(story);
                                        }}>

                                        <div className={css.header}>
                                            {/* <img src={bookMark} alt="" /> */}
                                            {/*
                                        styling for status name / heading of the ticket
                                         style={{ color: `${statusName == "To Do" ? "#007bff" : statusName == "In Progress" ? "#c59d30" : statusName == "Done" ? "#0dac0d" : ""}` }} */}
                                            {
                                                statusName == "To Do" ? <img src={todo} alt="" /> : statusName == "In Progress" ? <img src={inprogress} alt="" /> : statusName == "Done" ? <img src={done} alt="" /> : <img src={bookMark} alt="" />
                                            }
                                            <p title={story.story_name}>{story.story_name}</p>
                                            <a href={`https://gaiansolutions.atlassian.net/jira/software/c/projects/${story?.project_key}/boards/${boardId}?selectedIssue=${story?.story_key}`} target="_blank" rel="noopener noreferrer">
                                                <img src={LinkIcon} alt="" />
                                            </a>
                                        </div>
                                        <div className={css.attributes}>
                                            <div>
                                                <span>
                                                    <p> Hygiene :</p>
                                                    <p> {story.story_ac_hygiene}</p>
                                                </span>
                                                <div style={{ backgroundColor: `${statusName == "To Do" ? "#0080ff20" : statusName == "In Progress" ? "#c59d302f" : statusName == "Done" ? "#05c6051a" : ""}`, color: `${statusName == "To Do" ? "#007bff" : statusName == "In Progress" ? "#c59d30" : statusName == "Done" ? "#0dac0d" : ""}` }}>
                                                    {`SP: ${story.story_points}`}
                                                </div>
                                            </div>
                                            <span> <p>Due :  </p> <p>{story.duedate}</p></span>
                                            <span> <p>Updated at :  </p> <p title={getDate(story.updated)}>{getDate(story.updated)}</p></span>
                                            <span> <p>Assigned To : </p> <p> {story.assignee}</p></span>
                                        </div>

                                    </div>
                                }
                                )}
                            </div>
                        </div>
                    );
                })
            ) : (
                <div className={css.errorContainer}>
                    No Stories to show...
                    <img src={nodata} alt="" />
                </div>
            )}
        </div>
    );
};

export default TicketsTable;
