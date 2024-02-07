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

const Legal = ({
  isLegalPerson,
  setIsLegalPerson
}) => {
  const dispatch = useDispatch();
  const checkoutData = useSelector(selectCheckout);
  const {companyName, companyCode, companyAddress, companyCity, companyRegion} = checkoutData.legalEntityData
  const [userTypeEntity, setUserTypeEntity] = useState('');
  const [companyNameInfo, setCompanyNameInfo] = useState(companyName || '');
  const [companyCodeInfo, setCompanyCodeInfo] = useState(companyCode || '');
  const [entrepreneurCode, setEntrepreneurCode] = useState(companyCode ||'');
  const [legalAddress, setLegalAddress] = useState(companyAddress || '')
  const [cityRegistration, setCityRegistration] = useState(companyCity || '');
  const [regionRegistration, setRegionRegistration] = useState(
    companyRegion || ''
  );

  const settlements = useSelector(selectSettlements);
  const localityPlaceInfo = settlements?.data?.flatMap(
    entry => entry.Addresses
  );

  const regionsData = useSelector(selectRegions)

    // Get list of cities
  useEffect(() => {
    dispatch(fetchSettlements(cityRegistration));
  }, [dispatch, cityRegistration]);

  const handleInputChange = (field, value) => {
    dispatch(addToCheckout({ field, value }));
  };

  useEffect(()=> {
dispatch(fetchRegions())
  }, [dispatch])

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
      <div className="checkout-contacts-input search">
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
      <div className="checkout-contacts-input search">
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
        />
      </div>

      <div className="checkout-contacts-input search">
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
