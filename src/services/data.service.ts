import {interval, Subject} from "rxjs";
import {PointsData} from "../chart/scatter-cube";
import {Color3, Color4, Vector3} from "@microsoft/mixed-reality-extension-sdk";

export class DataService {

    dataUpdate$ = new Subject<PointsData[]>();

    public startUpdates(): void {
        interval(5000).subscribe(x => {
            const rand = Math.random();
            const result: PointsData[] = []
            for (let i = 0; i < rand * 1000; i++) {
                result.push({
                    id: `${i}`,
                    name: `${i}-name`,
                    position: new Vector3(Math.random(), Math.random(), Math.random()),
                    color: Color4.FromColor3(Color3.Random(), 1)
                })
            }

            this.dataUpdate$.next(result);
        });
    }


}
