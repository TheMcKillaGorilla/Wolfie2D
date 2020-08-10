import SceneGraph from "./SceneGraph";
import CanvasNode from "../Nodes/CanvasNode";
import Viewport from "./Viewport";
import Scene from "../GameState/Scene";

export default class SceneGraphArray extends SceneGraph{
	private nodeList: Array<CanvasNode>;
    private turnOffViewportCulling_demoTool: boolean;
    private scene: Scene;

    constructor(viewport: Viewport, scene: Scene){
        super(viewport);
        this.scene = scene;

        this.nodeList = new Array<CanvasNode>();
        this.turnOffViewportCulling_demoTool = false;
    }

    setViewportCulling_demoTool(bool: boolean): void {
        this.turnOffViewportCulling_demoTool = bool;
    }

    addNodeSpecific(node: CanvasNode, id: string): void {
        this.nodeList.push(node);
    }

    removeNodeSpecific(node: CanvasNode, id: string): void {
        let index = this.nodeList.indexOf(node);
        if(index > -1){
            this.nodeList.splice(index, 1);
        }
    }

    getNodeAtCoords(x: number, y: number): CanvasNode {
        // TODO: This only returns the first node found. There is no notion of z coordinates
        for(let node of this.nodeList){
            if(node.contains(x, y)){
                return node;
            }
        }
        return null;
    }

    update(deltaT: number): void {
        for(let node of this.nodeList){
            node.update(deltaT);
        }
    }

    getVisibleSet(): Array<CanvasNode> {
        // If viewport culling is turned off for demonstration
        if(this.turnOffViewportCulling_demoTool){
            let visibleSet = new Array<CanvasNode>();
            for(let node of this.nodeList){
                visibleSet.push(node);
            }
            return visibleSet;
        }

        let visibleSet = new Array<CanvasNode>();

        for(let node of this.nodeList){
            if(this.viewport.includes(node, this.scene.getParallax())){
                visibleSet.push(node);
            }
        }

        return visibleSet;
    }
}