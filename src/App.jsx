import React from "react";
import { Route, Routes } from "react-router-dom";
import CommunityRegister from "./pages/communityRegister/CommunityRegister";
import Register from "./pages/signup/SignUp";
import Login from "./pages/signin/SignIn";
import Poll from "./pages/poll/Poll";
import CommunityHome from "./pages/communityHome/CommunityHome";
import CommunityElections from "./pages/communityElections/CommunityElections";
import CommunityPeople from "./pages/communityPeople/CommunityPeople";
import ElectionDetails from "./pages/electionDetails/ElectionDetails";
import ElectionResults from "./pages/electionResults/ElectionResults";

const App = () => {
  return (
    <div className="light">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/community/register" element={<CommunityRegister />} />
        <Route
          path="/election/results/:electionId"
          element={<ElectionResults />}
        />
        <Route path="/community/people" element={<CommunityPeople />} />
        <Route path="/community" element={<CommunityHome />} />
        <Route path="/community/elections" element={<CommunityElections />} />
        <Route path="/election/:electionId" element={<ElectionDetails />} />
        <Route path="/poll/:electionId" element={<Poll />} />
      </Routes>
    </div>
  );
};

export default App;
