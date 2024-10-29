import { Link } from "react-router-dom";

function NavigationBar() {
  return (
    <nav>
      <ul className="flex underline text-lg gap-10">
        <li>
          <Link to="/">Suppliers</Link>
        </li>
        <li>
          <Link to="/items">Items</Link>
        </li>
        <li>
          <Link to="/cart">Cart</Link>
        </li>
      </ul>
    </nav>
  );
}

export default NavigationBar;
