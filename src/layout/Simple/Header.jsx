import PropTypes from 'prop-types';
import { useState, cloneElement } from 'react';
import { Link as RouterLink } from 'react-router-dom';

// material-ui
import { alpha, useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Container from '@mui/material/Container';
import CardMedia from '@mui/material/CardMedia';
import Collapse from '@mui/material/Collapse';
import Drawer from '@mui/material/Drawer';
import Link from '@mui/material/Link';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Menu from '@mui/material/Menu';
import Stack from '@mui/material/Stack';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import useScrollTrigger from '@mui/material/useScrollTrigger';

// project-imports
import { ThemeDirection } from 'config';
import IconButton from 'components/@extended/IconButton';
import AnimateButton from 'components/@extended/AnimateButton';
import Dot from 'components/@extended/Dot';
import Logo from 'components/logo';
import { handlerComponentDrawer, useGetMenuMaster } from 'api/menu';
import { useIspValue } from 'hooks/useIspValue';

// assets
import { ArrowDown2, ArrowUp2, DocumentDownload, ExportSquare, HambergerMenu, Minus, ShoppingBag, ShoppingCart } from 'iconsax-react';
import guidesArticlesTutorials from 'assets/images/landing/guidesArticlesTutorials.png';
import shop from 'assets/images/landing/shop.png';

// elevation scroll
function ElevationScroll({ children, window }) {
  const theme = useTheme();
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 10,
    target: window ? window : undefined
  });

  return cloneElement(children, {
    style: {
      boxShadow: trigger ? '0 8px 6px -10px rgba(0, 0, 0, 0.5)' : 'none',
      backgroundColor: trigger ? alpha(theme.palette.background.default, 0.8) : alpha(theme.palette.background.default, 0.1)
    }
  });
}

// ==============================|| COMPONENTS - APP BAR ||============================== //

export default function Header({ layout = 'landing', ...others }) {
  const theme = useTheme();
  const matchDownMd = useMediaQuery(theme.breakpoints.down('md'));
  const [drawerToggle, setDrawerToggle] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const [openDrawer, setOpenDrawer] = useState(false);

  const { menuMaster } = useGetMenuMaster();

  /** Method called on multiple components with different event types */
  const drawerToggler = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerToggle(open);
  };
  const ispValueAvailable = useIspValue();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const techData = [
    {
      label: 'Guides, Articles & Tutorials',
      image: guidesArticlesTutorials,
      url: 'https://davidastro.com/',
    },
    {
      label: 'Our Store',
      image: shop,
      url: 'https://davidastro.com/',
    },
  ]

  const listItems = techData.map((item, index) => {
    const finalUrl = item.url !== '#!' && ispValueAvailable ? `${item.url}?isp=1` : item.url;

    return (
      <ListItemButton
        key={index}
        component={item.label === 'React MUI' ? RouterLink : 'a'}
        {...(item.label === 'React MUI' ? { to: finalUrl } : { href: finalUrl })}
        target={item.target}
      >
        <Tooltip title={item.tooltipTitle} placement="bottom">
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <ListItemAvatar
              sx={{
                minWidth: 'auto',
                marginRight: 1,
                filter: item.tooltipTitle === 'Live Preview Not Available' ? 'grayscale(1)' : ''
              }}
            >
              <CardMedia component="img" image={item.image} sx={{ width: '30px' }} />
            </ListItemAvatar>
            <ListItemText primary={item.label} />
          </Box>
        </Tooltip>
      </ListItemButton>
    );
  });

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <ElevationScroll layout={layout} {...others}>
      <AppBar
        sx={{
          bgcolor: alpha(theme.palette.background.default, 0.1),
          backdropFilter: 'blur(8px)',
          color: theme.palette.text.primary,
          boxShadow: 'none'
        }}
      >
        <Container maxWidth="xl" disableGutters={matchDownMd}>
          <Toolbar sx={{ px: { xs: 1.5, sm: 4, md: 0, lg: 0 }, py: 1 }}>
            <Stack direction="row" sx={{ flexGrow: 1, display: { xs: 'none', md: 'block' } }} alignItems="center">
              <Typography sx={{ textAlign: 'left', display: 'inline-block' }}>
                <Logo to="/" />
              </Typography>
              <Chip
                label={import.meta.env.VITE_APP_VERSION}
                variant="outlined"
                size="small"
                color="secondary"
                sx={{ mt: 0.5, ml: 1, fontSize: '0.725rem', height: 20, '& .MuiChip-label': { px: 0.5 } }}
              />
            </Stack>
            <Stack
              direction="row"
              sx={{
                '& .header-link': { fontWeight: 500, '&:hover': { color: 'primary.main' } },
                display: { xs: 'none', md: 'block' }
              }}
              spacing={3}
            >
              <Link
                className="header-link"
                sx={{ ml: theme.direction === ThemeDirection.RTL ? 3 : 0 }}
                color="secondary.main"
                component={RouterLink}
                to={ispValueAvailable ? '/login?isp=1' : '/login'}
                target="_blank"
                underline="none"
              >
                Home
              </Link>
              <Link
                className="header-link"
                color="secondary.main"
                id="wallet-button"
                href="#"
                aria-controls={open ? 'wallet-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
                underline="none"
                sx={{ path: { strokeWidth: 2 }, svg: { marginBottom: '-3px' } }}
              >
                Pages {open ? <ArrowUp2 size="16" /> : <ArrowDown2 size="16" />}
              </Link>
              <Menu
                id="wallet-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  'aria-labelledby': 'wallet-button',
                  sx: { p: 1.25, minWidth: 150 }
                }}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right'
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right'
                }}
                sx={{ '.MuiModal-backdrop': { backgroundColor: 'unset' } }}
              >
                {listItems}
              </Menu>
              <Box sx={{ display: 'inline-block' }}>
                <AnimateButton>
                  <Button
                    component={Link}
                    href='/dashboard/default/'
                    target="_blank"
                    disableElevation
                    startIcon={<ExportSquare />}
                    color="success"
                    size="large"
                    variant="contained"
                  >
                    Explore our tools
                  </Button>
                </AnimateButton>
              </Box>
            </Stack>
            <Box
              sx={{
                width: '100%',
                alignItems: 'center',
                justifyContent: 'space-between',
                display: { xs: 'flex', md: 'none' }
              }}
            >
              <Typography sx={{ textAlign: 'left', display: 'inline-block' }}>
                <Logo to="/" />
              </Typography>
              <Stack direction="row" spacing={2}>
                {layout !== 'component' && (
                  <AnimateButton>
                    <Button
                      component={Link}
                      href='/dashboard/default/'
                      target="_blank"
                      disableElevation
                      startIcon={<ExportSquare />}
                      color="success"
                      size="large"
                      variant="contained"
                    >
                      Explore our tools
                    </Button>
                  </AnimateButton>
                )}
              </Stack>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </ElevationScroll>
  );
}

ElevationScroll.propTypes = { layout: PropTypes.string, children: PropTypes.node, window: PropTypes.any };

Header.propTypes = { layout: PropTypes.string, others: PropTypes.any };
