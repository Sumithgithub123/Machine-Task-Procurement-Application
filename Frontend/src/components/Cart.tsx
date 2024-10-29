import { useEffect, useState } from "react";
import CartTable from "./CartTable";
import exportToExcel, { handlechangequantity } from "../services";
type Datas = {
  item: { name: string; category: string; brand: string };
  quantity: number;
  unitPrice: number;
  discount: number;
  netAmount: number;
  _id: number;
};

function Cart() {
  const [data, setdata] = useState([]);
  const [isloading, setisloading] = useState(true);

  async function handle(id: string | number, quantity: number, op: string) {
    const data = await handlechangequantity(id, quantity, op);
    setdata(data);
  }

  useEffect(() => {
    async function getitems() {
      try {
        const res = await fetch("http://localhost:5000/api/orderitems");
        const data = await res.json();
        setdata(data);
        setisloading(false);
      } catch (e) {
        setisloading(false);
      }
    }
    getitems();
  }, []);
  const total: number = data.reduce((acc, obj: Datas) => {
    return acc + obj.netAmount;
  }, 0);

  if (isloading) return <div className="text-center mt-40">Loading...</div>;

  if (data.length === 0)
    return <div className="text-center mt-40">No Data Available</div>;
  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-semibold mb-5 text-xl">Cart Items</h1>
        <button
          className="bg-blue-500 p-1 active:bg-blue-700 px-5 rounded"
          onClick={() => exportToExcel(data, total)}
        >
          Export to EXCEL
        </button>
      </div>
      <CartTable total={total} handle={handle} data={data} />
      <p className="mt-2 text-end px-5 text-lg">Total : ${total}</p>
    </div>
  );
}

export default Cart;
