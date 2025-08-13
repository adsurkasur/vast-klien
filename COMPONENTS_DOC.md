---
This file contains API documentation and usage examples for all finalized components in the Serene Cycle Companion prototype.
---

# Component API Documentation

## UI Components

### Badge
- **Props:**
  - `variant`: 'default' | 'secondary' | 'destructive' | 'outline' (default: 'default')
  - `children`: ReactNode
- **Usage:**
```tsx
<Badge variant="secondary">Secondary</Badge>
```

### Button
- **Props:**
  - `variant`: 'default' | 'secondary' | 'destructive' | 'outline' | 'ghost' | 'link' (default: 'default')
  - `size`: 'default' | 'sm' | 'lg' | 'icon' (default: 'default')
  - `children`: ReactNode
- **Usage:**
```tsx
<Button variant="destructive" size="lg">Delete</Button>
```

### Textarea
- **Props:**
  - All standard textarea props
  - `maxLength`: number (default: 500)
  - `aria-label`: string (default: 'Text area')
- **Usage:**
```tsx
<Textarea placeholder="Type here..." />
```

### Toaster
- **Props:** None (uses context)
- **Usage:**
```tsx
<Toaster />
```

### SymptomsModal
- **Props:**
  - `isOpen`: boolean
  - `onClose`: () => void
  - `selectedDate`: string
- **Usage:**
```tsx
<SymptomsModal isOpen={modalOpen} onClose={closeModal} selectedDate={date} />
```

### PeriodCalendar
- **Props:**
  - `onOpenSymptoms`: (date: string) => void
  - `onTogglePeriod`: (date: string) => void
  - `selectedDate`: string | null
  - `onDataUpdate`: (data: CycleData) => void
  - `initialData`: CycleData
- **Usage:**
```tsx
<PeriodCalendar onOpenSymptoms={fn} initialData={data} />
```

### Chart
- **Props:**
  - `config`: ChartConfig
  - `children`: Chart primitives
- **Usage:**
```tsx
<ChartContainer config={config}>{/* chart children */}</ChartContainer>
```

### Calendar
- **Props:**
  - All DayPicker props
- **Usage:**
```tsx
<Calendar selected={date} onSelect={setDate} />
```

## Layout Components

### PageHeader
- **Props:**
  - `title`: string
  - `subtitle`: string
- **Usage:**
```tsx
<PageHeader title="Dashboard" subtitle="Welcome back!" />
```

### BottomNavigation
- **Props:**
  - `currentPage`: Page
  - `onNavigate`: (page: Page) => void
- **Usage:**
```tsx
<BottomNavigation currentPage="home" onNavigate={fn} />
```

---

# Usage Notes
- All components are accessible and responsive.
- Use ARIA attributes and semantic markup for best results.
- Utility function `cn` is available for class name merging.

---

# Testing
- Add tests for rendering, interaction, and edge cases for each component.
- Use React Testing Library and Jest for best results.

---

# Final Validation
- Validate in browser/dev tools for responsiveness and accessibility.
- Review documentation for API consistency.
