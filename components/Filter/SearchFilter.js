import theme from '@/presets';
import { CloseIcon } from 'universal-components-frontend/src/components/icons';
import { SearchIcon } from 'universal-components-frontend/src/components/icons';

const SearchFilter = ({
  handleSearch,
  removeSearchTerm,
  value,
  placeholderName,
}) => {
  return (
    <div className="filter mb-2 flex items-center gap-2 tablet600:w-[343px] tablet1024:w-full py-xs px-xs border rounded-minimal border-borderDefault">
      <div className="flex items-center w-full gap-[10px]">
        <div>
          <SearchIcon color={theme.extend.colors.iconSecondary} />
        </div>

        <div className=" relative w-full">
          <input
            className="flex-grow w-full text-base placeholder:text-textInputDefault text-textPrimary focus:outline-none"
            placeholder={placeholderName}
            value={value}
            onChange={handleSearch}
          />
          {value !== '' && (
            <button
              className=" absolute right-0 top-0"
              type="button"
              onClick={removeSearchTerm}
            >
              <CloseIcon color={theme.extend.colors.iconBrand} size="20" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchFilter;
