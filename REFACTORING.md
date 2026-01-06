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

### 3. User Settings: Return Updated User Object

**Status:** Not Started  
**Location:** User settings/profile update flow

**Issue:**

- After updating user settings (e.g., username), the displayed username reverts to old value after page reload
- Settings update action doesn't return the updated user object
- Client state becomes out of sync with server state

**Proposed Solution:**

- Update settings action should return the updated user object
- Update client-side state/cache with returned user data
- Consider revalidating user session after settings change

**Created:** 2026-01-06

---

## Medium Priority

### 3. PostFeedSection: Multiple Issues

**Status:** Not Started  
**Location:** `src/components/section/PostFeedSection.tsx`

**Issues:**

1. **React Key Anti-Pattern** ⚠️ HIGH
   - Using `key={index}` instead of `key={post.id}` in map
   - Can cause rendering bugs when items reorder

2. **useEffect Dependency Array** ⚠️ HIGH
   - `useEffect` uses `props.params` but doesn't list it in dependencies
   - Violates React exhaustive-deps rule
   - Feed won't reload when params change

3. **No Error Handling** ⚠️ MEDIUM
   - `getPostsAction` has no try-catch
   - User gets no feedback when loading fails
   - App could crash on network errors

4. **Loading UX Problem** 🤔 MEDIUM
   - Entire feed disappears during "Load More"
   - Better: separate `loadingMore` state, keep feed visible

5. **No Empty State** 📋 LOW
   - No feedback when zero posts are returned
   - User doesn't know if it's loading or empty

6. **Race Condition Potential** 🐛 LOW
   - Rapid clicking "Load More" could duplicate posts
   - Should disable button while loading

**Proposed Solutions:**

- Change to `key={post.id}`
- Add `props.params` to useEffect dependencies or use `useCallback`
- Add try-catch with error state
- Separate `loadingMore` state for better UX
- Add empty state component
- Disable Load More button while `loading === true`

**Created:** 2026-01-05  
**Test Coverage:** Basic tests exist, should add error state tests after refactor

---

### 4. Post Actions: Error Handling

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

### 5. Design System: Hidden Class Override

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

### 6. ProfileSection: Server-Logik von UI trennen
**Status:** Not Started  
**Location:** `src/components/section/ProfileSection.tsx`

**Issue:**
- ProfileSection ist eine async Server-Komponente, was Komponententests erschwert
- Tests mit `render()` funktionieren nicht wie erwartet, weil die Komponente nie gerendert wird
- Logik (Datenbeschaffung) und UI sind nicht sauber getrennt

**Proposed Solution:**
- Trenne Datenlogik und UI:
  - Erstelle z.B. `getProfileSectionState(userId)` als Server-Helper
  - Mache ProfileSection zu einer synchronen UI-Komponente, die Props wie `isCurrentUser` und `following` erhält
- Dadurch wird die Komponente testbar und die Logik bleibt klar

**Beispiel:**
```ts
// ProfileSection.server.ts
export async function getProfileSectionState(userId: string) {
  return {
    following: await isFollowing(userId),
    isCurrentUser: await isCurrentUserAction(userId),
  };
}

// ProfileSection.tsx (sync!)
type Props = ProfileSectionProps & {
  following: boolean;
  isCurrentUser: boolean;
};

const ProfileSection = ({ following, isCurrentUser, ...props }: Props) => { ... };
```

**Created:** 2026-01-06

---

## Notes

- This list should be updated whenever new refactoring needs are identified
- Mark items as "In Progress" when work begins
- Move to "Completed" section when done (don't delete)
- Add date and reason for each entry
