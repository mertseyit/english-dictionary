import React, { useState, useContext } from 'react'
import search_icon from '../assets/icons/search.svg'
import { SearchContext } from '../contexts/SearchContext'
const SearchInput = () => {
  const { searchInput, setSearchInput, responseError } = useContext(SearchContext)
  const [word, setWord] = useState("")
  return (
    <div className='flex items-center justify-start gap-3 sticky top-2  z-20 '>
      <input  value={word} onChange={(e) => setWord(e.target.value)} typeof='submit' type="text" placeholder='Enter a word' className='text-lg px-3 py-2 lg:w-1/3 md:w-full w-full rounded-md shadow-md border-2 border-blue-400 font-semibold bg-white' />
      <button disabled={word === ""} onClick={() => {
        setSearchInput(word) 
        setWord("")
      }} className='bg-white p-2 rounded-lg border-2 border-blue-400'>
        <img src={search_icon} alt="Search Icon" className='w-8'/>
      </button>
    </div>
  )
}

export default SearchInput