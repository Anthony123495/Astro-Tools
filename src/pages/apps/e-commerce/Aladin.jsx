import React, { useState, useEffect, useRef } from 'react';
import A from 'aladin-lite';
import { toPng } from "html-to-image";
import { rotateCorners, calculateFOV, formatDEC, formatRA, moveBox } from './utils/aladinUtils';
import './styles/Aladin.css';

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
  const aladinInstance = useRef(null);
  const overlayRef = useRef(null);
  const polygonsRef = useRef(new Map());
  const [fovBoxes, setFovBoxes] = useState([]);
  const [selectedBoxId, setSelectedBoxId] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [lastMousePosition, setLastMousePosition] = useState(null);
  const [boxColors, setBoxColors] = useState({});

  console.log(fovBoxes)

  useEffect(() => {
    if (!aladinInstance.current) {
      aladinInstance.current = A.aladin('#aladin-lite-div', {
        survey: Survey,
        fov: 3,
        target: SearchTarget,
        showZoomControl: true,
        showFullscreenControl: false,
        showProjectionControl: false,
        showLayersControl: false,
        cooFrame: 'J2000',
      });

      overlayRef.current = A.graphicOverlay({ color });
      aladinInstance.current.addOverlay(overlayRef.current);

      // Handle mouse events on the Aladin view
      aladinInstance.current.on('mousedown', function(event) {
        const worldCoords = aladinInstance.current.pix2world(event.x, event.y);
        if (!worldCoords) return;

        const [ra, dec] = worldCoords;
        const clickedBox = fovBoxes.find(box => {
          // Simple bounding box check
          const corners = box.raDecCorners;
          const minRa = Math.min(...corners.map(c => c[0]));
          const maxRa = Math.max(...corners.map(c => c[0]));
          const minDec = Math.min(...corners.map(c => c[1]));
          const maxDec = Math.max(...corners.map(c => c[1]));
          
          return ra >= minRa && ra <= maxRa && dec >= minDec && dec <= maxDec;
        });

        if (clickedBox) {
          event.preventDefault();
          setSelectedBoxId(clickedBox.id);
          setIsDragging(true);
          setLastMousePosition([event.x, event.y]);
        } else {
          setSelectedBoxId(null);
        }
      });

      aladinInstance.current.on('mousemove', function(event) {
        if (isDragging && selectedBoxId && lastMousePosition) {
          const deltaX = event.x - lastMousePosition[0];
          const deltaY = event.y - lastMousePosition[1];

          const currentFov = aladinInstance.current.getFov()[0];
          const pixelScale = currentFov / aladinRef.current.clientWidth;
          
          const deltaRa = deltaX * pixelScale;
          const deltaDec = -deltaY * pixelScale;

          setFovBoxes(prevBoxes =>
            prevBoxes.map(box => {
              if (box.id === selectedBoxId) {
                return moveBox(box, deltaRa, deltaDec);
              }
              return box;
            })
          );

          setLastMousePosition([event.x, event.y]);
        }
      });

      aladinInstance.current.on('mouseup', function() {
        setIsDragging(false);
        setLastMousePosition(null);
      });
    }

    aladinInstance.current.setImageSurvey(Survey);

    if (SearchTarget) {
      aladinInstance.current.gotoObject(SearchTarget);
      setDEC(formatDEC(aladinInstance.current.getRaDec()[1]));
      setRA(formatRA(aladinInstance.current.getRaDec()[0]));
    }
  }, [SearchTarget, Survey]);

  //new box creation
  useEffect(() => {
    if (triggerUpdate) {
      const fovX = calculateFOV(focalLength, resolutionX, pixelSizeX, reducer);
      const fovY = calculateFOV(focalLength, resolutionY, pixelSizeY, reducer);
      const center = aladinInstance.current.getRaDec();
      const halfFovX = fovX / 2;
      const halfFovY = fovY / 2;


      const raDecCorners = [
        [center[0] - halfFovX, center[1] - halfFovY],
        [center[0] + halfFovX, center[1] - halfFovY],
        [center[0] + halfFovX, center[1] + halfFovY],
        [center[0] - halfFovX, center[1] + halfFovY],
      ];

      const newBox = {
        id: Date.now(),
        raDecCorners,
        center,
        originalCorners: raDecCorners,
        rotation: 0,
        color: color,
      };

      setFovBoxes(prevBoxes => [...prevBoxes, newBox]);
      setSelectedBoxId(newBox.id);
      setBoxColors(prev => ({ ...prev, [newBox.id]: color }));

      aladinInstance.current.gotoRaDec(center[0], center[1]);
      const maxFov = Math.max(fovX, fovY) * 2;
      aladinInstance.current.setFoV(maxFov);

      setDEC(formatDEC(aladinInstance.current.getRaDec()[1]));
      setRA(formatRA(aladinInstance.current.getRaDec()[0]));
    }
  }, [triggerUpdate]);

  //selected box update rotation 
  useEffect(() => {
    if (selectedBoxId && rotation !== undefined) {
      setFovBoxes(prevBoxes => 
        prevBoxes.map(box => {
          if (box.id === selectedBoxId) {
            const updatedBox = {
              ...box,
              rotation,
            };
            updatedBox.raDecCorners = rotateCorners(
              updatedBox.originalCorners,
              updatedBox.center,
              rotation
            );
            return updatedBox;
          }
          return box;
        })
      );
    }
  }, [rotation, selectedBoxId]);

  //selected box update color
  useEffect(() => {
    if (selectedBoxId && color) {
      setBoxColors(prev => ({
        ...prev,
        [selectedBoxId]: color
      }));
    }
  }, [color, selectedBoxId]);

  //update fov boxes
  useEffect(() => {
    if (overlayRef.current) {
      overlayRef.current.removeAll();
      polygonsRef.current.clear();
      
      fovBoxes.forEach((box) => {
        const polygon = A.polygon(box.raDecCorners, {
          color: boxColors[box.id] || color,
          lineWidth: box.id === selectedBoxId ? 3 : 2,
        });
        
        polygonsRef.current.set(box.id, polygon);
        overlayRef.current.add(polygon);
      });
    }
  }, [fovBoxes, boxColors, selectedBoxId]);

  //clear all existing boxes
  const clearAllBoxes = () => {
    if (overlayRef.current) {
      overlayRef.current.removeAll();
      polygonsRef.current.clear();
      setFovBoxes([]);
      setSelectedBoxId(null);
      setBoxColors({});
    }
  };

  //take screenshot
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

  return (
    <div className="aladin-container">
      <div 
        id="aladin-lite-div" 
        ref={aladinRef} 
        style={{ width: '100%', height: '1000px' }}
      />
      <div className="box-controls">
        <button onClick={clearAllBoxes} className="control-button">
          Clear All Boxes
        </button>
        <button 
          onClick={takeScreenshot} 
          style={{ display: "none" }} 
          id="hidden-screenshot-button"
        >
          Take Screenshot
        </button>
      </div>
    </div>
  );
};

export default Aladin;