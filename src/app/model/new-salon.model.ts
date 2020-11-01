export class NewSalon {
    constructor(
        public managerId: number,
        public provinceId: number,
        public districtId: number,
        public ward: string,
        public street: string,
        public imageUrl: string,
    ) {}
}