import { Link as RouterLink } from 'react-router-dom';

// material-ui
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import CardMedia from '@mui/material/CardMedia';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// third party
import { motion } from 'framer-motion';

// project-imports
import FadeInWhenVisible from './Animation';
import MainCard from 'components/MainCard';
import { useIspValue } from 'hooks/useIspValue';

// assets
import one from 'assets/images/landing/one.png';
import two from 'assets/images/landing/two.png';
import three from 'assets/images/landing/three.png';
import four from 'assets/images/landing/four.png';


const Technologies = [
  {
    icon: one,
    title: 'Explore Our Tools',
    description: 'Visit the "Tools" page to browse our range of astronomy and astrophotography tools.',
  },
  {
    icon: two,
    title: 'Select Your Tool',
    description: "Choose the specific tool you need, whether it's a calculator, simulator, or planner.",
  },
  {
    icon: three,
    title: 'Customize Your Settings',
    description: "Input your details and adjust the settings according to your equipment and preferences.",
  },
  {
    icon: four,
    title: 'Get Real-Time Results',
    description: "Instantly receive accurate calculations, forecasts, and recommendations for your imaging sessions.",
  },
];

// ==============================|| LANDING - ComboPage ||============================== //

export default function ComboPage() {
  const ispValueAvailable = useIspValue();

  return (
    <Container>
      <Grid container spacing={3} alignItems="center" justifyContent="center" sx={{ mt: { md: 10, xs: 15 }, mb: { md: 10, xs: 2.5 } }}>
        <Grid item xs={12}>
          <Grid container spacing={2} justifyContent="center" sx={{ textAlign: 'center', marginBottom: 3 }}>
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
                <Typography variant="h3" color="grey">
                  How to Get Started
                </Typography>
              </motion.div>
            </Grid>
            <Grid item xs={12} md={7}>
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
                <Typography variant="h2">
                  Browse our tools, select the one you need, and you're ready to go!
                </Typography>
              </motion.div>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={3}>
            {Technologies.map((tech, index) => (
              <Grid item xs={12} md={6} key={index}>
                <Box
                  sx={{
                    height: '100%',
                    '& > div': {
                      height: '100%'
                    }
                  }}
                >
                  <FadeInWhenVisible>
                    <MainCard sx={{ height: '100%' }}>
                      <Grid container spacing={3.5}>
                        <Grid item xs={12}>
                          <Stack spacing={1}>
                            <Grid item xs={12}>
                              <CardMedia component="img" image={tech.icon} sx={{ width: '10%' }} />
                            </Grid>
                            <Typography variant="h5">{tech.title}</Typography>
                            <Typography>{tech.description}</Typography>
                          </Stack>
                        </Grid>
                      </Grid>
                    </MainCard>
                  </FadeInWhenVisible>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}
