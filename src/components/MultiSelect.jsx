// MultiSelect.js
import React, { useState } from 'react';
import Select from 'react-select';

const MultiSelect = () => {
  // Initial options
  const options = [
    { value: 'apple', label: 'Apple' },
    { value: 'orange', label: 'Orange' },
    { value: 'banana', label: 'Banana' },
    { value: 'grape', label: 'Grape' },
    { value: 'mango', label: 'Mango' },
    { value: 'pineapple', label: 'Pineapple' },
    { value: 'strawberry', label: 'Strawberry' },
  ];

  // State to store selected options
  const [selectedOptions, setSelectedOptions] = useState([]);

  // Handle the change event when options are selected
  const handleChange = (selected) => {
    setSelectedOptions(selected);
  };

  // Handle submit action (e.g., display selected values)
  const handleSubmit = () => {
    if (selectedOptions.length > 0) {
      const selectedValues = selectedOptions.map(option => option.value);
      alert(`You have selected: ${selectedValues.join(', ')}`);
    } else {
      alert('No options selected.');
    }
  };

  return (
    <div style={{ width: '400px', margin: '50px auto' }}>
      <h3>Select Fruits</h3>

      {/* Multi-Select input using react-select */}
      <Select
        isMulti
        name="fruits"
        options={options}
        className="basic-multi-select"
        classNamePrefix="select"
        placeholder="Select fruits..."
        value={selectedOptions}
        onChange={handleChange}
      />

      <div style={{ marginTop: '20px' }}>
        <button onClick={handleSubmit} style={{ padding: '10px 20px', cursor: 'pointer' }}>
          Submit
        </button>
      </div>

      {/* Display selected options */}
      {selectedOptions.length > 0 && (
        <div style={{ marginTop: '20px' }}>
          <h4>Selected Fruits:</h4>
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

export default MultiSelect;
