import { IEstimation } from './estimation.state.interface';

export class HourEstimation implements IEstimation{
    amaunt: number;

    constructor(hours: number){
        this.amaunt= hours;
    }
    getEstimationLavel(): string {
        var hour = this.amaunt == 1 ? 'hour' : 'hours';
        return `${this.amaunt} ${hour}`;
    }

    getAmauntOfHour(): number {
        return this.amaunt;
    }

}