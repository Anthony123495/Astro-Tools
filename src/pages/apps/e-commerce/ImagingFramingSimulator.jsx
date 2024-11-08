import React from 'react';
import {
  Box, Grid, Card, CardContent, Typography, Button, Tooltip, TextField, MenuItem,
  Dialog, DialogTitle, DialogContent, DialogActions, InputLabel, FormControl, Select,
  Chip} from '@mui/material';
import MainCard from 'components/MainCard';
import '../../../dependencies/framing_simulator/aladin'
import '../../../dependencies/framing_simulator/js_modal_camera'
import '../../../dependencies/framing_simulator/js_modal_telescope'
import '../../../dependencies/framing_simulator/calculator'

import { useMemo, useState } from 'react';

import Basic from './basic';
import Aladin from './Aladin';

export default function ImagingFramingSimulator() {

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

    function refreshCameraFrame() {
        if (!$("#camera_frames").length) return !1;
            switch (calculateValues(), $("#frame_1_rect").attr("width", frame_w_px), $("#frame_1_rect").attr("height", frame_h_px), $("#frame_1_rect").attr("x", frame_x), $("#frame_1_rect").attr("y", frame_y), $("#frame_1_principal").css("transform", "rotate(" + frame_rotation + "deg)"), $("#frame_1_rect").css("stroke", frame_color_line), $("#frame_1_text").attr("x", frame_x), $("#frame_1_text").attr("y", frame_y + frame_h_px + 20), $("#frame_1_text").text(res_fov_d_x.toFixed(2) + "º x " + res_fov_d_y.toFixed(2) + "º (F = " + Math.round(opt_focal_effective) + " mm)"), $("#frame_1_text").attr("fill", frame_color_line), $("#frame_1_text_camera").attr("fill", frame_color_line), $("#frame_1_text_camera").attr("x", frame_x), $("#frame_1_text_camera").attr("y", frame_y - 10), "" != aux_camera_model ? ($("#frame_1_text_camera").css("opacity", 1), $("#frame_1_text_camera").text(aux_camera_model)) : $("#frame_1_text_camera").css("opacity", 0), $("#frame_1_circle").attr("cx", Math.round(container_w / 2)), $("#frame_1_circle").attr("cy", Math.round(container_h / 2)), $("#frame_1_circle").attr("r", Math.round(Math.sqrt(frame_w_px ** 2 + frame_h_px ** 2) / 2)), $("#frame_1_circle").css("stroke", frame_circle_color), $("#frame_1_circle_text").css("fill", frame_circle_color), $("#frame_1_circle_text").attr("x", Math.round(container_w / 2)), $("#frame_1_circle_text").attr("y", Math.round(container_h / 2 + Math.sqrt(frame_w_px ** 2 + frame_h_px ** 2) / 2) + 15), $("#frame_circle_1").is(":checked") ? $("#frame_1_circle_g").css("opacity", 1) : $("#frame_1_circle_g").css("opacity", 0), $("#frame_1_disk").attr("cx", Math.round(container_w / 2)), $("#frame_1_disk").attr("cy", Math.round(container_h / 2)), $("#frame_1_disk").attr("r", Math.round(.5 * size[0] / fov[0] / 2)), $("#frame_1_disk_text").attr("x", Math.round(container_w / 2)), $("#frame_1_disk_text").attr("y", Math.round(container_h / 2 + Math.round(.5 * size[0] / fov[0] / 2)) + 20), $("#frame_disk").is(":checked") ? $("#frame_1_disk_g").css("opacity", 1) : $("#frame_1_disk_g").css("opacity", 0), $("#frame_1_third").attr("stroke", frame_line_color), $("#frame_1_diagonales").attr("stroke", frame_line_color), $("#frame_1_phi").attr("stroke", frame_line_color), $("#frame_1_third").css("transform", "rotate(" + frame_rotation + "deg)"), $("#frame_1_third_h1").attr("x1", Math.round(frame_x + frame_w_px / 3)), $("#frame_1_third_h1").attr("x2", Math.round(frame_x + frame_w_px / 3)), $("#frame_1_third_h1").attr("y1", frame_y), $("#frame_1_third_h1").attr("y2", frame_y + frame_h_px), $("#frame_1_third_h2").attr("x1", Math.round(frame_x + frame_w_px / 3 * 2)), $("#frame_1_third_h2").attr("x2", Math.round(frame_x + frame_w_px / 3 * 2)), $("#frame_1_third_h2").attr("y1", frame_y), $("#frame_1_third_h2").attr("y2", frame_y + frame_h_px), $("#frame_1_third_v1").attr("x1", frame_x), $("#frame_1_third_v1").attr("x2", frame_x + frame_w_px), $("#frame_1_third_v1").attr("y1", Math.round(frame_h_px / 3 + frame_y)), $("#frame_1_third_v1").attr("y2", Math.round(frame_h_px / 3 + frame_y)), $("#frame_1_third_v2").attr("x1", frame_x), $("#frame_1_third_v2").attr("x2", frame_x + frame_w_px), $("#frame_1_third_v2").attr("y1", Math.round(frame_h_px / 3 * 2 + frame_y)), $("#frame_1_third_v2").attr("y2", Math.round(frame_h_px / 3 * 2 + frame_y)), $("#frame_1_diagonales").css("transform", "rotate(" + frame_rotation + "deg)"), $("#frame_1_diagonales_d1").attr("x1", frame_x), $("#frame_1_diagonales_d1").attr("x2", frame_x + frame_h_px), $("#frame_1_diagonales_d1").attr("y1", frame_y), $("#frame_1_diagonales_d1").attr("y2", frame_y + frame_h_px), $("#frame_1_diagonales_d2").attr("x1", frame_x + frame_w_px), $("#frame_1_diagonales_d2").attr("x2", Math.round(container_w / 2 + frame_w_px / 2 - frame_h_px)), $("#frame_1_diagonales_d2").attr("y1", frame_y), $("#frame_1_diagonales_d2").attr("y2", frame_y + frame_h_px), $("#frame_1_diagonales_d3").attr("x1", Math.round(container_w / 2 + frame_w_px / 2 - frame_h_px)), $("#frame_1_diagonales_d3").attr("x2", frame_x + frame_w_px), $("#frame_1_diagonales_d3").attr("y1", frame_y), $("#frame_1_diagonales_d3").attr("y2", Math.round(container_h / 2 + frame_h_px / 2)), $("#frame_1_diagonales_d4").attr("x1", frame_x), $("#frame_1_diagonales_d4").attr("x2", frame_x + frame_h_px), $("#frame_1_diagonales_d4").attr("y1", frame_y + frame_h_px), $("#frame_1_diagonales_d4").attr("y2", frame_y), $("#frame_1_phi").css("transform", "rotate(" + frame_rotation + "deg)"), $("#frame_1_phi_h1").attr("x1", Math.round(container_w / 2 - frame_w_px / 2 + .618 * frame_w_px)), $("#frame_1_phi_h1").attr("x2", Math.round(container_w / 2 - frame_w_px / 2 + .618 * frame_w_px)), $("#frame_1_phi_h1").attr("y1", frame_y), $("#frame_1_phi_h1").attr("y2", frame_y + frame_h_px), $("#frame_1_phi_h2").attr("x1", Math.round(container_w / 2 - frame_w_px / 2 + frame_w_px - .618 * frame_w_px)), $("#frame_1_phi_h2").attr("x2", Math.round(container_w / 2 - frame_w_px / 2 + frame_w_px - .618 * frame_w_px)), $("#frame_1_phi_h2").attr("y1", frame_y), $("#frame_1_phi_h2").attr("y2", frame_y + frame_h_px), $("#frame_1_phi_v1").attr("x1", frame_x), $("#frame_1_phi_v1").attr("x2", frame_x + frame_w_px), $("#frame_1_phi_v1").attr("y1", Math.round(container_h / 2 - frame_h_px / 2 + frame_h_px - .618 * frame_h_px)), $("#frame_1_phi_v1").attr("y2", Math.round(container_h / 2 - frame_h_px / 2 + frame_h_px - .618 * frame_h_px)), $("#frame_1_phi_v2").attr("x1", frame_x), $("#frame_1_phi_v2").attr("x2", frame_x + frame_w_px), $("#frame_1_phi_v2").attr("y1", Math.round(container_h / 2 - frame_h_px / 2 + .618 * frame_h_px)), $("#frame_1_phi_v2").attr("y2", Math.round(container_h / 2 - frame_h_px / 2 + .618 * frame_h_px)), $("input[name=frame_line]:checked").val()) {
            case"frame_line_off":
                $("#frame_1_third, #frame_1_diagonales, #frame_1_phi").css("opacity", 0);
                break;
            case"frame_line_third":
                $("#frame_1_third").css("opacity", frame_line_opacity), $("#frame_1_diagonales").css("opacity", 0), $("#frame_1_phi").css("opacity", 0);
                break;
            case"frame_line_diag":
                $("#frame_1_third").css("opacity", 0), $("#frame_1_diagonales").css("opacity", frame_line_opacity), $("#frame_1_phi").css("opacity", 0);
                break;
            case"frame_line_phi":
                $("#frame_1_third").css("opacity", 0), $("#frame_1_diagonales").css("opacity", 0), $("#frame_1_phi").css("opacity", frame_line_opacity)
            }
    }

    function insertCameraFrame() {
        if ($("#camera_frames").length) return !1;
        if (calculateValues(), $("#btn_adjust_fov").attr("disabled", !1), (res_fov_diag > fov[0] || res_fov_diag > fov[1]) && adjust_fov(), $("#frame_circle_1").is(":checked")) var frame_1_circle_opacity = 1; else var frame_1_circle_opacity = 0;
        if ($("#frame_disk").is(":checked")) var frame_1_disk_opacity = 1; else var frame_1_disk_opacity = 0;
        if ("" != aux_camera_model) var frame_1_text_camara_opacity = 1; else var frame_1_text_camara_opacity = 0;
        switch ($("input[name=frame_line]:checked").val()) {
            case"frame_line_off":
                frame_line_opacity_third = 0, frame_line_opacity_diagonales = 0, frame_line_opacity_phi = 0;
                break;
        }
        var camera_frame_html = "";
        camera_frame_html += '<div id="camera_frames" style="position: absolute; pointer-events: none;">', camera_frame_html += '  <svg id="camera_frame_1" fill="transparent" xmlns="http://www.w3.org/2000/svg" width="' + container_w + '" height="' + container_h + '">', camera_frame_html += '    <g id="frame_1_principal" style="transform: rotate(' + frame_rotation + 'deg); transform-origin: center;">', camera_frame_html += '      <rect id="frame_1_rect" style="stroke-width: 2; stroke: ' + frame_color_line + ';" width="' + frame_w_px + '" height="' + frame_h_px + '" x="' + frame_x + '" y="' + frame_y + '"></rect>', camera_frame_html += '      <text id="frame_1_text" x="' + frame_x + '" y="' + (frame_y + frame_h_px + 20) + '" fill="' + frame_color_line + '" style="font-weight: bold; font-size: 1rem;">' + res_fov_d_x.toFixed(2) + "º x " + res_fov_d_y.toFixed(2) + "º (F = " + Math.round(opt_focal_effective) + " mm)</text>", camera_frame_html += '      <text id="frame_1_text_camera" x="' + frame_x + '" y="' + (frame_y - 10) + '" fill="' + frame_color_line + '" style="font-weight: bold; font-size: 1rem; opacity: ' + frame_1_text_camara_opacity + '">' + aux_camera_model + "</text>", camera_frame_html += "    </g>", camera_frame_html += '    <g id="frame_1_circle_g" style="opacity: ' + frame_1_circle_opacity + ';">', camera_frame_html += '      <circle id="frame_1_circle" style="stroke-width: 1; stroke: ' + frame_circle_color + ';" cx="' + Math.round(container_w / 2) + '" cy="' + Math.round(container_h / 2) + '" r="' + Math.round(Math.sqrt(frame_w_px ** 2 + frame_h_px ** 2) / 2) + '"></circle>', camera_frame_html += '      <text id="frame_1_circle_text" text-anchor="middle" x="' + Math.round(container_w / 2) + '" y="' + Math.round(container_h / 2 + Math.sqrt(frame_w_px ** 2 + frame_h_px ** 2) / 2) + '15" fill="' + frame_circle_color + '" style="font-weight: bold; font-size: 0.8rem;">⌀ ' + res_fov_diag.toFixed(2) + "º</text>", camera_frame_html += "    </g>", camera_frame_html += '    <g id="frame_1_disk_g" style="opacity: ' + frame_1_disk_opacity + ';">', camera_frame_html += '      <circle id="frame_1_disk" style="stroke-width: 1; stroke: #ffd138" fill="#ffd138" fill-opacity="0.2" cx="' + Math.round(container_w / 2) + '" cy="' + Math.round(container_h / 2) + '" r="' + Math.round(.5 * size[0] / fov[0] / 2) + '"></circle>', camera_frame_html += '      <text id="frame_1_disk_text" text-anchor="middle" x="' + Math.round(container_w / 2) + '" y="' + Math.round(container_h / 2 + Math.round(.5 * size[0] / fov[0] / 2)) + '20" fill="#ffd138" style="font-weight: bold; font-size: 0.8rem;">0.5º</text>', camera_frame_html += "    </g>", camera_frame_html += '    <g id="frame_1_third" stroke="#ffffff" style="opacity: ' + frame_line_opacity_third + "; transform: rotate(" + frame_rotation + 'deg); transform-origin: center;">', camera_frame_html += '      <line id="frame_1_third_h1" x1="' + Math.round(frame_x + frame_w_px / 3) + '" x2="' + Math.round(frame_x + frame_w_px / 3) + '" y1="' + frame_y + '" y2="' + (frame_y + frame_h_px) + '"></line>', camera_frame_html += '      <line id="frame_1_third_h2" x1="' + Math.round(frame_x + frame_w_px / 3 * 2) + '" x2="' + Math.round(frame_x + frame_w_px / 3 * 2) + '" y1="' + frame_y + '" y2="' + (frame_y + frame_h_px) + '"></line>', camera_frame_html += '      <line id="frame_1_third_v1" x1="' + frame_x + '" x2="' + (frame_x + frame_w_px) + '" y1="' + Math.round(frame_h_px / 3 + frame_y) + '" y2="' + Math.round(frame_h_px / 3 + frame_y) + '"></line>', camera_frame_html += '      <line id="frame_1_third_v2" x1="' + frame_x + '" x2="' + (frame_x + frame_w_px) + '" y1="' + Math.round(frame_h_px / 3 * 2 + frame_y) + '" y2="' + Math.round(frame_h_px / 3 * 2 + frame_y) + '"></line>', camera_frame_html += "    </g>", camera_frame_html += '    <g id="frame_1_diagonales" stroke="#ffffff" style="opacity: ' + frame_line_opacity_diagonales + "; transform: rotate(" + frame_rotation + 'deg); transform-origin: center;">', camera_frame_html += '      <line id="frame_1_diagonales_d1" x1="' + frame_x + '" x2="' + (frame_x + frame_h_px) + '" y1="' + frame_y + '" y2="' + (frame_y + frame_h_px) + '"></line>', camera_frame_html += '      <line id="frame_1_diagonales_d2" x1="' + (frame_x + frame_w_px) + '" x2="' + Math.round(container_w / 2 + frame_w_px / 2 - frame_h_px) + '" y1="' + frame_y + '" y2="' + (frame_y + frame_h_px) + '"></line>', camera_frame_html += '      <line id="frame_1_diagonales_d3" x1="' + Math.round(container_w / 2 + frame_w_px / 2 - frame_h_px) + '" x2="' + (frame_x + frame_w_px) + '" y1="' + frame_y + '" y2="' + Math.round(container_h / 2 + frame_h_px / 2) + '"></line>', camera_frame_html += '      <line id="frame_1_diagonales_d4" x1="' + frame_x + '" x2="' + (frame_x + frame_h_px) + '" y1="' + (frame_y + frame_h_px) + '" y2="' + frame_y + '"></line>', camera_frame_html += "    </g>", camera_frame_html += '    <g id="frame_1_phi" stroke="#ffffff" style="opacity: ' + frame_line_opacity_phi + "; transform: rotate(" + frame_rotation + 'deg); transform-origin: center;">', camera_frame_html += '      <line id="frame_1_phi_h1" x1="' + Math.round(container_w / 2 - frame_w_px / 2 + .618 * frame_w_px) + '" x2="' + Math.round(container_w / 2 - frame_w_px / 2 + .618 * frame_w_px) + '" y1="' + frame_y + '" y2="' + (frame_y + frame_h_px) + '"></line>', camera_frame_html += '      <line id="frame_1_phi_h2" x1="' + Math.round(container_w / 2 - frame_w_px / 2 + frame_w_px - .618 * frame_w_px) + '" x2="' + Math.round(container_w / 2 - frame_w_px / 2 + frame_w_px - .618 * frame_w_px) + '" y1="' + frame_y + '" y2="' + (frame_y + frame_h_px) + '"></line>', camera_frame_html += '      <line id="frame_1_phi_v1" x1="' + frame_x + '" x2="' + (frame_x + frame_w_px) + '" y1="' + Math.round(container_h / 2 - frame_h_px / 2 + frame_h_px - .618 * frame_h_px) + '" y2="' + Math.round(container_h / 2 - frame_h_px / 2 + frame_h_px - .618 * frame_h_px) + '"></line>', camera_frame_html += '      <line id="frame_1_phi_v2" x1="' + frame_x + '" x2="' + (frame_x + frame_w_px) + '" y1="' + Math.round(container_h / 2 - frame_h_px / 2 + .618 * frame_h_px) + '" y2="' + Math.round(container_h / 2 - frame_h_px / 2 + .618 * frame_h_px) + '"></line>', camera_frame_html += "    </g>", camera_frame_html += "  </svg>", camera_frame_html += "</div>", $(camera_frame_html).insertBefore(".aladin-reticle")
    }

    const handleChangeSurvey = (e) => {
        setSurvey(e.target.value)
    }

    const handleChangeFocalLength = (e) => {
        setFocalLength(e.target.value)
    }

    const handleChangeResolutionX = (e) => {
        setResolutionX(e.target.value)
    }

    const handleChangeResolutionY = (e) => {
        setResolutionY(e.target.value)
    }

    const handleChangeAperture = (e) => {
        setAperture(e.target.value)
    }

    const handleChangePixelX = (e) => {
        setPixelSizeX(e.target.value)
    }

    const handleChangePixelY = (e) => {
        setPixelSizeY(e.target.value)
    }

    const handleChangeBinning = (e) => {
        setBinning(e.target.value)
    }

    const handleChangeBarlowReducer = (e) => {
        setBarlowReducer(e.target.value)
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
                    value={Aperture}
                    onChange={handleChangeAperture}
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
                    value={FocalLength}
                    onChange={handleChangeFocalLength}
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
                    <Select value={BarlowReducer} onChange={handleChangeBarlowReducer} defaultValue="1" id="opt_reductor">
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
                  <TextField value={ResolutionX} onChange={handleChangeResolutionX} id="cam_resolution_x" type="number" defaultValue="5184" inputProps={{ min: 100, max: 50000 }} fullWidth />
                </Grid>
                <Grid item xs={1}>
                  <Typography>⨉</Typography>
                </Grid>
                <Grid item xs={3}>
                  <TextField value={ResolutionY} onChange={handleChangeResolutionY} id="cam_resolution_y" type="number" defaultValue="3456" inputProps={{ min: 100, max: 50000 }} fullWidth />
                </Grid>
              </Grid>
              <Grid container spacing={1} sx={{ marginTop: 2 }}>
                <Grid item xs={5}>
                  <Tooltip title="Pixels" placement="top">
                    <Typography>Pixel Size (px)</Typography>
                  </Tooltip>
                </Grid>
                <Grid item xs={3}>
                  <TextField value={PixelSizeX} onChange={handleChangePixelX} id="cam_pixel_x" type="number" defaultValue="4.3" inputProps={{ min: 0.1, max: 100 }} fullWidth />
                </Grid>
                <Grid item xs={1}>
                  <Typography>⨉</Typography>
                </Grid>
                <Grid item xs={3}>
                  <TextField value={PixelSizeY} onChange={handleChangePixelY} id="cam_pixel_y" type="number" defaultValue="4.3" inputProps={{ min: 0.1, max: 100}} step="0.1" fullWidth />
                </Grid>
              </Grid>
              <Grid container spacing={1} sx={{ marginTop: 2 }}>
                <Grid item xs={5}>
                  <Typography>Binning</Typography>
                </Grid>
                <Grid item xs={7}>
                  <FormControl fullWidth>
                    <InputLabel>Binning</InputLabel>
                    <Select value={Binning} onChange={handleChangeBinning} id="cam_binning" defaultValue="1">
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
                    onClick=""
                    fullWidth
                    id="btn_calculate"
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
                                <TextField id="aladin-search" placeholder="Search (ID or RA Dec)" type="search" fullWidth />
                            </FormControl>
                            <Button 
                                id="btn_adjust_fov"                     
                                title='Adjust FOV to camera frame size'
                            />
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

                    <Aladin Survey={Survey}/>

                    {/*<Basic />*/}
                </CardContent>
            </Card>
            <Card>
                <CardContent>
                    <Typography variant="h5" color="primary.main" gutterBottom>
                        Frame Rotation
                    </Typography>
                    <Chip id="frame_rotation_reset">
                        Reset
                    </Chip>
                    <input type="range" id="frame_rotation" step="1" min="-180" max="180" value="0" />
                    <Typography variant="h5" color="primary.main" gutterBottom>
                        Frame Color
                    </Typography>
                    <input type="color" id="frame_color_line" value="#abfb04" />
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
