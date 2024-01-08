import {
  Table,
  TableData,
  TableHead,
  TableHeader,
  TableRow,
} from './styles.tables';

interface TableProps {
  data: any[];
  headers: string[];
}

const DynamicTable: React.FC<TableProps> = ({ data, headers }) => {
  return (
    <div className='card border-0'>
      <div className='card-body overflow-auto border-0'>
        <Table className=' '>
          <TableHead className='border-0'>
            <TableRow className=' bg-gray6 fw-bold'>
              <TableHeader></TableHeader>
              {headers.map((header, index) => (
                <TableHeader
                  scope='col'
                  key={index}
                  className='fw-bold'
                >
                  {header}
                </TableHeader>
              ))}
            </TableRow>
          </TableHead>
          <tbody className='border-0'>
            {data.map((car, index) => (
              <TableRow key={index}>
                <TableData className='text-primary'>
                  <i className='fa-regular fa-square' />
                </TableData>
                <TableData>{car.displayName}</TableData>
                <TableData>{car.make}</TableData>
                <TableData>{car.model}</TableData>
                <TableData>{car.year}</TableData>
                <TableData>{car.transmission}</TableData>
                <TableData>{car.vin}</TableData>
                <TableData>{car.licensePlate}</TableData>
              </TableRow>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default DynamicTable;
