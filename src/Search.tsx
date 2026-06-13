import { useEffect, useState } from 'react';
import { GPSCoordinatesType, GeocodingAPIResponseType, GeocodingData, GeocodingProperties } from './interfaces';

type searchProp = {
  searchError: string | null;
  setSearchError: React.Dispatch<React.SetStateAction<string | null>>;
  setGpsCoord: React.Dispatch<React.SetStateAction<GPSCoordinatesType | null>>
  setDisplayLocation: React.Dispatch<React.SetStateAction<string | null>>
}

const Search = ({ searchError, setSearchError, setGpsCoord, setDisplayLocation }: searchProp): JSX.Element => {
  // searchValue: value of input field. It cannot be null, so default is ''.
  const [searchValue, setSearchValue] = useState<string>('');
  const [suggestions, setSuggestions] = useState<GeocodingData[]>([]);//string[]>([]);
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // pressing 'Enter' will select the first suggestion for weather search
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault()
    if (suggestions.length > 0) {
      handleSelectAddress(suggestions[0].properties);
    }
  }

  useEffect(() => { 
    if (searchValue.trim().length < 2 || !isSearching) {
      setSuggestions([]);
      setSearchError(null);
      return;
    }
    
    const delay = 150;

    const delayDebounceFn = setTimeout(async () => { 
      try {
        setIsLoading(true);
        const response = await fetch(`/api/geocoding?location=${searchValue}`);
        const data: GeocodingAPIResponseType = await response.json();
        const features = data.features || [];
        setSuggestions(features);

        if (features.length === 0) {
          setSearchError('No results found');
        } else {
          setSearchError(null);
        }
      } catch (error) {
        console.error("Error fetching addresses:", error);
      } finally {
        setIsLoading(false);
      }
    }, delay);

    // If searchValue changes before the 150ms, cancel the previous timer
    return () => clearTimeout(delayDebounceFn);

  }, [searchValue]);

  const handleReset = () => {
    // Clearing searchValue will trigger the useEffect, which will hit the guard
    // clause and call setSuggestion([]);
    setSearchValue('');
    setSearchError(null);
  };

  const handleSearchTyping = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
    setIsSearching(true);
  };

  // City/address is saved in state for UI display, 
  // GPS coord are saved in state for weather search.
  const handleSelectAddress = (locationData: GeocodingProperties) => {
    const { city, address_line1, state_code, country, lat, lon } = locationData;
    const cityDisplay = 
      `${city ? city : address_line1}, ${state_code ? state_code : ''}, ${country}`;

    setDisplayLocation(cityDisplay);
    setGpsCoord({ latitude: lat, longitude: lon });
    setSearchValue(cityDisplay);
    setSuggestions([]);
    setIsSearching(false); 
  };

  return (
    <>
      <form id='searchForm' onSubmit={handleSubmit}>
        <div className='searchContainer'>
          <span className='searchIcon'>🔍</span>
            <input 
              type='text'
              placeholder='Search city...' 
              value={searchValue}
              onChange={(e) => handleSearchTyping(e)}
              id='searchInput' 
            />
          <span className='searchReset'>{searchValue && <button type='button' onClick={handleReset}>X</button>}</span>         
        </div>
        <div className='searchSuggestions'>
          {isLoading && searchValue.trim().length >=2 && (
            <ul className='dropdown'>
              <li className='autocompleteOptions'>Searching...</li>
            </ul>
          )}
          {!isLoading && suggestions.length > 0 && (
            <ul className='dropdown'>
              {suggestions.map((feature, i) => {
                const { city, address_line1, state_code, country } = feature.properties;
                return (
                  <li 
                    className='autocompleteOptions' 
                    key={i} 
                    onClick={() => handleSelectAddress(feature.properties)}
                  >
                    📍 {city ? `${city}, ` :  `${address_line1}, `}
                    {state_code ? `${state_code}, ` : ''}
                    {country}
                  </li>
                );
              })}
            </ul>
          )}
        </div>
        <p className={`error-message ${searchError && isLoading ? 'visible' : ''}`}>{searchError}</p>
      </form>
    </>
  )
}

export default Search
