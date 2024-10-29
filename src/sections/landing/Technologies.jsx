// material-ui
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

// third party
import { motion } from 'framer-motion';

// project-imports
import FadeInWhenVisible from './Animation';
import MainCard from 'components/MainCard';
import { techData } from 'data/tools-data';

// ==============================|| LANDING ||============================== //

export default function TechnologiesPage() {
  return (
    <Container>
      <Grid container spacing={3} alignItems="center" justifyContent="center" sx={{ mt: { md: 10, xs: 15 }, mb: { md: 10, xs: 15 } }}>
        <Grid item xs={12}>
          <Grid container spacing={2} sx={{ textAlign: 'center', marginBottom: 3 }}>
            <Grid item xs={12}>
              <motion.div
                initial={{ opacity: 0, translateY: 550 }}
                animate={{ opacity: 1, translateY: 0 }}
                transition={{
                  type: 'spring',
                  stiffness: 150,
                  damping: 30,
                  delay: 0.2
                }}
              >
                <Typography variant="h2">Our Web App Features</Typography>
              </motion.div>
            </Grid>
            <Grid item xs={12}>
              <motion.div
                initial={{ opacity: 0, translateY: 550 }}
                animate={{ opacity: 1, translateY: 0 }}
                transition={{
                  type: 'spring',
                  stiffness: 150,
                  damping: 30,
                  delay: 0.4
                }}
              >
                <Typography>David Astro Tools simplifies astrophotography, ensuring you have the perfect imaging nights.</Typography>
              </motion.div>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={3} alignItems="center" justifyContent="center">
            {techData.map((feature, index) => (
              <Grid item xs={12} md={6} lg={4} key={index}>
                <FadeInWhenVisible>
                  <MainCard>
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <CardMedia component="img" image={feature.image} sx={{ width: 'auto' }} />
                      </Grid>
                      <Grid item xs={12}>
                        <Typography variant="h4">{feature.label}</Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <Typography>{feature.description}</Typography>
                      </Grid>
                    </Grid>
                  </MainCard>
                </FadeInWhenVisible>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}
