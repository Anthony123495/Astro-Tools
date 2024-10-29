import PropTypes from 'prop-types';

// material-ui
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Avatar, Box } from '@mui/material';
import CustomTooltip from 'components/@extended/Tooltip';

// ==============================|| PRODUCT DETAILS - INFORMATION ||============================== //

export default function ProductInfo({ tool }) {
  return (
    <Stack spacing={1}>
      <Typography variant="h3">{tool.title}</Typography>
      <CustomTooltip title={'Category: ' + tool.contentType + ' ' + 'in' + ' ' + tool.category} arrow color="primary">
      <Chip
        size="small"
        label={tool.brand}
        variant='light'
        avatar={<Avatar alt={tool.brand + 'Logo'} src='/favicon.png' />}
        color='primary'
        sx={{
          width: 'fit-content',
          borderRadius: '4px',
          cursor: 'pointer'
        }}
      />
      </CustomTooltip>
                  <Box
                    component="img"
                    sx={{
                      height: 233,
                      width: 350,
                      maxHeight: { xs: 233, md: 167 },
                      maxWidth: { xs: 350, md: 250 },
                      boxShadow: 1,
                      borderRadius: 2,
                    }}
                    alt={'Image of ' + tool.title}
                    src={tool.image}
                  />
    </Stack>
  );
}

ProductInfo.propTypes = { tool: PropTypes.any };
