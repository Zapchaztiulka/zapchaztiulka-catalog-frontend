
const CheckBox = ({
  handleOnChange,
  filterName,
  filtersArray,
  index,
  comparisonResults,
}) => {
  const checked = filtersArray?.includes(filterName);
  

  return (
    <>
      <input
        type="checkbox"
        name={filterName}
        value={filterName}
        checked={checked}
        onChange={handleOnChange}
        disabled={comparisonResults}
        className="w-4 h-4 relative cursor-pointer border rounded-minimal border-borderDefault appearance-none custom-checkBox"
      />
    </>
  );
};

export default CheckBox
