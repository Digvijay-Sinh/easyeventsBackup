import { useState } from "react";
import DarkModeDatepicker from "./DatePicker";
import SearchInput from "./SearchInput";

const SearchBar = () => {
  const [value, setValue] = useState({
    startDate: new Date(),
  });

  const handleValueChange = (newValue) => {
    console.log("newValue:", newValue);
    setValue(newValue);
  };

  return (
    <>
      <div>
        <div className="mx-auto w-[80%] justify-around items-center sm:px-6 lg:px-8 flex flex-col sm:flex-row">
          <div className="mt-8 w-full">
            <SearchInput />
          </div>
          <div className="flex mt-4 sm:mt-8  sm:pl-3 lg:pl-3 ">
            <DarkModeDatepicker
              placeholder="Start date - End date"
              value={value}
              handleValueChange={handleValueChange}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchBar;
