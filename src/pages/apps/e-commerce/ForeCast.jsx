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
import { Container } from '@mui/material';

export default function ForeCast() {

    const { id } = useParams();

    const [isLoading, setLoading] = useState(true);
    useEffect(() => {
        setLoading(false);
    }, []);

    const filtered = ToolsList.filter(tool => tool.id.includes(id))
    const rightTool = filtered[0]

    return (
        <MainCard>
            <Stack spacing={4}>
                ForeCast Simulator
            </Stack>
        </MainCard>
    )
}