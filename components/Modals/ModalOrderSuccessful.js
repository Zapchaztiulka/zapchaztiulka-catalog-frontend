import Modal from '../Modal';
import { useContext } from 'react';
import { StatusContext } from '@/context/statusContext';
import { CheckCircleIcon } from 'universal-components-frontend/src/components/icons';

const ModalOrderSuccessful = ({ onClose, hideCloseBtn, availability }) => {
  const {
    showModalOrderSuccessful,
    setShowModalOrderSuccessful,
    resetLocalStorage,
    backToHomeUrl,
  } = useContext(StatusContext);

  const handleClickOrderSuccessful = async event => {
    setShowModalOrderSuccessful(!showModalOrderSuccessful);
    if (typeof window !== 'undefined') {
      resetLocalStorage();
      backToHomeUrl();
    }
    document.body.classList.remove('stop-scrolling');
  };

  return (
    <Modal onClose={onClose} hideCloseBtn={hideCloseBtn}>
      <div
        className="flex flex-col items-center justify-center px-[16px] py-[24px] mobile320:h-[278px] desktop1440:h-[380px] 
                mobile320:w-[290px] mobile375:w-[345px] mobile480:w-[432px] tablet600:w-[345px] desktop1440:w-[680px]"
      >
        <div className="flex items-center justify-center mobile320:mb-[16px] desktop1440:mb-[8px] w-[59px] h-[59px] bg-bgSuccessLight: rounded-[50%]">
          <div className="flex items-center justify-center w-[40px] h-[40px] bg-bgSuccessDark rounded-[50%]">
            <CheckCircleIcon width={24} height={24} color={'#12B76A'} />
          </div>
        </div>
        <h5
          className="mobile320:mb-[12px] desktop1440:mb-[8px] mobile320:font-medium mobile320:text-[24px] mobile320:leading-[28.8px] 
                  desktop1440:font-normal desktop1440:text-[28px] desktop1440:leading-[36.4px] text-textPrimary"
        >
          {availability !== 'відсутній' ? (
            <span>Замовлення успішне!</span>
          ) : (
            <span>Ваша заявка прийнята!</span>
          )}
        </h5>
        <p
          className="mobile320:mb-[24px] desktop1440:mb-[32px] text-center mobile320:w-[258px] desktop1440:w-[632px] mobile320:text-[15px] mobile320:leading-[21px] 
                  desktop1440:text-[16px] desktop1440:leading-[24px] text-textSecondary"
        >
          {availability !== 'відсутній' ? (
            <span>Очікуйте дзвінка нашого менеджера протягом 5 хвилин</span>
          ) : (
            <span>Ми сповістимо Вас, коли товар з'явиться в продажі</span>
          )}
        </p>
        <button
          type="button"
          className="mobile320:w-[258px] mobile375:w-[313px] desktop1440:w-[404px] h-[48px] font-medium text-[16px] leading-[22.4px] state-button text-textContrast"
          onClick={handleClickOrderSuccessful}
        >
          Перейти до каталогу
        </button>
      </div>
    </Modal>
  );
};

export default ModalOrderSuccessful;
