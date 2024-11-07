// material-ui
import Grid from '@mui/material/Grid';

// project import
import BasicTable from './BasicTable';

// ==============================|| REACT TABLE - BASIC ||============================== //

export default function Basic() {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} lg={6}>
        <BasicTable />
      </Grid>
    </Grid>
  );
}
