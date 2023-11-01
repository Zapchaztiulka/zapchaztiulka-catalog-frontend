import { ArrowLeft, CloseIcon } from "@/public/icons";
import SubCategory from "../Category/SubCategory";

const SideBarSubCategory = ({
  show,
  setShow,
  index,
  categories,
  closeCategory,
  lengthSubCategory,
  clickBySubCategory
}) => {

  const goBackCategory = () => {
    setShow(!show);
  };

  const visibleStyle = {
    opacity: `${show ? "1" : "0"}`,
    top: ` ${show > 0 ? "0" : "-100%"}`,
    left: `${show > 0 ? "0" : "0"}`,
  };

  return (
    <>
      {lengthSubCategory > 0 && (
        <div
          className={`${
            show
              ? "flex flex-col fixed w-full min-h-screen bg-bgWhite px-s py-m"
              : "hidden"
          }`}
          style={visibleStyle}
        >
          <div className="flex justify-between items-center mb-9">
            <h3 className="text=lg text-textPrimary font-medium">
              {categories.categoryName}
            </h3>
            <button onClick={closeCategory}>
              <CloseIcon
                width="34"
                height="34"
                className="stroke-iconPrimary"
              />
            </button>
          </div>
          <button
            onClick={goBackCategory}
            className="flex items-center mb-8 text-base text-textBrand font-medium tracking-textBase"
          >
            <ArrowLeft width="24" height="24" className="stroke-iconBrand" />
            <p>Усі категорії</p>
          </button>
          <SubCategory categories={categories} index={index} clickBySubCategory={clickBySubCategory} />
        </div>
      )}
    </>
  );
};

export default SideBarSubCategory;
