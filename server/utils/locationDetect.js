// locationDetect.js
const KoaRouter = require('koa-router');
const router = new KoaRouter();

// Radius in kilometers
const radiusKilometers = 1.5; //kilometers

// Convert kilometers to meters
const radiusMeters = radiusKilometers * 1000;

// Define a route handler for the '/detect-location' endpoint
router.post('/detect-location', async (ctx) => {
  // Extract user's coordinates from the request body
  const { latitude, longitude } = ctx.request.body;

  // Center coordinates
  const centerLatitude = -6.030084;
  const centerLongitude = 106.0693773;

  // Calculate distance between user's coordinates and center coordinates
  const distanceMeters = calculateDistance(centerLatitude, centerLongitude, latitude, longitude);

  // Check if the user is within the radar range
  const isOnRadar = distanceMeters <= radiusMeters;

  ctx.body = { isOnRadar, radiusMeters, centerLatitude, centerLongitude}; // Respond with whether the user is on radar or not
});

// Helper function to calculate distance between two coordinates (Haversine formula)
function calculateDistance(lat1, lon1, lat2, lon2) {
  const earthRadiusMeters = 6371000; // Radius of the earth in meters
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = earthRadiusMeters * c; // Distance in meters
  return distance;
}

function deg2rad(deg) {
  return deg * (Math.PI / 180);
}

module.exports = router;
