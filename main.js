const { app, BrowserWindow, dialog, ipcMain } = require('electron')
const path = require('path')

// Creates the window for the electron-app.
const createWindow = () => {
    const win = new BrowserWindow({
      width: 800,
      height: 600,
      webPreferences: {
          nodeIntegration: true,
          contextIsolation: false,
      },
    })
  
    win.loadFile('index.html')

// Reads the contents of the array into the display in the HTML file after the
// website finishes loading.
    win.webContents.on('did-finish-load', () => {
      const nameArray = ["Display for Velocity"];
      var data = "";
      for(let i = 0; i < nameArray.length; i++) {
        data = nameArray[i];
        win.webContents.send('send-data', data);
      }
    });

  }


  // Creates a singular pop-up display for the web-app.
  function showMessage() {
    dialog.showMessageBox({
        type: 'info',
        buttons: ['Proceed'],
        title: 'Welcome',
        message: 'Electric Racing Sensors and Microcontrollers Display App.',
        detail: '',
    })
  }

  //Loads the HTML file's format onto the electron-app and any other displays.
  app.whenReady().then(() => {
      createWindow()
      showMessage()
  })

  // Closes electron-app.
  app.on('window-all-closed', () => {
      if (process.platform !== 'darwin') app.quit()
  })
