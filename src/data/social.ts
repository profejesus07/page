import { FacebookIcon, InstagramIcon, TikTokIcon, YoutubeIcon } from "../components/icons/SocialIcons";
import type { SocialLink } from "../types/content";
import { siteLinks } from "./siteLinks";

export const socialLinks: SocialLink[] = [
  { label: "TikTok", href: siteLinks.tiktok, icon: TikTokIcon },
  { label: "YouTube", href: siteLinks.youtube, icon: YoutubeIcon },
  { label: "Instagram", href: siteLinks.instagram, icon: InstagramIcon },
  { label: "Facebook", href: siteLinks.facebook, icon: FacebookIcon },
];
