# Storybook Re-export Issue Demo

This is a demonstration project that highlights an issue with Storybook where re-exported stories from other story files do not appear in the Storybook UI.

## Issue Description

**Problem**: When using `export * from` to re-export stories from one Storybook file to another, the re-exported stories do not appear in the Storybook sidebar or canvas.

**Expected Behavior**: Re-exported stories should appear in the Storybook UI under the new story file's configuration (title, id, etc.).

**Actual Behavior**: Only the original stories file shows up in Storybook. The re-exporting file is completely ignored.

## Project Structure

```
src/stories/
├── Button.tsx                 # Button component
├── Button.stories.ts          # Original Button stories (appears in Storybook)
└── SecondButton.stories.ts    # Re-exports Button stories (does NOT appear)
```

## Reproduction Steps

1. **Original Stories File** (`Button.stories.ts`):
   ```typescript
   const meta = {
     id: 'button',
     title: 'Example/Button',
     component: Button,
     // ... other configuration
   } satisfies Meta<typeof Button>;

   export default meta;
   export const Primary: Story = { /* ... */ };
   export const Secondary: Story = { /* ... */ };
   // ... other stories
   ```

2. **Re-exporting Stories File** (`SecondButton.stories.ts`):
   ```typescript
   import buttonMeta from "./Button.stories";
   import { type Meta } from "@storybook/react-vite";
   import { type ComponentProps } from "react";
   
   type StoryProps = ComponentProps<(typeof buttonMeta)["component"]>;

   export default {
     ...buttonMeta,
     id: "second-button",  // Different ID
   } satisfies Meta<StoryProps>;

   export * from "./Button.stories";  // Re-export all stories
   ```

3. **Run Storybook**:
   ```bash
   npm run storybook
   ```

4. **Observe**: Only "Example/Button" appears in the sidebar. "Second Button" stories are nowhere to be found.

## Expected vs Actual Results

### Expected:
- Storybook sidebar should show both:
  - `Example/Button` (from Button.stories.ts)
  - `Second Button` (from SecondButton.stories.ts with re-exported stories)

### Actual:
- Storybook sidebar only shows:
  - `Example/Button` (from Button.stories.ts)
  - SecondButton.stories.ts is completely ignored

### Module example:
expected behavior can be seen running the following command: `node src/moduleExport/module-c.js` where module B re-exports module A functions

## Technical Details

- **Storybook Version**: 9.1.6
- **Framework**: React + Vite
- **TypeScript**: ~5.8.3

## Workarounds Attempted

1. **Different export syntax** - No change in behavior
2. **Explicit story re-exports** - Same issue persists
3. **Different meta configuration** - Stories still don't appear

## Running This Demo

1. Clone the repository
2. Install dependencies: `pnpm install`
3. Start Storybook: `pnpm run storybook`
4. Observe that only "Example/Button" appears in the sidebar, despite `SecondButton.stories.ts` properly re-exporting all stories

This demo is intended to be referenced in GitHub issues related to this Storybook limitation.
