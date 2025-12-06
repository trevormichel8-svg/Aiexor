export default function OfferEmailTemplate({
  name,
  email,
  offer,
  message
}: {
  name: string;
  email: string;
  offer: string;
  message?: string;
}) {
  return `
  <div style="font-family: Arial, sans-serif; padding: 20px;">
    <h2>New Offer for Aiexor.com</h2>
    <p><strong>Name:</strong> ${name}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Offer Amount:</strong> $${offer}</p>
    <p><strong>Message:</strong> ${message || "No message provided."}</p>
    <hr />
    <p>This message was automatically sent from Aiexor.com.</p>
  </div>
  `;
}
