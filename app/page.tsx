"use client"

import { useState, useEffect, useCallback } from "react"
import { Plus, Trash2, GripVertical, Eye, Save, Calendar, Mail, FileText, Clock, Edit3 } from "lucide-react"

// Newsletter types and interfaces
interface NewsletterSection {
  id: string
  type: "header" | "content" | "footer"
  content: string
  order: number
}

interface Newsletter {
  id: string
  subject: string
  sections: NewsletterSection[]
  layout: string
  status: "draft" | "scheduled"
  createdAt: string
  scheduledFor?: string
}

interface EmailTemplate {
  id: string
  name: string
  description: string
  preview: string
}

// Mock templates
const EMAIL_TEMPLATES: EmailTemplate[] = [
  {
    id: "modern",
    name: "Modern style",
    description: "Clean design with header, content sections, and footer",
    preview: "📰",
  },
  {
    id: "simple",
    name: "Simple Text",
    description: "Text-focused layout perfect for financial updates",
    preview: "📝",
  },
  {
    id: "newsletter",
    name: "Newsletter Style",
    description: "Traditional newsletter with multiple content blocks",
    preview: "📊",
  },
]

// Email preview components for react-email style rendering
const ModernTemplate = ({ sections, subject }: { sections: NewsletterSection[]; subject: string }) => (
  <div className="max-w-2xl mx-auto bg-white border rounded-lg overflow-hidden shadow-sm">
    <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-6">
      <h1 className="text-2xl font-bold">{subject || "Newsletter Subject"}</h1>
      <p className="text-blue-100 mt-2">SFA</p>
    </div>
    <div className="p-6 space-y-6">
      {sections
        .sort((a, b) => a.order - b.order)
        .map((section) => (
          <div key={section.id} className="prose max-w-none">
            <div
              className="text-gray-800 leading-relaxed"
              dangerouslySetInnerHTML={{
                __html: section.content.replace(/\n/g, "<br>") || `<em>Section ${section.order} content...</em>`,
              }}
            />
          </div>
        ))}
    </div>
    <div className="bg-gray-50 border-t p-6 text-center text-sm text-gray-600">
      <p>© 2025 SpacesOS. All rights reserved.</p>
      <p className="mt-1">Unsubscribe | Manage Preferences</p>
    </div>
  </div>
)

const SimpleTemplate = ({ sections, subject }: { sections: NewsletterSection[]; subject: string }) => (
  <div className="max-w-2xl mx-auto bg-white border rounded-lg p-8">
    <h1 className="text-2xl font-bold text-gray-900 mb-6 border-b pb-4">{subject || "Newsletter Subject"}</h1>
    <div className="space-y-6">
      {sections
        .sort((a, b) => a.order - b.order)
        .map((section) => (
          <div key={section.id} className="text-gray-700 leading-relaxed">
            <div
              dangerouslySetInnerHTML={{
                __html: section.content.replace(/\n/g, "<br>") || `<em>Section ${section.order} content...</em>`,
              }}
            />
          </div>
        ))}
    </div>
    <div className="mt-8 pt-4 border-t text-center text-sm text-gray-500">
      <p>SpacesOS Financial Advisory Newsletter</p>
    </div>
  </div>
)

const NewsletterTemplate = ({ sections, subject }: { sections: NewsletterSection[]; subject: string }) => (
  <div className="max-w-2xl mx-auto bg-white border rounded-lg overflow-hidden">
    <div className="bg-gray-900 text-white p-4 text-center">
      <h1 className="text-xl font-bold">{subject || "Newsletter Subject"}</h1>
    </div>
    <div className="p-6">
      {sections
        .sort((a, b) => a.order - b.order)
        .map((section, index) => (
          <div key={section.id} className={`${index > 0 ? "mt-6 pt-6 border-t" : ""}`}>
            <div
              className="text-gray-800"
              dangerouslySetInnerHTML={{
                __html: section.content.replace(/\n/g, "<br>") || `<em>Section ${section.order} content...</em>`,
              }}
            />
          </div>
        ))}
    </div>
    <div className="bg-gray-100 p-4 text-center text-xs text-gray-600">
      <p>Financial insights delivered weekly • SpacesOS</p>
    </div>
  </div>
)


