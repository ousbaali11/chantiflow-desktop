// preload.js
//
// Signale au site qu'il tourne à l'intérieur du logiciel de bureau
// (pas dans un navigateur classique) — utilisé notamment pour cacher
// le bouton "Télécharger le logiciel" quand on est déjà dedans.

const { contextBridge } = require("electron");

contextBridge.exposeInMainWorld("chantiflowDesktop", true);
