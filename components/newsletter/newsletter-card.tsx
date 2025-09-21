"use client"

import type { Newsletter } from "@/lib/types"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Eye, Edit3, Clock, Send, FileText, MoreHorizontal } from "lucide-react"
import { formatDistanceToNow } from "date-fns"

interface NewsletterCardProps {
  newsletter: Newsletter
  onEdit: (newsletter: Newsletter) => void
  onPreview: (newsletter: Newsletter) => void
  onDuplicate?: (newsletter: Newsletter) => void
  onDelete?: (newsletter: Newsletter) => void
}

export function NewsletterCard({ newsletter, onEdit, onPreview, onDuplicate, onDelete }: NewsletterCardProps) {
  const getStatusIcon = (status: Newsletter["status"]) => {
    switch (status) {
      case "scheduled":
        return <Clock className="w-3 h-3" />
      case "sent":
        return <Send className="w-3 h-3" />
      default:
        return <Edit3 className="w-3 h-3" />
    }
  }

  const getStatusColor = (status: Newsletter["status"]) => {
    switch (status) {
      case "scheduled":
        return "bg-accent/10 text-accent hover:bg-accent/20"
      case "sent":
        return "bg-green-100 text-green-800 hover:bg-green-200"
      default:
        return "bg-muted/50 text-muted-foreground hover:bg-muted"
    }
  }

  return (
    <Card className="group hover:shadow-md transition-all duration-200 border-border/50 hover:border-border">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 mb-2">
              <h3 className="font-semibold text-lg text-foreground truncate">
                {newsletter.subject || "Untitled Newsletter"}
              </h3>
              <Badge
                variant="secondary"
                className={`flex items-center gap-1 text-xs ${getStatusColor(newsletter.status)}`}
              >
                {getStatusIcon(newsletter.status)}
                {newsletter.status.charAt(0).toUpperCase() + newsletter.status.slice(1)}
              </Badge>
            </div>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <FileText className="w-3 h-3" />
                {newsletter.sections.length} section{newsletter.sections.length !== 1 ? "s" : ""}
              </span>
              <span>Created {formatDistanceToNow(new Date(newsletter.createdAt), { addSuffix: true })}</span>
              {newsletter.scheduledFor && (
                <span>Scheduled for {new Date(newsletter.scheduledFor).toLocaleDateString()}</span>
              )}
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => onPreview(newsletter)} className="hover:bg-muted/50">
              <Eye className="w-4 h-4 mr-2" />
              Preview
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onEdit(newsletter)}
              className="hover:bg-primary/10 hover:text-primary hover:border-primary/20"
            >
              <Edit3 className="w-4 h-4 mr-2" />
              Edit
            </Button>
          </div>

          <Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100 transition-opacity">
            <MoreHorizontal className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
