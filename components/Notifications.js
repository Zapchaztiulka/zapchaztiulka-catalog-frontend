import React from 'react'
import { CheckCircleIcon } from 'universal-components-frontend/src/components/icons';

const Notifications = ({message}) => {
  return (
    <div className="w-full tablet600:w-[343px] desktop1200:w-[590px] rounded-lg p-xs tablet1024:p-s flex gap-1 border border-borderSuccess bg-bgSuccessLight">
      <CheckCircleIcon width={24} height={24} color={'#12B76A'} />
      <p className="tetx-[16px]/[24px] text-textSuccess">{message}</p>
    </div>
  );
}

export default Notifications
