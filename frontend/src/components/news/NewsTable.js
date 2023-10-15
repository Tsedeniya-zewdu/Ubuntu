import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function createData(goal, raised, operation, people, individuals) {
  return { goal, raised, operation, people, individuals };
}

const rows = [
  createData('500,000ETB', '550,000ETB', '50,000ETB', '500,000ETB', '-'),
];

export default function NewsTable(props) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Goal</TableCell>
            <TableCell align="right">Donations Raised</TableCell>
            <TableCell align="right">Operation Cost</TableCell>
            <TableCell align="right">Transaction Cost</TableCell>
            <TableCell align="right">Given to people</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {props.project.amount}ETB
              </TableCell>
              <TableCell align="right">{props.project.raised}ETB</TableCell>
              <TableCell align="right">{props.project.cost1}ETB</TableCell>
              <TableCell align="right">{props.project.cost2}ETB</TableCell>
              <TableCell align="right">{props.project.given}ETB</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}