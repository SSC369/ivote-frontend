import React, { useEffect, useState } from "react";
import "./style.scss";
import { useNavigate, useParams } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { v4 } from "uuid";
import Header from "../../components/header/Header";
import Timer from "../../components/timer/Timer";

const electionDetailsDummy = {
  id: "11",
  title: "Presidential Election",
  description: "Election to choose the next president of the country",
  start: "2024-11-01",
  end: "2024-11-30",
  status: "ongoing",
  organisation: "National Electoral Commission",
  candidates: [
    {
      id: "1",
      name: "John Doe",
      party: "Red Party",
      age: 30,
      education: "Msc arts",
    },
    {
      id: "2",
      name: "Alice Smith",
      party: "Blue Party",
      age: 30,
      education: "Msc biology",
    },
    {
      id: "3",
      name: "Bob Johnson",
      party: "Green Party",
      age: 30,
      education: "Msc physics",
    },
  ],
};

const Poll = () => {
  const [voted, setVoted] = useState("");
  const [electionDetails, setElectionDetails] = useState(electionDetailsDummy);
  const { electionId } = useParams();
  const navigate = useNavigate();

  //fetch elections details and candidates details

  useEffect(() => {}, []);

  const handleVote = async () => {
    // add vote in db
    const res = true;
    if (res) {
      toast.success("Voted Successfully", { duration: 1000 });
    } else {
      toast.error("Something went wrong!", { duration: 1000 });
    }
    setVoted("");
    setTimeout(() => {
      navigate("/community/elections", { replace: true });
    }, 1000);
  };

  return (
    <>
      <Header />
      <div className="container">
        <div className="pollContainer">
          <h1> Voting panel</h1>

          <ul className="candidates">
            {electionDetails.candidates.map((c, i) => {
              return (
                <li className="candidate" key={v4()}>
                  <div className="row">
                    <input
                      onChange={(e) => {
                        setVoted(e.target.value);
                      }}
                      checked={voted === c.id}
                      name="candidate"
                      value={c.id}
                      type="radio"
                    />
                    <h4>{c.name}</h4>
                  </div>

                  <div className="row">
                    <p>{c.party}</p>
                  </div>
                </li>
              );
            })}
          </ul>
          <button
            onClick={handleVote}
            className={voted ? "vote" : "disable" + " " + "vote"}
          >
            Vote
          </button>
        </div>

        <Timer targetDate={electionDetails.end} />
      </div>
      <Toaster position="top-center" reverseOrder={false} />
    </>
  );
};

export default Poll;
