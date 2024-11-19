import React, { useState, useEffect, useRef } from 'react';
import {
    Box, Grid, Card, CardContent, Typography, Button, Tooltip, TextField, MenuItem,
    Dialog, DialogTitle, DialogContent, DialogActions, InputLabel, FormControl, Select,
    Chip, Divider} from '@mui/material';
import { red } from '@mui/material/colors';

const Table = ({
  triggerUpdate,
  aperture,
  focalLength,
  reducer,
  resolutionX,
  resolutionY,
  pixelSizeX,
  pixelSizeY,
  binning,
}) => {

    //Calculations - Table at the bottom
    const [FocalRatio, setFocalRatio] = useState('-')
    const [EffectiveFocalLength, setEffectiveFocalLength] = useState('-')
    const [WidthHeight, setWidthHeight] = useState('-')
    const [Diagonal, setDiagonal] = useState('-')
    const [Resolution, setResolution] = useState('-')
    const [DawesResolution, setDawesResolution] = useState('-')
    const [RayleighResolution, setRayleighResolution] = useState('-')


    useEffect(() => {
        CalculateValues(
            aperture,
            reducer,
            focalLength,
            resolutionX,
            resolutionY,
            pixelSizeX,
            pixelSizeY,
            binning,
        )
    }, [
        triggerUpdate,
        aperture,
        focalLength,
        reducer,
        resolutionX,
        resolutionY,
        pixelSizeX,
        pixelSizeY,
        binning,
    ])

    const CalculateValues = (
        aperture,
        reducer, 
        focalLength, 
        resolutionX,
        resolutionY,
        pixelSizeX,
        pixelSizeY,
        binning,
    ) => {
        const eff = focalLength*reducer
        const focalratio = eff/aperture
        const diag = Math.sqrt(Math.pow(resolutionX*pixelSizeX, 2) + Math.pow(resolutionY*pixelSizeY, 2)) 
        const res = (pixelSizeX/eff) * 206.265 //Pixel Scale
        const resDawes = 116/aperture //arcseconds
        const resRay = 138/aperture //arcseconds
        const width = ((resolutionX*pixelSizeX)/eff)*(206.265/60) //FOV in arcminutes
        const height = ((resolutionY*pixelSizeY)/eff)*(206.265/60) //FOV in arcminutes

        setFocalRatio(`f / ${focalratio.toFixed(1)}`)
        setEffectiveFocalLength(eff.toFixed(1)) 
        setWidthHeight(`${width.toFixed(1)} x ${height.toFixed(1)}`)
        setDiagonal(diag.toFixed(1))
        setResolution(res.toFixed(3))
        setDawesResolution(resDawes.toFixed(3))
        setRayleighResolution(resRay.toFixed(3))
    }


    return (
        <>
            <Grid item xs={12} md={6}>
                <Card variant="outlined">
                    <CardContent>
                        <Typography variant="h5" color="primary.main" gutterBottom>
                            Calculations
                        </Typography>
                        <Grid item xs={12}>
                        <Grid container justifyContent="space-between" alignItems="center">
                        <Grid item>
                            <Typography variant="body1" color="text.primary">
                            <b>Focal Ratio</b>
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Typography variant="body1" color="text.secondary">
                            {FocalRatio}
                            </Typography>
                        </Grid>
                        </Grid>
                        <Divider sx={{ my: 1 }} />
                    </Grid>

                    {/* Effective Focal Length */}
                    <Grid item xs={12}>
                        <Grid container justifyContent="space-between" alignItems="center">
                        <Grid item>
                            <Typography variant="body1" color="text.primary">
                            <b>Effective Focal Length</b> (mm)
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Typography variant="body1" color="text.secondary">
                            {EffectiveFocalLength}
                            </Typography>
                        </Grid>
                        </Grid>
                        <Divider sx={{ my: 1 }} />
                    </Grid>

                    {/* Field of View (FOV) */}
                    <Grid item xs={12}>
                        <Grid container justifyContent="space-between" alignItems="center">
                        <Grid item>
                            <Typography variant="body1" color="text.primary">
                            <b>Field of View (FOV)</b>
                            </Typography>
                        </Grid>
                        </Grid>
                        <Grid container justifyContent="space-between" alignItems="center">
                        <Grid item>
                            <Typography variant="body2" color="text.secondary" sx={{ ml: 2 }}>
                            <b>Width x Height</b> (arcminutes)
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Typography variant="body1" color="text.secondary">
                                {WidthHeight}
                            </Typography>
                        </Grid>
                        </Grid>
                        <Grid container justifyContent="space-between" alignItems="center">
                        <Grid item>
                            <Typography variant="body2" color="text.secondary" sx={{ ml: 2 }}>
                            <b>Diagonal</b> (arcminutes)
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Typography variant="body1" color="text.secondary">
                                {Diagonal}
                            </Typography>
                        </Grid>
                        </Grid>
                        <Divider sx={{ my: 1 }} />
                    </Grid>

                    {/* Resolution */}
                    <Grid item xs={12}>
                        <Grid container justifyContent="space-between" alignItems="center">
                        <Grid item>
                            <Typography variant="body1" color="text.primary">
                            <b>Resolution</b> (Pixel Scale)
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Typography variant="body1" color="text.secondary">
                            {Resolution}
                            </Typography>
                        </Grid>
                        </Grid>
                        <Divider sx={{ my: 1 }} />
                    </Grid>

                    {/* Dawes Resolution */}
                    <Grid item xs={12}>
                        <Grid container justifyContent="space-between" alignItems="center">
                        <Grid item>
                            <Typography variant="body1" color="text.primary">
                            <b>Dawes Resolution</b> (arcseconds)
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Typography variant="body1" color="text.secondary">
                            {DawesResolution}
                            </Typography>
                        </Grid>
                        </Grid>
                        <Divider sx={{ my: 1 }} />
                    </Grid>

                    {/* Rayleigh Resolution */}
                    <Grid item xs={12}>
                        <Grid container justifyContent="space-between" alignItems="center">
                        <Grid item>
                            <Typography variant="body1" color="text.primary">
                            <b>Rayleigh Resolution</b> (arcseconds)
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Typography variant="body1" color="text.secondary">
                            {RayleighResolution}
                            </Typography>
                        </Grid>
                        </Grid>
                        <Divider sx={{ my: 1 }} />
                    </Grid>
                    </CardContent>
                </Card>
            </Grid>
        </>
    );
};

export default Table