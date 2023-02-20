import { Link } from "react-router-dom";
import Logo from '../logo.svg';

const Title = () => (
  <a href="/">
    <img className="w-24 rounded-lg" src={Logo} alt="Food Villa" />
  </a>
);

export const Header = () => {
  return (
    <div className="flex items-center justify-between p-2.5 bg-[#f8f8f8]">
      <Title />
      <div className="flex items-center">
        <ul className="flex list-none">
          <li className="p-2.5 mr-2.5 no-underline text-[#333] font-semibold text-lg">
            <Link to={"/"}>Home</Link>
          </li>
          <li className="p-2.5 mr-2.5 no-underline text-[#333] font-semibold text-lg">
            <Link to={"/predict"}>Predict</Link>
          </li>
          <li className="p-2.5 mr-2.5 no-underline text-[#333] font-semibold text-lg">
            <Link to={"/knowledge"}>Knowledge</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
