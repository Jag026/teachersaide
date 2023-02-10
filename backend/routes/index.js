const express = require('express');
const router = express.Router();
const apiRouter = require('./api');
const path = require("path");

router.use('/api', apiRouter);

//sitemap
router.get("/sitemap.xml", (req, res) => {
  const sitemapPath = path.resolve("routes/sitemap.xml");
  res.sendFile(sitemapPath);
});

router.get('/robots.txt', function (req, res) {
  res.type('text/plain');
  const robotPath = path.resolve("routes/robots.txt");
  res.sendFile(robotPath);
  //res.send("User-agent: *\nDisallow: /specific-page\nAllow: /");
});

// Static routes
// Serve React build files in production
if (process.env.NODE_ENV === 'production') {
  const path = require('path');
  // Serve the frontend's index.html file at the root route
  router.get('/', (req, res) => {
    res.cookie('XSRF-TOKEN', req.csrfToken());
    res.sendFile(
      path.resolve(__dirname, '../../frontend', 'build', 'index.html')
    );
  });

  // Serve the static assets in the frontend's build folder
  router.use(express.static(path.resolve("../frontend/build")));

  // Serve the frontend's index.html file at all other routes NOT starting with /api
  router.get(/^(?!\/?api).*/, (req, res) => {
    res.cookie('XSRF-TOKEN', req.csrfToken());
    res.sendFile(
      path.resolve(__dirname, '../../frontend', 'build', 'index.html')
    );
  });
}

// Add a XSRF-TOKEN cookie in development
if (process.env.NODE_ENV !== 'production') {
  router.get('/api/csrf/restore', (req, res) => {
    res.cookie('XSRF-TOKEN', req.csrfToken());
    res.status(201).json({});
  });
}

module.exports = router;
