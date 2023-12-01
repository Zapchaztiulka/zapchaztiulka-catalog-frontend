import React from 'react'
import BtnTertiary from '../Buttons/BtnTertiary'
import {CloseModal } from '@/public/icons';
import BtnChips from '../Buttons/BtnChips';

const Chips = () => {
  return (
    <div>
      <BtnTertiary color={'text-textError'}>
        <CloseModal
          width={24}
          height={24}
          className="stroke-iconError stroke-2"
        />
        <span>Очистити</span>
      </BtnTertiary>
      <BtnChips>
        <span>Some</span>
        <CloseModal
          width={16}
          height={16}
          className="stroke-iconPrimary stroke-2"
        />
      </BtnChips>
    </div>
  );
}

export default Chips
