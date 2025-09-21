import type { Newsletter } from "./types"
import { NEWSLETTER_STORAGE_KEY } from "./constants"

export const saveNewsletters = (newsletters: Newsletter[]): void => {
  if (typeof window !== "undefined") {
    localStorage.setItem(NEWSLETTER_STORAGE_KEY, JSON.stringify(newsletters))
  }
}

export const loadNewsletters = (): Newsletter[] => {
  if (typeof window === "undefined") return []

  try {
    const saved = localStorage.getItem(NEWSLETTER_STORAGE_KEY)
    return saved ? JSON.parse(saved) : []
  } catch (error) {
    console.error("Error loading newsletters:", error)
    return []
  }
}

export const createNewNewsletter = (): Newsletter => {
  const now = new Date().toISOString()
  return {
    id: `newsletter-${Date.now()}`,
    subject: "",
    sections: [
      {
        id: `section-${Date.now()}`,
        type: "content",
        content: "",
        order: 1,
      },
    ],
    layout: "modern",
    status: "draft",
    createdAt: now,
    updatedAt: now,
  }
}
