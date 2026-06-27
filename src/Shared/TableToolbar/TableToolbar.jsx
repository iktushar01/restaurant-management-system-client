import React from "react";
import { SearchIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

export function TableToolbar({
  entriesToShow,
  onEntriesChange,
  searchTerm,
  onSearchChange,
  searchPlaceholder = "Search...",
  className,
}) {
  return (
    <div
      className={cn(
        "flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-4",
        className
      )}
    >
      <div className="flex items-center gap-2 text-sm text-foreground">
        <span>Show</span>
        <Select
          value={String(entriesToShow)}
          onValueChange={(value) => onEntriesChange(Number(value))}
        >
          <SelectTrigger className="w-20">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {[10, 25, 50, 100].map((n) => (
              <SelectItem key={n} value={String(n)}>
                {n}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <span>entries</span>
      </div>

      <div className="relative w-full md:w-64">
        <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
        <Input
          type="text"
          placeholder={searchPlaceholder}
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-9"
        />
      </div>
    </div>
  );
}

export function PaginationBar({
  currentPage,
  totalPages,
  totalEntries,
  startIndex,
  entriesToShow,
  onPageChange,
  onPrevious,
  onNext,
  className,
}) {
  return (
    <div
      className={cn(
        "flex flex-col md:flex-row justify-between items-start md:items-center mt-4 text-sm text-muted-foreground gap-2",
        className
      )}
    >
      <div>
        Showing {totalEntries > 0 ? startIndex + 1 : 0} to{" "}
        {Math.min(startIndex + entriesToShow, totalEntries)} of {totalEntries}{" "}
        entries
      </div>
      <div className="flex flex-wrap gap-2">
        <ButtonPage
          disabled={currentPage === 1}
          onClick={onPrevious}
        >
          Previous
        </ButtonPage>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <ButtonPage
            key={page}
            active={currentPage === page}
            onClick={() => onPageChange(page)}
          >
            {page}
          </ButtonPage>
        ))}
        <ButtonPage
          disabled={currentPage === totalPages || totalPages === 0}
          onClick={onNext}
        >
          Next
        </ButtonPage>
      </div>
    </div>
  );
}

function ButtonPage({ children, active, disabled, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "px-3 py-1 border border-border rounded-md transition-colors",
        active && "bg-primary/10 text-primary font-medium",
        !active && !disabled && "bg-card hover:bg-muted/50 text-foreground",
        disabled && "bg-muted text-muted-foreground cursor-not-allowed opacity-60"
      )}
    >
      {children}
    </button>
  );
}

export default TableToolbar;
