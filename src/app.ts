import * as MRE from '@microsoft/mixed-reality-extension-sdk';
import {Earth} from "./earth";
import {AssetContainer} from "@microsoft/mixed-reality-extension-sdk";

export default class Dataviz {

    private assets: MRE.AssetContainer;

    constructor(private readonly _context: MRE.Context, private baseUrl: string) {
        this.assets = new MRE.AssetContainer(_context);
        this._context.onUserJoined(user => this.userJoined(user));
        this._context.onUserLeft(user => this.userLeft(user));
        this._context.onStarted(() => this.started());
        this._context.onStopped(() => this.stopped());
    }

    userJoined(user: MRE.User): void {
        console.log('User joined: ' + user.name);
    }

    userLeft(user: MRE.User): void {

    }

    started(): void {
        const earth = new Earth(this.assets, this._context);
        earth.init(this.baseUrl);
    }

    stopped(): void {

    }
}
