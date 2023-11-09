import React from 'react'

const CheckBox = ({updateFilters, country, isChecked}) => {
  return (
    <>
      <input
        type="checkbox"
        value={country}
        checked = {isChecked}
        onChange={() => updateFilters(country)}
        className="w-4 h-4 relative cursor-pointer border rounded-minimal border-borderDefault appearance-none custom-checkBox"
      />
    </>
  );
}

export default CheckBox
