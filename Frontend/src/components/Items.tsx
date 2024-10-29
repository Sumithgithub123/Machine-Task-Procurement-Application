import { useEffect, useState, useTransition } from "react";
import ItemsTable from "./ItemTable";
import Modal, { useModal } from "../model/Model";
import { useOutside } from "../model/useOutside";
import { additem, addtocartapi, deletefromcartapi } from "../services";

function Items() {
  const [data, setdata] = useState([]);
  const [isloading, setisloading] = useState(true);
  const [issubmit, setsubmit] = useState(false);
  const { setstate } = useModal();
  const refe = useOutside(setstate);

  async function handlesubmit(e) {
    e.preventDefault();
    setsubmit(true);
    const data = new FormData(e.target);
    const formdata = Object.fromEntries(data);
    try {
      const adata = await additem(formdata);
      setdata(adata);
      setstate(false);
      setsubmit(false);
    } catch (e) {
      setstate(false);
      setsubmit(false);
    }
  }
  async function deletefromcart(id: number | string) {
    const data = await deletefromcartapi(id);
    setdata(data);
  }

  async function addtocart(id: number | string, unitPrice: number) {
    const data = await addtocartapi(id, unitPrice);
    setdata(data);
  }

  useEffect(() => {
    async function getitems() {
      try {
        const res = await fetch("http://localhost:5000/api/items");
        const data = await res.json();
        setdata(data);
        setisloading(false);
      } catch (e) {
        setisloading(false);
      }
    }
    getitems();
  }, []);
  if (isloading) return <div className="text-center mt-40">Loading...</div>;

  if (data.length === 0)
    return <div className="text-center mt-40">No Data Available</div>;
  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-semibold mb-5 text-xl">Items</h1>
        <Modal.Opens open="form" />
        <Modal.Window open="form">
          <div
            ref={refe}
            className="h-fit w-96 p-2 bg-slate-50 rounded animate-fade-down"
          >
            <form
              className="text-black p-3 flex flex-col gap-3"
              onSubmit={handlesubmit}
            >
              <input
                required
                className="w-full rounded-sm h-8 p-2 px-5 border outline-none"
                name="name"
                placeholder="Name"
                type="text"
              />
              <input
                required
                className="w-full rounded-sm h-8 p-2 px-5 border outline-none"
                name="location"
                placeholder="Location"
                type="text"
              />
              <input
                required
                className="w-full rounded-sm h-8 p-2 px-5 border outline-none"
                name="brand"
                placeholder="Brand"
                type="text"
              />
              <input
                required
                className="w-full rounded-sm h-8 p-2 px-5 border outline-none"
                name="category"
                placeholder="Category"
                type="text"
              />
              <input
                required
                className="w-full rounded-sm h-8 p-2 px-5 border outline-none"
                name="stockUnit"
                placeholder="Stock Unit"
                type="text"
              />
              <input
                required
                className="w-full rounded-sm h-8 p-2 px-5 border outline-none"
                name="unitPrice"
                min={300}
                placeholder="Unit Price"
                type="number"
              />
              <button
                disabled={issubmit}
                className="rounded p-3 px-5 text-white bg-blue-400"
              >
                {issubmit ? "Submitting..." : "Submit"}
              </button>
            </form>
          </div>
        </Modal.Window>
      </div>
      <div>
        <ItemsTable
          addtocart={addtocart}
          deletefromcart={deletefromcart}
          data={data}
        />
      </div>
    </div>
  );
}

export default Items;
