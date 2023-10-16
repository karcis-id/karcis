export const EMAIL_MESSAGE_VARIABLES = [
  { name: "email", desc: "The participant's email address" },
  { name: "name", desc: "The participant's name" },
  { name: "qrcode", desc: "Image of the participant's QR code" },
]

export const EMAIL_MESSAGE_VARIABLE_EXPLANATION = `Message variables are placeholders that allow you to insert personal details, like a name or email, into emails.

E.g., you can start your emails with "Dear {{ name }}". When sent, \`{{ name }}\` will be replaced with the participant's actual name.

The \`{{ qrcode }}\` variable is a special variable that will be replaced with an image of the participant's unique QR code.`

export const DEFAULT_EMAIL_TEMPLATE = `Dear {{name}},

We're excited to welcome you to our event! Here are the essential details:
- Location: [Event Location]
- Date: [Event Date]
- Time: [Event Time]

Please arrive a litter early with this QR code for a smooth check-in.
{{ qrcode }}

Should you have any inquiries, feel free to reach out to us at [Support Email].

Looking forward to seeing you there!

Best regards,
[Your Name]`

export const MAX_FILE_SIZE = 1024 * 1024 * 2000 // 2 GB

export const ACCEPTED_FILE_TYPES = ["text/csv"]

export const SAMPLE_CSV_DATA = {
  headers: ["Name", "Email"],
  data: [
    {
      name: "John Doe",
      email: "john.doe@example.com",
    },
    {
      name: "Luke Smith",
      email: "luke.smith@example.com",
    },
    {
      name: "Bard Altman",
      email: "bard.altman@example.com",
    },
  ],
}

export const DATA_FORMAT_EXPLANATION = `Your data should be in CSV format with two columns: 'Name' for participant names and 'Email' for their email addresses.

Please review your data before uploading to ensure it follows the required format!`

export const DEFAULT_PRICE = 5000
