export class NewProduct {
  constructor(
      public productTypeId: number,
      public name: string,
      public price: number,
      public imageUrl: string,
      public description: string,
  ) {}
}
