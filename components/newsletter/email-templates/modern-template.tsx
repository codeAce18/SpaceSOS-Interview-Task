"use client"

import type { Newsletter } from "@/lib/types"

interface ModernTemplateProps {
  newsletter: Newsletter
}

export function ModernTemplate({ newsletter }: ModernTemplateProps) {
  return (
    <div className="max-w-2xl mx-auto bg-background border border-border rounded-lg overflow-hidden shadow-sm">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground p-8">
        <h1 className="text-3xl font-bold mb-2">{newsletter.subject || "Newsletter Subject"}</h1>
        <p className="text-primary-foreground/80 text-lg">Professional Newsletter Template</p>
      </div>

      {/* Content */}
      <div className="p-8 space-y-8">
        {newsletter.sections
          .sort((a, b) => a.order - b.order)
          .map((section, index) => (
            <div key={section.id} className="space-y-4">
              {index > 0 && <div className="border-t border-border pt-6" />}
              <div className="prose prose-gray max-w-none">
                <div
                  className="text-foreground leading-relaxed text-base"
                  dangerouslySetInnerHTML={{
                    __html:
                      section.content.replace(/\n/g, "<br>") ||
                      `<em class="text-muted-foreground">Section ${section.order} content...</em>`,
                  }}
                />
              </div>
            </div>
          ))}
      </div>

      {/* Footer */}
      <div className="bg-muted/30 border-t border-border p-6 text-center">
        <div className="text-sm text-muted-foreground space-y-2">
          <p className="font-medium">© 2025 Newsletter Composer. All rights reserved.</p>
          <div className="flex items-center justify-center gap-4 text-xs">
            <a href="#" className="hover:text-foreground transition-colors">
              Unsubscribe
            </a>
            <span>•</span>
            <a href="#" className="hover:text-foreground transition-colors">
              Manage Preferences
            </a>
            <span>•</span>
            <a href="#" className="hover:text-foreground transition-colors">
              View Online
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
