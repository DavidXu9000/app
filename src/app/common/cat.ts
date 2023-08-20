export class Cat {
    constructor(public id: number, public userId: string, public imageUrl: string, public name: string) { }
    toString(): string {
        return this.id + " " + this.userId + " " + this.imageUrl + " " + this.name;
    }
}
