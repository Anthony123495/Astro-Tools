import { useEffect, useState } from 'react';
import { useLoaderData } from 'react-router-dom';

// material-ui
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

// project-imports
import ProductCard from 'components/cards/e-commerce/ProductCard';

import ProductFilterDrawer from 'sections/apps/e-commerce/products/ProductFilterDrawer';
import SkeletonProductPlaceholder from 'components/cards/skeleton/ProductPlaceholder';
import ProductsHeader from 'sections/apps/e-commerce/products/ProductsHeader';
import ProductEmpty from 'sections/apps/e-commerce/products/ProductEmpty';

import useConfig from 'hooks/useConfig';
import { filterProducts } from 'api/products';
import ToolsList from 'sections/apps/e-commerce/products/ToolsList';

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' && prop !== 'container' })(({ theme, open, container }) => ({
  flexGrow: 1,
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.shorter
  }),
  marginLeft: -320,
  ...(container && {
    [theme.breakpoints.only('lg')]: {
      marginLeft: !open ? -240 : 0
    }
  }),
  [theme.breakpoints.down('lg')]: {
    paddingLeft: 0,
    marginLeft: 0
  },
  ...(open && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.shorter
    }),
    marginLeft: 0
  })
}));


// ==============================|| ECOMMERCE - PRODUCTS ||============================== //

export default function ProductsPage() {
  
  const theme = useTheme();

  const { container } = useConfig();

  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(false);
  }, []);

  // product data
  const initialProducts = useLoaderData();
  const [products, setProducts] = useState(initialProducts);

  const [openFilterDrawer, setOpenFilterDrawer] = useState(false);
  const handleDrawerOpen = () => {
    setOpenFilterDrawer((prevState) => !prevState);
  };

  // filter
  const initialState = {
    search: '',
    sort: 'low',
    categories: ['all'],
  };
  const [filter, setFilter] = useState(initialState);

  const filterData = async () => {
    await filterProducts(filter).then((response) => {
      setProducts(response.data);
      setLoading(false);
    });
  };

  useEffect(() => {
    filterData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter]);

  let productResult = <></>;
  if (ToolsList && ToolsList.length > 0) {
    productResult = ToolsList.map((tool, index) => (
      <Grid key={index} item xs={12} sm={6} md={4}>
        <ProductCard
          id={tool.id}
          image={tool.image}
          title={tool.title}
          description={tool.description}
          brand={tool.brand}
        />
      </Grid>
    ));
  } else {
    productResult = (
      <Grid item xs={12} sx={{ mt: 3 }}>
        <ProductEmpty handelFilter={() => setFilter(initialState)} />
      </Grid>
    );
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <ProductFilterDrawer
        filter={filter}
        setFilter={setFilter}
        openFilterDrawer={openFilterDrawer}
        handleDrawerOpen={handleDrawerOpen}
        setLoading={setLoading}
        initialState={initialState}
      />
      <Main theme={theme} open={openFilterDrawer} container={container}>
        <Grid container spacing={2.5}>
          <Grid item xs={12}>
            <ProductsHeader filter={filter} handleDrawerOpen={handleDrawerOpen} setFilter={setFilter} />
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={3}>
              {isLoading
                ? [1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
                    <Grid key={item} item xs={12} sm={6} md={4} lg={4}>
                      <SkeletonProductPlaceholder />
                    </Grid>
                  ))
                : productResult}
            </Grid>
          </Grid>
        </Grid>
      </Main>
    </Box>
  );
}
