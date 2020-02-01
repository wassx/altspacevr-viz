import * as MRE from '@microsoft/mixed-reality-extension-sdk';
export default class Dataviz {
    private readonly _context;
    private baseUrl;
    private assets;
    constructor(_context: MRE.Context, baseUrl: string);
    userJoined(user: MRE.User): void;
    userLeft(user: MRE.User): void;
    started(): void;
    stopped(): void;
}
//# sourceMappingURL=app.d.ts.map