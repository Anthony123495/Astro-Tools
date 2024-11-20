//TODO: Quand l'utilisateur pèse sur la boîte, la boite bouge où il veut qu'elle aille
//TODO: La rotation de la boîte devrait se faire sur la dernière boîte sélectionnée
//TODO: Un bouton qui clear toutes les boîtes existantes
//TODO: les modals Search Telescope & Search Camera
//TODO: Ajouter des labels en-dessous de chaque boîte

import React, { useState, useEffect, useRef } from 'react';
import A from 'aladin-lite';
import { toPng } from "html-to-image";

const Aladin = ({
  SearchTarget,
  triggerUpdate,
  focalLength,
  reducer,
  resolutionX,
  resolutionY,
  pixelSizeX,
  pixelSizeY,
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

  const rotateCorners = (corners, center, angle) => {
    const rad = (Math.PI / 180) * angle; // Convert degrees to radians
    const sin = Math.sin(rad);
    const cos = Math.cos(rad);
  
    return corners.map(([ra, dec]) => {
      const deltaRa = ra - center[0]; // Offset RA from the center
      const deltaDec = dec - center[1]; // Offset DEC from the center
  
      const rotatedRa = deltaRa * cos - deltaDec * sin + center[0]; // Rotate RA
      const rotatedDec = deltaRa * sin + deltaDec * cos + center[1]; // Rotate DEC
  
      return [rotatedRa, rotatedDec];
    });
  };

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
      aladinInstance.current.gotoObject(SearchTarget); // Center on the search target
      DEC = setDEC(formatDEC(aladinInstance.current.getRaDec()[1])); // Update DEC
      RA = setRA(formatRA(aladinInstance.current.getRaDec()[0])); // Update RA
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
        originalCorners: raDecCorners, // Save the unrotated corners
      };
      setFovBoxes((prevBoxes) => [...prevBoxes, newBox]); // Add the box to state
  
      // Adjust Aladin's zoom and re-center the view
      aladinInstance.current.gotoRaDec(center[0], center[1]); // Center on the box

      // Adjust the FoV to fit the box within the Aladin viewport
      const paddingFactor = 2; // Add a small padding around the box
      const maxFov = Math.max(fovX, fovY) * paddingFactor; // Scale FOV to fit the box
      aladinInstance.current.setFoV(maxFov); // Set the adjusted FOV

      DEC = setDEC(formatDEC(aladinInstance.current.getRaDec()[1])); // Update DEC
      RA = setRA(formatRA(aladinInstance.current.getRaDec()[0])); // Update RA
    }
  }, [triggerUpdate]);

  useEffect(() => {
    if (fovBoxes.length > 0) {
      setFovBoxes((prevBoxes) => {
        const updatedBoxes = [...prevBoxes];
        const latestBox = updatedBoxes[updatedBoxes.length - 1];

        // Always rotate from the original corners
        latestBox.rotation = rotation;
        latestBox.raDecCorners = rotateCorners(latestBox.originalCorners, latestBox.center, rotation);

        return updatedBoxes; // Return updated boxes array
      });
    }
  }, [rotation]);

  useEffect(() => {
    if (overlayRef.current) {
      // Clear all existing elements
      overlayRef.current.removeAll();

      // Redraw all FOV boxes with the current color
      fovBoxes.forEach((box) => {
        overlayRef.current.add(A.polygon(box.raDecCorners, { color, lineWidth: 2 })); // Draw the rotated box
      });
    }
  }, [fovBoxes, color]);

  // Screenshot function
  const takeScreenshot = async () => {
    const aladinDiv = document.getElementById("aladin-lite-div");
    try {
      const dataUrl = await toPng(aladinDiv); // Capture Aladin Lite view as PNG
      const link = document.createElement("a");
      link.download = "aladin-screenshot.png"; // Name of the downloaded file
      link.href = dataUrl;
      link.click(); // Trigger download
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
    const fov = (sensorSize / 1000) / effectiveFocalLength;  // Convert mm to meters

    // Return the FOV in degrees
    return fov * (180 / Math.PI);  // Convert radians to degrees
  };

  const formatDEC = (dec) => {
    const sign = dec < 0 ? "-" : "+";
    const absDec = Math.abs(dec);
    const degrees = Math.floor(absDec);
    const minutes = Math.floor((absDec - degrees) * 60);
    const seconds = ((absDec - degrees - minutes / 60) * 3600).toFixed(2);
    return `${sign}${degrees}° ${minutes}' ${seconds}"`; // Format DEC as string
  };

  const formatRA = (ra) => {
    const totalSeconds = ra * 3600 / 15; // Convert RA to seconds
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = (totalSeconds % 60).toFixed(2);
    return `${hours}h ${minutes}m ${seconds}s`; // Format RA as string
  };

  return (
    <div>
      <div id="aladin-lite-div" ref={aladinRef} style={{ width: '100%', height: '1000px' }} />
      <button onClick={takeScreenshot} style={{ display: "none" }} id="hidden-screenshot-button">
          Take Screenshot
      </button>
    </div>
  );
};

export default Aladin;
