import ThemeToggle from "../theme-toggle";

const Header = () => {
  return (
    <header className="py-4 px-6 flex justify-end items-center">
      <ThemeToggle />
    </header>
  );
};

export default Header;
