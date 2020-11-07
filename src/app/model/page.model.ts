export class Page {
    public empty: boolean;
    public first: boolean;
    public last: boolean;
    public number: number;
    public numberOfElements: number;
    public size: number;
    public totalElements: number;
    public totalPages: number;
    constructor() 
    constructor(res) 
    constructor(res?: any) {
        this.empty = res ? res["empty"] : false;
        this.first = res ? res["first"] : false;
        this.last = res ? res["last"] : false;
        this.number = res ? res["number"] : false;
        this.numberOfElements = res ? res["numberOfElements"] : 0;
        this.size = res ? res["size"] : 0;
        this.totalElements = res ? res["totalElements"] : 0;
        this.totalPages = res ? res["totalPages"] : 0;
    }
}