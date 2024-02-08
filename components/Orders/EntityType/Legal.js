import Dropdown from '@/components/Dropdown';
import { addToCheckout } from '@/redux/checkout/checkoutSlice';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Individual from './Individual';
import { selectCheckout } from '@/redux/checkout/checkoutSelector';
import CityRegistration from './CityRegistration';
import RegionRegistration from './RegionRegistration';
import { selectRegions, selectSettlements } from '@/redux/delivery/NovaPoshta/novaPoshtaSelectors';
import { fetchRegions, fetchSettlements } from '@/redux/delivery/NovaPoshta/novaPoshtaOperations';

const Legal = ({ isLegalPerson, setIsLegalPerson, patterns, isEmptyData }) => {
  const dispatch = useDispatch();
  const checkoutData = useSelector(selectCheckout);
  const {
    companyName,
    companyCode,
    companyAddress,
    companyCity,
    companyRegion,
  } = checkoutData.legalEntityData;
  const [errorMessage, setErrorMessage] = useState('');
  const [userTypeEntity, setUserTypeEntity] = useState('');
  const [companyNameInfo, setCompanyNameInfo] = useState(companyName || '');
  const [companyCodeInfo, setCompanyCodeInfo] = useState(companyCode || '');
  const [entrepreneurCode, setEntrepreneurCode] = useState(companyCode || '');
  const [legalAddress, setLegalAddress] = useState(companyAddress || '');
  const [cityRegistration, setCityRegistration] = useState(companyCity || '');
  const [regionRegistration, setRegionRegistration] = useState(
    companyRegion || ''
  );

  const settlements = useSelector(selectSettlements);
  const localityPlaceInfo = settlements?.data?.flatMap(
    entry => entry.Addresses
  );

  const regionsData = useSelector(selectRegions);

  // Get list of cities
  useEffect(() => {
    dispatch(fetchSettlements(cityRegistration));
  }, [dispatch, cityRegistration]);

  const handleInputChange = (field, value) => {
    dispatch(addToCheckout({ field, value }));
  };

const handleInputChangeCode = (field, value) => {
  const newValue = value.replace(/\D/g, '');
  let maxLength = 8; 
  let setStateFunction;
  if (userTypeEntity === 'entrepreneur') {
    maxLength = 10;
    setStateFunction = setEntrepreneurCode;
  } else {
    setStateFunction = setCompanyCodeInfo;
  }
  const trimmedValue = newValue.slice(0, maxLength);
  setStateFunction(trimmedValue);
  dispatch(addToCheckout({ field, value: trimmedValue }));
  if (trimmedValue.length === maxLength) {
    setErrorMessage('');
  } else {
    setErrorMessage(`Кількість цифр має бути ${maxLength}`);
  }
};

  useEffect(() => {
    dispatch(fetchRegions());
  }, [dispatch]);

  useEffect(() => {
    if (isLegalPerson === 'ФОП') {
      setUserTypeEntity('entrepreneur');
      setCompanyCodeInfo('');
      setEntrepreneurCode('');
      dispatch(addToCheckout({ field: 'legalEntityData.companyCode', value: '' }));
    } else if (isLegalPerson === 'Юридична особа') {
      setUserTypeEntity('company');
      setEntrepreneurCode('');
       setCompanyCodeInfo('');
        dispatch(
          addToCheckout({ field: 'legalEntityData.companyCode', value: '' })
        );
    }
  }, [isLegalPerson]);

  useEffect(() => {
    dispatch(addToCheckout({ field: 'userType', value: userTypeEntity }));
  }, [userTypeEntity, dispatch]);

  return (
    <div className="flex flex-wrap gap-3">
      <div className="checkout-contacts-input search">
        <p className="">
          Тип рестрації <span className="text-textError">*</span>
        </p>
        <Dropdown
          selected={isLegalPerson}
          options={['ФОП', 'Юридична особа']}
          onSelected={value => () => {
            setIsLegalPerson(value);
          }}
        />
      </div>
      <div className="checkout-contacts-input search">
        {' '}
        <label>
          Назва <span className="text-textError">*</span>
          <input
            className="w-full h-[48px] border border-borderDefault rounded-minimal p-[12px]"
            type="text"
            value={companyNameInfo}
            onChange={e => {
              setCompanyNameInfo(e.target.value);
              handleInputChange('legalEntityData.companyName', e.target.value);
            }}
          />
          {isEmptyData && companyNameInfo === '' && (
            <p className="text-textError text-[12px]">Заповніть назву</p>
          )}
        </label>
      </div>
      <div className="checkout-contacts-input search">
        {' '}
        <label>
          ЄДРПОУ <span className="text-textError">*</span>
          <input
            value={companyCodeInfo}
            disabled={userTypeEntity === 'entrepreneur'}
            onChange={e => {
              setCompanyCodeInfo(e.target.value);
              handleInputChangeCode(
                'legalEntityData.companyCode',
                e.target.value
              );
            }}
            className="w-full h-[48px] border border-borderDefault rounded-minimal p-[12px]"
          />
          {userTypeEntity === 'company' && (
            <span className="text-textWarning text-[12px]">{errorMessage}</span>
          )}
          {isEmptyData &&
            companyCodeInfo === '' &&
            userTypeEntity === 'company' && (
              <p className="text-textError text-[12px]">Заповніть ЄДРПОУ</p>
            )}
        </label>
      </div>
      <div className="checkout-contacts-input search">
        {' '}
        <label>
          ІПН <span className="text-textError">*</span>
          <input
            value={entrepreneurCode}
            disabled={userTypeEntity === 'company'}
            onChange={e => {
              setEntrepreneurCode(e.target.value);
              handleInputChangeCode(
                'legalEntityData.companyCode',
                e.target.value
              );
            }}
            className="w-full h-[48px] border border-borderDefault rounded-minimal p-[12px]"
          />
          {userTypeEntity === 'entrepreneur' && (
            <span className="text-textWarning text-[12px]">{errorMessage}</span>
          )}
          {isEmptyData &&
            companyCodeInfo === '' &&
            userTypeEntity === 'entrepreneur' &&
            <p className="text-textError text-[12px]">Заповніть ІПН</p>}
        </label>
      </div>
      <div className="checkout-contacts-input search">
        <p className="mb-[4px]">
          Область реєстрації <span className="text-textError">*</span>
        </p>
        <RegionRegistration
          regionRegistration={regionRegistration}
          setRegionRegistration={setRegionRegistration}
          cityRegistration={cityRegistration}
          checkoutData={checkoutData}
          regionsData={regionsData}
          isEmptyData={isEmptyData}
        />
      </div>

      <div className="checkout-contacts-input search">
        {' '}
        <p className="mb-[4px]">
          Місто реєстрації <span className="text-textError">*</span>
        </p>
        <CityRegistration
          checkoutData={checkoutData}
          cityRegistration={cityRegistration}
          setCityRegistration={setCityRegistration}
          localityPlaceInfo={localityPlaceInfo}
          isEmptyData={isEmptyData}
        />
      </div>

      <div className="checkout-contacts-input search">
        {' '}
        <label>
          Юридична адреса <span className="text-textError">*</span>
          <input
            value={legalAddress}
            onChange={e => {
              setLegalAddress(e.target.value);
              handleInputChange(
                'legalEntityData.companyAddress',
                e.target.value
              );
            }}
            className="w-full h-[48px] border border-borderDefault rounded-minimal p-[12px]"
          />
          {isEmptyData && companyNameInfo === '' && (
            <p className="text-textError text-[12px]">
              Заповніть юридичну адресу
            </p>
          )}
        </label>
      </div>
      <Individual
        checkoutData={checkoutData}
        isEmptyData={isEmptyData}
        patterns={patterns}
      />
    </div>
  );
};

export default Legal;
