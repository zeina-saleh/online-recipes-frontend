import React from 'react'
import Select from 'react-select'
import { useState } from 'react';

const SelectMenu = ({isMulti, options}) => {

      const [selectedOption, setSelectedOption] = useState(null);
  return (
    <div>
        <Select 
        isMulti={isMulti} 
        isSearchable={true} 
        placeholder={'select from menu'}
        defaultValue={selectedOption}
        onChange={setSelectedOption}
        options={options}/>
    </div>
  )
}

export default SelectMenu