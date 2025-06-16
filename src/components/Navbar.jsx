import Logo from './Logo';

const Navbar = () => {
  return (
    <div className="sticky h-16 top-0 w-full flex items-center justify-between p-4 bg-base-100 border-b border-base-300 z-50">
      <Logo />
      {/* Optional: add nav links or buttons here */}
    </div>
  );
};

export default Navbar;
