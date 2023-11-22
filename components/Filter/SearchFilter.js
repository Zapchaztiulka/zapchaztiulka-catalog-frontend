import { CloseIcon, SearchFilterIcon } from '@/public/icons';

const SearchFilter = ({
  handleSearch,
  removeSearchTerm,
  value,
  placeholderName,
}) => {
  return (
    <div className="filter mb-2 flex items-center gap-[10px] py-xs pl-xs border rounded-minimal border-borderDefault">
      <SearchFilterIcon className="w-[24px] h-[24px]" />
      <input
        className="text-base/[24px] placeholder:text-textInputDefault text-textPrimary focus:outline-none"
        placeholder={placeholderName}
        value={value}
        onChange={handleSearch}
      />
      {value !== '' && (
        <button className="close-btn" type="button" onClick={removeSearchTerm}>
          <CloseIcon
            className="close-icon stroke-iconPrimary"
            width="24"
            height="24"
          />
        </button>
      )}
    </div>
  );
};

export default SearchFilter
