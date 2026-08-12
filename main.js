// main.js
//
// Point d'entrée de l'application de bureau Chantiflow. Ouvre une
// fenêtre native qui affiche le vrai site en direct
// (https://www.chantiflow.fr) — c'est ce qui garantit que tout ce que
// l'Admin change sur le site (thème, forfaits, services visibles...)
// apparaît automatiquement ici aussi, sans rien à synchroniser à la
// main : c'est littéralement la même page, juste dans une fenêtre
// différente. Nécessite une connexion internet, comme le site lui-même.

const { app, BrowserWindow, shell, Menu } = require("electron");
const path = require("path");

// Adresse du site — à adapter si jamais le domaine change un jour.
const SITE_URL = "https://www.chantiflow.fr";

function createWindow() {
  const win = new BrowserWindow({
    width: 1280,
    height: 800,
    minWidth: 960,
    minHeight: 600,
    icon: path.join(__dirname, "build", "icon.png"),
    title: "Chantiflow",
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,
      nodeIntegration: false,
    },
    backgroundColor: "#1B2A33",
    show: false,
  });

  win.once("ready-to-show", () => win.show());
  win.loadURL(SITE_URL);

  // Les liens qui s'ouvriraient normalement dans un nouvel onglet
  // (ex: "Nous contacter" par email, PayPal...) s'ouvrent dans le
  // navigateur par défaut de l'ordinateur plutôt que dans une nouvelle
  // fenêtre de l'application.
  win.webContents.setWindowOpenHandler(({ url }) => {
    shell.openExternal(url);
    return { action: "deny" };
  });

  // Si la connexion internet est absente ou le site injoignable,
  // affiche un message clair plutôt qu'un écran blanc silencieux.
  win.webContents.on("did-fail-load", (event, errorCode, errorDescription) => {
    if (errorCode === -3) return; // navigation annulée normalement (ex: téléchargement), pas une vraie erreur
    win.loadURL(
      "data:text/html;charset=utf-8," +
        encodeURIComponent(`
        <html><body style="font-family: sans-serif; background: #1B2A33; color: white; display: flex; align-items: center; justify-content: center; height: 100vh; margin: 0; text-align: center;">
          <div>
            <h2>Connexion impossible</h2>
            <p>Vérifie ta connexion internet, puis réessaie.</p>
            <p style="opacity: 0.6; font-size: 12px;">${errorDescription}</p>
          </div>
        </body></html>
      `)
    );
  });
}

// Menu simplifié — retire les entrées de développement inutiles pour
// une utilisation normale (garde juste Édition, pour le copier-coller,
// et Affichage, pour zoomer/recharger).
function buildMenu() {
  const template = [
    {
      label: "Édition",
      submenu: [{ role: "cut" }, { role: "copy" }, { role: "paste" }, { role: "selectAll" }],
    },
    {
      label: "Affichage",
      submenu: [
        { role: "reload" },
        { role: "resetZoom" },
        { role: "zoomIn" },
        { role: "zoomOut" },
        { type: "separator" },
        { role: "togglefullscreen" },
      ],
    },
  ];
  Menu.setApplicationMenu(Menu.buildFromTemplate(template));
}

app.whenReady().then(() => {
  buildMenu();
  createWindow();
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
