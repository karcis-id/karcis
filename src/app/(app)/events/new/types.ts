export interface EventFormData {
  name: string
  location: string
  date?: Date
  time: string
  subject: string
  emailBody: string
  data: { name: string; email: string }[]
}
