import React, { useState } from 'react';
import {
  Box, Grid, Card, CardContent, Typography, Button, Tooltip, TextField, MenuItem,
  Dialog, DialogTitle, DialogContent, DialogActions, InputLabel, FormControl, Select,
} from '@mui/material';
import MainCard from 'components/MainCard';

export default function ImagingFramingSimulator() {



    const [openCameraModal, setOpenCameraModal] = useState(false);
  const [openTelescopeModal, setOpenTelescopeModal] = useState(false);

  const handleOpenCameraModal = () => setOpenCameraModal(true);
  const handleCloseCameraModal = () => setOpenCameraModal(false);

  const handleOpenTelescopeModal = () => setOpenTelescopeModal(true);
  const handleCloseTelescopeModal = () => setOpenTelescopeModal(false);

  return (
    <MainCard>
    <Box sx={{ padding: 2 }}>
      {/* Telescope and Camera Info */}
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Card variant="outlined">
            <CardContent>
                    <Typography variant="h5" color="warning.main" gutterBottom>
                        Telescope / Lens
                    </Typography>
                    <Button
                        variant="shadow"
                        color="warning"
                        onClick={handleOpenTelescopeModal}
                        fullWidth
                    >
                        Search Telescope/Lens
                    </Button>
              <Grid container spacing={1} sx={{ marginTop: 2 }}>
                <Grid item xs={5}>
                  <Tooltip title="Millimeters" placement="top">
                    <Typography>Aperture (mm)</Typography>
                  </Tooltip>
                </Grid>
                <Grid item xs={7}>
                  <TextField
                    type="number"
                    defaultValue="200"
                    inputProps={{ min: 30, max: 2000 }}
                    fullWidth
                  />
                </Grid>
              </Grid>
              <Grid container spacing={1} sx={{ marginTop: 2 }}>
                <Grid item xs={5}>
                  <Tooltip title="Millimeters" placement="top">
                    <Typography>Focal Length (mm)</Typography>
                  </Tooltip>
                </Grid>
                <Grid item xs={7}>
                  <TextField
                    type="number"
                    defaultValue="1000"
                    inputProps={{ min: 10, max: 10000 }}
                    fullWidth
                  />
                </Grid>
              </Grid>
              <Grid container spacing={1} sx={{ marginTop: 2 }}>
                <Grid item xs={5}>
                  <Typography>Reducer / Barlow</Typography>
                </Grid>
                <Grid item xs={7}>
                  <FormControl fullWidth>
                    <InputLabel>Reducer / Barlow</InputLabel>
                    <Select defaultValue="1">
                      <MenuItem value="1">None</MenuItem>
                      <MenuItem value="0.33">0.33x (reducer)</MenuItem>
                      <MenuItem value="2">2x (Barlow)</MenuItem>
                      {/* Add other options as necessary */}
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card variant="outlined">
            <CardContent>
              <Typography variant="h5" color="warning.main" gutterBottom>
                Camera
              </Typography>
              <Button
                variant="shadow"
                color="warning"
                onClick={handleOpenCameraModal}
                fullWidth
              >
                Search Camera
              </Button>
              <Grid container spacing={1} sx={{ marginTop: 2 }}>
                <Grid item xs={5}>
                  <Tooltip title="Pixels" placement="top">
                    <Typography>Resolution (px)</Typography>
                  </Tooltip>
                </Grid>
                <Grid item xs={3}>
                  <TextField type="number" defaultValue="5184" inputProps={{ min: 100, max: 50000 }} fullWidth />
                </Grid>
                <Grid item xs={1}>
                  <Typography>⨉</Typography>
                </Grid>
                <Grid item xs={3}>
                  <TextField type="number" defaultValue="3456" inputProps={{ min: 100, max: 50000 }} fullWidth />
                </Grid>
              </Grid>
              <Grid container spacing={1} sx={{ marginTop: 2 }}>
                <Grid item xs={5}>
                  <Tooltip title="Pixels" placement="top">
                    <Typography>Pixel Size (px)</Typography>
                  </Tooltip>
                </Grid>
                <Grid item xs={3}>
                  <TextField type="number" defaultValue="4.3" inputProps={{ min: 0.1, max: 100 }} fullWidth />
                </Grid>
                <Grid item xs={1}>
                  <Typography>⨉</Typography>
                </Grid>
                <Grid item xs={3}>
                  <TextField type="number" defaultValue="4.3" inputProps={{ min: 0.1, max: 100}} step="0.1" fullWidth />
                </Grid>
              </Grid>
              <Grid container spacing={1} sx={{ marginTop: 2 }}>
                <Grid item xs={5}>
                  <Typography>Reducer / Barlow</Typography>
                </Grid>
                <Grid item xs={7}>
                  <FormControl fullWidth>
                    <InputLabel>Reducer / Barlow</InputLabel>
                    <Select defaultValue="1">
                      <MenuItem value="1">None</MenuItem>
                      <MenuItem value="0.33">0.33x (reducer)</MenuItem>
                      <MenuItem value="2">2x (Barlow)</MenuItem>
                      {/* Add other options as necessary */}
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
        <br />
        <Grid item xs={12} md={6}>
            <Card variant="outlined">
                <CardContent>
                <Button
                    variant="shadow"
                    color="primary"
                    onClick=""
                    fullWidth
                >
                    Update Equipment
                </Button>
                </CardContent>
            </Card>
        </Grid>

        <br />

        <Grid item xs={12} md={6}>
            <Card variant="outlined">
                <CardContent>
                    <Typography variant="h5" color="primary.main" gutterBottom>
                        Target Options
                    </Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={6}>
                            <FormControl fullWidth>
                                <TextField id="filled-search" placeholder="Search (ID or RA Dec)" type="search" fullWidth />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <FormControl fullWidth>
                                <InputLabel>Survey</InputLabel>
                                <Select defaultValue="1">
                                <MenuItem value="1">None</MenuItem>
                                <MenuItem value="0.33">0.33x (reducer)</MenuItem>
                                <MenuItem value="2">2x (Barlow)</MenuItem>
                                {/* Add other options as necessary */}
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </Grid>

      {/* Camera Modal */}
      <Dialog open={openCameraModal} onClose={handleCloseCameraModal}>
        <DialogTitle>Camera</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Search Camera"
            type="search"
            fullWidth
            variant="outlined"
          />
          {/* Add table or camera list here */}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseCameraModal}>Close</Button>
        </DialogActions>
      </Dialog>

      {/* Telescope Modal */}
      <Dialog open={openTelescopeModal} onClose={handleCloseTelescopeModal}>
        <DialogTitle>Telescope / Lens</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Search Telescope"
            type="search"
            fullWidth
            variant="outlined"
          />
          {/* Add table or telescope list here */}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseTelescopeModal}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
    </MainCard>
  );
}
