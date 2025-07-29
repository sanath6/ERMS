import { FcPrevious } from 'react-icons/fc';
import { useNavigate } from 'react-router-dom';

export default function BackButton({ to = -1, label = 'Back' }) {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(to)}
      className="group inline-flex items-center space-x-2 px-4 py-2 bg-white border border-gray-300 rounded-full shadow hover:bg-gray-100 transition duration-200 ease-in-out"
    >
      <FcPrevious className="text-xl group-hover:-translate-x-1 transform transition duration-200 " />
      <span className="text-gray-700 font-medium group-hover:text-black">{label}</span>
    </button>
  );
}
