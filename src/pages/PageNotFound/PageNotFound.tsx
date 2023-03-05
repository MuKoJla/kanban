import { useNavigate } from 'react-router-dom';

const PageNotFound = () => {
  const navigate = useNavigate();

  const navigateToHomePage = () => navigate('/');

  return (
    <div>
      <h1>Unfortunately, current page does not exist</h1>
      <button onClick={navigateToHomePage}>Home Page</button>
    </div>
  );
};

export { PageNotFound };
