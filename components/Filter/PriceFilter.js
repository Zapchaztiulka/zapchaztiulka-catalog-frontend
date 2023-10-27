import { ArrowDown, ArrowUp } from "@/public/icons";
import { filterProductsMax, filterProductsMin } from "@/redux/filterSlice";
import { selectFilter } from "@/redux/products/productsSelectors";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const PriceFilter = () => {
      const [isOpen, setIsOpen] = useState(true);
    const toggle = () => {
    setIsOpen(!isOpen);
  };

 const dispatch = useDispatch();
   const { minPrice, maxPrice } = useSelector(selectFilter)

   const getFiltredMin = event => {
      dispatch(filterProductsMin(event.target.value));
   }

    const getFiltredMax = event => {
      dispatch(filterProductsMax(event.target.value));
    }

  return (
    <div>
      {!isOpen ? (
        <div className="flex justify-between items-center p-xs3 mb-xs2">
          <div className="font-lg text-textPrimary font-medium">Ціна</div>
          <button
            type="button"
            onClick={toggle}
            className="flex items-center cursor-pointer border-none"
          >
            <ArrowDown className="w-[24px] h-[24px] stroke-iconSecondary fill-none" />
          </button>
        </div>
      ) : (
        <>
          <div className="flex justify-between items-center p-xs3 mb-xs2">
            <div className="font-lg text-textPrimary font-medium">Ціна</div>
            <button
              type="button"
              onClick={toggle}
              className="flex items-center justify-between cursor-pointer border-none"
            >
              <ArrowUp className="w-[24px] h-[24px] stroke-iconPrimary fill-none" />
            </button>
          </div>

          <div>
            <form className="flex gap-xs2 items-center">
              <input
                className="price-input"
                value={minPrice || 0}
                onChange={getFiltredMin}
                placeholder="0"
              />
              <p>—</p>
              <input
                className="price-input"
                value={maxPrice || 0}
                onChange={getFiltredMax}
                placeholder="0"
              />
              <button className="cursor-pointer bg-bgGreyLigth text-textBrand hover:bg-bgPressedGrey border border-borderDefault rounded-minimal p-xs">
                OK
              </button>
            </form>
          </div>
        </>
      )}
    </div>
  );
};

export default PriceFilter;
