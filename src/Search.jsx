
function Search({ value, onChange }) {

  return (
    <>
      <form>

        <div className='searchField'>
          <span className='searchIcon'>🔍</span><input className='searchInput' placeholder='ex: New York, NY' />
        </div>
      </form>
    </>
  )
}

export default Search
