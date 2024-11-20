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
  rotation,
}) => {
  const aladinRef = useRef(null);
  const aladinInstance = useRef(null); // Store the Aladin instance
  const overlayRef = useRef(null); // Graphic overlay for all boxes

  const [fovBoxes, setFovBoxes] = useState([]);


  useEffect(() => {
    // Initialize Aladin instance once
    if (!aladinInstance.current) {
      aladinInstance.current = A.aladin('#aladin-lite-div', {
        survey: Survey,
        fov: 3,
        target: SearchTarget,
        showZoomControl: true,
        showFullscreenControl: false,
        showProjectionControl: false,
        showLayersControl: false,
      });

      // Add a graphic overlay for drawing boxes
      overlayRef.current = A.graphicOverlay();
      aladinInstance.current.addOverlay(overlayRef.current);
    }

    // Update the survey when Survey prop changes
    aladinInstance.current.setImageSurvey(Survey);

    if (SearchTarget) {
      aladinInstance.current.gotoObject(SearchTarget);
      DEC = setDEC(formatDEC(aladinInstance.current.getRaDec()[1]))
      RA = setRA(formatRA(aladinInstance.current.getRaDec()[0]))
    }
  }, [SearchTarget, Survey]);
  

  useEffect(() => {
    if (triggerUpdate) {

    // Calculate FOV dimensions based on input parameters
    const fovX = calculateFOV(focalLength, resolutionX, pixelSizeX, reducer);
    const fovY = calculateFOV(focalLength, resolutionY, pixelSizeY, reducer);

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

    const newBox = {
      raDecCorners,
      center,
    };
    setFovBoxes((prevBoxes) => [...prevBoxes, newBox]) // Add the box to state
  
     // Adjust Aladin's zoom and re-center the view
     aladinInstance.current.gotoRaDec(center[0], center[1]); // Center on the box

     // Adjust the FoV to fit the box within the Aladin viewport
     const paddingFactor = 2; // Add a small padding around the box
     const maxFov = Math.max(fovX, fovY) * paddingFactor; // Scale FOV to fit the box
     aladinInstance.current.setFoV(maxFov); // Set the adjusted FOV

     DEC = setDEC(formatDEC(aladinInstance.current.getRaDec()[1]))
     RA = setRA(formatRA(aladinInstance.current.getRaDec()[0]))
  }
}, [triggerUpdate]);

  useEffect(() => {
    if (overlayRef.current) {
      // Clear all existing elements
      overlayRef.current.removeAll();

      // Redraw all FOV boxes with the current color
      fovBoxes.forEach((box) => {
        overlayRef.current.add(A.polygon(box.raDecCorners, { color, lineWidth: 2 }));
      });
    }
  }, [fovBoxes, color]);

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
