/*!
 * Copyright (c) Stefan Wasserbauer. All rights reserved.
 * Licensed under the MIT License.
 */

import {
    Actor,
    ActorLike,
    AnimationKeyframe,
    AnimationWrapMode,
    AssetContainer,
    Context,
    DegreesToRadians,
    Quaternion,
    TextAnchorLocation,
    Vector3
} from '@microsoft/mixed-reality-extension-sdk';

export class Earth {

    public readonly axialKeyframeCount = 90;

    private readonly _animationName = `earth:axial`;

    constructor(private readonly _assets: AssetContainer,
                private readonly _context: Context,
                private readonly _baseUrl: string) {
    }

    public init(): void {
        const bodyName = 'earth';

        Actor.Create(this._context, {
            actor: {
                name: 'Text',
                transform: {
                    app: {position: {x: 0, y: 0.5, z: 0}}
                },
                text: {
                    contents: "Hi!",
                    anchor: TextAnchorLocation.MiddleCenter,
                    color: {r: 30 / 255, g: 206 / 255, b: 213 / 255},
                    height: 0.3
                }
            }
        });

        const earthParent = Actor.Create(this._context, {
            actor: {
                name: `${bodyName}-parent`,
                transform: {
                    app: {
                        position: {x: 0, y: 0.5, z: 0},
                        rotation: Quaternion.FromEulerAngles(23.5 * DegreesToRadians, 0, 0)
                    }
                }
            }
        });

        const earth = Actor.CreateFromGltf(this._assets, {
            uri: `${this._baseUrl}/assets/${bodyName}.gltf`,
            actor: {
                name: `${bodyName}-body`,
                transform: {
                    local: {scale: {x: 1, y: 1, z: 1}}
                },
                parentId: earthParent.id,
                collider: {
                    geometry: {
                        shape: 'sphere',
                        radius: 1
                    }
                }
            }

        });

        this.createAxialAnimation(earth);

        earth.resumeAnimation(this._animationName);
    }

    private createAxialAnimation(earth: Actor) {

        const spin = 1;
        const axisTimeInSeconds = 30;
        const timeStep = axisTimeInSeconds / this.axialKeyframeCount;
        const keyframes: AnimationKeyframe[] = [];
        const angleStep = 360 / this.axialKeyframeCount;
        const initial = earth.transform.local.rotation.clone();
        let value: Partial<ActorLike>;

        for (let i = 0; i < this.axialKeyframeCount; ++i) {
            const rotDelta = Quaternion.RotationAxis(
                Vector3.Up(), (-angleStep * i * spin) * DegreesToRadians);
            const rotation = initial.multiply(rotDelta);
            value = {
                transform: {
                    local: {rotation}
                }
            };
            keyframes.push({
                time: timeStep * i,
                value,
            });
        }

        // Final frame
        value = {
            transform: {
                local: {rotation: earth.transform.local.rotation}
            }
        };
        keyframes.push({
            time: axisTimeInSeconds,
            value,
        });

        // Create the animation on the actor
        earth.createAnimation(
            this._animationName, {
                keyframes,
                events: [],
                wrapMode: AnimationWrapMode.Loop
            });
    }

}
