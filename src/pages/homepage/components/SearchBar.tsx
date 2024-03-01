import { useState } from "react";
import DarkModeDatepicker from "./DatePicker";
import SearchInput from "./SearchInput";

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
        <div className="mx-auto w-[60%] justify-around items-center sm:px-6 lg:px-8 flex">
          <div className="mt-8 w-full">
            <SearchInput />
          </div>
          {/* <div className="flex mt-8">
            <DarkModeDatepicker
              value={value}
              handleValueChange={handleValueChange}
            />
          </div> */}
        </div>
      </div>
    </>
  );
};

export default SearchBar;
