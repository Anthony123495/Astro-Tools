import PropTypes from 'prop-types';
import { useMemo } from 'react';

// material-ui
import Chip from '@mui/material/Chip';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

// third-party
import { flexRender, useReactTable, getCoreRowModel } from '@tanstack/react-table';

// project import
import ScrollX from 'components/ScrollX';
import MainCard from 'components/MainCard';

// ==============================|| REACT TABLE ||============================== //

function ReactTable({ columns, data, striped }) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel()
  });

  let headers = [];
  table.getAllColumns().map((columns) =>
    headers.push({
      label: typeof columns.columnDef.header === 'string' ? columns.columnDef.header : '#',
      // @ts-ignore
      key: columns.columnDef.accessorKey
    })
  );

  return (
    <MainCard
      content={false}
    >
      <ScrollX>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableCell key={header.id} {...header.column.columnDef.meta}>
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableHead>
            <TableBody {...(striped && { className: 'striped' })}>
              {table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} {...cell.column.columnDef.meta}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </ScrollX>
    </MainCard>
  );
}

// ==============================|| REACT TABLE - BASIC ||============================== //

export default function BasicTable({ striped, title }) {
  const data = ''

  const columns = useMemo(
    () => [
      {
        header: 'Brand',
        accessorKey: 'brand'
      },
      {
        header: 'Model',
        accessorKey: 'model'
      },
      {
        header: 'Aperture',
        accessorKey: 'aperture',
      },
      {
        header: 'Focal Length',
        accessorKey: 'focalLength',
      },
    ],
    []
  );

  return <ReactTable {...{ data, columns, title, striped }} />;
}

ReactTable.propTypes = { columns: PropTypes.array, data: PropTypes.array, striped: PropTypes.bool, title: PropTypes.string };

BasicTable.propTypes = { striped: PropTypes.bool, title: PropTypes.string };
