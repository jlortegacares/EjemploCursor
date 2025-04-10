export class Address {
  constructor(
    private readonly street: string,
    private readonly city: string,
    private readonly state: string,
    private readonly zipCode: string,
    private readonly country: string
  ) {
    this.validateAddress();
  }

  private validateAddress(): void {
    if (!this.street || !this.city || !this.state || !this.zipCode || !this.country) {
      throw new Error('Todos los campos de la dirección son requeridos');
    }
  }

  public static create(
    street: string,
    city: string,
    state: string,
    zipCode: string,
    country: string
  ): Address {
    return new Address(street, city, state, zipCode, country);
  }
} 