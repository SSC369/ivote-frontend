import React, { useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { BiHome } from "react-icons/bi";
import { IoPeopleOutline } from "react-icons/io5";
import { MdHowToVote } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import "./style.scss";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [menu, setMenu] = useState(false);
  const navigate = useNavigate();
  return (
    <div className="header">
      <div className="logo">iVote</div>
      <ul className="menuOptions">
        <li>Home</li>
        <li onClick={() => navigate("/community/elections")}>Elections</li>
        <li onClick={() => navigate("/community/people")}>Community</li>
        <li>Profile</li>
      </ul>
      <button onClick={() => setMenu(!menu)} type="button">
        <RxHamburgerMenu />
      </button>

      {menu && (
        <ul className="menu">
          <li>
            <BiHome />
          </li>
          <li>
            <MdHowToVote onClick={() => navigate("/community/elections")} />
          </li>
          <li>
            <IoPeopleOutline onClick={() => navigate("/community/people")} />
          </li>
          <li>
            <CgProfile />
          </li>
        </ul>
      )}
    </div>
  );
};

export default Header;
