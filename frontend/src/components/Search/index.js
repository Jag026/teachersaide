import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as sessionActions from "../../store/session";
import { csrfFetch } from '../../store/csrf.js';

function Search() {
  const [searchResults, setSearchResults] = useState("")
  const [topic, setTopic] = useState("")
  const dispatch = useDispatch();

 const handleSubmit = async(e) => {
    e.preventDefault();

    const response = await csrfFetch("/api/search/topics", {
        method: "POST",
        body: JSON.stringify({
            topic
          }),
      });
      const data = await response.json();
      console.log(data.entries);
      setSearchResults(JSON.stringify(data.entries))
      return data
  }

  return (
    <div className="flex flex-col items-center" style={{ whiteSpace: 'pre-line' }}>
        <form onSubmit={handleSubmit} className="flex flex-col items-center mt-8">
        <label className="w-full">
            Enter a keyword:
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              required
              className="h-10 border border-grey-100 px-4 w-full mb-4"
              placeholder="example: 10th"
            />
          </label>
            <button type="submit">Search</button>
        </form>
        {searchResults && <p className="px-10 lg:px-[300px]">{searchResults}</p>}
   </div>
  );
}


export default Search;