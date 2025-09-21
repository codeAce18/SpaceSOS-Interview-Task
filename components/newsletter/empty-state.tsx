"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Mail, Plus, Sparkles } from "lucide-react"

interface EmptyStateProps {
  onCreateNewsletter: () => void
}

export function EmptyState({ onCreateNewsletter }: EmptyStateProps) {
  return (
    <Card className="border-dashed border-2 border-border/50">
      <CardContent className="flex flex-col items-center justify-center py-16 px-6 text-center">
        <div className="rounded-full bg-muted/50 p-4 mb-4">
          <Mail className="w-8 h-8 text-muted-foreground" />
        </div>

        <h3 className="text-xl font-semibold text-foreground mb-2">No newsletters yet</h3>

        <p className="text-muted-foreground mb-6 max-w-md leading-relaxed">
          Create your first newsletter to start engaging with your audience. Choose from professional templates and
          customize your content.
        </p>

        <div className="flex flex-col sm:flex-row gap-3">
          <Button onClick={onCreateNewsletter} className="bg-primary hover:bg-primary/90 text-primary-foreground">
            <Plus className="w-4 h-4 mr-2" />
            Create Your First Newsletter
          </Button>

          <Button variant="outline" className="hover:bg-muted/50 bg-transparent">
            <Sparkles className="w-4 h-4 mr-2" />
            Browse Templates
          </Button>
        </div>

        <div className="mt-8 text-xs text-muted-foreground">
          <p>Get started in minutes with our intuitive editor</p>
        </div>
      </CardContent>
    </Card>
  )
}
