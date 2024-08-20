import * as React from 'react';

import { GoCalcViewProps } from './GoCalc.types';

export default function GoCalcView(props: GoCalcViewProps) {
  return (
    <div>
      <span>{props.name}</span>
    </div>
  );
}
