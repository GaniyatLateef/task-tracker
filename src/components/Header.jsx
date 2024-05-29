import Button from "./Button";
import { FaPlus } from "react-icons/fa";

const Header = ({ title, showForm, setShowForm }) => {
  return (
    <header className="header">
      <p>Welcome, {title}</p>
      <Button
        label={showForm ? "Show Tasks" : "Add Task"}
        onClick={setShowForm}
      />
    </header>
  );
};

export default Header;
