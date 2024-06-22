import React, { useContext, useEffect, useState } from 'react'
import css from './BoardSummary.module.scss'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import MainLoader from '../loaders/MainLoader';
import TicketsTable from '../TicketsTable/TicketsTable';
import { SrdpContext } from '../Context/SrdpContext';
import Detail_view from '../DetailView/Detail_view';
import StoriesSkeletonLoading from '../StoriesSkeletonLoading/StoriesSkeletonLoading';
import pieChart from '../../../assets/pieChartOutlined.png'
import barChart from '../../../assets/barGraphOutlined.png'
import restartBlue from '../../../assets/restartBlue.png'
import lead from '../../../assets/lead2.png'
import nodata from '../../../assets/nodata.png'
import error from '../../../assets/error.svg'
import BoardTopLoader from 'react-top-loading-bar'
import moment from 'moment';
import home from '../../../assets/home.svg'
import slash from '../../../assets/slash.svg'
import downArrow from '../../../assets/downArrow.svg'
import search from '../../../assets/search.svg'
import boardIcon from '../../../assets/board.svg'


import { getSprints, getSprintMembers, getStories, past_sprint_data, getStoriesBarChartData, getSubtasks, gettopAssignee, get_project_data, get_single_barchart, findSubtask } from '../service/service';
import { MainContext } from '../../../MainContext/MainContext';

