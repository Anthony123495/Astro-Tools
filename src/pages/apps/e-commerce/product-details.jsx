import PropTypes from 'prop-types';
import { useEffect, useState, useMemo } from 'react';
import { useParams, useLoaderData, Link } from 'react-router-dom';

// material-ui
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Chip from '@mui/material/Chip';
import Tabs from '@mui/material/Tabs';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';

// project-imports
import MainCard from 'components/MainCard';

import ProductFeatures from 'sections/apps/e-commerce/product-details/ProductFeatures';
import ProductInfo from 'sections/apps/e-commerce/product-details/ProductInfo';
import ToolsList from 'sections/apps/e-commerce/products/ToolsList';
import { useTheme } from '@mui/material/styles';
import { Book } from 'iconsax-react';

// ==============================|| TOOLS - TOOL DETAILS ||============================== //

export default function ProductDetails() {
  const { id } = useParams();
  const theme = useTheme();

  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(false);
  }, []);

  const filtered = ToolsList.filter(tool => tool.id.includes(id))
  const rightTool = filtered[0]
  
  return (
    <>
        <Grid container spacing={2}>
          <Stack item xs={12}>
            <Stack container spacing={2}>
              <Stack item xs={12} md={7} lg={8}>
                <MainCard border={true} sx={{ height: '100%', bgcolor: 'primary.lighter' }}>
                  <ProductInfo tool={rightTool} />
                </MainCard>
              </Stack>
            </Stack>
            <br />
            <MainCard>
              <Stack spacing={3}>
                <Stack spacing={4}>
                  <Box
                      sx={{
                        '& .MuiAccordion-root': {
                          borderColor: theme.palette.divider,
        
                          '& .MuiAccordionSummary-root': {
                            bgcolor: 'transparent',
                            flexDirection: 'row'
                          },
                          '& .MuiAccordionDetails-root': {
                            borderColor: theme.palette.divider
                          },
                          '& .Mui-expanded': {
                            color: 'primary.main'
                          }
                        }
                      }}
                  >
                    <Accordion>
                      <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
                        <Stack direction="row" spacing={1.5} alignItems="center">
                          <Book />
                          <Typography variant="h6">How to Get Started</Typography>
                        </Stack>
                      </AccordionSummary>
                      <AccordionDetails>
                        <Stack spacing={2}>
                          <Typography>
                            The David Astro Tools Astrophotography Framing Assistant is a powerful tool designed to help you precisely frame your celestial targets.
                          </Typography>
                          <Typography>
                            By selecting your equipment from our extensive database (camera, telescope, focal reducer) or manually entering key details (focal length, pixel size, sensor size), you can visualize your composition in real-time with the help of the dynamic Aladin API navigator.
                          </Typography>
                          <Typography>
                            Additionally, the tool provides a comprehensive table of calculated values, including
                          </Typography>
                        </Stack>
                      </AccordionDetails>
                    </Accordion>
                  </Box>
                </Stack>
              </Stack>
            </MainCard>
          </Stack>
        </Grid>
    </>
  );
}