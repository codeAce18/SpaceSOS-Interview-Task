"use client"

import type { Newsletter, NewsletterSection } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { NewsletterSectionEditor } from "./newsletter-section-editor"
import { TemplateSelector } from "./template-selector"
import { NewsletterPreview } from "./newsletter-preview"
import { ArrowLeft, Save, Calendar, Plus, Eye, Monitor } from "lucide-react"
import { useState } from "react"

interface NewsletterEditorProps {
  newsletter: Newsletter
  onUpdateNewsletter: (newsletter: Newsletter) => void
  onSave: (status: "draft" | "scheduled", scheduledFor?: string) => void
  onBack: () => void
  onPreview: () => void
}

export function NewsletterEditor({ newsletter, onUpdateNewsletter, onSave, onBack, onPreview }: NewsletterEditorProps) {
  const [draggedSection, setDraggedSection] = useState<string | null>(null)
  const [showPreview, setShowPreview] = useState(true)

  const updateSubject = (subject: string) => {
    onUpdateNewsletter({
      ...newsletter,
      subject,
      updatedAt: new Date().toISOString(),
    })
  }

  const updateLayout = (layout: string) => {
    onUpdateNewsletter({
      ...newsletter,
      layout,
      updatedAt: new Date().toISOString(),
    })
  }

  const addSection = () => {
    const newSection: NewsletterSection = {
      id: `section-${Date.now()}`,
      type: "content",
      content: "",
      order: newsletter.sections.length + 1,
    }

    onUpdateNewsletter({
      ...newsletter,
      sections: [...newsletter.sections, newSection],
      updatedAt: new Date().toISOString(),
    })
  }

  const updateSection = (sectionId: string, content: string) => {
    onUpdateNewsletter({
      ...newsletter,
      sections: newsletter.sections.map((s) => (s.id === sectionId ? { ...s, content } : s)),
      updatedAt: new Date().toISOString(),
    })
  }

  const deleteSection = (sectionId: string) => {
    const updatedSections = newsletter.sections
      .filter((s) => s.id !== sectionId)
      .map((s, index) => ({ ...s, order: index + 1 }))

    onUpdateNewsletter({
      ...newsletter,
      sections: updatedSections,
      updatedAt: new Date().toISOString(),
    })
  }

  const reorderSections = (fromIndex: number, toIndex: number) => {
    const sections = [...newsletter.sections]
    const [removed] = sections.splice(fromIndex, 1)
    sections.splice(toIndex, 0, removed)

    const reorderedSections = sections.map((s, index) => ({ ...s, order: index + 1 }))

    onUpdateNewsletter({
      ...newsletter,
      sections: reorderedSections,
      updatedAt: new Date().toISOString(),
    })
  }

  const handleDragStart = (sectionId: string) => {
    setDraggedSection(sectionId)
  }

  const handleDrop = (targetSectionId: string) => {
    if (draggedSection && draggedSection !== targetSectionId) {
      const fromIndex = newsletter.sections.findIndex((s) => s.id === draggedSection)
      const toIndex = newsletter.sections.findIndex((s) => s.id === targetSectionId)
      reorderSections(fromIndex, toIndex)
    }
    setDraggedSection(null)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Editor Header */}
      <div className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" onClick={onBack} className="hover:bg-muted/50">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Newsletters
              </Button>
              <div className="h-6 w-px bg-border" />
              <h1 className="text-lg font-semibold text-foreground">{newsletter.subject || "Untitled Newsletter"}</h1>
            </div>

            <div className="flex items-center gap-2">
              <Button variant="outline" onClick={() => setShowPreview(!showPreview)} className="hover:bg-muted/50">
                <Monitor className="w-4 h-4 mr-2" />
                {showPreview ? "Hide" : "Show"} Preview
              </Button>
              <Button variant="outline" onClick={onPreview} className="hover:bg-muted/50 bg-transparent">
                <Eye className="w-4 h-4 mr-2" />
                Full Preview
              </Button>
              <Button variant="outline" onClick={() => onSave("draft")} className="hover:bg-muted/50">
                <Save className="w-4 h-4 mr-2" />
                Save Draft
              </Button>
              <Button
                onClick={() => onSave("scheduled", new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString())}
                className="bg-accent hover:bg-accent/90 text-accent-foreground"
              >
                <Calendar className="w-4 h-4 mr-2" />
                Schedule
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        <div className={`grid gap-8 ${showPreview ? "lg:grid-cols-2" : "max-w-4xl mx-auto"}`}>
          {/* Editor Panel */}
          <div className="space-y-6">
            {/* Subject */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Newsletter Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Subject Line</label>
                  <Input
                    value={newsletter.subject}
                    onChange={(e) => updateSubject(e.target.value)}
                    placeholder="Enter your newsletter subject..."
                    className="text-lg"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Template Selection */}
            <Card>
              <CardContent className="p-6">
                <TemplateSelector selectedTemplate={newsletter.layout} onTemplateSelect={updateLayout} />
              </CardContent>
            </Card>

            {/* Content Sections */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Content Sections</CardTitle>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={addSection}
                    className="hover:bg-accent/10 hover:text-accent hover:border-accent/20 bg-transparent"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Section
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {newsletter.sections
                  .sort((a, b) => a.order - b.order)
                  .map((section) => (
                    <div key={section.id} onDragOver={(e) => e.preventDefault()} onDrop={() => handleDrop(section.id)}>
                      <NewsletterSectionEditor
                        section={section}
                        onUpdate={updateSection}
                        onDelete={deleteSection}
                        onDragStart={handleDragStart}
                        canDelete={newsletter.sections.length > 1}
                        isDragging={draggedSection === section.id}
                      />
                    </div>
                  ))}
              </CardContent>
            </Card>

            {/* Newsletter Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Newsletter Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Sections:</span>
                  <span className="font-medium">{newsletter.sections.length}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Status:</span>
                  <span className="font-medium capitalize">{newsletter.status}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Template:</span>
                  <span className="font-medium capitalize">{newsletter.layout}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Created:</span>
                  <span className="font-medium">{new Date(newsletter.createdAt).toLocaleDateString()}</span>
                </div>
                {newsletter.updatedAt && (
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Updated:</span>
                    <span className="font-medium">{new Date(newsletter.updatedAt).toLocaleDateString()}</span>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Live Preview Panel */}
          {showPreview && (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Eye className="w-5 h-5" />
                      Live Preview
                    </CardTitle>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={onPreview}
                      className="hover:bg-accent/10 hover:text-accent hover:border-accent/20 bg-transparent"
                    >
                      Full Screen
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="max-h-[800px] overflow-y-auto p-6 bg-muted/20">
                    <div className="transform scale-75 origin-top">
                      <NewsletterPreview newsletter={newsletter} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
