import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { RiCloseLine } from "react-icons/ri";
import { IoIosAddCircleOutline } from "react-icons/io";
import Header from "../../components/header/Header";
import dayjs from "dayjs";
import "./style.scss";
import { useNavigate } from "react-router-dom";

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
    organisation: "National Electoral Commission",
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
    organisation: "National Electoral Commission",
    candidates: [
      { id: 6, name: "Sarah Johnson", party: "Orange Party" },
      { id: 7, name: "David Wilson", party: "Black Party" },
    ],
  },
];

const CommunityHome = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    start: "",
    end: "",
  });
  const [electionsData, setElectionsData] = useState(dummyElectionData);

  const [showForm, setShowForm] = useState(false);
  useEffect(() => {
    //fetch all elections data
  }, []);
  const navigate = useNavigate();
  const formValidation = () => {
    const { title, description, start, end } = formData;
    if (!title) {
      toast.error("Title is required!", { duration: 1000 });
      return false;
    } else if (!description) {
      toast.error("Description is required", { duration: 1000 });
      return false;
    } else if (!start) {
      toast.error("Start date is required", { duration: 1000 });
      return false;
    } else if (!end) {
      toast.error("End date is required", { duration: 1000 });
      return false;
    }

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formValidation()) {
      const date1 = new Date(formData.start);
      const date2 = new Date(formData.end);
      if (date1 >= date2) {
        toast.error("Improper Schedule!", { duration: 1000 });
        return false;
      }

      //get organisation id  from organisation admin jwtToken
      //status will be upcoming , if start date === present data, status will be ongoing , no need to add status in db because with start and end dates we can update status in components
      const currentDate = new Date();
      let status;
      if (date1 >= currentDate) {
        status = "ongoing";
      }
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <>
      <Header />
      <div className="community">
        <ul className="elections">
          {electionsData.map((item) => (
            <li key={item.id}>
              <h1>{item.title}</h1>
              <p>{item.description}</p>
              <div className="col">
                <span>Organisation:</span>
                <p>{item.organisation}</p>
              </div>
              <div className="col">
                <span>Status:</span>
                <p>{item.status}</p>
              </div>
              <div className="row">
                <div className="col">
                  <span>Start date:</span>
                  <p>{dayjs(item.start).format("MMM D, YYYY")}</p>
                </div>
                <div className="col">
                  <span>End date:</span>
                  <p>{dayjs(item.end).format("MMM D, YYYY")}</p>
                </div>
              </div>
              <button
                onClick={() => navigate(`/election/${item.id}`)}
                type="button"
              >
                View
              </button>
            </li>
          ))}
        </ul>
        {!showForm && (
          <div className="add">
            <IoIosAddCircleOutline onClick={() => setShowForm(true)} />
            <h4 className="">Create an election</h4>
          </div>
        )}
        {showForm && (
          <div className="modal">
            <RiCloseLine onClick={() => setShowForm(false)} />
            <form onSubmit={handleSubmit}>
              <div className="inputContainer">
                <label htmlFor="name">Election Name</label>
                <input
                  onChange={handleChange}
                  value={formData.title}
                  name="title"
                  id="name"
                  type="text"
                />
              </div>
              <div className="inputContainer">
                <label htmlFor="description">Description</label>
                <input
                  onChange={handleChange}
                  value={formData.description}
                  name="description"
                  id="description"
                  type="text"
                />
              </div>
              <div className="inputContainer">
                <label htmlFor="start">Start</label>
                <input
                  onChange={handleChange}
                  value={formData.start}
                  name="start"
                  id="start"
                  type="datetime-local"
                />
              </div>
              <div className="inputContainer">
                <label htmlFor="end">End</label>
                <input
                  onChange={handleChange}
                  value={formData.end}
                  name="end"
                  id="end"
                  type="datetime-local"
                />
              </div>

              <button type="submit">Submit</button>
            </form>
          </div>
        )}
      </div>
      <Toaster position="top-center" reverseOrder={false} />
    </>
  );
};

export default CommunityHome;
