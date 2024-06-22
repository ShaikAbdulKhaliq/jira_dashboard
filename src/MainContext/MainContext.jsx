import axios from "axios";
import { createContext, useEffect, useState } from "react";
const live_base_url = import.meta.env.VITE_live_base_url;

export const MainContext = createContext();
export const MainContextProvider = ({ children }) => {
    const [darkMode, setDarkMode] = useState(false);
    const [sprintProgressToolTip, setSprintProgressToolTip] = useState(false)
    const [dataFetched, setDataFetched] = useState(false);
    const [boardsData, setBoardsData] = useState([]);
    const [summaryProgress, setSummaryProgress] = useState(0)
    const [activeBoards, setActiveBoards] = useState([])
    const [selectedBoardSprint, setSelectedBoardSprint] = useState("")
    const [selectedBoardName, setSelectedBoardName] = useState("")
    const [summarySprintLoader, setSummarySprintLoader] = useState(true)
    const [sprintBarChart, setSprintBarChart] = useState([])
    const [gitBoards, setGitBoards] = useState([])
    const [sprintCount, setSprintCount] = useState(0)
    const [sprintPieChart, setSprintPieChart] = useState([]);
    const [gitLogs, setGitLogs] = useState([])


    // get active bards
    const get_activeboards = async () => {
        const response = await axios.get(`${live_base_url}/summary/activeboards`)
        setBoardsData(response.data)
    }

    // git logs data
    const get_git_data = async () => {
        const response = await axios.post(`${live_base_url}/sprint/gitdata`, gitBoards);
        setGitLogs(prev => ([...prev, ...response.data]))
        // console.log(gitLogs, "whole data of git Logs")
    }

    const get_boards_active_sprint = async () => {
        const batchSize = 3;
        setDataFetched(false)
        // const batches = [];
        // console.log(boardsData);
        const tempBarChartData = [];
        for (let i = 0; i < boardsData?.length; i += batchSize) {
            const batches = boardsData.slice(i, i + batchSize);
            const progressPercentage = ((i + batchSize) / boardsData.length) * 100;
            setSummaryProgress(Math.min(progressPercentage, 100).toFixed(2)); // Setting the progress, capped at 100%

            try {
                let response = await axios.post(`${live_base_url}/allboards/activesprints`, batches);

                setGitBoards(response.data)

                // console.log(response.data, "response");

                const filteresdResponse = response?.data.filter((sprint) => sprint.sprint_status === "active")
                if (filteresdResponse.length > 0) {
                    setActiveBoards(prev => ([...prev, ...filteresdResponse]));
                    // console.log("rendering");
                    if (i == 0) {
                        setSelectedBoardSprint(filteresdResponse[0]?.sprint_name)
                        setSelectedBoardName(filteresdResponse[0]?.board_name)
                        // setSelectedBoardName
                        // console.log("piechart setteled")
                    }
                    for (let i = 0; i < filteresdResponse.length; i++) {
                        setSummarySprintLoader(false);
                        // let active_board = filteresdResponse.data[i]
                        // console.log(filteresdResponse[i])

                        // conditional for loop checking for the boards
                        // for (let j = 0; j < filteresdResponse[i].sprints.length; j++) {



                        const response_piechart = await axios.get(`${live_base_url}/summaryDashboard/${filteresdResponse[i].sprint_id}/${filteresdResponse[i].sprint_name}/subtask`);

                        setSprintPieChart(prev => ([...prev, ...response_piechart.data]))
                        // Calculate metrics for each sprint
                        const sprintStartDate = new Date(filteresdResponse[i].sprint_start);
                        const sprintEndDate = new Date(filteresdResponse[i].sprint_end);
                        const currentDate = new Date();
                        const adjustedCurrentDate = new Date(Math.min(currentDate, sprintEndDate));
                        // Extracting only the date part
                        const sprintStartDateStr = sprintStartDate?.toISOString().substring(0, 10);
                        const sprintEndDateStr = sprintEndDate?.toISOString().substring(0, 10);
                        const currentDateStr = adjustedCurrentDate?.toISOString().substring(0, 10);

                        // Calculating other metrics
                        const wholeSprintDuration = Math.ceil((new Date(sprintEndDateStr) - new Date(sprintStartDateStr)) / (1000 * 60 * 60 * 24));
                        const daysFromStart = Math.ceil((Math.min(new Date(currentDateStr), new Date(sprintEndDateStr)) - new Date(sprintStartDateStr)) / (1000 * 60 * 60 * 24));
                        const percentageOfTimeElapsed = parseInt(((daysFromStart / wholeSprintDuration) * 100).toFixed(2));
                        const percentageOfWork = parseInt((((filteresdResponse[i].done_stories) / filteresdResponse[i].total_stories) * 100).toFixed(2));
                        const percentageOfWork_in_progress = parseInt((((filteresdResponse[i].in_progress_stories) / filteresdResponse[i].total_stories) * 100).toFixed(2));


                        // - ${ filteresdResponse[i].board_name }
                        setSprintBarChart(prev => [...prev, {
                            boardName: response.data[i].board_name,
                            boardId: response.data[i].board_id,
                            sprintId: response.data[i].sprint_id,
                            sprintName: `${response.data[i].sprint_name}`,
                            percentageOfTimeElapsed: percentageOfTimeElapsed,
                            percentageOfWork: percentageOfWork,
                            workDone: (percentageOfTimeElapsed - percentageOfWork),
                            percentageOfWork_in_progress: percentageOfWork_in_progress,
                            work_in_progress: (percentageOfWork_in_progress == 0 ? percentageOfWork_in_progress : percentageOfTimeElapsed - percentageOfWork_in_progress),
                            sprintStartDateStr: sprintStartDateStr,
                            sprintEndDateStr: sprintEndDateStr,
                            currentDateStr: currentDateStr,
                            daysFromStart: daysFromStart,
                            wholeSprintDuration: wholeSprintDuration,
                        }]);

                    }
                    // }
                }
            } catch (error) {
                console.error("Error fetching active sprints:", error);
                // Handle error
            }
        }

        setDataFetched(true)
        // console.log(dataFetched)
    }


    useEffect(() => {
        if (dataFetched) {
            const slider = setInterval(() => {
                setSprintCount(prev => prev + 1);
            }, 30000);

            return () => clearInterval(slider);
        }
    }, [dataFetched]);

    useEffect(() => {
        if (sprintCount <= activeBoards.length - 1) {
            setSelectedBoardSprint(prev =>
                activeBoards[sprintCount]?.sprint_name
            )
            setSelectedBoardName(prev =>
                activeBoards[sprintCount]?.board_name)

        } else {
            setSprintCount(0)
        }

        // console.log(sprintCount, "sprintCount");
    }, [sprintCount]);

    useEffect(() => {
        setSummarySprintLoader(true)

        // get_boards_active_sprint()
        get_activeboards()
        // getAllboards()
        // update_active_sprint(json_data)
        const intervalId = setInterval(() => {
            setActiveBoards([])
            setSprintPieChart([])
            setSprintBarChart([])
            get_boards_active_sprint();

        }, 3 * 60 * 60 * 1000);

        // Clean up the interval when the component unmounts
        return () => clearInterval(intervalId)
    }, []);



    useEffect(() => {
        get_git_data()

    }, [activeBoards])


    useEffect(() => {
        get_boards_active_sprint()
    }, [boardsData])

    return (
        <MainContext.Provider value={{
            darkMode, setDarkMode, sprintProgressToolTip, setSprintProgressToolTip, dataFetched, setDataFetched, boardsData, setBoardsData, summaryProgress, setSummaryProgress, activeBoards, setActiveBoards, selectedBoardSprint, setSelectedBoardSprint, selectedBoardName, setSelectedBoardName, summarySprintLoader, setSummarySprintLoader, sprintBarChart, setSprintBarChart, sprintPieChart, setSprintPieChart, gitLogs, setGitLogs
        }}>
            {children}
        </MainContext.Provider>
    )
}