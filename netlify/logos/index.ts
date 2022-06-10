

const logos: Record<string, string> = {
  '43': 'https://upload.wikimedia.org/wikipedia/commons/9/98/Ufotable_logo.svg'
}

export const getLogo = (studioId: string): string | null => {
  if(studioId in logos) {
    return logos[studioId]
  }

  return null;
}
