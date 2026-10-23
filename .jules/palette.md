## 2025-05-18 - Explicit Ring Offsets for Floating Action Buttons
**Learning:** Floating action buttons positioned over complex or blended backgrounds often have their default focus rings obscured, failing keyboard accessibility checks.
**Action:** When adding focus-visible:ring-2 to custom floating action buttons, always pair it with focus-visible:ring-offset-* and an exact grounded offset color (e.g., focus-visible:ring-offset-black).
