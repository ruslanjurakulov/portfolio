// Single place for all contact data and public links.
// Edit this file to change what the site shows; nothing else hard-codes these values.

export type LinkId = 'telegram' | 'instagram' | 'x' | 'youtube' | 'tiktok' | 'github';

export const site = {
  name: 'Ruslan Jurakulov',
  email: 'ruslanjurakulov9@gmail.com',
  location: 'Uzbekistan',
  studio: {
    name: 'NightShift AI Studio',
    url: 'https://nightshift-ai.studio',
  },
  links: [
    { id: 'telegram', label: 'Telegram', handle: 'nightshiftaistudio', href: 'https://t.me/nightshiftaistudio' },
    { id: 'instagram', label: 'Instagram', handle: 'nightshift_ai.studio', href: 'https://www.instagram.com/nightshift_ai.studio/' },
    { id: 'x', label: 'X', handle: 'nightshift_ai', href: 'https://x.com/nightshift_ai' },
    { id: 'youtube', label: 'YouTube', handle: 'nightshift_ai_studio', href: 'https://www.youtube.com/@nightshift_ai_studio' },
    { id: 'tiktok', label: 'TikTok', handle: 'nightshift_ai_studio', href: 'https://www.tiktok.com/@nightshift_ai_studio' },
    { id: 'github', label: 'GitHub', handle: 'ruslanjurakulov', href: 'https://github.com/ruslanjurakulov' },
  ] as { id: LinkId; label: string; handle: string; href: string }[],
};
