import React from "react";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

const cities = [
  'Abottabad',
  'Ahmedpur East',
  'Attock',
  'Bahawalnagar',
  'Bahawalpur',
  'Chakwal',
  'Dera Ghazi Khan',
  'Dera Ismail Khan',
  'Faisalabad',
  'Gilgit',
  'Gojra',
  'Gujar Khan',
  'Gujranwala',
  'Gujranwala Cantonment',
  'Gujrat',
  'Islamabad',
  'Jacobabad',
  'Lahore',
  'Larkana',
  'Mansehra',
  'Multan',
  'Sahiwal',
  'Sargodha',

];

const MyAutocomplete = ({ onSelectCity }) => {
  return (
    <Autocomplete
      id="city-autocomplete"
      options={cities}
      getOptionLabel={(option) => option}
      style={{ width: 300 }}
      onChange={(event, newValue) => onSelectCity(newValue)}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Select a City"
          variant="outlined"
          placeholder="Start typing..."
        />
      )}
    />
  );
};

export default MyAutocomplete;
