export const concatStrings = (fragments: string[], separator = ', ') =>
  fragments.filter(Boolean).join(separator);
