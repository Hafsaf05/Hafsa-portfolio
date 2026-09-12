import type { WindowState } from "@/types";
export interface Viewport {
  width: number;
  height: number;
}
export function windowRect(data: WindowState, viewport: Viewport) {
  if (data.isMaximized)
    return { x: 0, y: 0, width: viewport.width, height: viewport.height };
  const mobile = viewport.width < 768,
    margin = mobile ? 8 : 12,
    top = mobile ? 64 : 76,
    bottom = mobile ? 76 : 88;
  const width = mobile
    ? viewport.width - margin * 2
    : Math.min(data.size.width, viewport.width - margin * 2);
  const height = Math.max(
    100,
    Math.min(data.size.height, viewport.height - top - bottom),
  );
  return {
    width,
    height,
    x: mobile
      ? margin
      : Math.max(
          margin,
          Math.min(data.position.x, viewport.width - width - margin),
        ),
    y: Math.max(
      top,
      Math.min(data.position.y, viewport.height - height - bottom),
    ),
  };
}
