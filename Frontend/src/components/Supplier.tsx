import { useEffect, useState } from "react";
import SupplierTable from "./SupplierTable";

function Supplier() {
  const [data, setdata] = useState([]);
  const [isloading, setisloading] = useState(true);

  useEffect(() => {
    async function getsupplys() {
      try {
        const res = await fetch("http://localhost:5000/api/suppliers");
        const data = await res.json();
        setdata(data);
        setisloading(false);
      } catch (e) {
        setisloading(false);
      }
    }
    getsupplys();
  }, []);

  if (isloading) return <div className="text-center mt-40">Loading...</div>;
  if (data.length === 0)
    return <div className="text-center mt-40">No Data Available</div>;
  return (
    <div>
      <h1 className="font-semibold mb-5 text-xl">Suppliers</h1>
      <div>
        <SupplierTable data={data} />
      </div>
    </div>
  );
}

export default Supplier;
