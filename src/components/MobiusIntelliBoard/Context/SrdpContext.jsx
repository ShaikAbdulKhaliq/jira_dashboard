import axios from "axios";
import { createContext, useEffect, useState } from "react";
// import json_data from "../components/data/data";

const live_base_url = import.meta.env.VITE_live_base_url;

export const SrdpContext = createContext();
export const ContextProvider = ({ children }) => {
    const [darkMode, setDarkMode] = useState(false);
    const [expandNav, setExpandNav] = useState(false)
    const [storiesLength, setStoriesLength] = useState(0)
    const [membersFilter, setMembersFilter] = useState("")
    const [story_points_chart, setStory_points_chart] = useState([])
    const [rock_star, setRock_star] = useState([]);
    const [singlePieChart, setSinglePieChart] = useState({})
    const [showBarGraph, setShowBarGraph] = useState(true)
    const [isChartLoading, setIsChartLoading] = useState(true)
    const [storiesBarChart, setStoriesBarChart] = useState({
        workDone: "",
        timeTaken: "",
        colorCode: "",
        sprintDuration: "",
        daysSpent: ""
    })
    const [sprints_subtasks, setSprints_subtasks] = useState()
    const [pie_loader, setPie_loader] = useState(false)
    // const [allboards, setAllboards] = useState(json_data);
    const [allboards, setAllboards] = useState([]);
    const [allBoardLoading, setAllBoardLoading] = useState(false)
    const [sprintMembers, setSprintMembers] = useState(0)
    const [is_summary, setIs_summary] = useState(false);
    const [selectedSprint, setSelectedSprint] = useState("")
    const [selectedSprintFromSummary, setSelectedSprintFromSummary] = useState(null)
    const [sprintLoader, setSprintLoader] = useState(false)
    const [membersLoader, setMembersLoader] = useState(false)
    const [sprintIdState, setSprintIdState] = useState(null)
    const [sprint, setSprint] = useState("")
    const [storiesLoader, setStoriesLoader] = useState(false)
    const [stories_data, setStories_data] = useState([]);
    const [ac_hygine, setAc_hygine] = useState({
        yes:0,No:0
    })
    const [past_sprint_heros, setPast_sprint_heros] = useState([])
    const [trust_worthy, setTrust_worthy] = useState([]);
    const [problem_solver, setProblem_solver] = useState([]);
    const [project_lead, setProject_lead] = useState(null)
    const [showAllBoards, setShowAllBoards] = useState(false)
    const [selectedBoard, setSelectedBoard] = useState({})
    const [gitBoards, setGitBoards] = useState([])

    const [showSelect, setShowSelect] = useState(false)
    const [storyData, setStoryData] = useState({ original_estimate: "Select story", remaining_estimate: "Select story", time_spent: "Select story", story_reviewers: "Select story" })
    const [filterSprintBarChart, setFilterSprintBarChart] = useState({
        lessThan: +Infinity, greaterThan: -Infinity
    })
    const [meta_data, setMeta_data] = useState({
        number_of_sub_tasks: 0,
        completed_sub_tasks: 0,
        eviewers: "Nil"
    });
    const [selected, setSelected] = useState({
        onTrack: false, behind: false, delayed: false, ahead: false
    })
    const [searchValue, setSearchValue] = useState("")
    const [lastClosed, setLastClosed] = useState("");
    const [boardProgress, setBoardProgress] = useState(0)

    //# loader state
    // const [membersLoader, setMembersLoader] = useState(true)
    // console.log(url);

    //# for breadcrumbs
    const [breadCrumbs, setBreadCrumbs] = useState({
        home: null,
        summaryBoard: null,
        boardSummary: null,
        sprint: null
    })
    const [toolTip, setToolTip] = useState({
        trustWorthy: false,
        problemSolver: false,
        sprintHeros: false
    })
    const [showDetails, setShowDetails] = useState(false)



    //# for getting all the boards 
    const all_boards_AQ =
        "https://ig.aidtaas.com/pi-bigquery-service/v1.0/big-queries/65e19b89c7d70117c9910ea7/data?size=1000";
    const token =
        "Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImZmOGYxNjhmLTNmZjYtNDZlMi1iMTJlLWE2YTdlN2Y2YTY5MCJ9.eyJzdWIiOiJnYWlhbi5jb20iLCJ1c2VyX25hbWUiOiJwb3J0YWxfdGVzdCIsInNjb3BlIjpbInRydXN0IiwicmVhZCIsIndyaXRlIl0sInRlbmFudElkIjoiNjExYmRkMzQyNmE5NDg2MDA1NjkzYjExIiwiaXNzIjoiZ2FpYW4uY29tIiwidXNlck5hbWUiOiJwb3J0YWxfdGVzdCIsImF1dGhvcml0aWVzIjpbIlJPTEVfT01OSV9DT05TVU1FUiIsIlJPTEVfTUFSS0VUUExBQ0VfVVNFUiIsIlJPTEVfT01OSV9VU0VSIl0sImp0aSI6IjgxODE1ZDNmLTY1MTAtNDJkNC05NWZkLTNiZTJmMWYzYjg5ZiIsImVtYWlsIjoicG9ydGFsX3Rlc3RAZ2F0ZXN0YXV0b21hdGlvbi5jb20iLCJjbGllbnRfaWQiOiJnYWlhbiJ9.Mz1gWLt1rujlQWW3SzuwtERk1i6HwG9utVuMUnL-RX4kKtR1jl0eR9MZmNjRZ0znbrr6w8MOj2aAULtpIEYmM9jU_mXGBuqetPIbTuV2d4Hkv6f0qaJZLAIAU3qhgijQI9O4a2yg_rmHnibNhEcZMKEFK5AXw8M_B8XIgnNYlXDkpjEqP6Siv0HJmHA3T1j1XY8PCsluzIwDzIgRr-xqAJcaCnUwGR7XxsF-X0plk8L9qV1Z3bF2EMqqBsednYeqaM3EqwJXk27R5PFU7jn5aOc-_n9DxaGLcuJB5JoqoGW7DeaIKLzMwxvS9vP_bc8vDOxl8xk-zTRAq8goyHV6IQ";


    // const get_activeboards = async () => {
    //     const response = await axios.get(`${live_base_url}/summary/activeboards`)
    //     setBoardsData(response.data)
    // }

    // const getAllboards = async () => {
    //     try {
    //         if (allboards.length == 0) {
    //             const response = await axios.get(`${live_base_url}/allboards`);
    //             const data = response.data;
    //             setAllboards(data)
    //         }

    //     } catch (error) {
    //         console.log(error);
    //     }

    // }

    // console.log(allboards, "allboards");

    // const get_git_data = async () => {
    //     const response = await axios.post(`${live_base_url}/sprint/gitdata`, gitBoards);
    //     setGitLogs(prev => ([...prev, ...response.data]))
    //     // console.log(gitLogs, "whole data of git Logs")
    // }

    // const get_boards_active_sprint = async () => {
    //     const batchSize = 3;
    //     setDataFetched(false)
    //     // const batches = [];
    //     // console.log(boardsData);
    //     const tempBarChartData = [];
    //     for (let i = 0; i < boardsData?.length; i += batchSize) {
    //         const batches = boardsData.slice(i, i + batchSize);
    //         const progressPercentage = ((i + batchSize) / boardsData.length) * 100;
    //         setSummaryProgress(Math.min(progressPercentage, 100).toFixed(2)); // Setting the progress, capped at 100%

    //         try {
    //             let response = await axios.post(`${live_base_url}/allboards/activesprints`, batches);

    //             setGitBoards(response.data)

    //             // console.log(response.data, "response");

    //             const filteresdResponse = response?.data.filter((sprint) => sprint.sprint_status === "active")
    //             if (filteresdResponse.length > 0) {
    //                 setActiveBoards(prev => ([...prev, ...filteresdResponse]));
    //                 // console.log("rendering");
    //                 if (i == 0) {
    //                     setSelectedBoardSprint(filteresdResponse[0]?.sprint_name)
    //                     setSelectedBoardName(filteresdResponse[0]?.board_name)
    //                     // setSelectedBoardName
    //                     // console.log("piechart setteled")
    //                 }
    //                 for (let i = 0; i < filteresdResponse.length; i++) {
    //                     setSummarySprintLoader(false);
    //                     // let active_board = filteresdResponse.data[i]
    //                     // console.log(filteresdResponse[i])

    //                     // conditional for loop checking for the boards
    //                     // for (let j = 0; j < filteresdResponse[i].sprints.length; j++) {



    //                     const response_piechart = await axios.get(`${live_base_url}/summaryDashboard/${filteresdResponse[i].sprint_id}/${filteresdResponse[i].sprint_name}/subtask`);

                        
    //                     (prev => ([...prev, ...response_piechart.data]))
    //                     // Calculate metrics for each sprint
    //                     const sprintStartDate = new Date(filteresdResponse[i].sprint_start);
    //                     const sprintEndDate = new Date(filteresdResponse[i].sprint_end);
    //                     const currentDate = new Date();
    //                     const adjustedCurrentDate = new Date(Math.min(currentDate, sprintEndDate));
    //                     // Extracting only the date part
    //                     const sprintStartDateStr = sprintStartDate?.toISOString().substring(0, 10);
    //                     const sprintEndDateStr = sprintEndDate?.toISOString().substring(0, 10);
    //                     const currentDateStr = adjustedCurrentDate?.toISOString().substring(0, 10);

    //                     // Calculating other metrics
    //                     const wholeSprintDuration = Math.ceil((new Date(sprintEndDateStr) - new Date(sprintStartDateStr)) / (1000 * 60 * 60 * 24));
    //                     const daysFromStart = Math.ceil((Math.min(new Date(currentDateStr), new Date(sprintEndDateStr)) - new Date(sprintStartDateStr)) / (1000 * 60 * 60 * 24));
    //                     const percentageOfTimeElapsed = parseInt(((daysFromStart / wholeSprintDuration) * 100).toFixed(2));
    //                     const percentageOfWork = parseInt((((filteresdResponse[i].done_stories) / filteresdResponse[i].total_stories) * 100).toFixed(2));
    //                     const percentageOfWork_in_progress = parseInt((((filteresdResponse[i].in_progress_stories) / filteresdResponse[i].total_stories) * 100).toFixed(2));


    //                     // - ${ filteresdResponse[i].board_name }
    //                     setSprintBarChart(prev => [...prev, {
    //                         boardName: response.data[i].board_name,
    //                         boardId: response.data[i].board_id,
    //                         sprintId: response.data[i].sprint_id,
    //                         sprintName: `${response.data[i].sprint_name}`,
    //                         percentageOfTimeElapsed: percentageOfTimeElapsed,
    //                         percentageOfWork: percentageOfWork,
    //                         workDone: (percentageOfTimeElapsed - percentageOfWork),
    //                         percentageOfWork_in_progress: percentageOfWork_in_progress,
    //                         work_in_progress: (percentageOfWork_in_progress == 0 ? percentageOfWork_in_progress : percentageOfTimeElapsed - percentageOfWork_in_progress),
    //                         sprintStartDateStr: sprintStartDateStr,
    //                         sprintEndDateStr: sprintEndDateStr,
    //                         currentDateStr: currentDateStr,
    //                         daysFromStart: daysFromStart,
    //                         wholeSprintDuration: wholeSprintDuration,
    //                     }]);

    //                 }
    //                 // }
    //             }
    //         } catch (error) {
    //             console.error("Error fetching active sprints:", error);
    //             // Handle error
    //         }
    //     }

    //     setDataFetched(true)
    //     // console.log(dataFetched)
    // }




    // useEffect(() => {
    //     if (dataFetched) {
    //         const slider = setInterval(() => {
    //             setSprintCount(prev => prev + 1);
    //         }, 30000);

    //         return () => clearInterval(slider);
    //     }
    // }, [dataFetched]);

    // useEffect(() => {
    //     if (sprintCount <= activeBoards.length - 1) {
    //         setSelectedBoardSprint(prev =>
    //             activeBoards[sprintCount]?.sprint_name
    //         )
    //         setSelectedBoardName(prev =>
    //             activeBoards[sprintCount]?.board_name)

    //     } else {
    //         setSprintCount(0)
    //     }

    //     // console.log(sprintCount, "sprintCount");
    // }, [sprintCount]);

    // useEffect(() => {
    //     setSummarySprintLoader(true)

    //     // get_boards_active_sprint()
    //     get_activeboards()
    //     // getAllboards()
    //     // update_active_sprint(json_data)
    //     const intervalId = setInterval(() => {
    //         setActiveBoards([])
    //         setSprintPieChart([])
    //         setSprintBarChart([])
    //         get_boards_active_sprint();

    //     }, 3 * 60 * 60 * 1000);

    //     // Clean up the interval when the component unmounts
    //     return () => clearInterval(intervalId)
    // }, []);



    // useEffect(() => {
    //     get_git_data()

    // }, [activeBoards])


    // useEffect(() => {
    //     get_boards_active_sprint()
    // }, [boardsData])

    return (
        <SrdpContext.Provider value={{
            expandNav, setExpandNav, membersFilter, setMembersFilter,
            storiesLength, setStoriesLength, story_points_chart, setStory_points_chart,
            storiesBarChart, setStoriesBarChart, rock_star, setRock_star,
            showBarGraph, setShowBarGraph, 
            isChartLoading, setIsChartLoading, singlePieChart, setSinglePieChart,
             token,
            allboards, setAllboards, allBoardLoading, setAllBoardLoading, is_summary, setIs_summary,
            sprintMembers, setSprintMembers, membersLoader, setMembersLoader, selectedSprint, setSelectedSprint,
            selectedSprintFromSummary, setSelectedSprintFromSummary, 
            filterSprintBarChart, setFilterSprintBarChart, selected, setSelected, searchValue, setSearchValue,
            pie_loader, setPie_loader, sprints_subtasks, setSprints_subtasks, breadCrumbs, setBreadCrumbs, meta_data,
            setMeta_data, storyData, setStoryData, lastClosed, setLastClosed, sprintLoader, setSprintLoader,
            sprintIdState, setSprintIdState, sprint, setSprint, storiesLoader, setStoriesLoader, stories_data,
            setStories_data, ac_hygine, setAc_hygine, past_sprint_heros, setPast_sprint_heros, trust_worthy, setTrust_worthy, problem_solver, setProblem_solver,
            project_lead, setProject_lead, darkMode, setDarkMode, showAllBoards, setShowAllBoards, selectedBoard, setSelectedBoard,  showSelect, setShowSelect,  boardProgress, setBoardProgress, toolTip, setToolTip, showDetails, setShowDetails


        }}>
            {children}
        </SrdpContext.Provider>
    )
}