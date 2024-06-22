import React, { useContext, useState, useEffect, useRef } from 'react'
import css from './NewSummaryDashboard.module.scss'
import { useNavigate, useParams } from 'react-router-dom';
import moment from 'moment';
// import gitMoment from 'moment-timezone';
import MainLoader from '../loaders/MainLoader';
import { SrdpContext } from '../Context/SrdpContext';
import SprintsProgressChart from '../Charts/SprintsProgressChart';
import sprintStar from '../../../assets/sprint_star.png'
import search from '../../../assets/search.svg'
import cross from '../../../assets/cross.svg'
import nodata from '../../../assets/nodata.png'
import i from '../../../assets/info.svg'
import ListView from '../../../assets/listView.svg'
import GridDots from '../../../assets/gridDots.svg'
import Commit from '../../../assets/commit.svg'
import LinkIcon from '../../../assets/link.svg'
import SubtaskPieChart from '../Charts/SubtaskPieChart';
import SummaryPieCharts from '../Charts/SummaryPieCharts';
import SmallLoader from '../loaders/SmallLoader';
import Toploader from 'react-top-loading-bar'
import TimeAgo from 'timeago-react'
import { motion } from "framer-motion";
import { fadeIn, slideIn, staggerContainer } from '../../../FramerMotion/motion'
import { MainContext } from '../../../MainContext/MainContext';
const live_base_url = import.meta.env.VITE_live_base_url;




// <div className={css.mainContainer}>
//     <div className={css.sliderContainer}>
//         {data.map((slides, index) => (
//             <p className={`${css.slides} ${index == slideCount.prev ? css.prevSlide : index == slideCount.current ? css.currentSlide : index == slideCount.next ? css.nextSlide : null} `}
//             >{slides.name}</p>
//         ))}
//     </div>
// </div>





