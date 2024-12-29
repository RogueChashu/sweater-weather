import { useState } from 'react'

function Search({ onSearch }) {
  const [searchValue, setSearchValue] = useState('')

  const handleSummit = (e) => {
    e.preventDefault()
    onSearch(searchValue)
  }

  const handleSearchValueChange = (e) => {
    setSearchValue(e.target.value)
  }

  return (
    <>
      <form className='searchForm' onSubmit={handleSummit}>
        <div className='searchContainer'>
          <span className='searchIcon'>🔍</span>
            <input 
              type='search'
              value={searchValue} 
              onChange={handleSearchValueChange} 
              className='searchInput' 
              placeholder='ex: New York, NY' 
            />
        </div>
      </form>
    </>
  )
}

export default Search
