# Refactoring TODOs

This file tracks technical debt and refactoring tasks identified during development.

## High Priority

### 1. Zod Validation & Type Safety

**Status:** Not Started  
**Components Affected:** Multiple

**Issues:**

- API types are manually defined instead of inferred from Zod schemas
- Potential runtime/compile-time type mismatches
- No validation at API boundaries

**Proposed Solution:**

- Define Zod schemas for all API responses
- Use `z.infer<typeof schema>` to derive TypeScript types
- Add runtime validation in API client layer

**Files to Review:**

- `src/lib/api/client.types.tsx`
- `src/lib/api/posts/post.types.tsx`
- `src/lib/api/users/user.types.tsx`

---

### 2. NavbarSection: Conditional Logout Button

**Status:** Not Started  
**Location:** `src/components/section/NavbarSection.tsx`

**Issue:**

- `MumbleLogoutButton` is always rendered, even when user is not authenticated
- Component has conditional check for `mumbleUser` but Logout button is outside the conditional
- Component is only used in protected routes (with AuthGuard), so `mumbleUser` should never be null

**Proposed Solutions:**

1. Move `MumbleLogoutButton` inside the conditional (if component might be used in public routes)
2. Remove the conditional check entirely (if component is guaranteed to only be in protected routes)

**Created:** 2026-01-05  
**Test Coverage:** Tests written for current behavior with TODO comment

---

## Medium Priority

### 3. Post Actions: Error Handling

**Status:** Not Started  
**Location:** `src/actions/post.action.tsx`

**Issue:**

- Missing comprehensive error handling in server actions
- Errors might not be properly caught and returned to client
- No consistent error response format

**Proposed Solution:**

- Add try-catch blocks around all server actions
- Define consistent error response types
- Consider adding error logging/monitoring
- Return user-friendly error messages

**Created:** 2026-01-05

---

### 4. Design System: Hidden Class Override

**Status:** Workaround Applied, Upstream Issue Reported  
**Package:** `@krrli/cm-designsystem`

**Issue:**

- Duplicate `.hidden` utility class overrides responsive `.md:inline` classes
- Button labels hidden on desktop views due to specificity conflict

**Current Workaround:**

```css
/* globals.css */
@media (min-width: 768px) {
  .md\:inline.hidden {
    display: inline !important;
  }
  button span.md\:inline {
    display: inline !important;
  }
}
```

**Action Required:**

- Wait for design system team to fix upstream
- Remove workaround once fixed in package
- GitHub issue created (link to be added)

---

## Notes

- This list should be updated whenever new refactoring needs are identified
- Mark items as "In Progress" when work begins
- Move to "Completed" section when done (don't delete)
- Add date and reason for each entry
