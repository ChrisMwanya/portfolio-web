import { FloatingCTA } from './floating-cta-client';
import { getContactData } from './getData';

export async function FloatingCTAServer() {
  const contactData = await getContactData();

  return (
    <FloatingCTA
      email={contactData.email}
      whatsappNumber={contactData.whatsapp}
      phoneNumber={contactData.whatsapp}
    />
  );
}
