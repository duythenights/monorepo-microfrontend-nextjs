// apps/animation/image-loader.ts
export default function imageLoader({
  src,
  width,
  quality,
}: {
  src: string;
  width: number;
  quality?: number;
}) {
  // Nếu là absolute URL, giữ nguyên
  if (src.startsWith("http")) {
    return src;
  }

  // Trong development, point về localhost:3002
  if (process.env.NODE_ENV === "development") {
    return `http://localhost:3002/animation${src}?w=${width}&q=${quality || 75}`;
  }

  // Production: dùng relative path
  return `/animation${src}?w=${width}&q=${quality || 75}`;
}
