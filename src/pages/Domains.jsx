import { useNavigate } from 'react-router-dom';
import p1 from "../assets/images/p2.png";
import StartBackground from "../assets/images/StartBackgraound.png";
import domains from '../assets/data/categories';

const Domains = () => {
  const navigate = useNavigate();

  const handleClick = (categoryName) => {
    navigate('/User', { state: { categoryName } });
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <img src={p1} alt="background" className="absolute top-0 left-0 w-full h-full object-cover -z-10" />
      <div className="bg-base-100 p-6 rounded-2xl shadow-2xl w-11/12 max-w-5xl flex flex-col md:flex-row items-center gap-6 border border-base-300">
        <div className="hidden md:flex w-full md:w-1/2 items-center justify-center">
          <img src={StartBackground} alt="Domain Illustration" className="rounded-xl object-cover h-64 md:h-96 w-full" />
        </div>
        <div className="w-full md:w-1/2 flex flex-col gap-4 h-40 overflow-hidden">
          <h2 className="text-3xl font-bold text-center">Select a Domain</h2>
          <div className="flex flex-col gap-2 overflow-y-auto">
            {domains.map((item) => (
              <button key={item} className="btn btn-primary w-full capitalize" onClick={() => handleClick(item)}>
                {item}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Domains;
