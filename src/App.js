import './App.css';
import { useNavigate } from 'react-router-dom';

function App() {
  const navigate = useNavigate()

  return (
    <>
    <div className="page-background">
      <div className='ml-5'>
      <h1 className="text-center text-warning display-4 mb-3">HOME</h1>
      <p className="text-center fw-semibold">Welcome to <span className="text-success">Mashupstack</span></p><br></br>

        <form className="mb-3">
          <div className="text-center">
          <button onClick={() => navigate('/Login')} className="button mb-5 mr-4 rounded-pill shadow px-4 py-2"> Login </button>
          <button onClick={() => navigate('/Signup')} className="button mb-5 rounded-pill shadow px-4 py-2"> Signup </button>
          </div>
        </form>
        </div>
    </div></>
  );
}

export default App;
