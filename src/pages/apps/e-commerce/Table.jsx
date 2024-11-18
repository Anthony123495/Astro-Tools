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
    //Calculate Focal Ratio

    const CalculateValues = (
        aperture, 
        focalLength, 
        resolutionX,
        resolutionY,
        pixelSizeX,
        pixelSizeY,
        binning,
    ) => {
        const focalratio = focalLength/aperture
        const eff = focalLength
        const diag = Math.sqrt(Math.pow(resolutionX, 2) + Math.pow(resolutionY, 2))/eff * 57.3
        const res = pixelSizeX/eff * 206.265
        const resDawes = 116/aperture
        const resRay = 6.71*Math.pow(10, -7)/aperture
        const width = (resolutionX/eff)*57.3
        const height = (resolutionY/eff)*57.3

        setFocalRatio(`f / ${focalratio.toFixed(1)}`)
        setEffectiveFocalLength(eff) //En gros, les valeurs du dropdown pour le BarlowReducer, il va falloir indquier les valeurs... car si on fait : FL*reducer pis que reducer vaut 0.33X... le X est un String donc ça va afficher NaN... JS ne peut pas calculer cette valeur.
        setWidthHeight(`${width.toFixed(0)} x ${height.toFixed(0)}`)
        setDiagonal(diag.toFixed(0))
        setResolution(res.toFixed(4))
        setDawesResolution(resDawes.toFixed(4))
        setRayleighResolution(resRay)
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
                            <b>Effective Focal Length</b>
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
                            <b>Width x Height</b>
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
                            <b>Diagonal</b>
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
                            <b>Resolution</b>
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
                            <b>Dawes Resolution</b>
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
                            <b>Rayleigh Resolution</b>
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