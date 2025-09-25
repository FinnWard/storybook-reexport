import buttonMeta from "./Button.stories";
import { type Meta } from "@storybook/react-vite";
import { type ComponentProps } from "react";
type StoryProps = ComponentProps<(typeof buttonMeta)["component"]>;

export default {
  ...buttonMeta,
  id: "second-button",
} satisfies Meta<StoryProps>;

export * from "./Button.stories";
