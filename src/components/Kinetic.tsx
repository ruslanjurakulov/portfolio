import { Fragment, type CSSProperties } from 'react';

const v = (o: Record<string, string | number>) => o as CSSProperties;

/**
 * Splits text into words, each inside a mask. CSS makes the words rise into place with a spring
 * (hero: on load; section titles: when the title scrolls into view). The text stays one normal
 * run of words for screen readers and copy/paste. `accent` is a phrase of `text` to highlight.
 */
export function Split({ text, accent, start = 0 }: { text: string; accent?: string; start?: number }) {
  const from = accent ? text.indexOf(accent) : -1;
  let offset = 0;
  return (
    <>
      {text.split(' ').map((word, i) => {
        const at = offset;
        offset += word.length + 1;
        const isAccent = from >= 0 && at >= from && at < from + accent!.length;
        return (
          <Fragment key={i}>
            {i > 0 ? ' ' : null}
            <span className="w">
              <span className={`wi${isAccent ? ' acc' : ''}`} style={v({ '--i': start + i })}>
                {word}
              </span>
            </span>
          </Fragment>
        );
      })}
    </>
  );
}

/**
 * "I build [landing pages | small business sites | multi-language sites]".
 * The three phrases take turns letter by letter (CSS keyframes, 3 s each, 9 s cycle), all in one grid
 * cell so the line never changes height. Visual layer is aria-hidden; screen readers get one plain
 * sentence. Without motion the first phrase simply stays. Needs exactly three phrases.
 */
export function Rotator({ lead, words }: { lead: string; words: string[] }) {
  return (
    <p className="font-display text-xl font-semibold leading-snug tracking-tight sm:text-3xl">
      <span className="sr-only">
        {lead} {words.join(', ')}.
      </span>
      <span aria-hidden="true">
        <span className="text-muted">{lead} </span>
        <span className="rot">
          {words.map((word, w) => (
            <span key={w} className="rot-item text-ink" style={v({ '--w': w })}>
              {(() => {
                let ci = 0;
                return word.split(' ').map((part, pi) => (
                  <Fragment key={pi}>
                    {pi > 0 ? ' ' : null}
                    <span className="rw">
                      {Array.from(part).map((ch, k) => (
                        <span key={k} className="rc" style={v({ '--ci': ci++ })}>
                          {ch}
                        </span>
                      ))}
                    </span>
                  </Fragment>
                ));
              })()}
            </span>
          ))}
        </span>
      </span>
    </p>
  );
}

/** A number that counts up from 0 once when seen (see Choreo). The real value is always in the markup. */
export function Counter({ value }: { value: number }) {
  return (
    <span data-count={value} className="stat-n">
      {value}
    </span>
  );
}
