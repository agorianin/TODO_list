import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const publicDir = path.join(__dirname, "public");

// Serve static assets
app.use(express.static(publicDir, {
    etag: true,
    lastModified: true,
    maxAge: "1h"
}));

// Ensure correct content-type for manifest
app.get("/manifest.webmanifest", (req, res) => {
    res.setHeader("Content-Type", "application/manifest+json");
    res.sendFile(path.join(publicDir, "manifest.webmanifest"));
});

// Ensure SW served with correct content-type and no aggressive caching while developing
app.get("/sw.js", (req, res) => {
    res.setHeader("Content-Type", "text/javascript");
    res.setHeader("Cache-Control", "no-cache");
    res.sendFile(path.join(publicDir, "sw.js"));
});

// SPA-style: serve index.html on /
app.get("/", (req, res) => {
    res.sendFile(path.join(publicDir, "index.html"));
});

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on http://localhost:${port}`));
