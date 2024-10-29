import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

// material-ui
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Rating from '@mui/material/Rating';
import Slider from '@mui/material/Slider';
import Checkbox from '@mui/material/Checkbox';
import Skeleton from '@mui/material/Skeleton';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import FormControlLabel from '@mui/material/FormControlLabel';

// project-imports
import Colors from './Colors';

// ==============================|| PRODUCT - GENDER FILTER ||============================== //

function Gender({ gender, handelFilter }) {
  const [isGenderLoading, setGenderLoading] = useState(true);
  useEffect(() => {
    setGenderLoading(false);
  }, []);

  return (
    <Stack>
      {isGenderLoading ? (
        <Skeleton variant="rectangular" width="100%" height={42} />
      ) : (
        <>
        </>
      )}
    </Stack>
  );
}

// ==============================|| PRODUCT GRID - CATEGORIES FILTER ||============================== //

function Categories({ categories, handelFilter }) {
  const [isCategoriesLoading, setCategoriesLoading] = useState(true);
  useEffect(() => {
    setCategoriesLoading(false);
  }, []);

  return (
    <Stack>
      {isCategoriesLoading ? (
        <Grid item xs={12}>
          <Skeleton variant="rectangular" width="100%" height={96} />
        </Grid>
      ) : (
        <>
          <Typography variant="h5">Categories</Typography>
          <Box sx={{ pl: 0.5 }}>
            <Stack>
              <FormControlLabel
                control={<Checkbox checked={categories.some((item) => item === 'all')} />}
                onChange={() => handelFilter('categories', 'all')}
                label="All"
              />
              <FormControlLabel
                control={<Checkbox checked={categories.some((item) => item === 'Visual')} />}
                onChange={() => handelFilter('categories', 'Visual')}
                label="Visual"
              />
              <FormControlLabel
                control={<Checkbox checked={categories.some((item) => item === 'Imaging')} />}
                onChange={() => handelFilter('categories', 'Imaging')}
                label="Imaging"
              />
            </Stack>
          </Box>
        </>
      )}
    </Stack>
  );
}

// ==============================|| PRODUCT GRID - PRICE FILTER ||============================== //

function Price({ handelFilter }) {
  const [isPriceLoading, setPriceLoading] = useState(true);
  useEffect(() => {
    setPriceLoading(false);
  }, []);

  const valuetext = (value) => `${value}`;

  const [value, setValue] = useState([0, 300]);
  const handleSlider = (event, newValue) => {
    setValue(newValue);
    const data = `${newValue[0]}-${newValue[1]}`;
    handelFilter('price', data);
  };

  return (
    <>
    </>
  );
}

// ==============================|| PRODUCT GRID - RATING FILTER ||============================== //

function RatingSection({ rating, handelFilter }) {
  const [isRatingLoading, setRatingLoading] = useState(true);
  useEffect(() => {
    setRatingLoading(false);
  }, []);

  return (
    <>
    {
      /*
        {isRatingLoading ? (
        <Skeleton variant="rectangular" width="100%" height={172} />
      ) : (
        <Stack spacing={1}>
          <Typography variant="h5">Rating</Typography>
          <Stack direction="row" spacing={1} alignItems="center">
            <Rating
              precision={0.5}
              name="simple-controlled"
              value={rating}
              onChange={(event, newValue) => handelFilter('rating', '', newValue)}
            />
            <Typography component="legend">({rating})</Typography>
          </Stack>
        </Stack>
      )}
      */
    }
    </>
  );
}

// ==============================|| PRODUCT GRID - FILTER ||============================== //

const ProductFilter = ({ filter, handelFilter }) => (
  <Grid container direction="column" rowSpacing={3}>
    <Grid item>
      <Gender gender={filter.gender} handelFilter={handelFilter} />
    </Grid>
    <Grid item>
      <Categories categories={filter.categories} handelFilter={handelFilter} />
    </Grid>
    <Grid item>
      <Colors colors={filter.colors} handelFilter={handelFilter} />
    </Grid>
    <Grid item>
      <Price handelFilter={handelFilter} />
    </Grid>
    <Grid item>
      <RatingSection rating={filter.rating} handelFilter={handelFilter} />
    </Grid>
  </Grid>
);

export default ProductFilter;

Gender.propTypes = { gender: PropTypes.array, handelFilter: PropTypes.func };

Categories.propTypes = { categories: PropTypes.array, handelFilter: PropTypes.func };

Price.propTypes = { handelFilter: PropTypes.func, params: PropTypes.string };

RatingSection.propTypes = { rating: PropTypes.number, handelFilter: PropTypes.func };

ProductFilter.propTypes = { filter: PropTypes.any, handelFilter: PropTypes.func };
