import { Link } from "react-router-dom";

function Notfound() {
  return (
    <div className="text-center mt-40">
      <h1 className="text-lg mb-4">Page not found!😢</h1>
      <Link to="/" className="bg-slate-500 p-2">
        Go Back
      </Link>
    </div>
  );
}

export default Notfound;
