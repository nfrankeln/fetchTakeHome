export default function getBoundingBox(latitude, longitude, distanceInMiles) {
    const earthRadiusInMiles = 3963.2; // radius of the earth in miles
    const angularDistance = distanceInMiles / earthRadiusInMiles;

    const lat1 = (Math.PI / 180) * latitude;
    const lon1 = (Math.PI / 180) * longitude;

    // Calculate the latitudes of the top and bottom points of the bounding box
    const latTop = Math.asin(Math.sin(lat1) * Math.cos(angularDistance) + Math.cos(lat1) * Math.sin(angularDistance) * Math.cos(0));
    const latBottom = Math.asin(Math.sin(lat1) * Math.cos(angularDistance) + Math.cos(lat1) * Math.sin(angularDistance) * Math.cos(Math.PI));

    // Calculate the longitudes of the left and right points of the bounding box
    const latRadius = Math.cos(Math.PI / 2 - latTop) * earthRadiusInMiles;
    const lonOffsetLeft = Math.asin(Math.sin(angularDistance) / Math.cos(latTop));
    const lonOffsetRight = Math.asin(Math.sin(angularDistance) / Math.cos(latBottom));
    const lonLeft = lon1 - lonOffsetLeft;
    const lonRight = lon1 + lonOffsetRight;

    // Convert the latitudes and longitudes back to degrees and store them in an object
    const boundingBox = {
        "top_right": {
            lat: (180 / Math.PI) * latTop,
            lon: (180 / Math.PI) * lonRight,
        },
        "bottom_left": {
            lat: (180 / Math.PI) * latBottom,
            lon: (180 / Math.PI) * lonLeft,
        },
    };

    return boundingBox;
}

  