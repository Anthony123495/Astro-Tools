import React, { useState, useEffect, useRef } from 'react';
import A from 'aladin-lite';
import { toPng } from "html-to-image";

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
  RA,
  DEC,
  setRA,
  setDEC,
  color,
}) => {
  const aladinRef = useRef(null);
  const aladinInstance = useRef(null); // Store the Aladin instance

  const [userSearchTarget, setUserSearchTarget] = useState(SearchTarget); // Separate state for user search

  useEffect(() => {
    // Initialize Aladin instance once
    if (!aladinInstance.current) {
      aladinInstance.current = A.aladin('#aladin-lite-div', {
        survey: Survey,
        fov: 3,
        target: userSearchTarget,
        showZoomControl: true,
        showFullscreenControl: false,
        showProjectionControl: false,
        showLayersControl: false,
      });
    }

    // Handle user search independently
    if (SearchTarget !== userSearchTarget) {
      setUserSearchTarget(SearchTarget); // Update user search state
      aladinInstance.current.gotoObject(SearchTarget); // Center on the new search target
    }

    // Calculate FOV dimensions based on input parameters
    const fovX = calculateFOV(focalLength, resolutionX, pixelSizeX, reducer);
    const fovY = calculateFOV(focalLength, resolutionY, pixelSizeY, reducer);

    // Add the FovBox for framing
    const fovBox = A.graphicOverlay({ color: color, lineWidth: 2 });
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
    fovBox.add(A.polygon(raDecCorners, { color: color, lineWidth: 2 }));
    aladinInstance.current.setFov(fovX+2)
    aladinInstance.current.setImageSurvey(Survey)

    DEC = setDEC(formatDEC(aladinInstance.current.getRaDec()[1]))
    RA = setRA(formatRA(aladinInstance.current.getRaDec()[0]))
    
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
    RA,
    DEC,
    color
  ]);

  // Screenshot function
  const takeScreenshot = async () => {
    const aladinDiv = document.getElementById("aladin-lite-div");
    try {
      const dataUrl = await toPng(aladinDiv);
      const link = document.createElement("a");
      link.download = "aladin-screenshot.png";
      link.href = dataUrl;
      link.click();
    } catch (error) {
      console.error("Error taking screenshot: ", error);
    }
  };
  
  const calculateFOV = (focalLength, resolution, pixelSize, reducer) => {
    // Apply the reducer to calculate the effective focal length
    const effectiveFocalLength = focalLength * reducer;
    
    // Sensor size (in mm) = Resolution * Pixel Size (in mm)
    const sensorSize = resolution * pixelSize;

    // Calculate the FOV (in degrees) = Sensor Size / Focal Length
    const fov = (sensorSize / 1000) / effectiveFocalLength;  // Focal length is usually in mm, so we divide sensor size by 1000 to convert mm to meters

    // Return the FOV in degrees
    return fov * (180 / Math.PI);  // Convert radians to degrees if needed
  };

  const formatDEC = (dec) => {
    const sign = dec < 0 ? "-" : "+";
    const absDec = Math.abs(dec);
    const degrees = Math.floor(absDec);
    const minutes = Math.floor((absDec - degrees) * 60);
    const seconds = ((absDec - degrees - minutes / 60) * 3600).toFixed(2);
    return `${sign}${degrees}° ${minutes}' ${seconds}"`;
  };

  const formatRA = (ra) => {
    const totalSeconds = ra * 3600 / 15; // Convert RA (in hours) to seconds
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = (totalSeconds % 60).toFixed(2);
    return `${hours}h ${minutes}m ${seconds}s`;
  };

  return (
    <div>
      <div id="aladin-lite-div" ref={aladinRef} style={{ width: '100%', height: '500px' }} />
      <button onClick={takeScreenshot} style={{ display: "none" }} id="hidden-screenshot-button">
          Take Screenshot
      </button>
    </div>
  );
};

export default Aladin;
