export class Email {
  private readonly value: string;

  private constructor(value: string) {
    this.validateEmail(value);
    this.value = value;
  }

  private validateEmail(email: string): void {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw new Error('Email inválido');
    }
  }

  public static create(email: string): Email {
    return new Email(email);
  }

  public getValue(): string {
    return this.value;
  }
} 