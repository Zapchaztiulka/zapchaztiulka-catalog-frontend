import { useRouter } from 'next/router';
import React from 'react';
import { Button } from 'universal-components-frontend/src/components/buttons';

const EmptySearchPage = ({ searchValue }) => {
  const router = useRouter();
  const backToHomeUrl = () => {
    router.push({
      pathname: '/',
      query: {
        page: 1,
      },
    });
  };
  return (
    <>
      <h2 className="text-2xl/[28.8px] text-textPrimary font-medium mb-3">
        На жаль, за вашим “{searchValue}” запитом нічого не знайдено
      </h2>
      <p className="text-base/[24px] text-textSecondary mb-6">
        Перевірте та змініть запит або пошукайте товар в каталозі.
      </p>
      <Button
        buttonType="primary"
        type="submit"
        text="Перейти до каталогу"
        className="bg-bgBrandDark py-2 px-m w-auto"
        size="small"
        onClick={() => backToHomeUrl()}
      />
    </>
  );
};

export default EmptySearchPage;
