const BASE_URL =
  process.env.NODE_ENV === 'development'
    ? process.env.NEXT_PUBLIC_BASE_DEV_URL
    : process.env.NEXT_PUBLIC_BASE_PROD_URL;

export const Chat = ({ windowWidth }) => {
  const storedUserId = localStorage.getItem('userId');

  return (
    <div
      className="w-[100vw] h-[100vh] bg-bgWhite sticky tablet600:transform tablet600:-translate-x-s tablet600:-translate-y-s 
                    tablet600:border-2 tablet600:border-solid tablet600:border-borderDefault tablet600:shadow-xl
                    tablet600:w-[375px] tablet600:min-h-[596px] tablet600:h-[45vh]"
    >
      <iframe
        id="chatApp"
        src={`${BASE_URL}?userId=${storedUserId}&windowWidth=${windowWidth}`}
        className="w-full h-full"
      />
    </div>
  );
};
