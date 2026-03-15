const express = require('express');
const path = require('path');
const app = express();

// 1. تحديد المجلد الذي يحتوي على تصميم الموقع (HTML)
app.use(express.static(path.join(__dirname, 'public')));

// 2. توجيه الزوار للصفحة الرئيسية
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// 3. تجهيز ملف robots.txt لأرشفة جوجل (مهم جداً للظهور في البحث)
app.get('/robots.txt', (req, res) => {
    res.type('text/plain');
    res.send("User-agent: *\nAllow: /\nSitemap: https://your-domain.com/sitemap.xml");
});

// 4. تجهيز خريطة الموقع sitemap.xml الوهمية (يمكنك تعديلها لاحقاً)
app.get('/sitemap.xml', (req, res) => {
    res.type('application/xml');
    res.send(`<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      <url>
        <loc>https://your-domain.com/</loc>
        <changefreq>daily</changefreq>
        <priority>1.0</priority>
      </url>
    </urlset>`);
});

// تشغيل الخادم
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`موقعك يعمل بنجاح، يمكنك زيارته عبر: http://localhost:${PORT}`);
});
