import React, { useEffect, useState } from "react";
import "./style.scss";
import { CgProfile } from "react-icons/cg";
import Header from "../../components/header/Header";
import Loader from "../../components/loader/Loader";
import { v4 } from "uuid";

const userData = [
  { username: "user1", email: "user1@example.com" },
  { username: "user2", email: "user2@example.com" },
  { username: "Sai charan", email: "user3@example.com" },
];

const CommunityPeople = () => {
  const [organizationPeople, setOrganizationPeople] = useState(userData);
  const [loading, setLoading] = useState(true);

  const getUserCommunityPeople = async () => {
    setLoading(false);
  };

  useEffect(() => {
    getUserCommunityPeople();
  }, []);

  return (
    <>
      <Header />
      {loading ? (
        <div className="loadingContainer">
          <Loader />
        </div>
      ) : (
        <div className="people">
          <h1>Community users</h1>
          <ul className="usersContainer">
            {organizationPeople?.map((i) => {
              return (
                <li key={v4()}>
                  <CgProfile />
                  <p>{i.username}</p>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </>
  );
};

export default CommunityPeople;
