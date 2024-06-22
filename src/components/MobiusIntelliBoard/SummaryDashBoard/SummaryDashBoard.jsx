import React, { useContext, useState, useEffect } from 'react'
import css from './SummaryDashBoard.module.scss'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import MainLoader from '../loaders/MainLoader';
import { SrdpContext } from '../Context/SrdpContext'
import SprintsProgressChart from '../Charts/SprintsProgressChart';
import sprintStar from '../../../assets/sprint_star.png'
import search from '../../../assets/search.svg'
import cross from '../../../assets/cross.svg'
import restart from '../../../assets/restart.png'
import i from '../../../assets/info.svg'
import SubtaskPieChart from '../Charts/SubtaskPieChart';
import SummaryPieCharts from '../Charts/SummaryPieCharts';

const live_base_url = import.meta.env.VITE_live_base_url;


const SummaryDashBoard = () => {
    const navigate = useNavigate()
    const [project_lead, setProject_lead] = useState(null)
    const [toolTip, setToolTip] = useState(false)
    const { boardName } = useParams();
    const {
        activeBoards, summarySprintLoader, selectedSprint,
        setSelectedSprint, setSelectedSprintFromSummary, breadCrumbs, setBreadCrumbs,
        sprintBarChart, setFilterSprintBarChart, selected, setSelected, searchValue,
        setSearchValue, sprintPieChart, storyData, setStoryData, darkMode, allboards, setAllboards, showAllBoards, setShowAllBoards
    } = useContext(SrdpContext)

    const [theme, setTheme] = useState(true)
    const totalSprints = activeBoards?.reduce((total, board) => {
        return total + board.sprints.length;
    }, 0);

    const themeHandeler = () => {
        setTheme(!theme)
    }

    useEffect(() => {
        setBreadCrumbs({ home: "home", summaryBoard: "Summary Dashboard", boardSummary: null, sprint: null })
        setStoryData({ original_estimate: "Select story", remaining_estimate: "Select story", time_spent: "Select story", story_reviewers: "Select story", story_id: "" });
        setSearchValue("")
    }, [])
  

    return (
        <div className={`${css.mainContainer}`} id={!darkMode && css.lightMode}>
            <div className={css.mainContent}>
                <div className={css.left}>
                    {/* <button className={css.theme} onClick={themeHandeler}>THEME</button> */}
                    <div className={css.top}>
                        <div className={css.sprintContainer}>
                            <div className={css.header}>
                                <span>
                                    <p>All Active Sprints - </p>
                                    <p>{totalSprints}</p>
                                </span>
                                {
                                    allboards.length > 0 ?
                                        <button onClick={() => { setShowAllBoards(true) }}>ADD Boards</button> :
                                        null
                                }
                                <div className={css.status}>
                                    <input type="text" placeholder='Search sprints....' onChange={(e) => setSearchValue(e.target.value)} value={searchValue} />
                                    <span className={css.border}></span>
                                    <img className={css.search} src={search} alt="" />
                                    {searchValue !== "" && <img onClick={() => setSearchValue("")} className={css.cross} src={cross} alt="" />}
                                </div>
                            </div>
                            <div className={`${css.tagsContainer} tags`} id={summarySprintLoader ? css.loaderContainer : null}>
                                {summarySprintLoader ?
                                    <MainLoader heading={"sprints ...."} /> : (
                                        activeBoards && activeBoards?.map((board) => (
                                            board.sprints.filter((sprint) =>
                                                sprint.sprint_name.toLowerCase().startsWith(searchValue.toLowerCase())
                                            ).map((sprint, index) => (
                                                <div
                                                    key={index}
                                                    className={`${css.tags} ${sprint.state === "closed" ? css.closed : css.active}`}
                                                    id={sprint.name === selectedSprint ? css.selected : null}
                                                    onClick={() => {
                                                        setBreadCrumbs({ ...breadCrumbs, boardSummary: board.board_name, sprint: sprint.sprint_name })
                                                        setSelectedSprintFromSummary(sprint.sprint_id)
                                                        setSelectedSprint(sprint.sprint_name)
                                                        navigate(`/BoardSummary/${board.board_id}/${board.board_name}`)
                                                    }}
                                                >
                                                    <p>{`#${board.board_name}-`}</p>
                                                    <p>{`${sprint.sprint_name}`}</p>


                                                </div>
                                            ))
                                        ))
                                    )}
                            </div>
                        </div>
                    </div >
                    <div className={css.bottom}>
                        <div className={css.header}>
                            <span>
                                <p>Subtasks</p>
                                {/* <p>{sprintPieChart?.filter((data) =>
                                    Object.keys(data)[0].toLowerCase().startsWith(searchValue.toLowerCase())).length}
                                </p> */}
                            </span>
                        </div>
                        <div className={css.chartContainer}>
                            {
                                sprintPieChart.length == 0 ? (
                                    <MainLoader heading={"Subtasks...."} />
                                ) :
                                    sprintPieChart?.filter((data) =>
                                        Object.keys(data)[0].toLowerCase().startsWith(searchValue.toLowerCase())).map((item, index) => {
                                            const sprintName = Object.keys(item)[0];
                                            const id = `pieChart-${index}`; // Generate unique ID for each pie chart
                                            let subTaskData = Object.values(item)[0].map(entry => ({ name: Object.keys(entry)[0], value: Object.values(entry)[0] }));
                                            // subTaskData = subTaskData.sort((a, b) => {
                                            //     if (a.name === "To Do" && b.name === "To Do") return a.value - b.value; 
                                            //     if (a.name === "Done" && b.name === "Done") return b.value - a.value; 
                                            //     if (a.name === "To Do") return -1; 
                                            //     if (b.name === "To Do") return 1;
                                            //     if (a.name === "Done") return 1; 
                                            //     if (b.name === "Done") return -1;
                                            //     return 0; 
                                            // });
                                            return (
                                                <div className={css.pieChart} key={id || index} >
                                                    <p className={css.heading} title={sprintName}>{sprintName}</p>
                                                    {/* <SubtaskPieChart key={id} id={id} data={subTaskData} /> */}
                                                    <SummaryPieCharts
                                                        key={id}
                                                        id={id}
                                                        subTaskData={subTaskData}
                                                        color={[`${subTaskData[0].name == "NO Subtask" ? "grey" : "#463062"}`, "#5c407e", "#73519c", "#8a62bb", "#8a62bb", "#bb86fc"]} />
                                                </div>

                                            );
                                        })
                            }
                        </div>
                    </div>
                </div >
                <div className={css.right}>
                    <div className={css.header}>
                        <span>
                            <p>Sprints Progress</p>
                            {/* <p>{sprintPieChart?.filter((data) =>
                                Object.keys(data)[0].toLowerCase().startsWith(searchValue.toLowerCase())).length}
                            </p> */}
                        </span>

                    </div>
                    <div className={css.mainRightContent}>
                        <div className={css.legend}>
                            <span>
                                <p style={{ backgroundColor: "#C4C4C4" }}></p>
                                <p style={{ color: " #585858", backgroundColor: "#C4C4C4", borderRadius: '4px' }}>Time Taken</p>
                            </span>
                            <span>
                                <p style={{ backgroundColor: "#3088E0" }}></p>
                                <p style={{ color: "#FFFFFF", backgroundColor: "#3088E0", borderRadius: '4px' }}>In Progress</p>
                            </span>
                            <span onClick={() => {
                                setSelected({ onTrack: !selected.onTrack, behind: false, delayed: false, ahead: false })
                                setFilterSprintBarChart(!selected.onTrack ? { lessThan: 20, greaterThan: 1 } : { lessThan: +Infinity, greaterThan: -Infinity })
                            }}>
                                <p style={{ backgroundColor: "#3ce000", boxShadow: "0px 0px 10px 1px #21530f" }}></p>
                                <p style={{ color: `${selected.onTrack ? "#FFFFFF" : "#0dac0d"}`, backgroundColor: `${selected.onTrack ? "#33802C" : " #05c6051a"}`, borderRadius: '4px' }}>On Track</p>
                            </span>
                            <span onClick={() => {
                                setSelected({ onTrack: false, behind: !selected.behind, delayed: false, ahead: false })
                                setFilterSprintBarChart(!selected.behind ? { lessThan: 30, greaterThan: 21 } : { lessThan: +Infinity, greaterThan: -Infinity })
                            }}>
                                <p style={{ backgroundColor: "#ffd944", boxShadow: "0px 0px 10px 1px #534715" }}></p>
                                <p style={{ color: `${selected.behind ? "#FFFFFF" : "#c9a927"}`, backgroundColor: `${selected.behind ? "#C9A115" : "#ffcc0018"}`, borderRadius: '4px' }}>Slightly Behind</p>
                            </span>
                            <span onClick={() => {
                                setSelected({ onTrack: false, behind: false, delayed: !selected.delayed, ahead: false })
                                setFilterSprintBarChart(!selected.delayed ? { lessThan: 100, greaterThan: 31 } : { lessThan: +Infinity, greaterThan: -Infinity })
                            }}>
                                <p style={{ backgroundColor: "#BE3333", boxShadow: "0px 0px 10px 1px #751313" }}></p>
                                <p style={{ color: `${selected.delayed ? "#FFFFFF" : "#d62424"}`, backgroundColor: `${selected.delayed ? "#BE3333" : "#d6242420"}`, borderRadius: '4px' }}>Delayed</p>
                            </span>
                            <div onClick={() => {
                                setSelected({ onTrack: false, behind: false, delayed: false, ahead: !selected.ahead })
                                setFilterSprintBarChart(!selected.ahead ? { lessThan: -1, greaterThan: -100 } : { lessThan: +Infinity, greaterThan: -Infinity })
                            }}>
                                <img src={sprintStar} alt="" />
                                <p style={{ color: `${selected.ahead ? "#FFFFFF" : "#bb86fc"}`, backgroundColor: `${selected.ahead ? "#0327D2" : "#bb86fc1f"}`, borderRadius: '4px' }}>
                                    Ahead
                                </p>
                            </div>
                            {/* {selected.onTrack || selected.behind || selected.delayed || selected.ahead ? (
                                <img onClick={() => {
                                    setFilterSprintBarChart({ lessThan: +Infinity, greaterThan: -Infinity })
                                    setSelected({ onTrack: false, behind: false, delayed: false, ahead: false })
                                }} src={restart} alt="" />
                            ) : null} */}
                            <img src={i} alt="" onClick={() => setToolTip(!toolTip)} />
                        </div>
                        <div className={css.chartContainer}>
                            <div className={css.tooltip} id={toolTip ? css.showToolTip : null}>
                                <img src={cross} onClick={(e) => setToolTip(!toolTip)} alt="" />
                                <span>
                                    <p style={{ backgroundColor: "#3ce000" }}></p>
                                    <p style={{ color: "#3ce000" }}>
                                        This represents sprints where the work progress is equal to or up to 20% behind the time taken.
                                    </p>
                                </span>
                                <span>
                                    <p style={{ backgroundColor: "#ffd944" }}></p>
                                    <p style={{ color: "#ffd944" }}>
                                        This represents sprints where the work progress is slightly behind the time taken by 20% to 30%.
                                    </p>
                                </span>
                                <span>
                                    <p style={{ backgroundColor: "#c13131" }}></p>
                                    <p style={{ color: "#e80f0f" }}>
                                        This represents sprints where the work progress is significantly behind the time taken by more than 30%.
                                    </p>
                                </span>
                                <span>
                                    <img src={sprintStar} alt="" />
                                    <p style={{ color: "#bb86fc" }}>
                                        This signifies sprints where work progress is notably ahead of the projected time for completion.
                                    </p>
                                </span>
                            </div>
                            {
                                sprintBarChart?.length == 0 ?
                                    <MainLoader heading={"Analytics..."} /> :
                                    <SprintsProgressChart id={"sprintProgress"}
                                        colors={["#0055cc", "#0c66e4", "#1d7afc", "#388bff", "#579dff", "#84b8ff", "#e9f2ff", "#fdd0ec", "#ffecf8"]}
                                    />
                            }
                        </div>
                    </div>

                </div>
            </div >
        </div >
    )
}

export default SummaryDashBoard;