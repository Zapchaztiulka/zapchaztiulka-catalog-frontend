
import theme from '@/presets';
import { CloseIcon } from 'universal-components-frontend/src/components/icons';
import {SearchIcon} from 'universal-components-frontend/src/components/icons';

const SearchFilter = ({
  handleSearch,
  removeSearchTerm,
  value,
  placeholderName,
}) => {
  return (
    <div    
      className="filter mb-2 flex items-center gap-[10px] tablet600:w-[343px] tablet1024:w-full py-xs px-xs border rounded-minimal border-borderDefault"
    >
      <SearchIcon color={theme.extend.colors.iconSecondary} />
      <div className="flex justify-between w-full ">
              <input
        className="text-base/[24px] placeholder:text-textInputDefault text-textPrimary focus:outline-none"
        placeholder={placeholderName}
        value={value}
        onChange={handleSearch}
      />
      {value !== '' && (
        <button className="close-btn" type="button" onClick={removeSearchTerm}>
          <CloseIcon
              color={theme.extend.colors.iconBrand}
              size="20"
          />
        </button>
      )}
      </div>

    </div>
  );
};

export default SearchFilter
