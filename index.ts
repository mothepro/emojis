import allEmojis from './emojis.json'

export default allEmojis

/** Yields an emoji and its description in random order. */
export function* randomPairs() {
  const emojis = Object.keys(allEmojis) as Array<keyof typeof allEmojis>
  for (let i = emojis.length - 1; i > 0; i--) {
    const j = Math.trunc(Math.random() * i);
    [emojis[j], emojis[i]] = [emojis[i], emojis[j]]
  }

  for (const emoji of emojis)
    yield { emoji, description: allEmojis[emoji] }
}

/** Yields all emojis and their descriptions as a string in random order. */
export function* randomStrings(prefix = false) {
  for (const { emoji, description } of randomPairs())
    yield prefix
      ? emoji + ' ' + description
      : description + ' ' + emoji
}

/** Continuously yields emojis and their descriptions as a string. */
export function* foreverStrings(prefix = false): Generator<string, never, void> {
  while (true)
    yield* randomStrings(prefix)
}
