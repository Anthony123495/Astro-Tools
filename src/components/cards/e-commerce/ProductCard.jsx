import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

// material-ui
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Divider from '@mui/material/Divider';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// project-imports
import MainCard from 'components/MainCard';
import IconButton from 'components/@extended/IconButton';
import SkeletonProductPlaceholder from 'components/cards/skeleton/ProductPlaceholder';

import { useGetCart, addToCart } from 'api/cart';
import { openSnackbar } from 'api/snackbar';
import { ImagePath, getImageUrl } from 'utils/getImageUrl';

// assets
import { Heart } from 'iconsax-react';

// ==============================|| PRODUCT CARD ||============================== //

export default function ProductCard({ id, title, brand, image, description }) {
  const theme = useTheme();

  const [wishlisted, setWishlisted] = useState(false);

  const addToFavourite = () => {
    setWishlisted(!wishlisted);
    openSnackbar({
      open: true,
      message: 'Added to favourites',
      variant: 'alert',

      alert: {
        color: 'success'
      }
    });
  };

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(false);
  }, []);

  if (loading) return <SkeletonProductPlaceholder />;

  return (
    <MainCard
      content={false}
      sx={{
        '&:hover': {
          transform: 'scale3d(1.02, 1.02, 1)',
          transition: 'all .4s ease-in-out'
        }
      }}
    >
      <Box sx={{ width: 250, m: 'auto' }}>
        <CardMedia
          sx={{ height: 250, textDecoration: 'none'}}
          image={image && getImageUrl(`${image}`, ImagePath.ECOMMERCE)}
          component={Link}
          to={`/apps/tools/tool/${id}`}
        />
      </Box>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ width: '100%', position: 'absolute', top: 0, pt: 1.75, pl: 2, pr: 1 }}
      >
        <IconButton color="secondary" sx={{ ml: 'auto', '&:hover': { bgcolor: 'transparent' } }} onClick={addToFavourite}>
          {wishlisted ? (
            <Heart variant="Bold" style={{ fontSize: '1.15rem', color: theme.palette.error.main }} />
          ) : (
            <Heart style={{ fontSize: '1.15rem' }} />
          )}
        </IconButton>
      </Stack>
      <Divider />
      <CardContent sx={{ p: 2 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Stack>
              <Typography
                component={Link}
                to={`/apps/tools/tool/${id}`}
                color="text.primary"
                variant="h5"
                sx={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', display: 'block', textDecoration: 'none' }}
              >
                {title}
              </Typography>
              <Typography variant="h6" color="text.secondary">
                {brand}
              </Typography>
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <Stack direction="row" justifyContent="space-between" alignItems="flex-end" flexWrap="wrap" rowGap={1.75}>
              <Stack>
                <Stack direction="row" spacing={1} alignItems="center">
                  <Typography variant="h5">{description}</Typography>
                </Stack>
              </Stack>
              <Button variant="contained" href={`/apps/tools/tool/${id}`}>
                See tool
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </CardContent>
    </MainCard>
  );
}

ProductCard.propTypes = {
  id: PropTypes.any,
  title: PropTypes.any,
  brand: PropTypes.any,
  image: PropTypes.any,
  description: PropTypes.any,
};
