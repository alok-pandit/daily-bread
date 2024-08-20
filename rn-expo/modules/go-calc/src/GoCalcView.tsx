import { requireNativeViewManager } from 'expo-modules-core';
import * as React from 'react';

import { GoCalcViewProps } from './GoCalc.types';

const NativeView: React.ComponentType<GoCalcViewProps> =
  requireNativeViewManager('GoCalc');

export default function GoCalcView(props: GoCalcViewProps) {
  return <NativeView {...props} />;
}
