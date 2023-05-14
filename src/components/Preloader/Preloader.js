 export const Preloader = ({isLoading}) => {
  return (
    <div className={`preloader preloader${isLoading}`}>
      <div className="preloader__container">
        <i className="circle-preloader"></i>
        <p className="preloader__text">Searching for news...</p>
      </div>
    </div>
  );
};