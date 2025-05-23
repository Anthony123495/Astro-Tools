import React from 'react';
import {
  Box, Grid, Card, CardContent, Typography, Button, Tooltip, TextField, MenuItem,
  Dialog, DialogTitle, DialogContent, DialogActions, InputLabel, FormControl, Select,
  Chip, IconButton} from '@mui/material';
import MainCard from 'components/MainCard';
import CircularSlider from '@fseehawer/react-circular-slider';
import { Circle } from '@uiw/react-color'
import {ArrowRotateLeft} from 'iconsax-react'
import Table from './Table';

import { useState } from 'react';

import Aladin from './Aladin';

export default function ImagingFramingSimulator() {

    const handleSaveImage = () => {
      const screenshotButton = document.getElementById("hidden-screenshot-button");
      if (screenshotButton) {
        screenshotButton.click();
      }
    };

    const [openCameraModal, setOpenCameraModal] = useState(false);
    const [openTelescopeModal, setOpenTelescopeModal] = useState(false);

    const handleOpenCameraModal = () => setOpenCameraModal(true);
    const handleCloseCameraModal = () => setOpenCameraModal(false);

    const handleOpenTelescopeModal = () => setOpenTelescopeModal(true);
    const handleCloseTelescopeModal = () => setOpenTelescopeModal(false);

    const [ResolutionX, setResolutionX] = useState('5184')
    const [ResolutionY, setResolutionY] = useState('3456')
    const [PixelSizeX, setPixelSizeX] = useState('4.3')
    const [PixelSizeY, setPixelSizeY] = useState('4.3')
    const [Aperture, setAperture] = useState('200')
    const [FocalLength, setFocalLength] = useState('1000')
    const [Survey, setSurvey] = useState('P/DSS2/color')
    const [Binning, setBinning] = useState('1')
    const [BarlowReducer, setBarlowReducer] = useState('1')
    const [SearchTarget, setSearchTarget] = useState('')
    const [triggerUpdate, setTriggerUpdate] = useState(false);
    const [ReducerBarlow, setReducerBarlow] = useState('') // Added a second Hook to be able to pass the final value onSubmitting as a prop
    const [Color, setColor] = useState('#F44E3B')

    const [Rotation, setRotation] = useState(0)

    const [RA, setRA] = useState('')
    const [DEC, setDEC] = useState('')

    const handleSearchTarget = (event) => {
      if (event.key === 'Enter') {
        setSearchTarget(event.target.value)
      }
    }

    const handleUpdateEquipment = (e) => {
        setTriggerUpdate(true);
        setTimeout(() => {
          setTriggerUpdate(false);
        }, 100); // Delay in milliseconds (adjust as needed)
        setFocalLength(document.getElementById('opt_focal').value)
        setAperture(document.getElementById('opt_aperture').value)
        setResolutionX(document.getElementById('cam_resolution_x').value)
        setResolutionY(document.getElementById('cam_resolution_y').value)
        setPixelSizeX(document.getElementById('cam_pixel_x').value)
        setPixelSizeY(document.getElementById('cam_pixel_y').value)
        setBinning(document.getElementById('cam_binning').value)
        setReducerBarlow(BarlowReducer)
    };

    const handleBarlowReducer = (e) => {
        setBarlowReducer(e.target.value)
    }

    const handleChangeSurvey = (e) => {
        setSurvey(e.target.value)
    }

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
                      id="opt_aperture"
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
                      id="opt_focal"
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
                      <Select defaultValue="1" id="opt_reductor" onChange={handleBarlowReducer} value={BarlowReducer}>
                        <MenuItem value="1" selected>None</MenuItem>

                        {/* Reducers */}
                        <MenuItem value="0.33">0.33x (reducer)</MenuItem>
                        <MenuItem value="0.4">0.4x (reducer)</MenuItem>
                        <MenuItem value="0.5">0.5x (reducer)</MenuItem>
                        <MenuItem value="0.63">0.63x (reducer)</MenuItem>
                        <MenuItem value="0.67">0.67x (reducer)</MenuItem>
                        <MenuItem value="0.7">0.7x (reducer)</MenuItem>
                        <MenuItem value="0.72">0.72x (reducer)</MenuItem>
                        <MenuItem value="0.73">0.73x (reducer)</MenuItem>
                        <MenuItem value="0.8">0.8x (reducer)</MenuItem>
                        <MenuItem value="0.85">0.85x (reducer)</MenuItem>

                        {/* Barlows */}
                        <MenuItem value="1.15">1.15x (Barlow)</MenuItem>
                        <MenuItem value="1.5">1.5x (Barlow)</MenuItem>
                        <MenuItem value="1.6">1.6x (Barlow)</MenuItem>
                        <MenuItem value="2">2x (Barlow)</MenuItem>
                        <MenuItem value="2.25">2.25x (Barlow)</MenuItem>
                        <MenuItem value="2.5">2.5x (Barlow)</MenuItem>
                        <MenuItem value="2.75">2.75x (Barlow)</MenuItem>
                        <MenuItem value="3">3x (Barlow)</MenuItem>
                        <MenuItem value="4">4x (Barlow)</MenuItem>
                        <MenuItem value="4.2">4.2x (Barlow)</MenuItem>
                        <MenuItem value="5">5x (Barlow)</MenuItem>
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
                    <TextField id="cam_resolution_x" type="number" defaultValue="5184" inputProps={{ min: 100, max: 50000 }} fullWidth />
                  </Grid>
                  <Grid item xs={1}>
                    <Typography>⨉</Typography>
                  </Grid>
                  <Grid item xs={3}>
                    <TextField id="cam_resolution_y" type="number" defaultValue="3456" inputProps={{ min: 100, max: 50000 }} fullWidth />
                  </Grid>
                </Grid>
                <Grid container spacing={1} sx={{ marginTop: 2 }}>
                  <Grid item xs={5}>
                    <Tooltip title="Pixels" placement="top">
                      <Typography>Pixel Size (px)</Typography>
                    </Tooltip>
                  </Grid>
                  <Grid item xs={3}>
                    <TextField id="cam_pixel_x" type="number" defaultValue="4.3" inputProps={{ step: 0.1, min: 0.1, max: 100 }} fullWidth />
                  </Grid>
                  <Grid item xs={1}>
                    <Typography>⨉</Typography>
                  </Grid>
                  <Grid item xs={3}>
                    <TextField id="cam_pixel_y" type="number" defaultValue="4.3" inputProps={{ step: 0.1, min: 0.1, max: 100 }} fullWidth />
                  </Grid>
                </Grid>
                <Grid container spacing={1} sx={{ marginTop: 2 }}>
                  <Grid item xs={5}>
                    <Typography>Binning</Typography>
                  </Grid>
                  <Grid item xs={7}>
                    <FormControl fullWidth>
                      <InputLabel>Binning</InputLabel>
                      <Select id="cam_binning" defaultValue="1">
                        <MenuItem value="1">1 ⨉ 1</MenuItem>
                        <MenuItem value="2">2 ⨉ 2</MenuItem>
                        <MenuItem value="3">3 ⨉ 3</MenuItem>
                        <MenuItem value="4">4 ⨉ 4</MenuItem>
                        <MenuItem value="5">5 ⨉ 5</MenuItem>
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
                    fullWidth
                    id="btn_calculate"
                    onClick={handleUpdateEquipment}
                >
                    Update Equipment
                </Button>
                <input 
                    type="radio" 
                    name="frame_line" 
                    value="frame_line_off" 
                    checked
                    hidden
                />
                </CardContent>
            </Card>
        </Grid>
        <br />
        <Grid item xs={12} md={6}>
            <Card variant="outlined">
                <CardContent>
                    <Typography variant="h5" color="primary.main" gutterBottom>
                        Options
                    </Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={6}>
                            <FormControl fullWidth>
                                <TextField onKeyDown={handleSearchTarget} id="aladin_search" placeholder="Search (ID or RA Dec)" type="search" fullWidth />
                            </FormControl>
                            <Button 
                                id="btn_adjust_fov"                     
                                title='Adjust FOV to camera frame size'
                            />
                            <Typography variant="h6" color="" gutterBottom>
                                Declination (DEC) of <b>{DEC}</b>
                                <br />
                                Right Ascension (RA) of <b>{RA}</b>
                            </Typography>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <FormControl fullWidth>
                                <InputLabel>Survey</InputLabel>
                                <Select value={Survey} onChange={handleChangeSurvey} id="aladin_survey" defaultValue="P/DSS2/color">
                                    <MenuItem value="P/DSS2/color">DSS2 Color</MenuItem>
                                    <MenuItem value="P/DSS2/blue">DSS2 Blue</MenuItem>
                                    <MenuItem value="CDS/P/DSS2/red">DSS2 Red</MenuItem>
                                    <MenuItem value="P/2MASS/color">2MASS Color</MenuItem>
                                    <MenuItem value="P/allWISE/color">allWISE Color</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </Grid>
        <br />
        <Grid item xs={12} md={6}>
            <Card variant="outlined">
                <CardContent>
                    <Typography variant="h5" color="primary.main" gutterBottom>
                        Result
                    </Typography>

                    {/* Aladin Result here */}

                    <Aladin rotation={Rotation} color={Color} setDEC={setDEC} setRA={setRA} DEC={DEC} RA={RA} reducer={ReducerBarlow} Survey={Survey} pixelSizeX={PixelSizeX} pixelSizeY={PixelSizeY} triggerUpdate={triggerUpdate} SearchTarget={SearchTarget} aperture={Aperture} focalLength={FocalLength} resolutionX={ResolutionX} resolutionY={ResolutionY} binning={Binning} />
                    <br />
                    <Button 
                      variant="shadow"
                      color="primary"
                      fullWidth
                      onClick={handleSaveImage}
                    >
                      Save Image!
                    </Button>

                    {/*<Basic />*/}
                </CardContent>
            </Card>
        </Grid>
        <br />
        <Grid item xs={12} md={6}>
            <Card variant="outlined">
                <CardContent>
                  <Grid container spacing='1'>
                      <Grid item xs={6} direction="column">
                          <Typography variant="h5" color="primary.main" gutterBottom>
                              Frame Rotation
                              <Tooltip title="Reset the Rotation">
                                <IconButton onClick={() => setRotation(0)} aria-label="Reset the Rotation" size="large">
                                  <ArrowRotateLeft variant="Bold" />
                                </IconButton>
                              </Tooltip>
                          </Typography>
                          <CircularSlider
                                min={0}
                                max={360}
                                direction={1}
                                knobPosition="right"
                                label='ANGLE of the selected frame'
                                appendToValue="°"
                                valueFontSize="4rem"
                                trackColor="#eeeeee"
                                progressColorFrom={Color}
                                progressColorTo={Color}
                                labelColor={Color}
                                knobColor= {Color}
                                value={Rotation}
                                onChange={(value) => setRotation(value)}
                            />   
                        </Grid>
                        <Grid item xs={6} direction="column">        
                            <Typography variant="h5" color="primary.main" gutterBottom>
                              Frame Color of the selected frame
                            </Typography>
                            <Circle
                              colors={[
                            '#f44336',
                            '#e91e63',
                            '#9c27b0',
                            '#673ab7',
                            '#3f51b5',
                            '#2196f3',
                          ]}
                          color={Color}
                          pointProps={{
                            style: {
                              marginRight: 20,
                            },
                          }}
                          onChange={(color) => {
                            setColor(color.hex);
                              }}
                            />
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </Grid>
        <br />
        <Table reducer={ReducerBarlow} pixelSizeX={PixelSizeX} pixelSizeY={PixelSizeY} triggerUpdate={triggerUpdate} SearchTarget={SearchTarget} aperture={Aperture} focalLength={FocalLength} resolutionX={ResolutionX} resolutionY={ResolutionY} binning={Binning}/>
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
