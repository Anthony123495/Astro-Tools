import PropTypes from 'prop-types';
// material-ui
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';

// third-party
import { motion } from 'framer-motion';

// project-imports
import Logo from 'components/logo';

// assets
import { Facebook, Instagram, ShoppingCart } from 'iconsax-react';

// link - custom style
const FooterLink = styled(Link)(({ theme }) => ({
  color: theme.palette.text.primary,
  '&:hover, &:active': {
    color: theme.palette.primary.main
  }
}));

// ==============================|| LANDING - FOOTER PAGE ||============================== //

export default function FooterBlock({ isFull }) {
  const theme = useTheme();

  const linkSX = {
    color: theme.palette.text.secondary,
    fontWeight: 400,
    opacity: '0.6',
    cursor: 'pointer',
    '&:hover': {
      opacity: '1'
    }
  };

  return (
    <>
      <Box sx={{ pt: isFull ? 5 : 10, pb: 10, bgcolor: 'secondary.200', borderTop: `1px solid ${theme.palette.divider}` }}>
        <Container>
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <motion.div
                initial={{ opacity: 0, translateY: 550 }}
                animate={{ opacity: 1, translateY: 0 }}
                transition={{
                  type: 'spring',
                  stiffness: 150,
                  damping: 30
                }}
              >
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Logo to="/" />
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 400, maxWidth: 320 }}>
                        © {new Date().getFullYear()} David Astro. All rights reserved.
                    </Typography>
                  </Grid>
                </Grid>
              </motion.div>
            </Grid>
            <Grid item xs={12} md={8}>
              <Grid container spacing={{ xs: 5, md: 2 }}>
                <Grid item xs={6} sm={4}>
                  <Stack spacing={3}>
                    <Typography variant="h5">Company Info</Typography>
                    <Stack spacing={{ xs: 1.5, md: 2.5 }}>
                      <FooterLink href="https://davidastro.com/policies/terms-of-service" target="_blank" underline="none">
                        Terms of Service
                      </FooterLink>
                      <FooterLink href="https://davidastro.com/policies/privacy-policy" target="_blank" underline="none">
                        Privacy Policy
                      </FooterLink>
                    </Stack>
                  </Stack>
                </Grid>
                <Grid item xs={6} sm={4}>
                  <Stack spacing={3}>
                    <Typography variant="h5">Help & Support</Typography>
                    <Stack spacing={{ xs: 1.5, md: 2.5 }}>
                      <Typography>
                        690-i de Montbrun, Boucherville, Quebec, Canada
                      </Typography>
                      <FooterLink href="mailto:support@davidastro.com" target="_blank" underline="none">
                        support@davidastro.com
                      </FooterLink>
                      <Typography>
                        1-888-403-1965
                      </Typography>
                    </Stack>
                  </Stack>
                </Grid>
                <Grid item xs={6} sm={4}>
                  <Stack spacing={3}>
                    <Typography variant="h5">Store Hours</Typography>
                    <Stack spacing={{ xs: 1.5, md: 2.5 }}>
                      <Typography>
                        Monday: Closed
                      </Typography>
                      <Typography>
                        Tuesday: 10h-17h
                      </Typography>
                      <Typography>
                        Wednesday: 10h-17h
                      </Typography>
                      <Typography>
                        Thursday: 10h-17h
                      </Typography>
                      <Typography>
                        Friday: 10h-17h
                      </Typography>
                      <Typography>
                        Saturday: 10h-15h
                      </Typography>
                      <Typography>
                        Sunday: Closed
                      </Typography>
                    </Stack>
                  </Stack>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </Box>
      <Box
        sx={{
          py: 2.4,
          borderTop: `1px solid ${theme.palette.divider}`,
          bgcolor: 'secondary.200'
        }}
      >
        <Container>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} sm={8}>
              <Typography>
                © Handcrafted by{' '}
                <Link href="https://www.astrobin.com/users/Astro_b7/" underline="none">
                  {' '}
                  Anthony Brunet-Bessette
                </Link>
              </Typography>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Grid container spacing={2} alignItems="center" sx={{ justifyContent: 'flex-end' }}>
                <Grid item>
                  <Tooltip title="Facebook">
                    <Link href="" underline="none" target="_blank" sx={linkSX}>
                      <Facebook variant="Bold" size={20} />
                    </Link>
                  </Tooltip>
                </Grid>
                <Grid item>
                  <Tooltip title="Instagram">
                    <Link href="" underline="none" target="_blank" sx={linkSX}>
                      <Instagram variant="Bold" size={20} />
                    </Link>
                  </Tooltip>
                </Grid>
                <Grid item>
                  <Tooltip title="Shop">
                    <Link href="" underline="none" target="_blank" sx={linkSX}>
                      <ShoppingCart variant="Bold" size={20} />
                    </Link>
                  </Tooltip>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
}

FooterBlock.propTypes = { isFull: PropTypes.bool };
