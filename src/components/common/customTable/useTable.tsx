import {
    Grid,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@material-ui/core';
import { RecordVoiceOverSharp } from '@material-ui/icons';
import React from 'react';

type Props = {
  records: any[];
  count:number;
  headCells: string[];
};

const useStyles = makeStyles((theme) => ({
  root: {},
  tableContent: {
    margin: theme.spacing(5),
    padding: theme.spacing(3),
  },
  table:{
      marginTop:them.spacing(3),
      '& thead th':{
          fontWeight:'600',
          color:theme.pallete.primary.main,
          backgroundColor:theme.pallete.primary.light
      },
      '& tbody td':{
          fontWeight:'100',
      },
      '& tbody tr:hover':{
        backgroundColor:theme.pallete.secondary.light,
        cursor:'pointer'
      }
  }

}));


const useTable: React.FC = ({ records, headCells }) => {
 const classes = useStyles();
 const perPageOptions =[5,10,25,50,100] 
 const [pages, setpages] = useState(0)
 const [rowsPerPage, setrowsPerPage] = useState(perPageOptions[pages])
const handleChangePage = (e,newPage) => {
    setpages(newPage)
}

const handleChangeRowsPerPage = (e) => {
    const {target} = e;
    setrowsPerPage(parseInt(target.value,10))
    setpages(0)
}

 const TablePagination = () => {
    return <TablePagination component = 'div' rowsPerPageOptions = {rowsPerPage} count = {count} handleChangePage = {handleChangePage} onChangePage = {handleChangeRowsPerPage}/>  
   }

  return (
      <Grid container className = {classes.tableContent} spacing = {3}>
      <Table className = {classes.table}>
        <TableHead>
          {headCells.map(({ label, id }) => {
              return(
                  <TableRow key={id}> {label} </TableRow>;
              )
          })}
        </TableHead>
        <TableBody>
          {records.map((item) => {
            return (
              <TableRow key={item.id + 'row'}>
                <TableCell>{item.title}</TableCell>
                <TableCell>{item.description}</TableCell>
                <TableCell>{item.isFeatured}</TableCell>
                <TableCell>{item.isMainFeatured}</TableCell>
                <TableCell>{item.startDate}</TableCell>
                <TableCell>{item.endDate}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      </Grid>
  );
};

export default useTable;
