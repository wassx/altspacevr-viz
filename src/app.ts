import {Earth} from "./globe/earth";
import {AssetContainer, Context, User} from "@microsoft/mixed-reality-extension-sdk";
import {DataService} from "./services/data.service";
import {ScatterCube} from "./chart/scatter-cube";

export default class Dataviz {

    private assets: AssetContainer;
    private readonly _dataService = new DataService();

    constructor(private readonly _context: Context, private baseUrl: string) {
        this.assets = new AssetContainer(_context);
        this._context.onUserJoined(user => this.userJoined(user));
        this._context.onUserLeft(user => this.userLeft(user));
        this._context.onStarted(() => this.started());
        this._context.onStopped(() => this.stopped());
    }

    userJoined(user: User): void {
        console.log('User joined: ' + user.name);
    }

    userLeft(user: User): void {
        console.log('User left: ' + user.name);
    }

    started(): void {
        const earth = new Earth(this.assets, this._context, this.baseUrl);
        earth.init();

        const scatterCube = new ScatterCube(this.assets, this._context, this.baseUrl);
        this._dataService.dataUpdate$.subscribe(data => scatterCube.update(data));
        this._dataService.startUpdates();
    }

    stopped(): void {

    }
}
