import * as XLSX from "xlsx";

export default function exportToExcel(data, total) {
  const exportData = data.map((order) => ({
    OrderID: order._id,
    ItemID: order.item._id,
    ItemName: order.item.name,
    Brand: order.item.brand,
    Category: order.item.category,
    Quantity: order.quantity,
    UnitPrice: order.unitPrice,
    Discount: order.discount,
    NetAmount: order.netAmount,
  }));

  exportData.push({
    OrderID: "Total",
    ItemID: "",
    ItemName: "",
    Brand: "",
    Category: "",
    Quantity: "",
    UnitPrice: "",
    Discount: "",
    NetAmount: total,
  });

  const worksheet = XLSX.utils.json_to_sheet(exportData);

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Orders");

  const excelFile = "order_data.xlsx";
  XLSX.writeFile(workbook, excelFile);

  console.log(`Excel file "${excelFile}" generated successfully!`);
}

export async function additem(formdata) {
  const res = await fetch(`http://localhost:5000/api/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ...formdata,
      supplier: "671e0704379bf5ca114a71dd",
      images: ["https://picsum.photos/seed/picsum/200/300"],
      status: "Enabled",
    }),
  });
  const adata = await res.json();
  return adata;
}

export async function addtocartapi(id: number | string, unitPrice: number) {
  const discount = 200;
  const obj = {
    item: id,
    quantity: 1,
    unitPrice,
    discount,
    netAmount: unitPrice - discount,
  };
  const res = await fetch(`http://localhost:5000/api/orderitems`, {
    method: "POST",
    body: JSON.stringify(obj),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();
  return data;
}

export async function deletefromcartapi(id: string | number) {
  const res = await fetch(`http://localhost:5000/api/orderitems/delete/${id}`, {
    method: "POST",
  });
  const data = await res.json();
  return data;
}

export async function handlechangequantity(
  id: string | number,
  quantity: number,
  op: string
) {
  const newquantity = op === "inc" ? quantity + 1 : quantity - 1;
  const res = await fetch(
    `http://localhost:5000/api/orderitems/changequantity/${id}`,
    {
      method: "POST",
      body: JSON.stringify({ quantity: newquantity }),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const data = await res.json();
  return data;
}
