import sizes from "./media-sizes.json";
const previewRevision = import.meta.env.DEV ? Date.now() : null;
export const assetUrl = (src) =>
  src?.startsWith("/") && !src.startsWith("//")
    ? import.meta.env.BASE_URL + src.slice(1)
    : src;
export function AssetImage({ src, ...props }) {
  const [width, height] = sizes[src] || [1100, 1430];
  return (
    <img
      src={
        previewRevision && src?.startsWith("/assets/")
          ? `${assetUrl(src)}?preview=${previewRevision}`
          : assetUrl(src)
      }
      width={width}
      height={height}
      {...props}
    />
  );
}
