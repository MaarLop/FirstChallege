import { ITaskState } from './task.state.interface';

export class Completed implements ITaskState{
    state: string;
    nextState: ITaskState;

    constructor(){
        this.state= "InProgress";
        this.nextState = null;
    }
    canChangeState(): boolean {
        return false;
    }
    canClose(): boolean {
        return false;
    }

}