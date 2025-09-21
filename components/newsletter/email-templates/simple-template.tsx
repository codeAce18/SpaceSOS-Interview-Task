"use client"

import type { Newsletter } from "@/lib/types"

interface SimpleTemplateProps {
  newsletter: Newsletter
}

export function SimpleTemplate({ newsletter }: SimpleTemplateProps) {
  return (
    <div className="max-w-2xl mx-auto bg-background border border-border rounded-lg p-10">
      {/* Header */}
      <div className="border-b border-border pb-6 mb-8">
        <h1 className="text-2xl font-bold text-foreground mb-2">{newsletter.subject || "Newsletter Subject"}</h1>
        <p className="text-muted-foreground text-sm">
          {new Date().toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
      </div>

      {/* Content */}
      <div className="space-y-8">
        {newsletter.sections
          .sort((a, b) => a.order - b.order)
          .map((section, index) => (
            <div key={section.id} className="space-y-4">
              {index > 0 && <div className="border-t border-border/50 pt-6" />}
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
      <div className="mt-12 pt-6 border-t border-border text-center">
        <div className="text-sm text-muted-foreground">
          <p className="mb-2">Simple Newsletter Template</p>
          <div className="flex items-center justify-center gap-3 text-xs">
            <a href="#" className="hover:text-foreground transition-colors">
              Unsubscribe
            </a>
            <span>•</span>
            <a href="#" className="hover:text-foreground transition-colors">
              Forward
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
