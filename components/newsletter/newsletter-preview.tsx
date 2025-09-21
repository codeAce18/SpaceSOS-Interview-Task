"use client"

import type { Newsletter } from "@/lib/types"
import { ModernTemplate } from "./email-templates/modern-template"
import { SimpleTemplate } from "./email-templates/simple-template"
import { NewsletterTemplate } from "./email-templates/newsletter-template"
import { CreativeTemplate } from "./email-templates/creative-template"

interface NewsletterPreviewProps {
  newsletter: Newsletter
  className?: string
}

export function NewsletterPreview({ newsletter, className = "" }: NewsletterPreviewProps) {
  const renderTemplate = () => {
    switch (newsletter.layout) {
      case "simple":
        return <SimpleTemplate newsletter={newsletter} />
      case "newsletter":
        return <NewsletterTemplate newsletter={newsletter} />
      case "creative":
        return <CreativeTemplate newsletter={newsletter} />
      default:
        return <ModernTemplate newsletter={newsletter} />
    }
  }

  return <div className={`newsletter-preview ${className}`}>{renderTemplate()}</div>
}
