export class NewService {
  constructor(
  public serviceTypeId: number,
  public name: string,
  public bookingImage: string,
  public description: string,
  public descriptionImage: string,
  public bookingRecommendImage: string,
  public price: number,
  public duration: number,
  ) {}
}
