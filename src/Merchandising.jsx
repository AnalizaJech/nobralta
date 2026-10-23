import {
  InstagramLogo,
  TiktokLogo,
  FacebookLogo,
  WhatsappLogo,
  YoutubeLogo,
  LinkedinLogo,
} from "@phosphor-icons/react";
import { AssetImage } from "./AssetImage";
export const socialChannels = [
  [
    "instagram",
    "Instagram",
    InstagramLogo,
    "https://www.instagram.com/nobralta/",
  ],
  ["tiktok", "TikTok", TiktokLogo, "https://www.tiktok.com/@nobralta"],
  ["facebook", "Facebook", FacebookLogo, "https://www.facebook.com/nobralta/"],
  ["whatsapp", "WhatsApp", WhatsappLogo, "https://www.whatsapp.com/"],
  ["youtube", "YouTube", YoutubeLogo, "https://www.youtube.com/@nobralta"],
  [
    "linkedin",
    "LinkedIn",
    LinkedinLogo,
    "https://www.linkedin.com/company/nobralta/",
  ],
];
export function SocialLinks({ settings }) {
  return (
    <div className="social-links" aria-label="Redes sociales">
      {socialChannels.map(([id, name, Icon, fallback]) => (
        <a
          key={id}
          href={settings["social_" + id] || fallback}
          aria-label={name}
          title={name}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Icon size={21} />
        </a>
      ))}
    </div>
  );
}
export function packUnits(pack, products) {
  return Array.from(
    { length: Math.max(2, Math.min(5, Number(pack.qty) || 2)) },
    (_, i) =>
      products.find(
        (p) =>
          p.id ===
          (pack.productIds?.[i] ||
            (pack.secondaryProductId && i === Number(pack.qty) - 1
              ? pack.secondaryProductId
              : pack.productId)),
      ),
  ).filter(Boolean);
}
export function PackArtwork({ pack, products }) {
  const units = packUnits(pack, products);
  return (
    <div
      className={"pack-artwork pack-artwork--" + units.length}
      aria-label="Prendas incluidas"
    >
      {units.map((p, i) => {
        const v =
          p.variants.find((v) => v.color === pack.colors?.[i]) ||
          p.variants[i % p.variants.length];
        return (
          <figure key={i}>
            <AssetImage
              src={v.image}
              alt={p.name + " " + v.color}
              loading="lazy"
            />
            <figcaption>{v.color}</figcaption>
          </figure>
        );
      })}
    </div>
  );
}
