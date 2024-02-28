import { useNavigate } from "react-router-dom";

const EventPage = () => {
  const navigate = useNavigate();

  return (
    <div>
      EventPage
      <div>
        <button
          className="bg-slate-500"
          onClick={() => {
            navigate("/login");
          }}
        >
          Book ticket
        </button>
      </div>
    </div>
  );
};

export default EventPage;
