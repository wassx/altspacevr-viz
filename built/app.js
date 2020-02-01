"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const MRE = __importStar(require("@microsoft/mixed-reality-extension-sdk"));
const earth_1 = require("./earth");
class Dataviz {
    constructor(_context, baseUrl) {
        this._context = _context;
        this.baseUrl = baseUrl;
        this.assets = new MRE.AssetContainer(_context);
        this._context.onUserJoined(user => this.userJoined(user));
        this._context.onUserLeft(user => this.userLeft(user));
        this._context.onStarted(() => this.started());
        this._context.onStopped(() => this.stopped());
    }
    userJoined(user) {
        console.log('User joined: ' + user.name);
    }
    userLeft(user) {
    }
    started() {
        const earth = new earth_1.Earth(this.assets, this._context);
        earth.init(this.baseUrl);
    }
    stopped() {
    }
}
exports.default = Dataviz;
//# sourceMappingURL=app.js.map