const NewSummaryDashBoard = () => {
    const scrollRef = useRef()
    const navigate = useNavigate()
    const [listView, setListView] = useState(true)
    const uniqueSprints = new Set();

    const [filteredGitLogs, setFilteredGitLogs] = useState()
    const [filteredPieChart, setFilteredPieChart] = useState([])
    const [project_lead, setProject_lead] = useState(null)
    const { boardName } = useParams();
    const {
        selectedSprint,
        setSelectedSprint, setSelectedSprintFromSummary, breadCrumbs, setBreadCrumbs,
        setFilterSprintBarChart, selected, setSelected, searchValue,
        setSearchValue, storyData, setStoryData,
        boardProgress, setBoardProgress, showSelect, setShowSelect
    } = useContext(SrdpContext)
    const { darkMode, setDarkMode, sprintProgressToolTip, setSprintProgressToolTip, dataFetched, setDataFetched, boardsData, setBoardsData, summaryProgress, setSummaryProgress, activeBoards, setActiveBoards, selectedBoardSprint, setSelectedBoardSprint, selectedBoardName, setSelectedBoardName, summarySprintLoader, setSummarySprintLoader, sprintBarChart, setSprintBarChart, sprintPieChart, setSprintPieChart, gitLogs, setGitLogs } = useContext(MainContext)

    const [theme, setTheme] = useState(true)
    const totalSprints = activeBoards?.length;
    const [slideCount, setSlideCount] = useState(
        {
            prev: -1,
            current: 0,
            next: 1
        }
    )
    const [closedSpirint, setClosedSpirint] = useState()

    // console.log(activeBoards, "activeBoards");
    useEffect(() => {
        const slider = setInterval(() => {
            setSlideCount(prevSlideCount => {
                const nextIndex = (prevSlideCount.current + 1) % activeBoards.length;
                return {
                    prev: prevSlideCount.current,
                    current: nextIndex,
                    next: (nextIndex + 1) % activeBoards.length
                };
            });
        }, 5000); // 5000 milliseconds = 5 seconds

        return () => clearInterval(slider);
    }, []);

    // useEffect(() => {
    // },[activeBoards])


    useEffect(() => {
        const filteredData = sprintPieChart.filter(data =>
            Object.keys(data)[0].toLowerCase().includes(selectedBoardSprint?.toLowerCase())
        );
        setFilteredPieChart((prev) => filteredData);
        // console.log(filteredPieChart)

        const filteredGits = gitLogs?.filter((gits) => gits.commits.length > 0).filter((filteredSprint) =>
            filteredSprint.board_name?.toLowerCase().includes(dataFetched ? selectedBoardName?.toLowerCase() : ""))
        setFilteredGitLogs((prev) => filteredGits)
        scrollRef.current?.scrollIntoView()


    }, [sprintPieChart, selectedBoardSprint, selectedBoardName]);

    useEffect(() => {
        // console.log(sprintPieChart, "pieChart data")
        setBreadCrumbs({ home: null, summaryBoard: null, boardSummary: null, sprint: null })
        setStoryData({ original_estimate: "Select story", remaining_estimate: "Select story", time_spent: "Select story", story_reviewers: "Select story", story_id: "" });
        setSearchValue("")
        setShowSelect(false)
        setBoardProgress(0)
        setSprintProgressToolTip(false)
        // setSelectedBoardSprint(prev =>
        //     activeBoards[0]?.sprints[0]?.sprint_name
        // )
    }, [])

    // useEffect(() => {
    //     const selectedPieChartData = sprintPieChart?.filter((data) =>
    //         Object.keys(data)[0].toLowerCase().includes(selectedBoardSprint?.toLowerCase()))

    //     setSelectedPieChart(prev => selectedPieChartData)
    //     const data = selectedPieChart?.length > 0 && selectedPieChart[0][Object.keys(selectedPieChart[0])[0]].map(entry => ({
    //         name: Object.keys(entry)[0],
    //         value: Object.values(entry)[0]
    //     }))
    //     if (data) {
    //         setSubTaskData(prev => data)
    //     }
    //     console.log(subtaskData && subtaskData[0]?.name)
    //     console.log(selectedPieChart)
    // }, [selectedBoardSprint])

    const DateFormatter = (commitTimestamp) => {
        const getDate = moment(commitTimestamp).format("MMM Do YYYY, h:mm:ss A");
        return getDate
    }
    // const gitTimeFormatter = (commitTimestamp) => {
    //     const getDate = gitMoment.tz(commitTimestamp, "Asia/Kolkata").format("MMM Do YYYY, h:mm:ss A");
    //     // const getDate = gitMoment.tz(commitTimestamp, "Asia/Kolkata").format("MMM Do YYYY, h:mm:ss A");
    //     return getDate
    // }
    setBoardProgress(0)
    // auto scroll
    // const gitLogsContainerRef = useRef(null);

    // useEffect(() => {
    //     const container = gitLogsContainerRef.current;
    //     if (container) {
    //         const scrollHeight = container.scrollHeight;
    //         const clientHeight = container.clientHeight;

    //         let scrollTop = 0;

    //         const scrollInterval = setInterval(() => {
    //             if (scrollTop + clientHeight >= scrollHeight) {
    //                 scrollTop = 0; // Reset scroll position to the top
    //             } else {
    //                 scrollTop += 1; // Adjust this value to control the scroll speed
    //             }
    //             container.scrollTop = scrollTop;
    //         }, 20); // Adjust this value to control the scroll speed

    //         return () => clearInterval(scrollInterval);
    //     }
    // }, []);

    return (
        <div className={`${css.mainContainer}`} id={!darkMode && css.lightMode}
            onMouseLeave={(event) => {
                event.stopPropagation();
                setSprintProgressToolTip(false);
            }}
        >
            <Toploader
                style={{ height: !darkMode ? '0.2vw' : '0.1vw' }}
                color='#4291ff'
                progress={summaryProgress}
                onLoaderFinished={() => setSummaryProgress(0)}
            />
            <div className={css.mainContent}>
                <div className={css.left}>
                    {/* <button className={css.theme} onClick={themeHandeler}>THEME</button> */}
                    <div className={css.top}>
                        <div className={css.sprintContainer}>
                            <div className={css.header}>
                                <span>
                                    <p>All Active Sprints - </p>
                                    <p>{totalSprints}</p>
                                    {/* {(totalSprints > 0 && dataFetched) && <div className={css.countDownTimer}>
                                        <CountdownCircleTimer
                                            isPlaying
                                            size={25}
                                            strokeWidth={1.5}
                                            duration={30}
                                            colors={"#4291ff"}
                                            trailColor="#68758218"
                                            onComplete={() => {
                                                return { shouldRepeat: true }
                                            }}
                                        >
                                            {({ remainingTime }) => (
                                                <div className={css.countDown}>
                                                    {remainingTime}
                                                </div>
                                            )}
                                        </CountdownCircleTimer>
                                    </div>} */}
                                </span>
                                <div className={css.status}>
                                    <span>
                                        <input type="text" placeholder='Search sprints....' onChange={(e) => setSearchValue(e.target.value)} value={searchValue} />
                                        {/* <span className={css.border}></span> */}
                                        <img className={css.search} src={search} alt="" />
                                        {searchValue !== "" && <img onClick={() => setSearchValue("")} className={css.cross} src={cross} alt="" />}
                                    </span>

                                    <div>
                                        <img className={listView ? css.selected : null} src={ListView} onClick={() => setListView(true)} alt="" />
                                        <img className={!listView ? css.selected : null} src={GridDots} onClick={() => setListView(false)} alt="" />
                                    </div>
                                </div>
                            </div>
                            <div className={css.content}>
                                {listView ? (
                                    <>
                                        <div className={`${css.tagsContainer}`} id={summarySprintLoader ? css.loaderContainer : null}>
                                            <div className={css.miniTagsContainer}>
                                                {summarySprintLoader ?
                                                    <MainLoader heading={"sprints ...."} /> : (
                                                        activeBoards && activeBoards?.filter((filteredSprint) =>
                                                            filteredSprint?.sprint_name?.toLowerCase().startsWith(searchValue.toLowerCase())
                                                        ).filter((board) => {
                                                            // Check if the board is already in the set
                                                            if (uniqueSprints.has(board.sprint_name)) {
                                                                return false;
                                                            } else {
                                                                uniqueSprints.add(board.sprint_name);
                                                                return true;
                                                            }
                                                        }).map((board, boardIndex) => (
                                                            <div
                                                                ref={board.sprint_name === selectedBoardSprint ? scrollRef : null}
                                                                key={boardIndex}
                                                                className={`${css.tags}`}
                                                                id={board.sprint_name === selectedBoardSprint ? css.selected : null}
                                                                onDoubleClick={() => {
                                                                    setBreadCrumbs({ ...breadCrumbs, boardSummary: board.board_name, sprint: board.sprint_name })
                                                                    setSelectedSprintFromSummary(board.sprint_id)
                                                                    setSelectedSprint(board.sprint_name)
                                                                    setSelectedBoardSprint(board.sprint_name)
                                                                    navigate(`/mobiusIntelliBoard/BoardSummary/${board.board_id}/${board.board_name}`)
                                                                }}
                                                                onClick={() => {
                                                                    setSelectedBoardSprint(prev => board.sprint_name),
                                                                        setSelectedBoardName(prev => board.board_name)
                                                                }}
                                                            >
                                                                <p>{`#${board.board_name}-`}</p>
                                                                <p>{`${board.sprint_name}`}</p>


                                                            </div>
                                                        ))
                                                    )}
                                            </div>
                                        </div>
                                        <div className={css.chartContainer}>
                                            {/* {
                                                sprintPieChart.length == 0 ? (
                                                    <MainLoader heading={"Subtasks...."} />
                                                ) :

                                                    selectedPieChart?.length > 0 ? (
                                                        <div className={css.pieChart}>
                                                            <p className={css.heading} title={Object.keys(selectedPieChart[0])[0]}>
                                                                {Object.keys(selectedPieChart[0])[0]}
                                                            </p>
                                                            <div>
                                                                <SummaryPieCharts
                                                                    id={`pieChart-${Object.keys(selectedPieChart[0])[0]}`}
                                                                    subTaskData={selectedPieChart[0][Object.keys(selectedPieChart[0])[0]].map(entry => ({
                                                                        name: Object.keys(entry)[0],
                                                                        value: Object.values(entry)[0]
                                                                    }))}
                                                                    color={[`${selectedPieChart?.length > 0 && selectedPieChart[0][Object.keys(selectedPieChart[0])[0]].map(entry => ({
                                                                        name: Object.keys(entry)[0],
                                                                        value: Object.values(entry)[0]
                                                                    }))[0]?.name === "NO Subtask" ? `${!darkMode ? "#07a5ae" : "#34ecf64e"}` :
                                                                        "#3B83E6"}`, "#326DBF", "#326DBF", "#326DBF", "#214980", "#1A3A66",]}
                                                                />
                                                            </div>
                                                        </div>
                                                    ) : (
                                                        <div className={css.noData}>
                                                            <img src={nodata} alt="" />
                                                            No Data To Show....
                                                        </div>
                                                    )

                                            } */}
                                            {
                                                sprintPieChart.length <= 0 ? (
                                                    <MainLoader heading={"Subtasks...."} />
                                                ) :
                                                    (
                                                        filteredPieChart.length > 0 ? (filteredPieChart?.map((item, index) => {
                                                            const sprintName = Object.keys(item)[0]
                                                            const id = `pieChart-${index}`; // Generate unique ID for each pie chart
                                                            let subTaskData = Object.values(item)[0].map(entry => ({ name: Object.keys(entry)[0], value: Object.values(entry)[0] }));
                                                            // console.log(sprintPieChart?.filter((data) =>
                                                            //     Object.keys(data)[0].toLowerCase().includes(selectedBoardSprint?.toLowerCase())))
                                                            return (
                                                                <div className={css.pieChart} key={id || index} >
                                                                    <p className={css.heading} title={sprintName}>{sprintName}</p>
                                                                    <SummaryPieCharts
                                                                        key={id}
                                                                        id={id}
                                                                        selectedBoardSprint={selectedBoardSprint}
                                                                        subTaskData={subTaskData}
                                                                        color={[`${subTaskData[0].name == "NO Subtask" ? `${!darkMode ? "#07a5ae" : "#34ecf64e"}` : "#3B83E6"}`, "#326DBF", "#326DBF", "#326DBF", "#214980", "#1A3A66"]}
                                                                    />
                                                                    <div>
                                                                        <SmallLoader />
                                                                    </div>
                                                                </div>

                                                            );
                                                        })) : (
                                                            <div className={css.loaderContainer}>
                                                                <p>{`No SubTasks in ${selectedBoardSprint}`}</p>
                                                                {/* <SmallLoader /> */}
                                                            </div>))
                                            }

                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div className={css.sliderContainer}>
                                            {summarySprintLoader ?
                                                <MainLoader heading={"sprints ...."} /> : (
                                                    activeBoards && activeBoards?.filter((filteredSprint) =>
                                                        filteredSprint?.sprint_name?.toLowerCase().startsWith(searchValue.toLowerCase())
                                                    ).map((board, boardIndex) => (
                                                        <div
                                                            key={boardIndex}
                                                            className={`${css.tags} ${css.slides} ${boardIndex == slideCount.prev ? css.prevSlide : boardIndex == slideCount.current ? css.currentSlide : boardIndex == slideCount.next ? css.nextSlide : null}`}
                                                            id={board.name === selectedSprint ? css.selected : null}
                                                            onClick={() => {
                                                                setBreadCrumbs({ ...breadCrumbs, boardSummary: board.board_name, sprint: board.sprint_name })
                                                                setSelectedSprintFromSummary(board.sprint_id)
                                                                setSelectedSprint(board.sprint_name)
                                                                navigate(`/BoardSummary/${board.board_id}/${board.board_name}`)
                                                            }}
                                                        >
                                                            <p>{`#${board.board_name}`}</p>
                                                            <p>{`${board.sprint_name}`}</p>


                                                        </div>
                                                    ))

                                                )}
                                        </div>
                                        <div className={css.chartContainer}>

                                        </div>
                                    </>

                                )}
                            </div>

                        </div>
                    </div >
                    <div className={css.bottom}>
                        <div className={css.header}>
                            <span>
                                <p>Git Logs</p>
                            </span>
                        </div>
                        <div className={css.gitLogs}>
                            {
                                gitLogs?.length !== 0 ? (
                                    filteredGitLogs?.length !== 0 ?
                                        (
                                            <div>
                                                {
                                                    filteredGitLogs?.filter(sprint => sprint.sprint_status === "active").length > 0 &&
                                                    <div>
                                                        {
                                                            filteredGitLogs?.filter(sprint => sprint.sprint_status === "active").map((sprint, index) => (
                                                                <div className={css.gitContainer} key={sprint.sprint_id}>
                                                                    <div className={css.sprintData} >
                                                                        <div className={css.info}>
                                                                            <p>{sprint.sprint_name}</p>
                                                                            <p>{`${DateFormatter(sprint.sprint_start).split(",")[0]} - ${DateFormatter(sprint.sprint_end).split(",")[0]}`}</p>
                                                                        </div>
                                                                        <p className={css.spActive}>Active</p>

                                                                    </div>
                                                                    <motion.div
                                                                        variants={staggerContainer}
                                                                        initial="hidden"
                                                                        whileInView="show"
                                                                        // viewport={{ once: false, amount: 0.25 }}
                                                                        className={css.commitsContainer}>
                                                                        {
                                                                            sprint.commits.sort((a, b) => new Date(b.authorTimestamp) - new Date(a.authorTimestamp)).map((commit, index) => (
                                                                                <motion.div
                                                                                    variants={slideIn("up", "tween", (0.2 * index), 1)}
                                                                                    className={css.commit} key={index}>
                                                                                    <div className={css.commitHeader}>
                                                                                        <div>
                                                                                            <a href={commit.commitUrl} target="_blank" rel="noopener noreferrer">
                                                                                                <img src={Commit} alt="" />
                                                                                            </a>
                                                                                            <p>commit</p>
                                                                                        </div>
                                                                                        <div>
                                                                                            <TimeAgo
                                                                                                className={css.timeStamp}
                                                                                                datetime={commit?.authorTimestamp}
                                                                                            />
                                                                                            <a href={commit.commitUrl} target="_blank" rel="noopener noreferrer">
                                                                                                <img src={LinkIcon} alt="" title='Commit redirect url' />
                                                                                            </a>
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className={css.content}>
                                                                                        <p>{commit?.assignee}</p>
                                                                                        <p>{commit?.message}</p>
                                                                                    </div>
                                                                                </motion.div>
                                                                            ))
                                                                        }
                                                                    </motion.div>
                                                                </div>
                                                            ))
                                                        }
                                                    </div>
                                                }
                                                {filteredGitLogs?.filter(sprint => sprint.sprint_status === "closed").length > 0 &&
                                                    <div>
                                                        {
                                                            filteredGitLogs?.filter(sprint => sprint.sprint_status === "closed").map((sprint, index) => (
                                                                <div className={css.gitContainer} key={sprint.sprint_id}>
                                                                    <div className={css.sprintData} >
                                                                        <div className={css.info}>
                                                                            <p>{sprint.sprint_name}</p>
                                                                            <p>{`${DateFormatter(sprint.sprint_start).split(",")[0]} - ${DateFormatter(sprint.sprint_end).split(",")[0]}`}</p>
                                                                        </div>
                                                                        <p className={css.spClosed}>Last Closed</p>

                                                                    </div>
                                                                    <motion.div
                                                                        variants={staggerContainer}
                                                                        initial="hidden"
                                                                        whileInView="show"
                                                                        // viewport={{ once: false, amount: 0.25 }}
                                                                        className={css.commitsContainer}>
                                                                        {
                                                                            sprint.commits.sort((a, b) => new Date(b.authorTimestamp) - new Date(a.authorTimestamp)).map((commit, index) => (
                                                                                <motion.div
                                                                                    variants={slideIn("up", "tween", (0.2 * index), 1)}
                                                                                    className={css.commit} key={index}>
                                                                                    <div className={css.commitHeader}>
                                                                                        <div>
                                                                                            <a href={commit.commitUrl} target="_blank" rel="noopener noreferrer">
                                                                                                <img src={Commit} alt="" />
                                                                                            </a>
                                                                                            <p>commit</p>
                                                                                        </div>
                                                                                        <div>
                                                                                            <TimeAgo
                                                                                                className={css.timeStamp}
                                                                                                datetime={commit?.authorTimestamp}
                                                                                            />
                                                                                            <a href={commit.commitUrl} target="_blank" rel="noopener noreferrer">
                                                                                                <img src={LinkIcon} alt="" title='Commit redirect url' />
                                                                                            </a>
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className={css.content}>
                                                                                        <p>{commit?.assignee}</p>
                                                                                        <p>{commit?.message}</p>
                                                                                    </div>
                                                                                </motion.div>
                                                                            ))
                                                                        }
                                                                    </motion.div>
                                                                </div>
                                                            ))
                                                        }
                                                    </div>
                                                }
                                            </div>
                                        ) :
                                        <div className={css.loaderContainer}>
                                            <p>{`No GitLogs to show for "${selectedBoardName}"`}</p>
                                        </div>


                                ) : (
                                    <div className={css.loaderContainer}>
                                        <MainLoader heading={"git logs..."} />
                                    </div>
                                )
                            }
                        </div>

                        {/* <div className={css.chartContainer}>
                            {
                                sprintPieChart.length == 0 ? (
                                    <MainLoader heading={"Subtasks...."} />
                                ) :
                                    (sprintPieChart?.filter((data) =>
                                        Object.keys(data)[0].toLowerCase().startsWith(searchValue.toLowerCase())).map((item, index) => {
                                            const sprintName = Object.keys(item)[0];
                                            const id = `pieChart-${index}`; // Generate unique ID for each pie chart
                                            let subTaskData = Object.values(item)[0].map(entry => ({ name: Object.keys(entry)[0], value: Object.values(entry)[0] }));
                                            return (
                                                <div className={css.pieChart} key={id || index} >
                                                    <p className={css.heading} title={sprintName}>{sprintName}</p>
                                                    <SummaryPieCharts
                                                        key={id}
                                                        id={id}
                                                        subTaskData={subTaskData}
                                                        color={[`${subTaskData[0].name == "NO Subtask" ? "grey" : "#463062"}`, "#5c407e", "#73519c", "#8a62bb", "#8a62bb", "#bb86fc"]}
                                                    />
                                                </div>

                                            );
                                        }))
                            }
                        </div> */}
                    </div>
                </div >
                <div className={css.right}>
                    <div className={css.header}>
                        <span>
                            <p>Sprints Progress - </p>
                            <p>{sprintPieChart?.filter((data) =>
                                Object.keys(data)[0].toLowerCase().startsWith(searchValue.toLowerCase())).length}
                            </p>
                        </span>

                    </div>
                    <div className={css.mainRightContent}>
                        <div className={css.legend}>
                            {/* <span>
                                <p style={{ backgroundColor: "#C4C4C4" }}></p>
                                <p style={{ color: `${darkMode ? "#d7d7d7" : "#383838"}`, backgroundColor: "#c4c4c433", borderRadius: '4px' }}>Time Taken</p>
                            </span> */}
                            {/* <span>
                                <p style={{ backgroundColor: "#3088E0" }}></p>
                                <p style={{ color: "#4291ff", backgroundColor: "#4291ff26", borderRadius: '4px' }}>In Progress</p>
                            </span> */}
                            <span
                                style={{ color: `${selected.onTrack ? "#FFFFFF" : "#0dac0d"}`, backgroundColor: `${selected.onTrack ? `${darkMode ? "#28801a" : "#64ff27"}` : " #05c6051a"}`, borderRadius: '4px' }}
                                onClick={() => {
                                    setSelected({ onTrack: !selected.onTrack, behind: false, delayed: false, ahead: false })
                                    setFilterSprintBarChart(!selected.onTrack ? { lessThan: 20, greaterThan: 0 } : { lessThan: +Infinity, greaterThan: -Infinity })
                                }}>
                                {/* <p style={{ backgroundColor: "#3ce000", boxShadow: "0px 0px 10px 1px #21530f" }}></p> */}
                                <p >On Track</p>
                                <p>
                                    {
                                        sprintBarChart.filter(item => {
                                            return (item.percentageOfTimeElapsed - item.percentageOfWork >= 0 && item.percentageOfTimeElapsed - item.percentageOfWork <= 20);
                                        }).length
                                    }
                                </p>
                            </span>
                            <span
                                style={{ color: `${selected.behind ? "#FFFFFF" : "#c9a927"}`, backgroundColor: `${selected.behind ? `${darkMode ? '#bea130' : "#ffd52c"}` : "#ffcc0018"}`, borderRadius: '4px' }}
                                onClick={() => {
                                    setSelected({ onTrack: false, behind: !selected.behind, delayed: false, ahead: false })
                                    setFilterSprintBarChart(!selected.behind ? { lessThan: 30, greaterThan: 21 } : { lessThan: +Infinity, greaterThan: -Infinity })
                                }}>
                                {/* <p style={{ backgroundColor: "#ffd944", boxShadow: "0px 0px 10px 1px #534715" }}></p> */}
                                <p >Slightly Behind</p>
                                <p>
                                    {
                                        sprintBarChart.filter(item => {
                                            return (item.percentageOfTimeElapsed - item.percentageOfWork >= 21 && item.percentageOfTimeElapsed - item.percentageOfWork <= 30);
                                        }).length
                                    }
                                </p>
                            </span>
                            <span
                                style={{ color: `${selected.delayed ? "#FFFFFF" : "#d62424"}`, backgroundColor: `${selected.delayed ? `${darkMode ? '#630606' : "#e23b3b"}` : "#d6242420"}`, borderRadius: '4px' }}
                                onClick={() => {
                                    setSelected({ onTrack: false, behind: false, delayed: !selected.delayed, ahead: false })
                                    setFilterSprintBarChart(!selected.delayed ? { lessThan: 100, greaterThan: 31 } : { lessThan: +Infinity, greaterThan: -Infinity })
                                }}>
                                {/* <p style={{ backgroundColor: "#BE3333", boxShadow: "0px 0px 10px 1px #751313" }}></p> */}
                                <p >Delayed</p>
                                <p>
                                    {

                                        sprintBarChart.filter(item => {
                                            return (item.percentageOfTimeElapsed - item.percentageOfWork >= 31 && item.percentageOfTimeElapsed - item.percentageOfWork <= 100);
                                        }).length
                                    }
                                </p>
                            </span>
                            <div
                                style={{ color: `${selected.ahead ? "#FFFFFF" : "#bb86fc"}`, backgroundColor: `${selected.ahead ? `${darkMode ? '#bb86fc' : "#ce79ff"}` : "#d6b5ff35"}`, borderRadius: '4px' }}
                                onClick={() => {
                                    setSelected({ onTrack: false, behind: false, delayed: false, ahead: !selected.ahead })
                                    setFilterSprintBarChart(!selected.ahead ? { lessThan: -1, greaterThan: -100 } : { lessThan: +Infinity, greaterThan: -Infinity })
                                }}>
                                {/* <img src={sprintStar} alt="" /> */}
                                <p >
                                    Ahead
                                </p>
                                <p>
                                    {

                                        sprintBarChart.filter(item => {
                                            return (item.percentageOfTimeElapsed - item.percentageOfWork >= - 100 && item.percentageOfTimeElapsed - item.percentageOfWork < -1);
                                        }).length
                                    }
                                </p>
                            </div>
                            {/* {selected.onTrack || selected.behind || selected.delayed || selected.ahead ? (
                                <img onClick={() => {
                                    setFilterSprintBarChart({ lessThan: +Infinity, greaterThan: -Infinity })
                                    setSelected({ onTrack: false, behind: false, delayed: false, ahead: false })
                                }} src={restart} alt="" />
                            ) : null} */}
                            <img src={i} alt="" onClick={(event) => {
                                event.stopPropagation();
                                setSprintProgressToolTip(!sprintProgressToolTip)
                            }} />
                        </div>
                        <div className={css.chartContainer}>
                            <div className={css.tooltip} id={sprintProgressToolTip ? css.showToolTip : null}>
                                <img src={cross} onClick={(event) => {
                                    event.stopPropagation();
                                    setSprintProgressToolTip(!sprintProgressToolTip)
                                }} alt="" />
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

export default NewSummaryDashBoard;