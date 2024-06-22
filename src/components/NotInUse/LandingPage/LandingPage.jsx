import React, { useContext, useEffect, useRef, useState } from "react";
import {
    BsTrash,
    BsSuitHeart,
    BsSuitHeartFill,
    BsPieChart,
    BsPieChartFill,
} from "react-icons/bs";
import data from './Data'
// import PieChart from "../PieChart";
import css from './LandingPage2.module.scss'
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../Loader";
import SummaryPieCharts from "../Charts/SummaryPieCharts";
import chartData from '../Charts/chartData';
import MainLoader from "../loaders/MainLoader";
import charts from '../../assets/pieChartOutlined.png'
import list from '../../assets/list.png'
import { SrdpContext } from "../../Context/SrdpContext";
import search from '../../assets/search.svg'
import cross from '../../assets/cross.svg'
import { getAllboards } from '../../service/service';


// import SummaryLoader from "../loaders/SummaryLoader";
let sprint_data_map = {};
const live_base_url = import.meta.env.VITE_live_base_url;

function LandingPage({ setBoardId, setView, setBoardName }) {

    const { allboards, setAllboards, token, allBoardLoading, is_summary, setIs_summary, setSelectedSprintFromSummary, setSelectedSprint, breadCrumbs, setBreadCrumbs, setAllBoardLoading } = useContext(SrdpContext)
    //#loading state 
    const [favBoardLoading, setFavBoardLoading] = useState(false)


    const searchInputRef = useRef();
    const [searchTerm, setSearchTerm] = useState("");
    const [showPieChart, setShowPieChart] = useState(false);
    const [boardId_pie, setBoardId_pie] = useState();
    const [landingPieData, setLandingPieData] = useState({});
    const [summaryPieData, setSummaryPieData] = useState({});
    const [storydata, setStorydata] = useState();
    const [sprint, setSprint] = useState("");
    const [pieData, setPieData] = useState([]);
    const [all_summary_charts, setAll_summary_charts] = useState([]);

    const [isPieChartVisible, setIsPieChartVisible] = useState(false);
    const [commentsLoading, setCommentsLoading] = useState(true);
    const [expandedBoard, setExpandedBoard] = useState(null);
    const [showLoader, setShowLoader] = useState(false);
    const [summary_loader, setSummary_loader] = useState(false);
    const hoverTimeoutRef = useRef(null);
    const navigate = useNavigate();
    const boardWorkflowId = 82;
    const sprintWorkflowId = 70506;

    const [screenSize, setScreenSize] = useState('');


    useEffect(() => {
        setBreadCrumbs({ home: null, summaryBoard: null })
        setSelectedSprintFromSummary(null)
        setSelectedSprint(null)
        const handleResize = () => {
            const width = window.innerWidth;
            let size = '';

            if (width < 768) {
                size = 'mobile';
            } else if (width >= 768 && width < 1024) {
                size = 'tablet';
            } else {
                size = 'desktop';
            }

            setScreenSize(size);
        };

        // Initial call to set screen size
        handleResize();

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const handleClick = (event, board) => {
        // Perform different actions based on screen size
        switch (screenSize) {
            case 'mobile':
                event.stopPropagation()
                setIsPieChartVisible(true);
                handlePieData(board.board_id);
                setExpandedBoard(board.board_id);
                break;
            case 'tablet':
                event.stopPropagation()
                setIsPieChartVisible(true);
                handlePieData(board.board_id);
                setExpandedBoard(board.board_id);
                break;
            case 'desktop':
                // console.log("hover will work")
                break;
            default:
                break;
        }
    };
    const handleHover = (event, board) => {
        // Perform different actions based on screen size
        switch (screenSize) {
            case 'mobile':
                // console.log("click will work")
                break;
            case 'tablet':
            // console.log("click will work")
            case 'desktop':
                event.stopPropagation()
                setIsPieChartVisible(true);
                handlePieData(board.board_id);
                setExpandedBoard(board.board_id);
                break;
            default:
                break;
        }
    };

    // const f_data =
    // const workFlowApi = `https://dev-workflowdesigner.gaiansolutions.com/api/wf/64e1fd3d1443eb00018cc231/execute/${boardWorkflowId}?env=TEST`;

    // Boards AQ
    async function triggerWorkflow() {
        // console.log("Before making API call");
        var body = {
            ownerId: "65d331209d55420001aa7c79",
        };
        try {
            const formData = new FormData();
            const response = await axios.post(
                `https://bob-workflowdesigner.aidtaas.com/api/wf/execute/${boardWorkflowId}?sync=false&env=TEST`,
                {
                    ownerId: "65d331209d55420001aa7c79",
                },

                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `${token}`,
                        accept: "*/*",
                    },
                }
            );

            // console.log("API call success", response);
        } catch (error) {
            console.error("API call error", error);
        }
    }

    async function triggerWorkflowSprint(key, value) {
        try {
            const formData = new FormData();
            formData.append(key, value);

            const response = await axios.post(
                `https://dev-workflowdesigner.gaiansolutions.com/api/wf/64e1fd3d1443eb00018cc231/execute/${sprintWorkflowId}?env=TEST`,
                formData,
                {},
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            // console.log("API call success", response);
        } catch (error) {
            console.error("API call error", error);
        }
    }

    //  PieData
    function handlePieData(id) {
        setBoardId_pie(id);
        hoverTimeoutRef.current = setTimeout(() => {
            // console.log(boardId_pie)
            setShowLoader(true);

            // console.log(id);

            if (id) {
                async function getLastSprints() {
                    // setSprintsLoading(true);
                    const response = await axios.get(
                        live_base_url + "/" + id + "/allSprints"
                    );
                    if (response.data.length > 0) {
                        const all_sprints = response.data.filter(
                            (sprint) => sprint.state !== "future"
                        );
                        for (let sprint of all_sprints) {
                            sprint_data_map[sprint.id.toString()] = {
                                sprint_start: sprint.startDate.substring(0, 10),
                                sprint_end: sprint.endDate.substring(0, 10),
                            };
                        }
                        let default_sprint;
                        const active_sprint = all_sprints.filter(
                            (sprint) => sprint.state === "active"
                        );
                        if (active_sprint.length === 0) {
                            let closed_sprints = all_sprints.filter(
                                (sprint) => sprint.state === "closed"
                            );
                            default_sprint =
                                closed_sprints.length > 0
                                    ? closed_sprints[closed_sprints.length - 1]
                                    : { id: "" };
                        } else {
                            default_sprint = active_sprint[0];
                        }

                        setSprint(default_sprint.id ? default_sprint.id : "");
                        let pie_chart_data;
                        if (default_sprint.id !== "") {
                            const response = await axios.get(
                                `${live_base_url}/sprint/${default_sprint.id}/subtasks/progress`
                            );
                            pie_chart_data = response.data.values;
                            // console.log(pie_chart_data, "pie_chart_data");
                            if (pie_chart_data.length > 0) {
                                setPieData(pie_chart_data);
                            } else {
                                setPieData(["No Subtasks"]);
                            }
                        } else {
                            setPieData([]);
                            pie_chart_data = [];
                        }
                        let piedata = new Map();
                        // console.log(pie_chart_data, "pie_chart_data");
                        pie_chart_data.forEach((d) => {
                            if (piedata.has(d.status_category_name)) {
                                piedata.set(
                                    d.status_category_name,
                                    piedata.get(d.status_category_name) + d.issue_count
                                );
                                setStorydata(
                                    piedata.set(
                                        d.status_category_name,
                                        piedata.get(d.status_category_name) + d.issue_count
                                    )
                                );
                            } else {
                                piedata.set(d.status_category_name, d.issue_count);
                                setStorydata(
                                    piedata.set(d.status_category_name, d.issue_count)
                                );
                            }
                        });
                        if (piedata.size === 0) {
                            piedata.set("NO Subtask", "0");
                        }
                        // console.log(piedata, "piedataaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
                        setLandingPieData({
                            labels: Array.from(piedata.keys()),
                            datasets: [
                                {
                                    label: "Subtask Count",
                                    data: Array.from(piedata.values()),
                                    backgroundColor: [
                                        "#4285F4",
                                        "#FBBC05",
                                        "#34A853",
                                        "#EA4335",
                                        "#DA0C81",
                                    ],
                                },
                            ],
                        });
                    }
                }
                getLastSprints();
                // console.log(landingPieData);

                // console.log(landingPieData);
                // console.log(piedata, "piedata");
            }
        }, 1000);
        // event.stopPropagation();
    }
    console.log(landingPieData, "landingPieData");



    // favourites
    const [favboards, setFavboards] = useState([]);

    // Summmary board
    const [summary_boards, setSummary_boards] = useState({});
    const [delete_boards, setDelete_boards] = useState();

    async function get_favBoards() {
        setFavBoardLoading(true)
        try {
            const response = await axios.get(
                "https://ig.aidtaas.com/tf-entity-ingestion/v1.0/schemas/65e95af77a43d94780405c48/instances/list?size=1000",

                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: token,
                        accept: "*/*",
                    },
                }
            );
            // setFavboards(response.data.entities);
            setFavBoardLoading(false)
            // summary_view()
            // console.log("Favboards", favboards);
        } catch (error) {
            console.error("API call error", error);
        }
    }
    async function post_summmary_dashboard() {
        var body = [summary_boards];
        try {
            const response = await axios.post(
                `https://ig.aidtaas.com/tf-entity-ingestion/v1.0/schemas/65e95af77a43d94780405c48/instances?upsert=true`,
                body,

                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: token,
                        accept: "*/*",
                    },
                }
            );
            get_favBoards();

            // console.log("API call success", response);
        } catch (error) {
            console.error("API call error", error);
        }
    }

    async function delete_summmary_dashboard() {
        var body = delete_boards;

        try {
            const response = await axios.delete(
                "https://ig.aidtaas.com/tf-entity-ingestion/v1.0/schemas/65e95af77a43d94780405c48/instances",
                {
                    headers: {
                        Authorization: token,
                        "Content-Type": "application/json",
                        Accept: "*/*",
                    },
                    data: body,
                }
            );
            get_favBoards();
            // console.log("API call success", response);
        } catch (error) {
            console.error("API call error", error);
        }
    }

    const handleFavClick = (event, board, id, name, type) => {
        setSummary_boards({
            board_id: board.board_id,
            board_name: board.board_name,
            board_type: board.board_type,
            time_posted: new Date().getTime()
        });

        event.stopPropagation();
    };
    // console.log(summary_boards, "summary_boards");

    // To filter the Searched boards by Board name
    const handleChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleClearClick = () => {
        setSearchTerm("");
        searchInputRef.current.focus();
    };

    const handleDeleteClick = (event, board, id, name) => {
        // Prevent the event from propagating to the board header
        event.stopPropagation();
        // console.log("DELETE CALLED");
        setDelete_boards((prev) => ({ board_id: board.board_id }));
    };

    useEffect(() => {
        post_summmary_dashboard();
    }, [summary_boards]);

    useEffect(() => {
        // console.log("delete id : ", delete_boards);
        delete_summmary_dashboard();
        // get_favBoards();
    }, [delete_boards]);

    function handleCick(id, name, route, board) {
        setBoardId(id);
        setBoardName(name);
        setView("dashboard");
        navigate(`/${route}/${id}/${name}`);
        // console.log("Before making API call");

        const dynamicKey = "board_id";
        const dynamicValue = id;

        triggerWorkflowSprint(dynamicKey, dynamicValue);
    }

    // JSON data to boards
    // const filteredBoards = data.filter((board) => {
    const filteredBoards = allboards.filter((board) => {
        const lowerCaseName = (board.board_name || "").toLowerCase();
        const lowerCaseId = (board.board_id || "").toString().toLowerCase();

        return (
            lowerCaseName.includes(searchTerm.toLowerCase()) ||
            lowerCaseId.includes(searchTerm.toLowerCase())
        );
    });

    // To make board names show in alphabetical odrer
    filteredBoards.sort((a, b) => {
        const nameA = (a.board_name || "").toLowerCase();
        const nameB = (b.board_name || "").toLowerCase();

        return nameA.localeCompare(nameB);
    });

    async function summary_view() {
        setIs_summary(true)
        setSummary_loader(true)
        let all_pie_data = []; // Initialize to an empty array

        try {
            if (is_summary == false) {
                const response = await axios.post(
                    `${live_base_url}/summaryview`,
                    favboards
                );
                all_pie_data = response.data;
                setSummary_loader(false)
                console.log(all_pie_data, "all_pie_data");
            }

        } catch (error) {
            // console.log(error.message);
        }
        console.log(all_summary_charts, "all_Summary_charts");

        setAll_summary_charts(prev => (all_pie_data))

        console.log(summaryPieData);
    }




    // // //

    const [data, setData] = useState([]);
    const [favBoards, setFavBoards] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setFavBoardLoading(true)
        try {

            const { data: fetchedData } = await axios.get(`${live_base_url}/fav/boards`);
            console.log(fetchedData, "fetchedData");
            setFavBoards(fetchedData);
            setFavBoardLoading(false)

        } catch (error) {
            console.error(error);
        }
    };

    const addToFav = async (e, board) => {
        e.stopPropagation();
        try {
            if (!(favBoards.some(favBoard => favBoard.board_id === board.board_id))) {
                await axios.post(`${live_base_url}/add/favboard`, board);
                setFavBoards(prevFavBoards => [...prevFavBoards, board]); // Add the board to favorites container
            }
        } catch (error) {
            console.error(error);
        }
    };


    const deleteBoard = async (e, boardId) => {
        e.stopPropagation();
        try {
            await axios.delete(`${live_base_url}/delete/favboard/${boardId}`);
            addToFav();
            //console.log("del data");
            setFavBoards(prevFavBoards => prevFavBoards.filter(board => board.board_id !== boardId));
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        triggerWorkflow();
        get_favBoards();
        getAllboards(allboards, setAllboards, setAllBoardLoading)
        // Auto-focus on the search input when the component mounts
        // searchInputRef.current.focus();
    }, []);

    // useEffect(() => { }, [landingPieData]);


    return (
        <>
            <div className={css.mainContainer}>
                <div className={css.headContainer}>
                    <div className={css.searchDiv}>
                        <div>
                            <input
                                className={css.searchBar}
                                type="text"
                                placeholder="Search by Board name..."
                                value={searchTerm}
                                onChange={handleChange}
                                ref={searchInputRef}
                            />
                            <span className={css.border}></span>
                            <img className={css.search} src={search} alt="" />
                            {searchTerm !== "" && <img onClick={() => setSearchTerm("")} className={css.cross} src={cross} alt="" />}
                        </div>
                        <button className={css.btnPrimary} onClick={() => {
                            navigate('/summaryDashboard'),
                                setBreadCrumbs({ home: "home", summaryBoard: "Summary DashBoard" })
                        }}>Summary Dashboard</button>
                    </div>
                    <div className={css.boardsHeader}>
                        <p> All Boards ({filteredBoards.length})</p>
                    </div>
                </div>

                <div className={css.boardsContainer}>
                    {
                        allBoardLoading ? <MainLoader heading={"All Boards"} /> : (

                            filteredBoards.map((board, index) => {
                                const isBoardFavorited = favBoards.some(
                                    (favBoard) => favBoard.board_id === board.board_id
                                );

                                return (

                                    <div
                                        key={index}
                                        className={`${css.boardCard} ${expandedBoard === board.board_id ? css.expanded : ''}`}
                                        onClick={(e) => {
                                            handleCick(board.board_id, board.board_name, "BoardSummary");
                                            setBreadCrumbs({ home: "home", summaryBoard: null, boardSummary: board.board_name })

                                        }}
                                    >
                                        <div>
                                            <span
                                                className={css.favIconChart}
                                                style={{ zIndex: 1000 }}
                                                onClick={(event) => {
                                                    handleClick(event, board)
                                                }}
                                                onMouseEnter={(event) => {
                                                    // Clear any existing timeout
                                                    clearTimeout(hoverTimeoutRef.current);

                                                    // Set a new timeout to handle the hover after a delay
                                                    hoverTimeoutRef.current = setTimeout(() => {
                                                        // Replace event and board with appropriate values
                                                        handleHover(event, board);
                                                    }, 1000);
                                                }}
                                                onMouseLeave={() => {
                                                    setShowLoader(false);
                                                    setIsPieChartVisible(false);
                                                    setExpandedBoard(null);
                                                    setLandingPieData({});

                                                    // Clear the timeout when leaving the element
                                                    clearTimeout(hoverTimeoutRef.current);
                                                }}
                                            >
                                                <img src={charts} alt="" />
                                                {/* <BsPieChart color="#A367B1" /> */}
                                                <div>
                                                    {(boardId_pie === board.board_id && isPieChartVisible) && (
                                                        <div className={css.piechart}>
                                                            {landingPieData.datasets &&
                                                                landingPieData.datasets.length > 0 ? (
                                                                    // <PieChart chartData={landingPieData} heading={board.board_name} />
                                                                    <>
                                                                    </>
                                                            ) : (
                                                                <div>{showLoader && <Loader />}</div>
                                                            )}
                                                        </div>
                                                    )}
                                                </div>
                                            </span>
                                            <span
                                                className={css.favIcon}
                                                onClick={(e) => {
                                                    handleFavClick(e, board)
                                                    addToFav(e, board)
                                                }}
                                            >
                                                {isBoardFavorited ? (
                                                    <BsSuitHeartFill style={{ color: "#A367B1" }} />
                                                ) : (
                                                    <BsSuitHeart style={{ color: "#A367B1" }} />
                                                )}
                                            </span>
                                        </div>
                                        <p>{board.board_name}</p>
                                    </div>
                                );
                            })

                        )
                    }
                </div>

                <div className={css.favHeader}>
                    <p>Favourite Boards</p>
                    {/* <span>
                        <img className={is_summary ? css.selected : null} src={charts} onClick={(e) => { summary_view() }} alt="" />
                        <img className={!is_summary ? css.selected : null} src={list} onClick={(e) => setIs_summary(false)} alt="" />
                    </span> */}
                </div>

                <div className={css.summary}>
                    {
                        is_summary ?

                            summary_loader ?
                                <div className={css.loader_cont}>< MainLoader heading={"Summary Board charts"} /></div> : (
                                    <div className={css.summary_chart}>
                                        {
                                            Object.entries(all_summary_charts).map(([boardName, boardData], index) => {
                                                return (
                                                    <div onClick={() => {
                                                        navigate(`/BoardSummary/${favboards[index].board_id}/${boardName}`);
                                                    }}>
                                                        <p>{boardName}</p>
                                                        <SummaryPieCharts key={index} id={`chart ${index}`} data={boardData} boardName={boardName} tool_color={"#000"} />
                                                    </div>
                                                )
                                            })
                                        }

                                    </div >) :
                            <div className={css.favContainer}>
                                {
                                    favBoardLoading ? <MainLoader heading={"Favourite Boards"} /> : (

                                        // favboards.sort((a, b) => a.time_posted - b.time_posted).map((board, index) => {
                                        favBoards.map((board, index) => {

                                            return (
                                                <div
                                                    key={index}
                                                    className={css.favCard}
                                                    onClick={(e) => {
                                                        handleCick(board.board_id, board.board_name, "BoardSummary");
                                                    }}
                                                >
                                                    <span
                                                        className={css.favIcon}
                                                        onClick={(e) => {
                                                            // handleDeleteClick(e, board)
                                                            deleteBoard(e, board.board_id)
                                                        }}
                                                    >
                                                        <BsTrash style={{ color: "red" }} />
                                                    </span>
                                                    <p>{board.board_name}</p>
                                                </div>
                                            );
                                        })

                                    )
                                }
                            </div>
                    }
                </div>

                {/* <div className={css.summary}>
                    {
                        is_summary ?

                            summary_loader ?
                                <div className={css.loader_cont}>< MainLoader heading={"Summary Board charts"} /></div> : (
                                    <div className={css.summary_chart}>
                                        {
                                            Object.entries(all_summary_charts).map(([boardName, boardData], index) => {
                                                return (
                                                    <div onClick={() => {
                                                        navigate(`/BoardSummary/${favboards[index].board_id}/${boardName}`);
                                                    }}>
                                                        <p>{boardName}</p>
                                                        <SummaryPieCharts key={index} id={`chart ${index}`} data={boardData} boardName={boardName} tool_color={"#000"} />
                                                    </div>
                                                )
                                            })
                                        }

                                    </div >) :
                            <div className={css.favContainer}>
                                {
                                    favBoardLoading ? <MainLoader heading={"Favourite Boards"} /> : (

                                        favboards.sort((a, b) => a.time_posted - b.time_posted).map((board, index) => {

                                            return (
                                                <div
                                                    key={index}
                                                    className={css.favCard}
                                                    onClick={(e) => {
                                                        handleCick(board.board_id, board.board_name, "BoardSummary");
                                                    }}
                                                >
                                                    <span
                                                        className={css.favIcon}
                                                        onClick={(e) => {
                                                            handleDeleteClick(e, board)
                                                        }}
                                                    >
                                                        <BsTrash style={{ color: "red" }} />
                                                    </span>
                                                    <p>{board.board_name}</p>
                                                </div>
                                            );
                                        })

                                    )
                                }
                            </div>
                    }
                </div> */}



            </div >

        </>
    );
}

export default LandingPage;
