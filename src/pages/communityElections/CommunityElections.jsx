import React from "react";
import Elections from "../../components/elections/Elections";
import Header from "../../components/header/Header";
import "./style.scss";

const dummyElectionData = [
  {
    id: "11",
    title: "Presidential Election",
    description: "Election to choose the next president of the country",
    start: "2024-11-01",
    end: "2024-11-30",
    status: "ongoing",
    organisation: "National Electoral Commission",
    candidates: [
      { id: 1, name: "John Doe", party: "Red Party" },
      { id: 2, name: "Alice Smith", party: "Blue Party" },
      { id: 3, name: "Bob Johnson", party: "Green Party" },
    ],
  },
  {
    id: "14",
    title: "Mayoral Election",
    description: "Election to choose the mayor of the city",
    start: "2024-10-15",
    end: "2024-11-15",
    status: "ongoing",
    organisation: "City Electoral Commission",
    candidates: [
      { id: 4, name: "Emily Brown", party: "Yellow Party" },
      { id: 5, name: "Michael Lee", party: "Purple Party" },
    ],
  },
  {
    id: "12",
    title: "Senate Election",
    description: "Election to choose senators for the state",
    start: "2024-12-01",
    end: "2024-12-31",
    status: "ongoing",
    organisation: "State Electoral Commission",
    candidates: [
      { id: 6, name: "Sarah Johnson", party: "Orange Party" },
      { id: 7, name: "David Wilson", party: "Black Party" },
    ],
  },
];

const CommunityElections = () => {
  return (
    <div className="communityElections">
      <Header />
      <h2>
        Community <span>Elections</span>
      </h2>
      <Elections data={dummyElectionData} />
    </div>
  );
};

export default CommunityElections;
