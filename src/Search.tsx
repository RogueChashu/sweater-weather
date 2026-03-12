import { useState } from 'react'

type searchProp = {
  onSearch: (searchTerm: string ) => void; // ex: 'New York'. Even GPS coords are string type as they
}                                          // come out of <input>. They are processed and typed as number inside onSearch.

const Search = ({ onSearch }: searchProp): JSX.Element => {
  const [searchValue, setSearchValue] = useState('')

  const handleSummit = (e: React.FormEvent<HTMLFormElement>): void => { // feeds the search term to the form
    e.preventDefault()
    onSearch(searchValue)
  }

  const handleSearchValueChange = (e: React.ChangeEvent<HTMLInputElement>): void => { // handles the search display change
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
