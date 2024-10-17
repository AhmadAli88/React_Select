// App.js
import React from 'react';
import MultiSelect from './components/MultiSelect';
import AdvancedMultiSelect from './components/AdvancedMultiSelect';
// import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">
      <h1>React Multi-Select Example</h1>
      <MultiSelect />
      <AdvancedMultiSelect/>
    </div>
  );
}

export default App;
