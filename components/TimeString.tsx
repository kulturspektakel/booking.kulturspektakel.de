import React from 'react';
import {locale, timeZone} from './DateString';

export default function TimeString({
  date,
  options = {
    timeZone,
    day: 'numeric',
    month: 'numeric',
    year: 'numeric',
  },
}: {
  date: Date;
  options?: Intl.DateTimeFormatOptions;
}) {
  return (
    <time dateTime={date.toISOString()}>
      {date.toLocaleTimeString(locale, {
        hour: '2-digit',
        minute: '2-digit',
        timeZone,
      })}
    </time>
  );
}
