"use client"

import type { Newsletter } from "@/lib/types"
import { NewsletterCard } from "./newsletter-card"
import { EmptyState } from "./empty-state"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Search, SortAsc } from "lucide-react"
import { useState, useMemo } from "react"

interface NewsletterListProps {
  newsletters: Newsletter[]
  onCreateNewsletter: () => void
  onEditNewsletter: (newsletter: Newsletter) => void
  onPreviewNewsletter: (newsletter: Newsletter) => void
}

export function NewsletterList({
  newsletters,
  onCreateNewsletter,
  onEditNewsletter,
  onPreviewNewsletter,
}: NewsletterListProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<"all" | "draft" | "scheduled" | "sent">("all")
  const [sortBy, setSortBy] = useState<"created" | "updated" | "subject">("created")

  const filteredAndSortedNewsletters = useMemo(() => {
    let filtered = newsletters

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter((newsletter) => newsletter.subject.toLowerCase().includes(searchQuery.toLowerCase()))
    }

    // Filter by status
    if (statusFilter !== "all") {
      filtered = filtered.filter((newsletter) => newsletter.status === statusFilter)
    }

    // Sort newsletters
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "subject":
          return a.subject.localeCompare(b.subject)
        case "updated":
          return new Date(b.updatedAt || b.createdAt).getTime() - new Date(a.updatedAt || a.createdAt).getTime()
        default:
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      }
    })

    return filtered
  }, [newsletters, searchQuery, statusFilter, sortBy])

  const statusCounts = useMemo(() => {
    return newsletters.reduce(
      (acc, newsletter) => {
        acc[newsletter.status] = (acc[newsletter.status] || 0) + 1
        return acc
      },
      {} as Record<string, number>,
    )
  }, [newsletters])

  if (newsletters.length === 0) {
    return <EmptyState onCreateNewsletter={onCreateNewsletter} />
  }

  return (
    <div className="space-y-6">
      {/* Header with stats */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Your Newsletters</h2>
          <p className="text-muted-foreground">
            {newsletters.length} newsletter{newsletters.length !== 1 ? "s" : ""} total
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="bg-muted/50">
            {statusCounts.draft || 0} drafts
          </Badge>
          <Badge variant="secondary" className="bg-accent/10 text-accent">
            {statusCounts.scheduled || 0} scheduled
          </Badge>
          <Badge variant="secondary" className="bg-green-100 text-green-800">
            {statusCounts.sent || 0} sent
          </Badge>
        </div>
      </div>

      {/* Search and filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search newsletters..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="flex gap-2">
          <Button
            variant={statusFilter === "all" ? "default" : "outline"}
            size="sm"
            onClick={() => setStatusFilter("all")}
          >
            All
          </Button>
          <Button
            variant={statusFilter === "draft" ? "default" : "outline"}
            size="sm"
            onClick={() => setStatusFilter("draft")}
          >
            Drafts
          </Button>
          <Button
            variant={statusFilter === "scheduled" ? "default" : "outline"}
            size="sm"
            onClick={() => setStatusFilter("scheduled")}
          >
            Scheduled
          </Button>
          <Button
            variant={statusFilter === "sent" ? "default" : "outline"}
            size="sm"
            onClick={() => setStatusFilter("sent")}
          >
            Sent
          </Button>
        </div>

        <Button variant="outline" size="sm">
          <SortAsc className="w-4 h-4 mr-2" />
          Sort
        </Button>
      </div>

      {/* Newsletter grid */}
      {filteredAndSortedNewsletters.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No newsletters match your search criteria.</p>
          <Button
            variant="outline"
            onClick={() => {
              setSearchQuery("")
              setStatusFilter("all")
            }}
            className="mt-4"
          >
            Clear filters
          </Button>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredAndSortedNewsletters.map((newsletter) => (
            <NewsletterCard
              key={newsletter.id}
              newsletter={newsletter}
              onEdit={onEditNewsletter}
              onPreview={onPreviewNewsletter}
            />
          ))}
        </div>
      )}
    </div>
  )
}
