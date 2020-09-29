"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var electron_1 = require("electron");
var events_1 = require("events");
var clipboardy_1 = require("clipboardy");
events_1.EventEmitter.defaultMaxListeners = 15;
var linky = function (url) {
    if (url.includes('https://')) {
        electron_1.shell.openExternal(url);
    }
    else {
        electron_1.shell.openExternal("https://" + url);
    }
};
var shurp = function (shortUrl, domain) {
    if (domain === void 0) { domain = 'meet.google.com'; }
    var url = 'https://' + domain + '/' + shortUrl;
    return url;
};
var isMac = process.platform === 'darwin';
var isHidden = false;
var tray;
var win;
isMac ? electron_1.app.dock.hide() : null;
electron_1.app.setAppUserModelId(process.execPath);
var icon = electron_1.nativeImage.createFromPath(electron_1.app.getAppPath() + "/src/assets/logo.ico");
var icon_alpha = electron_1.nativeImage.createFromPath(electron_1.app.getAppPath() + "/src/assets/tray-icon.png");
var notify = function (title, body) {
    new electron_1.Notification({
        title: title,
        body: body,
        icon: icon,
    }).show();
};
var openMeet = function (code) {
    isHidden = false;
    var _a = electron_1.screen.getPrimaryDisplay().workAreaSize, width = _a.width, height = _a.height;
    win = new electron_1.BrowserWindow({
        width: width * 0.7,
        height: height * 0.7,
        icon: icon,
    });
    win.on('close', function (event) {
        if (!isHidden) {
            event.preventDefault();
        }
        win === null || win === void 0 ? void 0 : win.hide();
    });
    win.on('hide', function () {
        isHidden = true;
    });
    win.loadURL('https://meet.google.com/' + code);
    win.on('closed', function () {
        win = null;
    });
    electron_1.Menu.setApplicationMenu(null);
};
var createTray = function () {
    tray = new electron_1.Tray(icon);
    var contextMenu = electron_1.Menu.buildFromTemplate([
        {
            label: 'Meet Notifier',
            icon: icon_alpha,
            enabled: false,
        },
        { type: 'separator' },
        //Item
        {
            label: 'Banco de Dados',
            click: function () { return __awaiter(void 0, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, linky(shurp('rod-icuv-cxi'))];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            }); },
            submenu: [
                {
                    label: 'Open Meet',
                    click: function () {
                        openMeet('rod-icuv-cxi');
                    },
                },
                {
                    label: 'Open on Browser',
                    click: function () {
                        linky(shurp('rod-icuv-cxi'));
                    },
                },
                {
                    label: 'Copy Link',
                    click: function () {
                        clipboardy_1.writeSync(shurp('rod-icuv-cxi'));
                    },
                },
            ],
        },
        //Item
        {
            label: 'TCC',
            click: function () { return __awaiter(void 0, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, linky(shurp('pzz-zdpr-qpt'))];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            }); },
            submenu: [
                {
                    label: 'Abrir Meet',
                    click: function () {
                        openMeet('pzz-zdpr-qpt');
                    },
                },
                {
                    label: 'Abrir no Navegador',
                    click: function () {
                        linky(shurp('pzz-zdpr-qpt'));
                    },
                },
                {
                    label: 'Copiar Link',
                    click: function () {
                        clipboardy_1.writeSync(shurp('pzz-zdpr-qpt'));
                    },
                },
            ],
        },
        { type: 'separator' },
        {
            label: 'Help',
            submenu: [
                {
                    label: 'Learn more',
                    click: function () {
                        linky('github.com/pmqueiroz/meet-notifier');
                    },
                },
                {
                    label: 'Report Issue',
                    click: function () {
                        linky('github.com/pmqueiroz/meet-notifier/issues');
                    },
                },
            ],
        },
        isMac ? { role: 'close' } : { role: 'quit' },
    ]);
    tray.setToolTip('Meet Notifier');
    tray.setContextMenu(contextMenu);
    tray.on('double-click', function () {
        return notify('Banco de Dados', 'Próxima reunião em 20 minutos');
    });
    tray.on('click', function () { return tray === null || tray === void 0 ? void 0 : tray.popUpContextMenu(); });
};
electron_1.app.on('ready', function () {
    createTray();
});
