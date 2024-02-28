import { useState } from "react";
import Datepicker from "react-tailwindcss-datepicker";

const SearchBar = () => {
  const [value, setValue] = useState({
    startDate: new Date(),
    endDate: new Date().setMonth(11),
  });

  const handleValueChange = (newValue) => {
    console.log("newValue:", newValue);
    setValue(newValue);
  };

  return (
    <>
      <div>
        <div className="mx-auto w-[60%  ] justify-around items-center sm:px-6 lg:px-8 flex">
          <form action="/search">
            <label
              className="mx-auto mt-8 relative bg-white min-w-sm max-w-2xl flex flex-col md:flex-row items-center justify-center border rounded-2xl gap-2 shadow-2xl focus-within:border-gray-300"
              htmlFor="search-bar"
            >
              <input
                id="search-bar"
                placeholder="your keyword here"
                name="q"
                className="px-6 py-2 w-full rounded-md flex-1 outline-none bg-white"
                required
              />
              <button
                type="submit"
                className="w-full md:w-auto rounded-2xl px-6 py-3 bg-black border-black text-white fill-white active:scale-95 duration-100 border will-change-transform overflow-hidden relative  transition-all"
              >
                <div className="flex items-center transition-all opacity-1">
                  <span className="text-sm font-semibold whitespace-nowrap truncate mx-auto">
                    Search
                  </span>
                </div>
              </button>
            </label>
          </form>
          <div className="flex mt-8">
            <Datepicker
              value={{
                startDate: value.startDate,
                endDate: new Date(value.endDate),
              }}
              onChange={handleValueChange}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchBar;
