# UI Migration Guide

This project uses **shadcn/ui** with semantic CSS variables and light/dark theme support. Foundation components and layouts are migrated; individual CRUD pages still need updates.

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

## Shared components (already migrated)

- `ReusableButton` → shadcn `Button`
- `FormInput` → shadcn `Input` + `Label`
- `ReusableTable` → shadcn `Table` in `Card`
- `ReusableModal` → shadcn `Dialog`
- `PageBanner` → shadcn `Card` with muted background

## Page migration checklist

For each page under `src/Pages/`:

1. Wrap content in `PageLayout` from `@/Shared/PageLayout/PageLayout`
2. Replace gradient page headers with `PageHeader` from `@/Shared/PageHeader/PageHeader`
3. Replace inline `<button>` with `ReusableButton` or `@/components/ui/button`
4. Replace inline `<input>` with `FormInput` or `@/components/ui/input`
5. Replace native `<select>` with shadcn `Select` (add via `npx shadcn@latest add select`)
6. Replace `window.confirm()` with `useConfirmDialog()` from `@/Shared/ConfirmDialog/ConfirmDialog`
7. Replace `alert()` with `toast()` from `sonner`
8. Remove all `yellow-*`, `gray-*`, and hardcoded hex classes

## Example: confirm delete

```jsx
import { useConfirmDialog } from "@/Shared/ConfirmDialog/ConfirmDialog";
import { toast } from "sonner";

const { confirm } = useConfirmDialog();

const handleDelete = async (row) => {
  const ok = await confirm({
    title: "Delete designation?",
    description: `Remove "${row.name}" permanently?`,
    confirmLabel: "Delete",
  });
  if (!ok) return;
  try {
    await hrService.designations.delete(row.id);
    toast.success("Deleted successfully");
    refetch();
  } catch (err) {
    toast.error(err.message || "Delete failed");
  }
};
```

Wrap the app (or a layout) with `ConfirmDialogProvider` when you start using confirms on a module.

## Adding more shadcn components

```bash
npx shadcn@latest add select textarea checkbox
```

## Files already on design system

- `src/Shared/*` (except page-specific inline usage in consumers)
- `src/Layouts/MainLayout`, `WorkPeriodDashBoard`, `RestaurantDashboard` shells
- `src/Authentication/LoginPage`
- `src/components/ui/*`, `src/index.css`, `src/main.jsx`
