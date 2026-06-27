# UI Migration Guide

This project uses **shadcn/ui** with semantic CSS variables and light/dark theme support.

## Status

- **Foundation complete:** layouts, shared components, theme toggle, login
- **Pages migrated:** all `src/Pages/**/*.jsx` files updated to semantic tokens (113+ files)
- **Delete flows:** index pages use `useConfirmDialog()` + `toast` instead of `window.confirm` / `alert`
- **Migration scripts:** `scripts/migrate-pages-ui.mjs`, `scripts/migrate-confirm-alert.mjs` (for reference / future pages)

## Theme tokens (use these instead of raw colors)

| Instead of | Use |
|------------|-----|
| `bg-yellow-400`, `bg-yellow-500` | `bg-primary`, `text-primary-foreground` |
| `bg-gray-100`, `bg-white` | `bg-background`, `bg-card`, `bg-muted` |
| `text-gray-600`, `text-gray-800` | `text-muted-foreground`, `text-foreground` |
| `border-gray-200` | `border-border` |
| `bg-red-500`, `text-red-500` | `bg-destructive`, `text-destructive` |
| `bg-green-500` | `bg-success`, `text-success` |
| Inline `#hex` or `rgb()` | CSS variables only |

Toggle theme: header **sun/moon** menu (Light / Dark / System).

## Shared components

| Component | Path | Use for |
|-----------|------|---------|
| `PageLayout` | `@/Shared/PageLayout/PageLayout` | Page wrapper |
| `PageHeader` | `@/Shared/PageHeader/PageHeader` | Title + actions |
| `FormPageShell` | `@/Shared/FormPageShell/FormPageShell` | Create/edit forms |
| `TableToolbar` / `PaginationBar` | `@/Shared/TableToolbar/TableToolbar` | List filters + pagination |
| `LoadingState` / `EmptyState` | `@/Shared/PageStates/PageStates` | Loading / empty UI |
| `ErrorBanner` | `@/Shared/ErrorBanner/ErrorBanner` | Inline errors |
| `ReusableButton` | `@/Shared/ReusableButton/ReusableButton` | Actions |
| `FormInput` | `@/Shared/FormInput/FromInput` | Form fields |
| `ReusableTable` | `@/Shared/ReusableTable/ReusableTable` | Data tables |
| `ReusableModal` | `@/Shared/ReusableModal/ReusableModal` | Modals |
| `useConfirmDialog` | `@/Shared/ConfirmDialog/ConfirmDialog` | Delete confirmations |

## Checklist for new pages

1. Wrap content in `PageLayout`
2. Use `PageHeader` or `FormPageShell` instead of gradient headers
3. Use shadcn `Button`, `Input`, `Select`, `Textarea` — no raw palette classes
4. Use `useConfirmDialog()` + `toast` — no `window.confirm` / `alert`
5. Use semantic tokens only (`bg-background`, `text-muted-foreground`, etc.)

## Example: confirm delete

```jsx
import { useConfirmDialog } from "@/Shared/ConfirmDialog/ConfirmDialog";
import { toast } from "sonner";

const MyIndex = () => {
  const { confirm } = useConfirmDialog();

  const handleDelete = async (row) => {
    const ok = await confirm({
      title: "Delete item?",
      description: `Remove "${row.name}" permanently?`,
      confirmLabel: "Delete",
    });
    if (!ok) return;
    try {
      await service.delete(row.id);
      toast.success("Deleted successfully");
      refetch();
    } catch (err) {
      toast.error(err.message || "Delete failed");
    }
  };
};
```

## Adding more shadcn components

```bash
npx shadcn@latest add select textarea checkbox
```

## Optional follow-ups

Some complex pages (reports, food recipe builder, event calendar) may still use domain-specific accent colors for charts/calendar events. Prefer mapping those to `--chart-*` or semantic tokens when touching those files.
