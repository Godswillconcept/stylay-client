import { Link } from "react-router";

function Logo() {
  return (
    <Link to="/">
      <div className="mb-2 flex justify-center">
        <img src="/Logo.png" alt="Logo" />
      </div>
    </Link>
  );
}

export default Logo;
