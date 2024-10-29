// material-ui
import { useTheme } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// project-imports
import EcommerceDataCard from 'components/cards/statistics/EcommerceDataCard';
import EcommerceDataChart from 'sections/widget/chart/EcommerceDataChart';

import RepeatCustomerRate from 'sections/widget/chart/RepeatCustomerRate';
import ProjectOverview from 'sections/widget/chart/ProjectOverview';
import ProjectRelease from 'sections/dashboard/default/ProjectRelease';
import AssignUsers from 'sections/widget/statistics/AssignUsers';

import Transactions from 'sections/widget/data/Transactions';
import TotalIncome from 'sections/widget/chart/TotalIncome';

// assets
import { ArrowDown, ArrowUp, Book, Calendar, CloudChange, Wallet3 } from 'iconsax-react';
import WelcomeBanner from 'sections/dashboard/default/WelcomeBanner';
import Products from 'sections/widget/data/Products';
import ProductOverview from 'sections/widget/chart/ProductOverview';
import ProductCard from 'components/cards/e-commerce/ProductCard';
import ProductsPage from 'pages/apps/e-commerce/product';
// ==============================|| DASHBOARD - DEFAULT ||============================== //

export default function DashboardDefault() {
  const theme = useTheme();

  return (
    <Grid container rowSpacing={4.5} columnSpacing={2.75}>
      <Grid item xs={12}>
        <WelcomeBanner />
      </Grid>

      {/* row 1 */}
      <Grid item xs={12}>
        <ProductsPage/>
      </Grid>
    </Grid>
  );
}
