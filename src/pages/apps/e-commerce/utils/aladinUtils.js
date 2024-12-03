export const rotateCorners = (corners, center, angle) => {
    const rad = (Math.PI / 180) * angle;
    const sin = Math.sin(rad);
    const cos = Math.cos(rad);
  
    return corners.map(([ra, dec]) => {
      const deltaRa = ra - center[0];
      const deltaDec = dec - center[1];
  
      const rotatedRa = deltaRa * cos - deltaDec * sin + center[0];
      const rotatedDec = deltaRa * sin + deltaDec * cos + center[1];
  
      return [rotatedRa, rotatedDec];
    });
  };
  
  export const calculateFOV = (focalLength, resolution, pixelSize, reducer) => {
    const effectiveFocalLength = focalLength * reducer;
    const sensorSize = resolution * pixelSize;
    const fov = (sensorSize / 1000) / effectiveFocalLength;
    return fov * (180 / Math.PI);
  };
  
  export const formatDEC = (dec) => {
    const sign = dec < 0 ? "-" : "+";
    const absDec = Math.abs(dec);
    const degrees = Math.floor(absDec);
    const minutes = Math.floor((absDec - degrees) * 60);
    const seconds = ((absDec - degrees - minutes / 60) * 3600).toFixed(2);
    return `${sign}${degrees}° ${minutes}' ${seconds}"`;
  };
  
  export const formatRA = (ra) => {
    const totalSeconds = ra * 3600 / 15;
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = (totalSeconds % 60).toFixed(2);
    return `${hours}h ${minutes}m ${seconds}s`;
  };
  
  export const moveBox = (box, deltaRa, deltaDec) => {
    const newCenter = [box.center[0] + deltaRa, box.center[1] + deltaDec];
    const newCorners = box.originalCorners.map(([ra, dec]) => [
      ra + deltaRa,
      dec + deltaDec,
    ]);
    
    return {
      ...box,
      center: newCenter,
      originalCorners: newCorners,
      raDecCorners: rotateCorners(newCorners, newCenter, box.rotation || 0),
    };
  };