"use client"

import { Button } from "@/components/ui/button"
import { Plus, Settings, User } from "lucide-react"

interface NewsletterHeaderProps {
  onCreateNewsletter: () => void
}

export function NewsletterHeader({ onCreateNewsletter }: NewsletterHeaderProps) {
  return (
    <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">N</span>
              </div>
              <h1 className="text-xl font-bold text-foreground">Newsletter Composer</h1>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <Button onClick={onCreateNewsletter} className="bg-primary hover:bg-primary/90 text-primary-foreground">
              <Plus className="w-4 h-4 mr-2" />
              Create Newsletter
            </Button>

            <Button variant="ghost" size="icon">
              <Settings className="w-4 h-4" />
            </Button>

            <Button variant="ghost" size="icon">
              <User className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
