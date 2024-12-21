import { join } from "node:path";
import { electronApp, is, optimizer } from "@electron-toolkit/utils";
import { BrowserWindow, app, ipcMain, shell } from "electron";
import { HoshiAPIChannel } from "hoshi-models";
import icon from "../../resources/icon.png?asset";
import HoshiAPIDispatcher from "./api/dispatcher";

const apiDispatcher = new HoshiAPIDispatcher();

async function createWindowAsync(): Promise<void> {
  const frame = process.platform === "darwin";
  // noinspection SpellCheckingInspection
  const fullscreenable = process.platform === "darwin";

  // Create the browser window.
  // noinspection SpellCheckingInspection
  const mainWindow = new BrowserWindow({
    width: 1080,
    height: 670,
    show: false,
    autoHideMenuBar: true,
    titleBarStyle: "hiddenInset",
    frame,
    fullscreenable,
    ...(process.platform === "linux" ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, "../preload/index.js"),
      sandbox: false,
    },
  });

  await apiDispatcher.initializeAsync(mainWindow);

  mainWindow.on("ready-to-show", () => {
    mainWindow.show();
  });

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url).then();
    return { action: "deny" };
  });

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env.ELECTRON_RENDERER_URL) {
    mainWindow.loadURL(process.env.ELECTRON_RENDERER_URL).then();
  } else {
    mainWindow.loadFile(join(__dirname, "../renderer/index.html")).then();
  }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId("com.electron");

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on("browser-window-created", (_, window) => {
    optimizer.watchWindowShortcuts(window);
  });

  ipcMain.handle(HoshiAPIChannel, (ev, method: string, ...args) =>
    apiDispatcher.dispatchAsync(ev.sender, method, ...args),
  );

  createWindowAsync().then();

  app.on("activate", () => {
    // On macOS, it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindowAsync().then();
  });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
