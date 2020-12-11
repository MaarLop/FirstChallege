import { IEstimation } from './estimation.state.interface';

export class DayEstimation implements IEstimation{
    amaunt: number;

    constructor(days: number){
        this.amaunt= days;
    }
    getEstimationLavel(): string {
        var day = this.amaunt == 1 ? 'day' : 'days';
        return `${this.amaunt} ${day}`;
    }

    getAmauntOfHour(): number {
        return this.amaunt * 24;
    }

    

}