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
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
exports.DemoPlugin = void 0;
var plugin_adapter_1 = require("@coyoapp/plugin-adapter");
var DemoPlugin = /** @class */ (function () {
    function DemoPlugin() {
        console.log("DemoPlugin constructor called");
        this.adapter = new plugin_adapter_1.PluginAdapter();
        this.init();
    }
    DemoPlugin.prototype.init = function () {
        return __awaiter(this, void 0, void 0, function () {
            var data, name_1, background, spotifyLayout, spotifyLink, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.adapter.init()];
                    case 1:
                        data = _a.sent();
                        console.log("Plugin initialized:", data);
                        name_1 = data['ctx.userName'];
                        this.changeName(name_1);
                        background = data['cfg.background'];
                        this.setBackgroundColor(background);
                        spotifyLayout = data['cfg.spotifyLayout'];
                        spotifyLink = data['cfg.spotifyLink'];
                        if (spotifyLink && spotifyLayout) {
                            this.addSpotify(spotifyLink, spotifyLayout);
                        }
                        this.adapter.observeHeight(); // Ensure height adjustments
                        return [3 /*break*/, 3];
                    case 2:
                        error_1 = _a.sent();
                        console.error("Failed to initialize the plugin:", error_1);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    DemoPlugin.prototype.changeName = function (userName) {
        var nameElem = document.getElementById('userName');
        if (nameElem) {
            nameElem.innerText = userName;
        }
        else {
            console.warn('Element with id userName not found');
        }
    };
    DemoPlugin.prototype.setBackgroundColor = function (background) {
        if (background) {
            document.body.style.backgroundColor = background;
        }
        else {
            console.warn('No background color specified');
        }
    };
    DemoPlugin.prototype.addSpotify = function (spotifyLink, spotifyLayout) {
        var spotifyFrame = document.createElement("iframe");
        spotifyFrame.width = '300';
        spotifyFrame.height = spotifyLayout === "LARGE" ? '380' : '80';
        spotifyFrame.allow = "encrypted-media";
        spotifyFrame.src = spotifyLink.replace('https://open.spotify.com', 'https://open.spotify.com/embed');
        document.body.appendChild(spotifyFrame);
    };
    return DemoPlugin;
}());
exports.DemoPlugin = DemoPlugin;
