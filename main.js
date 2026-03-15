const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow () {
  // إعدادات نافذة البرنامج
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    minWidth: 800,
    minHeight: 600,
    icon: path.join(__dirname, 'icon.ico'), // يمكنك إضافة أيقونة لبرنامجك هنا
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  });

  // تحميل ملف HTML الخاص بالتطبيق
  win.loadFile('index.html');
  
  // إخفاء شريط القوائم العلوي (File, Edit, View...) لجعله يبدو كبرنامج مستقل
  win.setMenuBarVisibility(false);
}

// تشغيل النافذة عند جاهزية التطبيق
app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

// إغلاق البرنامج عند إغلاق كافة النوافذ (باستثناء أجهزة ماك)
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
