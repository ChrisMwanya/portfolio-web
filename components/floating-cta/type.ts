export interface ContactData {
  readonly email: string;
  readonly whatsapp: string;
  readonly github?: string;
  readonly linkedin?: string;
  readonly twitter?: string;
  readonly location?: string;
}

export interface FloatingCTAProps {
  readonly email: string;
  readonly whatsappNumber: string;
  readonly phoneNumber: string;
}
