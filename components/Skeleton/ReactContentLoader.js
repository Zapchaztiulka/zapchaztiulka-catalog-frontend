import ContentLoader from "react-content-loader";

const ReactContentLoader = () => {
  return (
    <div className="container mt-[117px] mb-3">
    <ContentLoader title="Loading... Please wait" style={{ width: '100%', height:'100%' }}/>
    </div>
  );
}

export default ReactContentLoader