import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

type Datas = {
  _id: number;
  item: { name: string; brand: string; category: string };
  unitPrice: number;
  quantity: number;
  discount: number;
  netAmount: number;
};

export default function CartTable({
  data,
  handle,
}: {
  data: Datas[];
  handle: (id: string | number, quantity: number, op: string) => Promise<void>;
  total: number;
}) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">Name</TableCell>
            <TableCell align="center">Brand</TableCell>
            <TableCell align="center">Category</TableCell>
            <TableCell align="center">Unit Price</TableCell>
            <TableCell align="center">Quanitity</TableCell>
            <TableCell align="center">Discount</TableCell>
            <TableCell align="center">netAmount</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.map((row, i) => (
            <TableRow
              key={i}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell align="center" component="th" scope="row">
                {row?.item?.name}
              </TableCell>
              <TableCell align="center">{row?.item?.brand}</TableCell>
              <TableCell align="center">{row?.item?.category}</TableCell>
              <TableCell align="center">{row?.unitPrice}</TableCell>
              <TableCell align="center">
                <div className="flex justify-center items-center gap-2">
                  <button
                    className="bg-red-400 disabled:cursor-not-allowed disabled:bg-red-200 px-2 text-2xl"
                    disabled={row?.quantity < 2}
                    onClick={() => handle(row._id, row?.quantity, "dec")}
                  >
                    -
                  </button>
                  <p>{row.quantity}</p>
                  <button
                    className="bg-red-400 disabled:cursor-not-allowed disabled:bg-red-200 px-2 text-2xl"
                    onClick={() => handle(row?._id, row?.quantity, "inc")}
                  >
                    +
                  </button>
                </div>
              </TableCell>
              <TableCell align="center">{row?.discount}</TableCell>
              <TableCell align="center">{row?.netAmount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
