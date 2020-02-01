import {AssetContainer, Color4, Context, Vector3} from "@microsoft/mixed-reality-extension-sdk";

export interface PointsData {
    name: string;
    id: string;
    position: Vector3;
    color: Color4;
}

export class ScatterCube {
    constructor(private readonly _assets: AssetContainer, private readonly _context: Context, private readonly _baseUrl: string) {
    }

    public update(data: PointsData[]): void {

    }
}
