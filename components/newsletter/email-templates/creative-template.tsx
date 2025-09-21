"use client"

import type { Newsletter } from "@/lib/types"

interface CreativeTemplateProps {
  newsletter: Newsletter
}

export function CreativeTemplate({ newsletter }: CreativeTemplateProps) {
  return (
    <div className="max-w-2xl mx-auto bg-background border border-border rounded-lg overflow-hidden shadow-lg">
      {/* Header */}
      <div className="bg-gradient-to-br from-accent via-accent/80 to-secondary text-accent-foreground p-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-y-1"></div>
        <div className="relative z-10">
          <h1 className="text-3xl font-bold mb-3 text-balance">{newsletter.subject || "Newsletter Subject"}</h1>
          <p className="text-accent-foreground/90 text-lg">Creative Newsletter Design</p>
        </div>
      </div>

      {/* Content */}
      <div className="p-8 space-y-8">
        {newsletter.sections
          .sort((a, b) => a.order - b.order)
          .map((section, index) => (
            <div key={section.id} className="space-y-4">
              {index > 0 && (
                <div className="flex items-center justify-center my-8">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-accent rounded-full animate-pulse"></div>
                    <div className="w-12 h-px bg-gradient-to-r from-accent to-secondary"></div>
                    <div className="w-3 h-3 bg-secondary rounded-full animate-pulse delay-150"></div>
                  </div>
                </div>
              )}

              <div className="relative">
                <div className="absolute -left-4 top-0 w-1 h-full bg-gradient-to-b from-accent to-secondary rounded-full"></div>
                <div className="pl-6">
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
              </div>
            </div>
          ))}
      </div>

      {/* Footer */}
      <div className="bg-gradient-to-r from-muted/30 via-accent/5 to-secondary/5 border-t border-border p-8 text-center">
        <div className="space-y-4">
          <div className="flex items-center justify-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-accent to-secondary rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">N</span>
            </div>
            <span className="text-lg font-semibold text-foreground">Newsletter Composer</span>
          </div>

          <p className="text-muted-foreground text-sm">Bringing creativity to your inbox</p>

          <div className="flex items-center justify-center gap-6 text-xs text-muted-foreground pt-2">
            <a href="#" className="hover:text-accent transition-colors font-medium">
              Unsubscribe
            </a>
            <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
            <a href="#" className="hover:text-accent transition-colors font-medium">
              Update Preferences
            </a>
            <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
            <a href="#" className="hover:text-accent transition-colors font-medium">
              Share
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
