
const CheckBox = ({
  filterName,
  isChecked,
  isDisabled,
  handleOnChange,
}) => {
  return (
    <>
      <input
        type="checkbox"
        name={filterName}
        value={filterName}
        checked={isChecked}
        onChange={handleOnChange}
        disabled={isDisabled}
        className="w-4 h-4 relative cursor-pointer border rounded-minimal border-borderDefault appearance-none custom-checkBox"
      />
    </>
  );
};

export default CheckBox
