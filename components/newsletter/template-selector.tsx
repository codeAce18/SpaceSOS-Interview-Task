"use client"

import type { EmailTemplate } from "@/lib/types"
import { EMAIL_TEMPLATES } from "@/lib/constants"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface TemplateSelectorProps {
  selectedTemplate: string
  onTemplateSelect: (templateId: string) => void
}

export function TemplateSelector({ selectedTemplate, onTemplateSelect }: TemplateSelectorProps) {
  const getCategoryColor = (category: EmailTemplate["category"]) => {
    switch (category) {
      case "professional":
        return "bg-blue-100 text-blue-800"
      case "creative":
        return "bg-purple-100 text-purple-800"
      case "minimal":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-sm font-medium text-foreground mb-2">Email Template</h3>
        <p className="text-xs text-muted-foreground mb-4">Choose a template that matches your newsletter style</p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {EMAIL_TEMPLATES.map((template) => (
          <Card
            key={template.id}
            className={`cursor-pointer transition-all duration-200 hover:shadow-sm ${
              selectedTemplate === template.id
                ? "ring-2 ring-accent border-accent/30 bg-accent/5"
                : "hover:border-border/80"
            }`}
            onClick={() => onTemplateSelect(template.id)}
          >
            <CardContent className="p-4">
              <div className="text-center space-y-3">
                <div className="text-2xl">{template.preview}</div>
                <div>
                  <h4 className="font-medium text-sm text-foreground mb-1">{template.name}</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed mb-2">{template.description}</p>
                  <Badge variant="secondary" className={`text-xs ${getCategoryColor(template.category)}`}>
                    {template.category}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
