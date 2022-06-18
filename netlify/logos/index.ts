const logos: Record<string, string> = {
  '43': 'https://upload.wikimedia.org/wikipedia/commons/9/98/Ufotable_logo.svg',
  '6069': 'https://upload.wikimedia.org/wikipedia/commons/4/4c/3Hz_Inc._logo.png',
  '561': 'https://upload.wikimedia.org/wikipedia/commons/d/d9/A-1_Pictures_Logo.svg',
  '4': 'https://upload.wikimedia.org/wikipedia/commons/f/f9/Bones_logo.svg',
  '112': 'https://upload.wikimedia.org/wikipedia/commons/5/5e/Brain%27s_Base_logo.svg',
  '6052': 'https://upload.wikimedia.org/wikipedia/commons/8/8d/C2C_logo.png',
  '6222': 'https://upload.wikimedia.org/wikipedia/commons/3/3b/CloverWorks_Logo.svg',
  '291': 'https://upload.wikimedia.org/wikipedia/commons/1/1f/CoMix_Wave_Films_Logo.svg',
  '6072': 'https://upload.wikimedia.org/wikipedia/commons/b/bf/Creators_in_Pack_logo.png',
  '6182': 'https://upload.wikimedia.org/wikipedia/commons/2/21/CygamesPictures_Logo.png',
  '287': 'https://upload.wikimedia.org/wikipedia/commons/1/11/David_Production_logo.svg',
  '51': 'https://upload.wikimedia.org/wikipedia/commons/c/c4/Diomed%C3%A9a_studio_logo.png',
  '95': 'https://upload.wikimedia.org/wikipedia/commons/a/a8/Doga_Kobo_Logo.svg',
  '6127': 'https://upload.wikimedia.org/wikipedia/commons/1/15/Egg_Firm_Logo.png',
  '7': 'https://upload.wikimedia.org/wikipedia/commons/f/f5/J.C.Staff_Logo.svg',
  '290': 'https://upload.wikimedia.org/wikipedia/commons/c/c0/Kinema_Citrus_logo.png',
  '2': 'https://upload.wikimedia.org/wikipedia/commons/b/bf/Kyoto_Animation_logo.svg',
};

export const getLogo = (studioId: string): string | null => {
  if (studioId in logos) {
    return logos[studioId];
  }

  return null;
};
