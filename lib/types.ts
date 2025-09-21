export interface NewsletterSection {
  id: string
  type: "header" | "content" | "footer"
  content: string
  order: number
}

export interface Newsletter {
  id: string
  subject: string
  sections: NewsletterSection[]
  layout: string
  status: "draft" | "scheduled" | "sent"
  createdAt: string
  scheduledFor?: string
  updatedAt?: string
}

export interface EmailTemplate {
  id: string
  name: string
  description: string
  preview: string
  category: "professional" | "creative" | "minimal"
}