const NewsletterComposer = () => {
  const [newsletters, setNewsletters] = useState<Newsletter[]>([])
  const [currentNewsletter, setCurrentNewsletter] = useState<Newsletter | null>(null)
  const [isPreviewOpen, setIsPreviewOpen] = useState(false)
  const [previewNewsletter, setPreviewNewsletter] = useState<Newsletter | null>(null)
  const [activeView, setActiveView] = useState<"list" | "create">("list")
  const [draggedSection, setDraggedSection] = useState<string | null>(null)


  useEffect(() => {
    const saved = localStorage.getItem("spacesos-newsletters")
    if (saved) {
      setNewsletters(JSON.parse(saved))
    }
  }, [])


  const saveNewsletters = useCallback((newsletters: Newsletter[]) => {
    localStorage.setItem("spacesos-newsletters", JSON.stringify(newsletters))
    setNewsletters(newsletters)
  }, [])


  const createNewNewsletter = () => {
    const newNewsletter: Newsletter = {
      id: Date.now().toString(),
      subject: "",
      sections: [{ id: Date.now().toString(), type: "content", content: "", order: 1 }],
      layout: "modern",
      status: "draft",
      createdAt: new Date().toISOString(),
    }
    setCurrentNewsletter(newNewsletter)
    setActiveView("create")
  }


  const saveCurrentNewsletter = (status: "draft" | "scheduled", scheduledFor?: string) => {
    if (!currentNewsletter) return

    const updatedNewsletter = {
      ...currentNewsletter,
      status,
      scheduledFor,
    }

    const existingIndex = newsletters.findIndex((n) => n.id === currentNewsletter.id)
    let updatedNewsletters

    if (existingIndex >= 0) {
      updatedNewsletters = [...newsletters]
      updatedNewsletters[existingIndex] = updatedNewsletter
    } else {
      updatedNewsletters = [...newsletters, updatedNewsletter]
    }

    saveNewsletters(updatedNewsletters)
    setCurrentNewsletter(updatedNewsletter)
  }


  const addSection = () => {
    if (!currentNewsletter) return

    const newSection: NewsletterSection = {
      id: Date.now().toString(),
      type: "content",
      content: "",
      order: currentNewsletter.sections.length + 1,
    }

    setCurrentNewsletter({
      ...currentNewsletter,
      sections: [...currentNewsletter.sections, newSection],
    })
  }

  const removeSection = (sectionId: string) => {
    if (!currentNewsletter) return

    const updatedSections = currentNewsletter.sections
      .filter((s) => s.id !== sectionId)
      .map((s, index) => ({ ...s, order: index + 1 }))

    setCurrentNewsletter({
      ...currentNewsletter,
      sections: updatedSections,
    })
  }

  const updateSection = (sectionId: string, content: string) => {
    if (!currentNewsletter) return

    setCurrentNewsletter({
      ...currentNewsletter,
      sections: currentNewsletter.sections.map((s) => (s.id === sectionId ? { ...s, content } : s)),
    })
  }


  const reorderSections = (fromIndex: number, toIndex: number) => {
    if (!currentNewsletter) return

    const sections = [...currentNewsletter.sections]
    const [removed] = sections.splice(fromIndex, 1)
    sections.splice(toIndex, 0, removed)

    const reorderedSections = sections.map((s, index) => ({ ...s, order: index + 1 }))

    setCurrentNewsletter({
      ...currentNewsletter,
      sections: reorderedSections,
    })
  }


  const renderEmailPreview = (newsletter: Newsletter) => {
    const props = { sections: newsletter.sections, subject: newsletter.subject }

    switch (newsletter.layout) {
      case "simple":
        return <SimpleTemplate {...props} />
      case "newsletter":
        return <NewsletterTemplate {...props} />
      default:
        return <ModernTemplate {...props} />
    }
  }


  const NewsletterList = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Newsletters</h1>
          <p className="text-gray-600 mt-1">Manage your email campaigns</p>
        </div>
        <button
          onClick={createNewNewsletter}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Create Newsletter
        </button>
      </div>

      {newsletters.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <Mail className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No newsletters yet</h3>
          <p className="text-gray-600 mb-4">Create your first newsletter to get started</p>
          <button
            onClick={createNewNewsletter}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            Create Newsletter
          </button>
        </div>
      ) : (
        <div className="grid gap-4">
          {newsletters.map((newsletter) => (
            <div
              key={newsletter.id}
              className="bg-white border border-gray-200 rounded-lg p-6 hover:border-gray-300 transition-colors"
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-semibold text-lg text-gray-900">
                      {newsletter.subject || "Untitled Newsletter"}
                    </h3>
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded-full ${
                        newsletter.status === "scheduled" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {newsletter.status === "scheduled" ? (
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          Scheduled
                        </div>
                      ) : (
                        <div className="flex items-center gap-1">
                          <Edit3 className="w-3 h-3" />
                          Draft
                        </div>
                      )}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm">
                    {newsletter.sections.length} section{newsletter.sections.length !== 1 ? "s" : ""} • Created{" "}
                    {new Date(newsletter.createdAt).toLocaleDateString()}
                    {newsletter.scheduledFor &&
                      ` • Scheduled for ${new Date(newsletter.scheduledFor).toLocaleDateString()}`}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setPreviewNewsletter(newsletter)
                      setIsPreviewOpen(true)
                    }}
                    className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                    title="Preview"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => {
                      setCurrentNewsletter(newsletter)
                      setActiveView("create")
                    }}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    title="Edit"
                  >
                    <FileText className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )


  const NewsletterEditor = () => {
    if (!currentNewsletter) return null

    return (
      <div className="grid lg:grid-cols-2 gap-8 h-full">
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <button
              onClick={() => setActiveView("list")}
              className="text-gray-600 hover:text-gray-800 flex items-center gap-2 transition-colors"
            >
              ← Back to Newsletters
            </button>
            <div className="flex gap-2">
              <button
                onClick={() => saveCurrentNewsletter("draft")}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 flex items-center gap-2 transition-colors"
              >
                <Save className="w-4 h-4" />
                Save Draft
              </button>
              <button
                onClick={() =>
                  saveCurrentNewsletter("scheduled", new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString())
                }
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-2 transition-colors"
              >
                <Calendar className="w-4 h-4" />
                Schedule
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Subject Line</label>
            <input
              type="text"
              value={currentNewsletter.subject}
              onChange={(e) => setCurrentNewsletter({ ...currentNewsletter, subject: e.target.value })}
              placeholder="Enter newsletter subject..."
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email Template</label>
            <div className="grid grid-cols-3 gap-3">
              {EMAIL_TEMPLATES.map((template) => (
                <button
                  key={template.id}
                  onClick={() => setCurrentNewsletter({ ...currentNewsletter, layout: template.id })}
                  className={`p-3 border-2 rounded-lg text-center transition-colors ${
                    currentNewsletter.layout === template.id
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <div className="text-2xl mb-1">{template.preview}</div>
                  <div className="text-sm font-medium">{template.name}</div>
                </button>
              ))}
            </div>
          </div>


          <div>
            <div className="flex justify-between items-center mb-4">
              <label className="block text-sm font-medium text-gray-700">Content Sections</label>
              <button
                onClick={addSection}
                className="text-blue-600 hover:text-blue-700 flex items-center gap-1 text-sm transition-colors"
              >
                <Plus className="w-4 h-4" />
                Add Section
              </button>
            </div>

            <div className="space-y-4">
              {currentNewsletter.sections
                .sort((a, b) => a.order - b.order)
                .map((section, index) => (
                  <div
                    key={section.id}
                    className="border border-gray-200 rounded-lg p-4 bg-white"
                    draggable
                    onDragStart={() => setDraggedSection(section.id)}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={() => {
                      if (draggedSection && draggedSection !== section.id) {
                        const fromIndex = currentNewsletter.sections.findIndex((s) => s.id === draggedSection)
                        reorderSections(fromIndex, index)
                      }
                      setDraggedSection(null)
                    }}
                  >
                    <div className="flex justify-between items-center mb-3">
                      <div className="flex items-center gap-2">
                        <GripVertical className="w-4 h-4 text-gray-400 cursor-grab" />
                        <span className="text-sm font-medium text-gray-700">Section {section.order}</span>
                      </div>
                      {currentNewsletter.sections.length > 1 && (
                        <button
                          onClick={() => removeSection(section.id)}
                          className="text-red-500 hover:text-red-700 p-1 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                    <textarea
                      value={section.content}
                      onChange={(e) => updateSection(section.id, e.target.value)}
                      placeholder="Write your content here..."
                      className="w-full h-32 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none transition-colors"
                    />
                  </div>
                ))}
            </div>
          </div>
        </div>

        {/* Preview Panel */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <div className="flex items-center gap-2 mb-4">
            <Eye className="w-4 h-4 text-gray-600" />
            <span className="text-sm font-medium text-gray-700">Live Preview</span>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm max-h-[600px] overflow-y-auto">
            {renderEmailPreview(currentNewsletter)}
          </div>
        </div>
      </div>
    )
  }

  // Preview Drawer
  const PreviewDrawer = () => {
    if (!isPreviewOpen || !previewNewsletter) return null

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden">
          <div className="flex justify-between items-center p-6 border-b">
            <h2 className="text-xl font-semibold">{previewNewsletter.subject || "Untitled Newsletter"}</h2>
            <button
              onClick={() => setIsPreviewOpen(false)}
              className="text-gray-500 hover:text-gray-700 text-xl transition-colors"
            >
              ×
            </button>
          </div>
          <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">{renderEmailPreview(previewNewsletter)}</div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-6">
        {activeView === "list" ? <NewsletterList /> : <NewsletterEditor />}
        <PreviewDrawer />
      </div>
    </div>
  )
}

export default NewsletterComposer
