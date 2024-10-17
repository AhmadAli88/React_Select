import React, { useState, useEffect, useCallback } from 'react';
import Select from 'react-select';
import axios from 'axios';
import debounce from 'lodash.debounce'; // if install only debounce in lodash package
// import { debounce } from 'lodash';       if install lodash


const AdvancedMultiSelect = () => {
  const [options, setOptions] = useState([]); // Dynamic options
  const [selectedOptions, setSelectedOptions] = useState([]); // Selected options
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(null); // Error state
  const [searchTerm, setSearchTerm] = useState(''); // Search input

  // Fetch options from the API dynamically
  const fetchOptions = useCallback(async (query = '') => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get('https://jsonplaceholder.typicode.com/users');
      const data = response.data;

      // Filter users based on the search query (case-insensitive)
      const filteredOptions = data
        .filter((user) =>
          user.name.toLowerCase().includes(query.toLowerCase())
        )
        .map((user) => ({ value: user.id, label: user.name }));

      setOptions(filteredOptions);
    } catch (err) {
      setError('Failed to fetch options.');
    } finally {
      setLoading(false);
    }
  }, []);

  // Debounce the fetchOptions function to limit API calls while typing
  const debouncedFetchOptions = useCallback(
    debounce((query) => {
      fetchOptions(query);
    }, 500),
    [fetchOptions]
  );

  // Handle input change for searching
  const handleInputChange = (inputValue) => {
    setSearchTerm(inputValue);
    debouncedFetchOptions(inputValue); // Debounced search
  };

  // Handle selection change
  const handleChange = (selected) => {
    setSelectedOptions(selected);
  };

  // Fetch the initial options on component mount
  useEffect(() => {
    fetchOptions(); // Fetch options without any search term initially
  }, [fetchOptions]);

  return (
    <div style={{ width: '400px', margin: '50px auto' }}>
      <h3>Select Users from JSON PlaceHolder API</h3>

      {/* Multi-Select input */}
      <Select
        isMulti
        options={options}
        value={selectedOptions}
        onChange={handleChange}
        onInputChange={handleInputChange}
        isLoading={loading}
        placeholder="Search and select users..."
        noOptionsMessage={() => (searchTerm ? 'No results found' : 'Type to search')}
      />

      {/* Loading, Error, and Selected Options */}
      {loading && <p>Loading options...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {selectedOptions.length > 0 && (
        <div style={{ marginTop: '20px' }}>
          <h4>Selected Users:</h4>
          <ul>
            {selectedOptions.map((option, index) => (
              <li key={index}>{option.label}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default AdvancedMultiSelect;
