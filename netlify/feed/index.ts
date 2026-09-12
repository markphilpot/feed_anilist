/**
 * AniList's `Media.updatedAt` is not an edit timestamp - batch jobs that recalculate stats
 * (score, popularity, trending) bump it for effectively every record on a rolling hourly basis.
 * Using it as an item's pubDate made readers re-surface the entire feed every time those jobs
 * ran. `startDate` is the release date, so it stays put once a title is dated.
 */
export interface FuzzyDate {
  year: number | null;
  month: number | null;
  day: number | null;
}

/**
 * An empty string leaves `pubDate` off the item entirely, which is what we want for unannounced
 * titles: readers then fall back to the time they first saw the item, and a new announcement
 * still reads as new.
 */
export const releaseDate = (startDate: FuzzyDate | null): Date | '' => {
  const year = startDate?.year;

  if (!year) {
    return '';
  }

  // Built in UTC so the date can't shift with the function's timezone.
  return new Date(Date.UTC(year, (startDate?.month ?? 1) - 1, startDate?.day ?? 1));
};

/**
 * Identity for a feed item. Keyed off the media id rather than the site URL so it survives any
 * change to how AniList formats links.
 */
export const mediaGuid = (id: number): string => `anilist:media:${id}`;
