"use client"
import { Button } from "@/components/ui/button"

interface ProjectFilterProps {
  categories: string[]
  activeCategory: string
  onCategoryChange: (category: string) => void
}

export function ProjectFilter({ categories, activeCategory, onCategoryChange }: ProjectFilterProps) {
  return (
    <div className="flex flex-wrap justify-center gap-2 mb-8">
      <Button
        variant={activeCategory === "all" ? "default" : "outline"}
        size="sm"
        onClick={() => onCategoryChange("all")}
        className="text-xs"
      >
        All Projects
      </Button>
      {categories.map((category) => (
        <Button
          key={category}
          variant={activeCategory === category ? "default" : "outline"}
          size="sm"
          onClick={() => onCategoryChange(category)}
          className="text-xs"
        >
          {category}
        </Button>
      ))}
    </div>
  )
}
