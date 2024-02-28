import { useState } from "react";
import { axiosPrivate } from "../../api/axios";

const PrivateRequestPage = () => {
  const [events, setEvents] = useState<[]>([]);
  const getUsers = async () => {
    try {
      const response = await axiosPrivate.get("/api/v1/events");
      console.log(response.data);
      setEvents(response.data);
    } catch (err) {
      console.error(err);
    }
  };
  const handleGetUsersClick = () => {
    getUsers();
  };
  return (
    <div>
      <>
        <article>
          <h2>events List</h2>
          {events?.length ? (
            <ul>
              {events.map((user, i) => (
                <li key={i}>{i}</li>
              ))}
            </ul>
          ) : (
            <p>No events to display</p>
          )}
        </article>
        <button onClick={handleGetUsersClick}>Get Events</button>
      </>
    </div>
  );
};

export default PrivateRequestPage;
