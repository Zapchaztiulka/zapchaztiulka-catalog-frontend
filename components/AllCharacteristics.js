

const AllCharacteristics = ({
  isOpen,
   toggle }) => {
   
  return (
    <>
      <div className="characteristic">
            <span className="characteristic-label">Вага (кг):</span>
            <span className="characteristic-value">nnn</span>
          </div>
          <div className="characteristic">
            <span className=" characteristic-label">Код:</span>
            <span className="characteristic-value">bbb</span>
          </div>
          <div className="characteristic">
            <span className="characteristic-label">Виробник:</span>
            <span className="characteristic-value">
              ddd
            </span>
          </div>
          <div className="characteristic">
            <span className="characteristic-label">Країна:</span>
            <span className="characteristic-value">ddd</span>
          </div>
    </>
  )
}

export default AllCharacteristics
