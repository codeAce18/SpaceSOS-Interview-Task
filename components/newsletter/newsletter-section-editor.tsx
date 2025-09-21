"use client"

import type { NewsletterSection } from "@/lib/types"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { GripVertical, Trash2, Type, ImageIcon, Link } from "lucide-react"
import { useState } from "react"

interface NewsletterSectionEditorProps {
  section: NewsletterSection
  onUpdate: (sectionId: string, content: string) => void
  onDelete: (sectionId: string) => void
  onDragStart: (sectionId: string) => void
  canDelete: boolean
  isDragging?: boolean
}

export function NewsletterSectionEditor({
  section,
  onUpdate,
  onDelete,
  onDragStart,
  canDelete,
  isDragging = false,
}: NewsletterSectionEditorProps) {
  const [isFocused, setIsFocused] = useState(false)

  return (
    <Card
      className={`transition-all duration-200 ${
        isDragging ? "opacity-50 scale-95" : "hover:shadow-sm"
      } ${isFocused ? "ring-2 ring-accent/20 border-accent/30" : ""}`}
      draggable
      onDragStart={() => onDragStart(section.id)}
    >
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <GripVertical className="w-4 h-4 text-muted-foreground cursor-grab hover:text-foreground transition-colors" />
            <div className="flex items-center gap-2">
              <Type className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm font-medium text-foreground">Section {section.order}</span>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <ImageIcon className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <Link className="w-4 h-4" />
            </Button>
            {canDelete && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onDelete(section.id)}
                className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            )}
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        <Textarea
          value={section.content}
          onChange={(e) => onUpdate(section.id, e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder="Write your content here... You can use markdown formatting."
          className="min-h-[120px] resize-none border-0 p-0 focus-visible:ring-0 text-sm leading-relaxed"
        />
      </CardContent>
    </Card>
  )
}
