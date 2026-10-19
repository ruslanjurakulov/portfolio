import { Fragment, type CSSProperties } from 'react';

const v = (o: Record<string, string | number>) => o as CSSProperties;

/**
 * Splits a heading into words, each inside its own mask. CSS lets the words rise into place:
 * the hero title on load, section titles when they scroll into view. The text stays one normal run
 * of words for screen readers and copy/paste; without motion nothing is hidden.
 */
export function Words({ text, start = 0 }: { text: string; start?: number }) {
  return (
    <>
      {text.split(' ').map((word, i) => (
        <Fragment key={i}>
          {i > 0 ? ' ' : null}
          <span className="w">
            <span className="wi" style={v({ '--i': start + i })}>
              {word}
            </span>
          </span>
        </Fragment>
      ))}
    </>
  );
}
