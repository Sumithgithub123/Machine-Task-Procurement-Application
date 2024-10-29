import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

type Datas = {
  _id: number;
  name: string;
  location: string;
  brand: string;
  category: string;
  supplier: { name: string };
  stockUnit: number;
  unitPrice: number;
  images: string[];
  status: string;
  incart?: boolean;
};

export default function ItemsTable({
  data,
  deletefromcart,
  addtocart,
}: {
  data: Datas[];
  deletefromcart: (id: string | number) => void;
  addtocart: (id: string | number, unitPrice: number) => void;
}) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">Name</TableCell>
            <TableCell align="center">Location</TableCell>
            <TableCell align="center">Brand</TableCell>
            <TableCell align="center">Category</TableCell>
            <TableCell align="center">Supplier</TableCell>
            <TableCell align="center">Stock Unit</TableCell>
            <TableCell align="center">Unit Price</TableCell>
            <TableCell align="center">Image</TableCell>
            <TableCell align="center">Buy</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.map((row) => (
            <TableRow
              key={row?.name}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell align="center" component="th" scope="row">
                {row?.name}
              </TableCell>
              <TableCell align="center">{row.location}</TableCell>
              <TableCell align="center">{row.brand}</TableCell>
              <TableCell align="center">{row.category}</TableCell>
              <TableCell align="center">{row.supplier.name}</TableCell>
              <TableCell align="center">{row.stockUnit}</TableCell>
              <TableCell align="center">{row.unitPrice}</TableCell>
              <TableCell align="center">
                <img
                  height={40}
                  width={40}
                  className="object-contain rounded mx-auto"
                  src={row.images[0]}
                  alt="img"
                />
              </TableCell>
              <TableCell align="center">
                {row.incart ? (
                  <button
                    onClick={() => deletefromcart(row._id)}
                    className="px-5 py-1 text-white bg-blue-400 rounded-sm"
                  >
                    Delete from cart
                  </button>
                ) : (
                  <button
                    onClick={() => addtocart(row._id, row.unitPrice)}
                    className="px-5 py-1 text-white bg-blue-400 rounded-sm"
                  >
                    Buy
                  </button>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
