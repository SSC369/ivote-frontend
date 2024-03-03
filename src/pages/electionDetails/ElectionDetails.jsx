import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { GoCheckCircleFill } from "react-icons/go";
import Cookie from "js-cookie";
import toast, { Toaster } from "react-hot-toast";
import Loader from "../../components/loader/Loader";
import { FiCheck } from "react-icons/fi";
import { MdHowToVote } from "react-icons/md";
import { BsPersonRaisedHand } from "react-icons/bs";
import { IoIosClose } from "react-icons/io";
import { MdOutlineDone } from "react-icons/md";
import { LuVote } from "react-icons/lu";
import { FaChartSimple } from "react-icons/fa6";
import { LuPartyPopper } from "react-icons/lu";
import "./style.scss";
import Header from "../../components/header/Header";
import dayjs from "dayjs";
import { v4 } from "uuid";
import { FaRankingStar } from "react-icons/fa6";

const data = {
  id: "3",
  title: "Hiring Interviews",
  description: "Interview candidates for marketing manager position",
  start: "2024-03-15T10:00:00",
  end: "2024-03-15T11:30:00",
  status: "Completed",
  organization: "Global Marketing Solutions",
  candidates: ["John Smith", "Emily Johnson", "Michael Davis"],
  votes: [
    {
      candidateId: "JohnSmithID",
      voters: ["Alice", "Bob"],
    },
    {
      candidateId: "EmilyJohnsonID",
      voters: ["Charlie"],
    },
    {
      candidateId: "MichaelDavisID",
      voters: [],
    },
  ],
};

const votesDataDummy = [
  { candidateId: "candidate1", voters: ["voter1", "voter2", "voter3"] },
  { candidateId: "candidate2", voters: ["voter4", "voter5"] },
  {
    candidateId: "candidate3",
    voters: ["voter6", "voter7", "voter8", "voter9"],
  },
];

const dummyData = [
  { userId: 1, username: "user123", status: "Pending" },
  { userId: 2, username: "coolguy", status: "Eligible" },
  { userId: 3, username: "johndoe", status: "Pending" },
  { userId: 4, username: "janedoe", status: "Eligible" },
  { userId: 5, username: "testuser", status: "Pending" },
];

