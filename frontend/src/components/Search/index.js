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
      setSearchResults(data.entries)
      return data
  }

  return (
    <div className="flex flex-col items-center mb-[600px]" style={{ whiteSpace: 'pre-line' }}>
        <form onSubmit={handleSubmit} className="flex flex-col items-center mt-8">
        <label className="w-full">
            Enter a keyword:
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              required
              className="h-10 border border-grey-500 px-4 w-full mb-4"
              placeholder="example: fractions"
            />
          </label>
          <button className="group relative flex w-full justify-center rounded-md border border-transparent bg-slate-600 py-2 px-4 text-sm font-medium text-white hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2" type="submit">Search</button>
        </form>
        {searchResults && searchResults.map((result) => {
            return <div>
                <p className="px-10 py-20 border-b border-grey-500 lg:px-[300px]">{result.response}</p>
              </div>
          })}
   </div>
  );
}


export default Search;