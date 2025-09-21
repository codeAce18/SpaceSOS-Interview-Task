"use client"

import type { Newsletter } from "@/lib/types"

interface NewsletterTemplateProps {
  newsletter: Newsletter
}

export function NewsletterTemplate({ newsletter }: NewsletterTemplateProps) {
  return (
    <div className="max-w-2xl mx-auto bg-background border border-border rounded-lg overflow-hidden shadow-sm">
      {/* Header */}
      <div className="bg-foreground text-background p-6 text-center">
        <h1 className="text-2xl font-bold mb-1">{newsletter.subject || "Newsletter Subject"}</h1>
        <p className="text-background/80 text-sm">
          Issue #{Math.floor(Math.random() * 100) + 1} • {new Date().toLocaleDateString()}
        </p>
      </div>

      {/* Content */}
      <div className="p-8">
        {newsletter.sections
          .sort((a, b) => a.order - b.order)
          .map((section, index) => (
            <div key={section.id} className="mb-8">
              {index > 0 && (
                <div className="flex items-center mb-6">
                  <div className="flex-1 border-t border-border"></div>
                  <div className="px-4">
                    <div className="w-2 h-2 bg-accent rounded-full"></div>
                  </div>
                  <div className="flex-1 border-t border-border"></div>
                </div>
              )}

              <div className="space-y-4">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-1 h-6 bg-accent rounded-full"></div>
                  <h3 className="text-lg font-semibold text-foreground">Section {section.order}</h3>
                </div>

                <div className="prose prose-gray max-w-none">
                  <div
                    className="text-foreground leading-relaxed"
                    dangerouslySetInnerHTML={{
                      __html:
                        section.content.replace(/\n/g, "<br>") ||
                        `<em class="text-muted-foreground">Section ${section.order} content...</em>`,
                    }}
                  />
                </div>
              </div>
            </div>
          ))}
      </div>

      {/* Footer */}
      <div className="bg-muted/20 border-t border-border p-6 text-center">
        <div className="text-sm text-muted-foreground space-y-3">
          <div className="flex items-center justify-center gap-2 mb-3">
            <div className="w-8 h-px bg-accent"></div>
            <span className="text-accent font-medium">Newsletter Composer</span>
            <div className="w-8 h-px bg-accent"></div>
          </div>
          <p>Professional insights delivered weekly</p>
          <div className="flex items-center justify-center gap-4 text-xs pt-2">
            <a href="#" className="hover:text-foreground transition-colors">
              Archive
            </a>
            <span>•</span>
            <a href="#" className="hover:text-foreground transition-colors">
              Subscribe
            </a>
            <span>•</span>
            <a href="#" className="hover:text-foreground transition-colors">
              Unsubscribe
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
