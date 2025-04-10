export class PhoneNumber {
  private readonly value: string;

  private constructor(value: string) {
    this.validatePhoneNumber(value);
    this.value = value;
  }

  private validatePhoneNumber(phone: string): void {
    const phoneRegex = /^\+?[\d\s-]{8,}$/;
    if (!phoneRegex.test(phone)) {
      throw new Error('Número de teléfono inválido');
    }
  }

  public static create(phone: string): PhoneNumber {
    return new PhoneNumber(phone);
  }

  public getValue(): string {
    return this.value;
  }
} 