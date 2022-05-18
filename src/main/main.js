const { app, BrowserView, BrowserWindow, shell } = require("electron");
let win, cone, ctwo;
let isMac = process.platform === "darwin";

const newWin = () => {
  win = new BrowserWindow({
    width: 1280,
    height: 960,
  });
};

const handleUrlOpen = (e, url) => {
  if (!url.match(/google.com/)) {
    e.preventDefault();
    shell.openExternal(url);
  }
};

app.on("ready", () => {
  newWin();
  win.setMenu(null);
  win.maximize();
  cone = new BrowserView({
    frame: false,
    webPreferences: {
      scrollBounce: true,
    },
  });
  cone.webContents.loadURL("https://classroom.google.com/");
  win.addBrowserView(cone);
  cone.setBounds({
    width: win.getContentSize()[0] / 2,
    height: win.getContentSize()[1],
    x: 0,
    y: 0,
  });
  cone.setAutoResize({
    horizontal: true,
    vertical: true,
  });
  cone.webContents.on("dom-ready", () => {
    cone.webContents.setVisualZoomLevelLimits(1, 10);
  });

  ctwo = new BrowserView({
    frame: false,
    webPreferences: {
      scrollBounce: true,
    },
  });
  ctwo.webContents.loadURL("https://classroom.google.com/");
  win.addBrowserView(ctwo);
  ctwo.setBounds({
    width: win.getContentSize()[0] / 2,
    height: win.getContentSize()[1],
    x: win.getContentSize()[0] / 2,
    y: 0,
  });
  ctwo.setAutoResize({
    horizontal: true,
    vertical: true,
  });
  ctwo.webContents.on("dom-ready", () => {
    ctwo.webContents.setVisualZoomLevelLimits(1, 10);
  });

  cone.webContents.on("will-navigate", handleUrlOpen);
  cone.webContents.on("new-window", handleUrlOpen);
  ctwo.webContents.on("will-navigate", handleUrlOpen);
  ctwo.webContents.on("new-window", handleUrlOpen);
});

app.on("activate", () => {
  if (win === null) newWin();
});

app.on("window-all-closed", () => {
  if (!isMac) app.quit();
  win = null;
});
