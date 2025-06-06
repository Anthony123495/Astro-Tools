import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';

// material-ui
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CardMedia from '@mui/material/CardMedia';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// project-imports
import MainCard from 'components/MainCard';
import Dot from 'components/@extended/Dot';
import IconButton from 'components/@extended/IconButton';
import Transitions from 'components/@extended/Transitions';
import AnimateButton from 'components/@extended/AnimateButton';
import { DRAWER_WIDTH, ThemeMode } from 'config';

// assets
import { Windows, ArrowRight3 } from 'iconsax-react';
import cardBack from 'assets/images/widget/img-dropbox-bg.svg';
import imageChart from 'assets/images/mega-menu/chart.svg';

// ==============================|| HEADER CONTENT - MEGA MENU SECTION ||============================== //

export default function MegaMenuSection() {
  const theme = useTheme();

  const anchorRef = useRef(null);
  const [open, setOpen] = useState(false);
  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  const iconBackColorOpen = theme.palette.mode === ThemeMode.DARK ? 'background.paper' : 'secondary.200';
  const iconBackColor = theme.palette.mode === ThemeMode.DARK ? 'background.default' : 'secondary.100';

  return (
    <Box sx={{ flexShrink: 0, ml: 0.75 }}>
      <IconButton
        color="secondary"
        variant="light"
        aria-label="open profile"
        ref={anchorRef}
        aria-controls={open ? 'profile-grow' : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
        size="large"
        sx={{ color: 'secondary.main', bgcolor: open ? iconBackColorOpen : iconBackColor, ml: { xs: 0, lg: -2 }, p: 1 }}
      >
        <Windows variant="Bulk" />
      </IconButton>
      <Popper
        placement="bottom"
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
        popperOptions={{ modifiers: [{ name: 'offset', options: { offset: [-180, 9] } }] }}
      >
        {({ TransitionProps }) => (
          <Transitions type="grow" position="top" in={open} {...TransitionProps}>
            <Paper
              sx={{
                boxShadow: theme.customShadows.z1,
                minWidth: 750,
                width: {
                  md: `calc(100vw - 100px)`,
                  lg: `calc(100vw - ${DRAWER_WIDTH + 100}px)`,
                  xl: `calc(100vw - ${DRAWER_WIDTH + 140}px)`
                },
                maxWidth: 1024,
                borderRadius: 1.5
              }}
            >
              <ClickAwayListener onClickAway={handleClose}>
                <MainCard elevation={0} border={false} content={false}>
                  <Grid container>
                    <Grid
                      item
                      xs={4}
                      sx={{
                        color: 'common.white',
                        bgcolor: theme.palette.mode === ThemeMode.DARK ? 'primary.400' : 'primary.darker',
                        position: 'relative',
                        '&:after': {
                          content: '""',
                          background: `url("${cardBack}") 100% / cover no-repeat`,
                          position: 'absolute',
                          top: '41%',
                          left: 0,
                          right: 0,
                          bottom: 0,
                          zIndex: 1,
                          opacity: 0.5
                        }
                      }}
                    >
                      <Box sx={{ p: 4.5, pb: 3, position: 'inherit', zIndex: 2 }}>
                        <Stack sx={{ color: 'background.paper' }}>
                          <Typography variant="h2" sx={{ fontSize: '1.875rem', mb: 1 }}>
                            Explore Our Tools
                          </Typography>
                          <Typography variant="h6">
                            Try our astronomy & astrophotography tools.
                          </Typography>
                          <Stack direction="row" justifyContent="space-between" alignItems="flex-end" sx={{ mt: -1 }}>
                            <AnimateButton>
                              <Button
                                variant="contained"
                                color="secondary"
                                sx={{
                                  bgcolor: 'background.paper',
                                  color: 'text.primary',
                                  '&:hover': { bgcolor: 'background.paper', color: 'text.primary' },
                                  zIndex: 2
                                }}
                                endIcon={<ArrowRight3 variant="Bulk" color={theme.palette.primary.main} />}
                                component={Link}
                                to="/components-overview/buttons"
                                target="_blank"
                              >
                                View All
                              </Button>
                            </AnimateButton>
                            <CardMedia component="img" src={imageChart} alt="Chart" sx={{ mr: -2.5, mb: -2.5, width: 124 }} />
                          </Stack>
                        </Stack>
                      </Box>
                    </Grid>
                    <Grid item xs={8}>
                      <Box
                        sx={{
                          p: 4,
                          '& .MuiList-root': { pb: 0 },
                          '& .MuiListSubheader-root': { p: 0, pb: 1.5 },
                          '& .MuiListItemButton-root': {
                            p: 0.5,
                            '&:hover': { bgcolor: 'transparent', '& .MuiTypography-root': { color: 'primary.main' } }
                          },
                          '& .MuiListItemIcon-root': { minWidth: 16 }
                        }}
                      >
                        <Grid container spacing={6}>
                          <Grid item xs={4}>
                            <List
                              component="nav"
                              aria-labelledby="nested-list-user"
                              subheader={
                                <ListSubheader id="nested-list-user">
                                  <Typography variant="subtitle1" color="text.primary">
                                    Authentication
                                  </Typography>
                                </ListSubheader>
                              }
                            >
                              <ListItemButton disableRipple component={Link} target="_blank" to="/">
                                <ListItemIcon>
                                  <Dot size={6} color="secondary" variant="outlined" />
                                </ListItemIcon>
                                <ListItemText primary="Framing Simulator" />
                              </ListItemButton>
                              <ListItemButton disableRipple component={Link} target="_blank" to="/">
                                <ListItemIcon>
                                  <Dot size={6} color="secondary" variant="outlined" />
                                </ListItemIcon>
                                <ListItemText primary="Eyepiece Field of View Simulator" />
                              </ListItemButton>
                            </List>
                          </Grid>
                          {
                          /*<Grid item xs={4}>
                            <List
                              component="nav"
                              aria-labelledby="nested-list-user"
                              subheader={
                                <ListSubheader id="nested-list-user">
                                  <Typography variant="subtitle1" color="text.primary">
                                    Other Pages
                                  </Typography>
                                </ListSubheader>
                              }
                            >
                              <ListItemButton disableRipple component={Link} to="#">
                                <ListItemIcon>
                                  <Dot size={6} color="secondary" variant="outlined" />
                                </ListItemIcon>
                                <ListItemText primary="About us" />
                              </ListItemButton>
                              <ListItemButton disableRipple component={Link} to="/contact-us" target="_blank">
                                <ListItemIcon>
                                  <Dot size={6} color="secondary" variant="outlined" />
                                </ListItemIcon>
                                <ListItemText primary="Contact us" />
                              </ListItemButton>
                              <ListItemButton disableRipple component={Link} to="/price/price1">
                                <ListItemIcon>
                                  <Dot size={6} color="secondary" variant="outlined" />
                                </ListItemIcon>
                                <ListItemText primary="Pricing" />
                              </ListItemButton>
                              <ListItemButton disableRipple component={Link} to="/apps/profiles/user/payment">
                                <ListItemIcon>
                                  <Dot size={6} color="secondary" variant="outlined" />
                                </ListItemIcon>
                                <ListItemText primary="Payment" />
                              </ListItemButton>
                              <ListItemButton disableRipple component={Link} target="_blank" to="/maintenance/under-construction">
                                <ListItemIcon>
                                  <Dot size={6} color="secondary" variant="outlined" />
                                </ListItemIcon>
                                <ListItemText primary="Construction" />
                              </ListItemButton>
                              <ListItemButton disableRipple component={Link} target="_blank" to="/maintenance/coming-soon">
                                <ListItemIcon>
                                  <Dot size={6} color="secondary" variant="outlined" />
                                </ListItemIcon>
                                <ListItemText primary="Coming Soon" />
                              </ListItemButton>
                            </List>
                          </Grid>
                          <Grid item xs={4}>
                            <List
                              component="nav"
                              aria-labelledby="nested-list-user"
                              subheader={
                                <ListSubheader id="nested-list-user">
                                  <Typography variant="subtitle1" color="text.primary">
                                    SAAS Pages
                                  </Typography>
                                </ListSubheader>
                              }
                            >
                              <ListItemButton disableRipple component={Link} target="_blank" to="/maintenance/404">
                                <ListItemIcon>
                                  <Dot size={6} color="secondary" variant="outlined" />
                                </ListItemIcon>
                                <ListItemText primary="404 Error" />
                              </ListItemButton>
                              <ListItemButton disableRipple component={Link} target="_blank" to="">
                                <ListItemIcon>
                                  <Dot size={6} color="secondary" variant="outlined" />
                                </ListItemIcon>
                                <ListItemText primary="Landing" />
                              </ListItemButton>
                            </List>
                          </Grid> */}
                          
                        </Grid>
                      </Box>
                    </Grid>
                  </Grid>
                </MainCard>
              </ClickAwayListener>
            </Paper>
          </Transitions>
        )}
      </Popper>
    </Box>
  );
}
