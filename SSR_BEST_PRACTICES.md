# SSR Best Practices for Next.js App Directory

1. **Use Server Components by Default**
   - Only add `"use client"` to files that require browser APIs, navigation, or interactivity.
   - Keep layouts and static pages as server components for SSR benefits.

2. **Data Fetching**
   - Fetch public/static data in server components using async functions.
   - Use client components for user-specific or interactive data (e.g., React Query, useEffect).

3. **Third-Party Libraries**
   - Only use browser-dependent libraries (e.g., Firebase, next/navigation) in client components.
   - Ensure SSR compatibility for any library used in server components.

4. **Hydration**
   - Avoid passing dynamic props from server to client that may cause hydration mismatches.
   - Test hydration by building and running the app, checking for warnings/errors.

5. **Performance**
   - Prefer static generation for public pages when possible.
   - Use SSR for dynamic pages that require up-to-date data.

6. **Testing**
   - Regularly run `npm run build` and lint/type checks to catch SSR issues early.
   - Check for hydration errors in browser console after deployment.

7. **Documentation**
   - Document which components/pages are client-only and why.
   - Keep this guide updated as the project evolves.

---

For more details, see Next.js docs: https://nextjs.org/docs/app/building-your-application/rendering/server-components
