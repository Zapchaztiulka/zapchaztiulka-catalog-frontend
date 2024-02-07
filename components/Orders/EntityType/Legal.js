import Dropdown from '@/components/Dropdown';
import { addToCheckout } from '@/redux/checkout/checkoutSlice';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Individual from './Individual';
import { selectCheckout } from '@/redux/checkout/checkoutSelector';

const Legal = ({
  isLegalPerson,
  setIsLegalPerson,
  isStateOfRegister,
  setIsStateOfRegister,
  isCityOfRegister,
  setIsCityOfRegister,
}) => {
  const dispatch = useDispatch();
  const checkoutData = useSelector(selectCheckout);
  const {companyName, companyCode, companyAddress, companyCity, companyRegion} = checkoutData.legalEntityData
  const [userTypeEntity, setUserTypeEntity] = useState('');
  const [companyNameInfo, setCompanyNameInfo] = useState(companyName || '');
  const [companyCodeInfo, setCompanyCodeInfo] = useState(companyCode || '');
  const [entrepreneurCode, setEntrepreneurCode] = useState(companyCode ||'');
  const [legalAddress, setLegalAddress] = useState(companyAddress || '')
  const [cityRegistration, setCityRegistration]=useState(companyCity || '')
  const [regionRegistration, setRegionRegistration]=useState(companyRegion || '')

  const handleInputChange = (field, value) => {
    dispatch(addToCheckout({ field, value }));
  };

  useEffect(() => {
    if (isLegalPerson === 'ФОП') {
      setUserTypeEntity('entrepreneur');
      setCompanyCodeInfo('')
    } else if (isLegalPerson === 'Юридична особа') {
      setUserTypeEntity('company');
      setEntrepreneurCode('')
    }
  }, [isLegalPerson]);

  useEffect(() => {
  dispatch(addToCheckout({ field: 'userType', value: userTypeEntity }));
}, [userTypeEntity, dispatch]);

  return (
    <div className="flex flex-wrap gap-3">
      <div className="checkout-contacts-input">
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
      <div className="checkout-contacts-input">
        {' '}
        <label>
          Назва <span className="text-textError">*</span>
          <input
            className="w-full h-[48px] border border-borderDefault rounded-minimal p-[12px]"
            required
            type="text"
            value={companyNameInfo}
            onChange={e => {
              setCompanyNameInfo(e.target.value);
              handleInputChange('legalEntityData.companyName', e.target.value);
            }}
          />
        </label>
      </div>
      <div className="checkout-contacts-input">
        {' '}
        <label>
          ЄДРПОУ <span className="text-textError">*</span>
          <input
            value={companyCodeInfo}
            required
            disabled={userTypeEntity === 'entrepreneur'}
            onChange={e => {
              setCompanyCodeInfo(e.target.value);
              handleInputChange('legalEntityData.companyCode', e.target.value);
            }}
            className="w-full h-[48px] border border-borderDefault rounded-minimal p-[12px]"
          />
        </label>
      </div>
      <div className="checkout-contacts-input">
        {' '}
        <label>
          ІПН <span className="text-textError">*</span>
          <input
            required
            value={entrepreneurCode}
            type="text"
            disabled={userTypeEntity === 'company'}
            onChange={e => {
              setEntrepreneurCode(e.target.value);
              handleInputChange('legalEntityData.companyCode', e.target.value);
            }}
            className="w-full h-[48px] border border-borderDefault rounded-minimal p-[12px]"
          />
        </label>
      </div>
      <div className="checkout-contacts-input">
        <p className="mb-[4px]">
          Область реєстрації <span className="text-textError">*</span>
        </p>
        <Dropdown
          selected={isStateOfRegister}
          options={['Область 1', 'Область 2', 'Область 3', 'Область 4']}
          onSelected={value => () => {
            setIsStateOfRegister(value);
          }}
        />
      </div>
      <div className="checkout-contacts-input">
        {' '}
        <p className="mb-[4px]">
          Місто реєстрації <span className="text-textError">*</span>
        </p>
        <Dropdown
          selected={isCityOfRegister}
          options={['Місто 1', 'Місто 2', 'Місто 3', 'Місто 4']}
          onSelected={value => () => {
            setIsCityOfRegister(value);
          }}
        />
      </div>
      <div className="checkout-contacts-input">
        {' '}
        <label>
          Юридична адреса <span className="text-textError">*</span>
          <input
            value={legalAddress}
            required
            onChange={e => {
              setLegalAddress(e.target.value);
              handleInputChange(
                'legalEntityData.companyAddress',
                e.target.value
              );
            }}
            className="w-full h-[48px] border border-borderDefault rounded-minimal p-[12px]"
          />
        </label>
      </div>
      <Individual />
    </div>
  );
};

export default Legal;
