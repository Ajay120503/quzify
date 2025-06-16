import { Link } from 'react-router-dom';

const Logo = () => {
  return (
    <Link 
      to="/" 
      className="flex items-center gap-2 font-bold text-3xl md:text-4xl tracking-wide text-primary hover:opacity-90 transition"
    >
      <span className="text-accent">Quiz</span>ify
    </Link>
  );
};

export default Logo;