const BoardSummary = () => {
  const navigate = useNavigate()
  const { boardId, boardName } = useParams();
  const [boardSearch, setBoardSearch] = useState("")
  const { darkMode} = useContext(MainContext)

  const { membersFilter, setMembersFilter, storiesLength, setShowSelect, showSelect , activeBoards,
    setStoriesLength, setStoriesBarChart, story_points_chart,
    setStory_points_chart, rock_star, isChartLoading, setIsChartLoading,
    setRock_star, showBarGraph, setShowBarGraph, singlePieChart, setSinglePieChart, selectedSprint, setSelectedSprint,
    selectedSprintFromSummary, setSelectedSprintFromSummary, pie_loader, setPie_loader, sprints_subtasks,
    setSprints_subtasks, breadCrumbs, setBreadCrumbs, meta_data, setMeta_data, storyData,
    setStoryData, lastClosed, setLastClosed, sprintLoader, setSprintLoader, membersLoader, setMembersLoader,
    sprintMembers, setSprintMembers, sprintIdState, setSprintIdState, sprint, setSprint, storiesLoader, setStoriesLoader, stories_data, setStories_data, ac_hygine, setAc_hygine, past_sprint_heros, setPast_sprint_heros, trust_worthy, setTrust_worthy, problem_solver, setProblem_solver, project_lead, setProject_lead, boardProgress, setBoardProgress, toolTip, setToolTip, showDetails, setShowDetails
  } = useContext(SrdpContext)
  const uniqueMembers = new Set();
  const uniqueBoards = new Set();

  const filteredStories = stories_data.filter((stories) =>
    stories.assignee.toLowerCase().includes(membersFilter.toLowerCase())
  );
  const [rockstar_toolTip, setRockstar_toolTip] = useState(false)
  setStoriesLength(filteredStories.length);


  useEffect(() => {
    setBreadCrumbs({
      ...breadCrumbs, home: "home", summaryBoard: "Summary Dashboard", boardSummary: boardName
    })
    // setBoardProgress(0)
    setSprintMembers([]);
    setStories_data([]);
    getSprints(boardId, setSprintLoader, sprint, setSprint, selectedSprint, setSprintIdState, setSelectedSprint, setBreadCrumbs, setLastClosed, selectedSprintFromSummary, boardName, breadCrumbs, setTrust_worthy, setProblem_solver, setPast_sprint_heros, boardProgress, setBoardProgress);
    getSubtasks(setPie_loader, boardId, setSprints_subtasks);
    gettopAssignee(setPie_loader, boardId, setTrust_worthy, boardProgress, setBoardProgress)
    get_project_data(boardId, setProject_lead, boardProgress, setBoardProgress)
  }, [boardId, boardName]);

  useEffect(() => {
    setPast_sprint_heros([])
    if (sprint.length > 0) {
      getSprintMembers(selectedSprintFromSummary !== null ? selectedSprintFromSummary : sprint[0]?.id, setMembersLoader, setSprintMembers, setSprintIdState, sprint, setMembersFilter);
      getStories(selectedSprintFromSummary !== null ? selectedSprintFromSummary : sprint[0]?.id, setIsChartLoading, setStoriesLoader, setStories_data, setRock_star, setAc_hygine, membersFilter, storyData, setStoryData, setProblem_solver);
      past_sprint_data(lastClosed, setStoriesLoader, setPast_sprint_heros);
    }
  }, [sprint]);

  useEffect(() => {
    getStoriesBarChartData(setStoriesBarChart, setIsChartLoading, stories_data, filteredStories, selectedSprint, sprint)
    // get_single_barchart(filteredStories, setMeta_data, setStory_points_chart)
  }, [stories_data, membersFilter, selectedSprint]);
  useEffect(() => {
    setStory_points_chart([])
    setStoriesBarChart([])
    setShowDetails(false)
    setToolTip({
      trustWorthy: false,
      problemSolver: false,
      sprintHeros: false
    })
    setSelectedSprint(sprint[0]?.name)
    // console.log(flattenBoardData(DummyBoardsData), "flattenBoardData")
  }, [])

  useEffect(() => {
    console.log(sprint, "sprints data")
  }, [selectedSprint])




  return (
    <div className={css.mainContainer} id={!darkMode && css.lightMode}>
      <BoardTopLoader
        style={{ height: !darkMode ? '0.2vw' : '0.1vw' }}
        color='#4291ff'
        progress={boardProgress}
        onLoaderFinished={() => setBoardProgress(0)}
      />
      {
        breadCrumbs?.home != null && (
          <div className={css.breadCrumbs}>
            <div className={css.container}>
              {/* <span onClick={() => navigate('/')}
                style={{
                  cursor: 'pointer',
                  transition: 'background-color 0.3s', // Smooth transition effect
                }}
              >
                <img src={home} alt="" />
                <p>Home</p>
              </span> */}
              {/* {
                breadCrumbs.summaryBoard != null && (
                  <span onClick={() => navigate('/summaryDashboard')}
                    style={{
                      cursor: 'pointer',
                      transition: 'background-color 0.3s', // Smooth transition effect
                    }}>
                    <img src={slash} alt="" />
                    <p>{breadCrumbs?.summaryBoard}</p>
                    <h4>{breadCrumbs?.summaryBoard}</h4>
                  </span>
                )
              } */}
              {
                  <div className={css.boardSelect}>
                    <span onClick={() => setShowSelect(!showSelect)}>
                      {/* <img src={slash} alt="" /> */}
                      <p>{breadCrumbs?.boardSummary}</p>
                      <img src={downArrow} alt="" />
                    </span>
                    <div className={`${css.selectContainer} ${!showSelect && css.hideSelect}`} >
                      <input type="text" placeholder="Search Boards.." value={boardSearch} onChange={(e) => setBoardSearch(e.target.value)} />
                      <img src={search} alt="" />
                      <p>{
                        `${activeBoards && activeBoards?.filter((board) =>
                          board.board_name.toLowerCase().startsWith(boardSearch.toLowerCase())
                        ).length}`}
                      </p>
                      <div className={css.list}>
                        {
                          activeBoards && activeBoards?.filter((board) =>
                            board?.board_name.toLowerCase().startsWith(boardSearch?.toLowerCase())
                          ).filter((board) => {
                            // Check if the board is already in the set
                            if (uniqueBoards.has(board.board_name)) {
                              return false;
                            } else {
                              uniqueBoards.add(board.board_name);
                              return true;
                            }
                          }).map((board, index) => (
                            <div
                              key={index}
                              // id={board.board_name === boardSearch ? css.selected : null}
                              onClick={() => {
                                // console.log(board)
                                setBreadCrumbs({ ...breadCrumbs, boardSummary: board.board_name, sprint: board.sprint_name })
                                setSelectedSprintFromSummary(null)
                                setSelectedSprint(null)
                                navigate(`/mobiusIntelliBoard/BoardSummary/${board.board_id}/${board.board_name}`)
                                // navigate('/dummy')
                                setBoardSearch("")
                                setShowSelect(false)
                                setIsChartLoading(true)
                              }}
                            >
                              <p>{`${board.board_name}`}</p>
                            </div>
                          ))
                        }
                      </div>
                    </div>
                  </div>
              }
              {
                breadCrumbs.sprint != null && (
                  <span className={css.sprintBreadcrumb} >
                    <img src={slash} alt="" />
                    <p>{breadCrumbs?.sprint}</p>
                  </span>
                )
              }
              <div className={css.rightHeader}>
                <img src={slash} alt="" />
                <div>
                  {/* <img src={lead} alt="" /> */}
                  {project_lead && project_lead}
                </div>
              </div>
            </div>
          </div>
        )
      }
      <div className={css.mainContent}>
        <div className={css.left}>
          <div className={css.top}>
            <div className={css.sprintContainer}>
              <div className={css.header}>
                <span>
                  <p>All Sprints</p>
                  <p>{sprint.length}</p>
                </span>
                <div className={css.status}>
                  <span>Active</span>
                  <span>Selected</span>
                  <span>Closed</span>
                </div>
              </div>
              <div className={css.tagsContainer} id={sprintLoader ? css.loaderContainer : null}>
                {sprintLoader ?
                  <MainLoader heading={"sprints ...."} /> : (
                    sprint.length !== 0 ? (
                      sprint && sprint?.map((sprint, index) => (
                        <div
                          key={index}
                          className={`${css.tags} ${sprint.state === "closed" ? css.closed : css.active}`}
                          id={sprint.name === selectedSprint ? css.selected : null}
                          onClick={() => {
                            setSelectedSprint(sprint.name === selectedSprint ? sprint.name : sprint.name);
                            setBreadCrumbs({ ...breadCrumbs, sprint: sprint.name })
                            if (selectedSprint !== sprint.name || selectedSprint == null) {
                              getSprintMembers(sprint.id, setMembersLoader, setSprintMembers, setSprintIdState, sprint, setMembersFilter)
                              getStories(sprint.id, setIsChartLoading, setStoriesLoader, setStories_data, setRock_star, setAc_hygine, membersFilter, storyData, setStoryData, setProblem_solver)
                              // findSubtaskBysprint(sprint.id)
                              setShowBarGraph(true)
                            }
                          }}
                        >
                          {sprint.name}
                        </div>
                      ))
                    ) : (
                      <div className={css.errorContainer}>
                        No Sprints to show...
                        <img src={nodata} alt="" />
                      </div>
                    )
                  )}
              </div>

            </div>
            <div className={css.membersContainer}>
              <div className={css.header}>
                <span>
                  <p>{`${selectedSprint ? selectedSprint : ""}`}</p>
                  <p>Members</p>
                  <p>{sprintMembers?.length ? sprintMembers?.length : 0}</p>
                </span>
                <div className={css.status}>
                  <div
                    onMouseEnter={(event) => {
                      event.stopPropagation();
                      setRockstar_toolTip(true);
                    }}
                    onMouseLeave={(event) => {
                      setRockstar_toolTip(false)
                    }}
                  >
                    <p></p>
                    <p>Sprint Rockstar</p>
                    <div className={css.rockstar_toolTip} id={!rockstar_toolTip ? css.hideToolTip : null}>
                    Most story points completed in current sprint
                    </div>
                  </div>
                </div>
              </div>
              <div className={css.tagsContainer} id={membersLoader ? css.loaderContainer : null}>
                {membersLoader ?
                  <MainLoader heading={"members...."} /> : (
                    sprintMembers.length > 0 ? (
                      sprintMembers && sprintMembers.filter((members) => {
                        // Check if the board is already in the set
                        if (uniqueMembers.has(members.sprint_member_full_name)) {
                          return false;
                        } else {
                          uniqueMembers.add(members.sprint_member_full_name);
                          return true;
                        }
                      })?.map((members, index) => (
                        <div
                          key={index}
                          className={`${css.tags} ${css.membersTags}`}
                          id={members.sprint_member_full_name === membersFilter ? css.selected : null}
                          onClick={() => {
                            if (membersFilter !== members.sprint_member_full_name) {
                              setMembersFilter(members.sprint_member_full_name);
                              getStoriesBarChartData(setStoriesBarChart, setIsChartLoading, stories_data, filteredStories);
                            }
                          }}
                        >
                          {(rock_star?.some(data => data.assignee === members?.sprint_member_full_name) ? <span></span> : null)}
                          <p>{members.sprint_member_full_name}</p>
                        </div>
                      ))
                    ) : (
                      <div className={css.errorContainer}>
                        No members to show...
                        <img src={nodata} alt="" />
                      </div>
                    )

                  )}

              </div>
              {/* <img className={membersFilter != "" || storyData.story_id != "" ? css.show : css.hide} src={restartBlue} onClick={() => {
                setMembersFilter("");
                setStoryData({ original_estimate: "Select story", remaining_estimate: "Select story", time_spent: "Select story", story_reviewers: "Select story", story_id: "" });
              }} alt="" /> */}
            </div>
          </div>
          <div className={css.bottom}>
            {
              storiesLoader ?
                <StoriesSkeletonLoading storiesLength={storiesLength} /> :
                <>
                  <div className={css.StoriesHeading}>
                    <span>
                      <p>Stories</p>
                      <p>{storiesLength}</p>
                    </span>
                    {membersFilter && <div className={css.memberFilter}>
                      {membersFilter}
                      <svg
                        onClick={() => setMembersFilter("")}
                        width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        {/* <circle opacity="1" cx="8.5" cy="8" r="8" fill="#bb86fc1f" />  */}
                        <path d="M6.5 6L10.5 10" stroke="#bb86fc" stroke-linecap="round" />
                        <path d="M10.5 6L6.5 10" stroke="#bb86fc" stroke-linecap="round" />
                      </svg>
                    </div>}
                  </div>
                  <TicketsTable stories_data={filteredStories} />
                </>
            }
          </div>
        </div>
        <div className={css.right}>
          <div className={css.mainRightContent}>
            <Detail_view meta_data={meta_data} past_sprint_heros={past_sprint_heros} trust_worthy={trust_worthy} problem_solver={problem_solver} stories_data={stories_data} ac_hygine={ac_hygine} getStories={getStories} getSprintMembers={getSprintMembers} />

          </div>
        </div>
      </div>
    </div>
  )
}

export default BoardSummary