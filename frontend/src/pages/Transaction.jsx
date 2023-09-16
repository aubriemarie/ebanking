import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TRANSACTION_API from "../apis/transaction";
import { Box, Typography } from "@mui/material";

function createData(type, amount, date) {
  return { type, amount, date };
}

const rows = [
  createData("Deposit", "3000", "19-02-2023"),
  createData("Withdraw", "4000", "19-02-2023"),
  createData("Transfer", "5000", "19-02-2023"),
  createData("Deposit", "2000", "19-02-2023"),
];

const Transaction = () => {
  const [transactions, setTransactions] = React.useState([]);

  const getData = async () => {
    try {
      let res = await TRANSACTION_API.getAll();
      if (res) {
        setTransactions(res.data);
      }
    } catch (error) {}
  };

  React.useEffect(() => {
    getData();
  }, []);

  return (
    <Box
      sx={{
        width: `calc(100%-300px)`,
        ml: `290px`,
        pt: 10,
        padding: 10,
      }}
    >
      <Typography
        sx={{ fontSize: "40px", fontWeight: "bold", mt: 5, mb: 5, ml: 5 }}
      >
        Transactions
      </Typography>
      <TableContainer component={Paper} sx={{ width: `100%` }}>
        <Table sx={{}} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold", width: "30%" }}>
                Sender
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", width: "30%" }}>
                Reciever
              </TableCell>
              <TableCell sx={{ fontWeight: "bold" }} align="left">
                Amount
              </TableCell>
              <TableCell sx={{ fontWeight: "bold" }} align="left">
                Transaction Type
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {transactions.map((row) => (
              <TableRow
                key={row.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {`${row.send_acc.name} (${row.send_acc.acc_no})`}
                </TableCell>
                <TableCell align="left">{`${row.reciever_acc.name} (${row.reciever_acc.acc_no})`}</TableCell>
                <TableCell align="left">{row.amount}</TableCell>
                <TableCell align="left">{row.transaction_type}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Transaction;