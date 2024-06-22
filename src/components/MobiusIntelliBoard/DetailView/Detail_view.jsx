import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import SingleBarChart from '../Charts/SingleBarChart'
import css from './DetailView.module.scss'
import StoriesBarChart from '../Charts/StoriesBarChart'
import { SrdpContext } from '../Context/SrdpContext'
import SummaryPieCharts from '../Charts/SummaryPieCharts'
import SubtaskPieChart from '../Charts/SubtaskPieChart'
import MainLoader from '../loaders/MainLoader'
import SmallLoader from '../loaders/SmallLoader'
import dots from '../../../assets/dots.svg'
import moment from 'moment'
import ProgressBar from "@ramonak/react-progress-bar";
import info from '../../../assets/info.svg'
import todo from '../../../assets/todo.png';
import done from '../../../assets/done.png';
import redCross from '../../../assets/redCross.svg';
import Commit from '../../../assets/commit.svg'
import Filter from '../../../assets/filter.svg'
import LinkIcon from '../../../assets/link.svg'
import TimeAgo from 'timeago-react'
import { motion } from "framer-motion";
import { fadeIn, slideIn, staggerContainer } from '../../../FramerMotion/motion'
import { MainContext } from '../../../MainContext/MainContext';


const Detail_view = ({ past_sprint_heros, problem_solver, trust_worthy, stories_data, ac_hygine, getStories, getSprintMembers }) => {
    const { darkMode } = useContext(MainContext)

    const { storiesBarChart, isChartLoading, membersFilter, selectedSprint, meta_data, toolTip, setToolTip, showDetails, setShowDetails, sprint } = useContext(SrdpContext)
    const { gitLogs } = useContext(MainContext)
    const chartArray = ["chart1", "chart2", "chart3", "chart4", "chart5", "chart6", "chart7", "chart8", "chart9", "chart10", "chart11", "chart12"]
    const [filteredGitLogs, setFilteredGitLogs] = useState([])
    const { boardName } = useParams();
    // const [toolTip, setToolTip] = useState({
    //     trustWorthy: false,
    //     problemSolver: false,
    //     sprintHeros: false
    // })
    const getDate = (date) => moment(date).format("MMM Do YYYY, h:mm:ss A");

    const getDuration = () => {

        const startDate = sprint && sprint?.filter((filteredSprint) => filteredSprint.name?.toLowerCase().includes(selectedSprint?.toLowerCase())).map((sprintData) => (
            getDate(sprintData.startDate)
        ))
        const endDate = sprint && sprint?.filter((filteredSprint) => filteredSprint.name?.toLowerCase().includes(selectedSprint?.toLowerCase())).map((sprintData) => (
            getDate(sprintData.endDate)
        ))
        const currentDate = new Date()
        const duration = ((new Date(startDate) - new Date(Math.min(currentDate, endDate))) / (1000 * 60 * 60 * 24)).toFixed(2)
        // console.log(startDate , "start date" , endDate , "endDate" )
    }
    useEffect(() => {
        const filteredGits = gitLogs?.filter((gits) => gits.commits.length > 0).filter((filteredSprint) =>
            filteredSprint.sprint_name?.toLowerCase().includes(selectedSprint?.toLowerCase()))
        setFilteredGitLogs((prev) => filteredGits)

        getDuration()
    }, [selectedSprint, membersFilter])

    // console.log(sprints_subtasks, "sprints_subtasks");
    return (
        <div className={css.mainContainer} id={!darkMode && css.lightMode}>
            <div className={css.chartAndGraph}>
                <div>
                    <div>
                        <p>Work progress status</p>
                        <span>
                            <img src={dots} alt="" onMouseEnter={(event) => {
                                setShowDetails(true)
                            }}
                                onMouseLeave={(event) => {
                                    setShowDetails(false)
                                }}
                            />
                            <div className={css.details} id={showDetails ? css.show : css.hide}>
                                <p>{`Sprint Start : ${storiesBarChart?.sprintStartDate ? storiesBarChart?.sprintStartDate : "-"}`}</p>
                                <p>{`Sprint End : ${storiesBarChart?.sprintEndDate ? storiesBarChart?.sprintEndDate : "-"}`}</p>
                                <p>{`Days spent : ${storiesBarChart?.daysSpent ? storiesBarChart?.daysSpent : "-"}`}</p>
                                <p>{`Sprint Duration : ${storiesBarChart?.sprintDuration ? storiesBarChart?.sprintDuration : "-"}`}</p>
                            </div>
                        </span>
                    </div>
                    {
                        isChartLoading ?
                            <div className={css.loaderContainer}>
                                <MainLoader heading={"Status Bar Chart"} />
                            </div> :
                            (<StoriesBarChart id={"storiesBarChart"} storiesBarChart={storiesBarChart} />)
                    }
                </div>
                {/* {showBarGraph ?
                   
                    :
                    <div className={css.chartContainer}>
                        {
                            pie_loader ?
                                <div className={css.loadingContainer}>

                                    {
                                        (chartArray.map((content, index) => (
                                            index == 4 ?
                                                <div key={index} className={css.loader}>
                                                    <MainLoader heading={"Subtasks"} />
                                                </div> :
                                                <div key={index} className={css.loading}>

                                                </div>
                                        )))}
                                </div>
                                :
                                sprints_subtasks && Object.entries(sprints_subtasks).map(([sprintName, sprintData], index) => {

                                    const color = Object.keys(sprintData[0])[0] === "NO Subtask" ? "grey" : "#463062";
                                    return (
                                        <div onClick={(e) => {
                                            setSelectedSprint(sprintName)
                                            findSprint(sprintName)
                                            findSubtask(sprintName, sprintData)
                                        }} key={index}>
                                            <p title={sprintName}>{sprintName}</p>
                                            <SummaryPieCharts key={index} id={`chart ${index}`}
                                                sprintData={sprintData}
                                                sprintName={sprintName}
                                                color={[color, "#5c407e", "#73519c", "#8a62bb", "#8a62bb", "#bb86fc"]}
                                            />
                                        </div>
                                    )
                                })
                        }
                    </div>
                } */}
            </div>
            <div className={css.metaDataContainer}>
                <div className={css.header}>
                    <p>Metadata</p>
                </div>
                <div className={css.metaDataList}>
                    <div className={css.table}>
                        <div className={css.columns}>
                            <p>
                                Category
                            </p>
                            <p>
                                Employee
                            </p>
                        </div>
                        <div className={css.rows}>
                            <div className={css.row}>
                                <img src={info} alt="" onMouseEnter={(event) => {
                                    event.stopPropagation();
                                    setToolTip({ ...toolTip, trustWorthy: true });
                                }}
                                    onMouseLeave={(event) => {
                                        setToolTip({
                                            ...toolTip,
                                            trustWorthy: false
                                        })
                                    }} />
                                <div className={css.toolTip} id={!toolTip.trustWorthy ? css.hideToolTip : null}>
                                    Consistently having more story points completed per sprint
                                </div>
                                <p>Mr.Trust Worthy</p>
                                <div className={css.items}>
                                    {trust_worthy == "" ? <SmallLoader /> :

                                        trust_worthy?.map((heros, index) => (
                                            <p
                                                key={index}
                                                className={`${css.tags}`}
                                            >
                                                {heros?.assignee}
                                            </p>
                                        )
                                        )}
                                </div>
                            </div>
                            <div className={css.row}>
                                <img src={info} alt="" onMouseEnter={(event) => {
                                    setToolTip({ ...toolTip, problemSolver: true });
                                }}
                                    onMouseLeave={(event) => {
                                        setToolTip({
                                            ...toolTip,
                                            problemSolver: false
                                        })
                                    }} />
                                <div className={css.toolTip} id={!toolTip.problemSolver ? css.hideToolTip : null}>
                                    Solves more number of stories with High story points
                                </div>
                                <p>Mr.Problem Solver</p>
                                <div className={css.items}>
                                    {problem_solver == "" ? <SmallLoader /> :
                                        problem_solver?.map((heros, index) => (
                                            <p
                                                key={index}
                                                className={`${css.tags}`}
                                            >
                                                {heros?.assignee}
                                            </p>
                                        )
                                        )}
                                </div>
                            </div>
                            <div className={css.row}>
                                <img src={info} alt="" onMouseEnter={(event) => {
                                    event.stopPropagation();
                                    setToolTip({ ...toolTip, sprintHeros: true });
                                }}
                                    onMouseLeave={(event) => {
                                        setToolTip({
                                            ...toolTip,
                                            sprintHeros: false
                                        })
                                    }}
                                />
                                <div className={css.toolTip} id={!toolTip.sprintHeros ? css.hideToolTip : null}>
                                    Most story points completed in Past sprint
                                </div>
                                <p>Past Sprint Heros</p>
                                <div className={css.items}>
                                    {past_sprint_heros == "" ? <SmallLoader />
                                        : past_sprint_heros?.map((heros, index) => (
                                            <p
                                                key={index}
                                                className={`${css.tags}`}
                                            >
                                                {heros?.assignee}
                                            </p>
                                        )
                                        )}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={css.table}>
                        <div className={css.columns}>
                            <div title={`${((storiesBarChart?.daysSpent / storiesBarChart?.sprintDuration) * 100).toFixed(2)} %`}>
                                <p>{
                                    selectedSprint ? (
                                        sprint && sprint?.filter((filteredSprint) => filteredSprint.name?.toLowerCase().includes(selectedSprint?.toLowerCase())).map((sprintData) => (
                                            getDate(sprintData.startDate).split(",")[0]
                                        ))
                                    ) : (
                                        "Start Date"
                                    )
                                }</p>
                                {/* <p>{storiesBarChart?.sprintStartDate}</p> */}
                                <ProgressBar
                                    height='3px'
                                    width='10vw'
                                    baseBgColor={darkMode ? "#34ecf61d" : "#a2afbe"}
                                    bgColor='#4291ff'
                                    maxComplete={100}
                                    isLabelVisible={false}
                                    completed={
                                        ((storiesBarChart?.daysSpent / storiesBarChart?.sprintDuration) * 100).toFixed(2)
                                    } />
                                <p>{
                                    selectedSprint ? (
                                        sprint && sprint?.filter((filteredSprint) => filteredSprint.name?.toLowerCase().includes(selectedSprint?.toLowerCase())).map((sprintData) => (
                                            getDate(sprintData.endDate).split(",")[0]
                                        ))
                                    ) : (
                                        "End Date"
                                    )
                                }</p>
                            </div>
                        </div>
                        <div className={css.rows}>
                            <div className={css.row}>
                                <p>Sprint Duration</p>
                                <div className={css.items}>
                                    <p
                                        style={{ backgroundColor: `${darkMode ? "#fddf3622" : "#fddf364c"}`, color: `${darkMode ? "#fde036" : "#9b8506"}` }}
                                    >{`${storiesBarChart?.sprintDuration ? storiesBarChart?.sprintDuration : "-"} Days`}</p>
                                </div>
                            </div>
                            <div className={css.row}>
                                <p>Subtasks</p>
                                <div className={css.items}>
                                    <span>
                                        <img src={todo} alt="" />
                                        <p>{meta_data.number_of_sub_tasks}</p>
                                    </span>
                                    <span>
                                        <img src={done} alt="" />
                                        <p>{meta_data.completed_sub_tasks}</p>
                                    </span>
                                </div>
                            </div>
                            <div className={css.row}>
                                <p>Ac-added Count</p>
                                <div className={css.items}>
                                    <span
                                        style={{ backgroundColor: `${darkMode ? "#c7272439" : "#ff5b5829"}`, color: `${darkMode ? "#c72624" : "#e82b28"}` }}
                                    >
                                        <img src={redCross} alt="" />
                                        <p>{ac_hygine?.No ? ac_hygine?.No : 0}</p>
                                    </span>
                                    <span>
                                        <img src={done} alt="" />
                                        <p>{ac_hygine?.Yes ? ac_hygine?.Yes : 0}</p>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={css.gitLogs}>
                {
                    gitLogs?.length > 0 ?
                        (
                            filteredGitLogs.length > 0 ?
                                (
                                    filteredGitLogs?.map((sprint, index) => (
                                        <div className={css.gitContainer} key={sprint.sprint_id}>
                                            <div className={css.sprintData} >
                                                <div className={css.info}>
                                                    <span>
                                                        <p>{sprint.sprint_name}</p>
                                                        <p>
                                                            {sprint.commits.filter((filteredCommit) => filteredCommit?.assignee.toLowerCase().includes(membersFilter?.toLowerCase())).length}
                                                        </p>
                                                    </span>
                                                    <p>{`${getDate(sprint.sprint_start).split(",")[0]} - ${getDate(sprint.sprint_end).split(",")[0]}`}</p>
                                                </div>
                                                <span>
                                                    {
                                                        membersFilter != "" && (
                                                            <p className={css.memberName}>
                                                                {membersFilter}
                                                            </p>
                                                        )
                                                    }
                                                    <p className={sprint?.sprint_status == "active" ? css.spActive : css.spClosed}>{sprint?.sprint_status.toUpperCase()}</p>
                                                </span>

                                            </div>
                                            <div
                                                // variants={staggerContainer}
                                                // initial="hidden"
                                                // whileInView="show"
                                                className={css.commitsContainer}
                                            >
                                                {
                                                    sprint.commits.filter((filteredCommit) => filteredCommit?.assignee.toLowerCase().includes(membersFilter?.toLowerCase())).length > 0 ? (
                                                        sprint.commits.sort((a, b) => new Date(b.authorTimestamp) - new Date(a.authorTimestamp)).filter((filteredCommit) => filteredCommit?.assignee.toLowerCase().includes(membersFilter?.toLowerCase())).map((commit, index) => (
                                                            <div
                                                                key={index}
                                                                // variants={slideIn("up", "tween", (0.2 * index), 1)}
                                                                className={css.commit}>
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
                                                            </div>
                                                        ))
                                                    ) : (
                                                        <div className={css.loaderContainer}>
                                                            <p> {`No Commits have been made by ${membersFilter} yet.`}</p>
                                                        </div>
                                                    )
                                                }
                                                {

                                                }
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className={css.loaderContainer}>
                                        <p> {`No GitLogs to show for ${boardName}`}</p>
                                    </div>)
                        ) : (
                            <div className={css.loaderContainer}>
                                <MainLoader heading={"GitLogs"} />
                            </div>)
                }
            </div>
        </div>
    )
}

export default Detail_view
