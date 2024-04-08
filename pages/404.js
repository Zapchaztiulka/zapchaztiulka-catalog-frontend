import { useRouter } from 'next/router';
import { Button } from 'universal-components-frontend/src/components/buttons';

export default function Custom404() {
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
      <div className="flex flex-col items-center container h-screen">
        <h1 className="mt-[200px] mb-4">
          Помилка 404: Сторінку, яку ви шукали, не знайдено. Будь ласка,
          перевірте правильність URL або поверніться на головну сторінку.
        </h1>
        <Button
          buttonType="primary"
          type="submit"
          text="Повернутися на головну сторінку"
          className="bg-bgBrandDark py-2 px-m w-auto"
          size="small"
          onClick={() => backToHomeUrl()}
        />
      </div>
    </>
  );
}
