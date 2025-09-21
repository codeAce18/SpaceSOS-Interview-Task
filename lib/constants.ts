import type { EmailTemplate } from "./types"

export const EMAIL_TEMPLATES: EmailTemplate[] = [
  {
    id: "modern",
    name: "Modern Professional",
    description: "Clean design with header, content sections, and footer",
    preview: "📰",
    category: "professional",
  },
  {
    id: "simple",
    name: "Simple Text",
    description: "Text-focused layout perfect for updates",
    preview: "📝",
    category: "minimal",
  },
  {
    id: "newsletter",
    name: "Newsletter Style",
    description: "Traditional newsletter with multiple content blocks",
    preview: "📊",
    category: "professional",
  },
  {
    id: "creative",
    name: "Creative Design",
    description: "Bold and colorful layout for creative content",
    preview: "🎨",
    category: "creative",
  },
]

export const NEWSLETTER_STORAGE_KEY = "newsletter-composer-data"
