"use client"

import type React from "react"
import { X } from "lucide-react"
import type { filterInfo } from "@/pages/searchPage/SearchPage"

interface ActiveFiltersProps {
  filterValue: filterInfo
  onRemove?: (type: string, value: string) => void
}

export const ActiveFilters: React.FC<ActiveFiltersProps> = ({ filterValue, onRemove }) => {
  const hasActiveFilters =
    filterValue.diet ||
    filterValue.cuisine ||
    filterValue.intolerances.length > 0 ||
    filterValue.includeIngredients.length > 0

  if (!hasActiveFilters) {
    return null
  }

  return (
    <div className="flex flex-wrap gap-2 mb-4">
      {filterValue.diet && (
        <FilterPill
          label={`Diet: ${filterValue.diet}`}
          onRemove={onRemove ? () => onRemove("diet", filterValue.diet!) : undefined}
        />
      )}

      {filterValue.cuisine && (
        <FilterPill
          label={`Cuisine: ${filterValue.cuisine}`}
          onRemove={onRemove ? () => onRemove("cuisine", filterValue.cuisine!) : undefined}
        />
      )}

      {filterValue.intolerances.map((intolerance) => (
        <FilterPill
          key={`intolerance-${intolerance}`}
          label={`No ${intolerance}`}
          onRemove={onRemove ? () => onRemove("intolerance", intolerance) : undefined}
        />
      ))}

      {filterValue.includeIngredients.map((ingredient) => (
        <FilterPill
          key={`ingredient-${ingredient}`}
          label={`With: ${ingredient}`}
          onRemove={onRemove ? () => onRemove("ingredient", ingredient) : undefined}
        />
      ))}
    </div>
  )
}

interface FilterPillProps {
  label: string
  onRemove?: () => void
}

const FilterPill: React.FC<FilterPillProps> = ({ label, onRemove }) => {
  return (
    <div className="inline-flex items-center px-3 py-1 rounded-full bg-[#ff9e40] text-white text-sm">
      <span>{label}</span>
      {onRemove && (
        <button
          onClick={onRemove}
          className="ml-2 hover:bg-[#e7890c] rounded-full p-0.5 transition-colors"
          aria-label={`Remove ${label} filter`}
        >
          <X size={14} />
        </button>
      )}
    </div>
  )
}