const ElectionDetails = () => {
  const [electionData, setElectionData] = useState(data);
  const [loading, setLoading] = useState(true);
  const [isCandidate, setIsCandidate] = useState(false);
  const { electionId } = useParams();
  const [candidates, setCandidates] = useState(dummyData);
  const [voted, setVoted] = useState(false);
  const [votesData, setVotesData] = useState(votesDataDummy);

  const getVoters = async () => {
    //get voters list from this election , if user id is in this list , he/she cant vote again
  };
  useEffect(() => {
    getVoters();
  });

  const getCandidates = async () => {
    //get election candidates , if user id from jwtToken matches from candidate Id then apply for candidate will be visible
  };
  useEffect(() => {
    getCandidates();
  });
  const navigate = useNavigate();

  const fetchElectionDetails = async () => {
    //fetch election details, candidates , votes etc
    setLoading(false);
    return;
  };
  useEffect(() => {
    fetchElectionDetails();
  }, []);

  // const adminToken = Cookie.get("adminToken")
  const adminToken = "";

  let status;
  const date1 = new Date(electionData?.start);
  const date2 = new Date(electionData?.end);
  const date = new Date();
  if (date1 > date) {
    status = "Upcoming";
  } else if (date1 <= date && date < date2) {
    status = "Ongoing";
  } else if (date > date2) {
    status = "Completed";
  }

  status = "Ongoing";

  const handleCandidate = async () => {
    // add candidate into election
    setIsCandidate(!isCandidate);
    if (!isCandidate) {
      toast.success("Candidate Registered", { duration: 1000, icon: "🔥" });
    } else {
      toast.success("Candidate unregistered", { duration: 1000 });
    }
  };

  const handleAdd = async () => {};
  const handleRemove = async () => {};

  const sorted = votesData.sort((a, b) => b.voters.length - a.voters.length);

  return (
    <>
      <Header />
      {loading ? (
        <div className="loadingContainer">
          <Loader />
        </div>
      ) : (
        <div className="detailsContainer">
          <div className="row">
            <div className="col">
              <div className="heading">
                <h1>Election Details</h1>
              </div>
              <div className="details">
                <h3>{electionData?.title}</h3>
                <p>{electionData?.description}</p>
                <div className="subDetails">
                  <span>Organisation:</span>
                  <p>{electionData.organization}</p>
                </div>
                <div className="subDetails">
                  <span>Status:</span>
                  <p>{status}</p>
                </div>

                <div className="line">
                  <div className="subDetails">
                    <span>Start date:</span>
                    <p>{dayjs(electionData.start).format("MMM D, YYYY")}</p>
                  </div>
                  <div className="subDetails">
                    <span>End date:</span>
                    <p>{dayjs(electionData.end).format("MMM D, YYYY")}</p>
                  </div>
                </div>
              </div>

              {/*only users can apply as a candidate not admin of community */}

              {!adminToken && status === "Upcoming" && (
                <div onClick={handleCandidate} className="apply">
                  {!isCandidate && (
                    <>
                      <p>Apply for candidate</p>
                      <MdHowToVote />
                    </>
                  )}

                  {isCandidate && (
                    <>
                      <p>Candidate</p>
                      <div className="success">
                        <FiCheck color="white" />
                      </div>
                    </>
                  )}
                </div>
              )}

              {status === "Completed" && (
                <div
                  onClick={() =>
                    navigate(`/election/results/${electionData.id}`)
                  }
                  className="apply"
                >
                  <p>View Results</p>
                  <FaRankingStar />
                </div>
              )}

              {status === "Ongoing" && !voted && !adminToken && (
                <>
                  <div
                    onClick={() => navigate(`/poll/${electionData.id}`)}
                    className="apply"
                  >
                    <p>Vote</p>
                    <FaChartSimple />
                  </div>
                  <div className="msg">
                    <p>Cast your vote</p>
                    <LuVote />
                  </div>
                </>
              )}

              {status === "Ongoing" && voted && !adminToken && (
                <>
                  <div className="apply">
                    <p>Voted</p>
                    <div className="success">
                      <FiCheck color="white" />
                    </div>
                  </div>
                  <div className="msg">
                    <p>Thanks for Voting </p>
                    <LuPartyPopper />
                  </div>
                </>
              )}

              {status === "Upcoming" && adminToken && (
                <div className="requests">
                  <p className="head">Candidate Requests</p>
                  <ul>
                    {candidates.map((i) => {
                      return (
                        <li key={i.userId} className="request">
                          <p>{i.username}</p>
                          <div>
                            <div onClick={handleAdd} className="right">
                              <MdOutlineDone />
                            </div>
                            <div onClick={handleRemove} className="wrong">
                              <IoIosClose />
                            </div>
                          </div>
                        </li>
                      );
                    })}
                    {/* render candidates with status pending */}
                  </ul>
                </div>
              )}
            </div>

            <div className="col">
              <div className="heading">
                <h1>Candidates</h1>
              </div>
              <ul className="candidates">
                {electionData?.candidates.map((i) => {
                  return (
                    <li className="candidate" key={v4()}>
                      <BsPersonRaisedHand />
                      <h4>{i}</h4>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>

          {adminToken && status === "Ongoing" && (
            <>
              <h1>Live Results</h1>
              <ul className="live">
                {sorted.map((c, i) => {
                  return (
                    <li key={v4()}>
                      <span>{i + 1}:</span>
                      <p>{c.candidateId}</p>
                      {"-"}
                      <p>
                        <span>{c.voters.length} </span>Votes
                      </p>
                    </li>
                  );
                })}
              </ul>
            </>
          )}
        </div>
      )}
      <Toaster position="top-center" reverseOrder={false} />
    </>
  );
};

export default ElectionDetails;
