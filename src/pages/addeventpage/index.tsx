import { useNavigate } from "react-router-dom";

const AddEventPage = () => {
  const navigate = useNavigate();

  return (
    <div>
      AddEventPage
      <div>
        <button
          className="bg-slate-500"
          onClick={() => {
            navigate("/eventgroup");
          }}
        >
          Publish event
        </button>
      </div>
    </div>
  );
};

export default AddEventPage;
