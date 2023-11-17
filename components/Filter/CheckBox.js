
const CheckBox = ({ handleOnChange, country, countryArray}) => {
  const checked = countryArray?.includes(country)

  return (
    <>
      <input
        type="checkbox"
        name={country}
        value={country}
        checked={checked}
        onChange={handleOnChange}
        className="w-4 h-4 relative cursor-pointer border rounded-minimal border-borderDefault appearance-none custom-checkBox"
      />
    </>
  );
};

export default CheckBox
