import PropTypes from 'prop-types';
import { useEffect, useState, useMemo } from 'react';
import { useParams, useLoaderData, Link } from 'react-router-dom';
import React from 'react';

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
import { Book, Component, Cpu } from 'iconsax-react';
import { Container } from '@mui/material';
import ImagingFramingSimulator from './ImagingFramingSimulator';
import VisualFramingSimulator from './VisualFramingSimulator';

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

  const Component = rightTool.component

  return (
    <>
        <Container spacing={2}>
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
                            {rightTool.content1}
                          </Typography>
                          <Typography>
                            {rightTool.content2} 
                          </Typography>
                          <Typography>
                            {rightTool.content3}
                          </Typography>
                          <Typography>
                            {rightTool.content4}
                          </Typography>
                          <Typography>
                            {rightTool.content5}
                          </Typography>
                        </Stack>
                      </AccordionDetails>
                    </Accordion>
                    
                  </Box>
                </Stack>
              </Stack>
            </MainCard>
            <br />
           <Component>
              
           </Component>
          </Stack>
        </Container>
    </>
  );
}