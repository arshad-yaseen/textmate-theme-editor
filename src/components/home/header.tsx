import ThemeToggle from "../theme-toggle";

const Header = () => {
  return (
    <header className="py-4 px-6 flex justify-end items-center fixed top-0 left-0 right-0 z-50">
      <ThemeToggle />
    </header>
  );
};

export default Header;
