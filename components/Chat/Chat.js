import Draggable from 'react-draggable';

const BASE_URL =
  process.env.NODE_ENV === 'development'
    ? process.env.NEXT_PUBLIC_BASE_DEV_URL
    : process.env.NEXT_PUBLIC_BASE_PROD_URL;

export const Chat = ({ windowWidth }) => {
  const storedUserId = localStorage.getItem('userId');

  return (
    <Draggable handle="#dragHandle">
      <div className="w-[100vw] h-[100vh] bg-bgWhite tablet600:border-2 tablet600:border-solid tablet600:border-borderDefault tablet600:shadow-xl tablet600:w-[375px] tablet600:h-[45vh] tablet600:min-w-[375px] tablet600:min-h-[596px] tablet600:max-w-[70vw] tablet600:max-h-[80vh] ">
        <div
          id="dragHandle"
          className="drag-handle absolute top-0 left-0 h-16 w-[80%] bg-transparent cursor-grab"
        ></div>
        <iframe
          id="chatApp"
          src={`${BASE_URL}?userId=${storedUserId}&windowWidth=${windowWidth}`}
          className="w-full h-full"
        />
      </div>
    </Draggable>
  );
};
