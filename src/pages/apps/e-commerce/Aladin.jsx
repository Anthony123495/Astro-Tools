import React, { useState, useEffect, useRef } from 'react';
import A from 'aladin-lite';

const Aladin = ({
  SearchTarget,
  triggerUpdate,
  aperture,
  focalLength,
  reducer,
  resolutionX,
  resolutionY,
  pixelSizeX,
  pixelSizeY,
  binning,
  Survey,
}) => {
  const aladinRef = useRef(null);
  const aladinInstance = useRef(null); // Store the Aladin instance

  const [labels, setLabels] = useState([]);

  useEffect(() => {
    // Initialize Aladin instance once
    if (!aladinInstance.current) {
      aladinInstance.current = A.aladin('#aladin-lite-div', {
        survey: Survey,
        fov: 3,  // Default FOV, adjusted later dynamically
        target: SearchTarget,  // Object name or RA/Dec
        showZoomControl: !0,
        showFullscreenControl: !1,
        showProjectionControl: !1,
        showLayersControl: !1,
      });
    }

    // Calculate FOV dimensions based on input parameters
    const fovX = calculateFOV(focalLength, resolutionX, pixelSizeX);
    const fovY = calculateFOV(focalLength, resolutionY, pixelSizeY);

    // Add the FovBox for framing
    const fovBox = A.graphicOverlay({ color: 'green', lineWidth: 2 });
    aladinInstance.current.addOverlay(fovBox);

    // Define the center based on the current target
    const center = aladinInstance.current.getRaDec();

    // Calculate the half dimensions of the FOV
    const halfFovX = fovX / 2;
    const halfFovY = fovY / 2;

    // Define the corners of the rectangle based on the center and FOV
    const raDecCorners = [
      [center[0] - halfFovX, center[1] - halfFovY], // Bottom-left corner
      [center[0] + halfFovX, center[1] - halfFovY], // Bottom-right corner
      [center[0] + halfFovX, center[1] + halfFovY], // Top-right corner
      [center[0] - halfFovX, center[1] + halfFovY], // Top-left corner
    ];

    // Add the rectangle as a polygon to the overlay (instead of polyline)
    fovBox.add(A.polygon(raDecCorners, { color: 'green', lineWidth: 2 }));
    aladinInstance.current.setFov(fovX+2)
    aladinInstance.current.setImageSurvey(Survey)
    aladinInstance.current.gotoObject(SearchTarget)
    
}, [
    triggerUpdate,
    SearchTarget,
    Survey,
    aperture,
    focalLength,
    reducer,
    resolutionX,
    resolutionY,
    pixelSizeX,
    pixelSizeY,
    binning,
  ]);

  const calculateFOV = (focalLength, resolution, pixelSize) => {
    // Sensor size (in mm) = Resolution * Pixel Size (in mm)
    const sensorSize = resolution * pixelSize;

    // Calculate the FOV (in degrees) = Sensor Size / Focal Length
    const fov = (sensorSize / 1000) / focalLength;  // Focal length is usually in mm, so we divide sensor size by 1000 to convert mm to meters

    // Return the FOV in degrees
    return fov * (180 / Math.PI);  // Convert radians to degrees if needed
  };

  return <div id="aladin-lite-div" ref={aladinRef} style={{ width: '100%', height: '500px' }} />;
};

export default Aladin;
