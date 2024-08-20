import { NativeModulesProxy, EventEmitter, Subscription } from 'expo-modules-core';

// Import the native module. On web, it will be resolved to GoCalc.web.ts
// and on native platforms to GoCalc.ts
import GoCalcModule from './src/GoCalcModule';
import GoCalcView from './src/GoCalcView';
import { ChangeEventPayload, GoCalcViewProps } from './src/GoCalc.types';

// Get the native constant value.
export const PI = GoCalcModule.PI;

export function hello(): string {
  return GoCalcModule.hello();
}

export function sub(a: number, b: number): number {
  return GoCalcModule.sub(a, b);
}

export async function setValueAsync(value: string) {
  return await GoCalcModule.setValueAsync(value);
}

export async function subAsync(num1: number, num2: number) {
  return await GoCalcModule.subAsync(num1, num2);
}

const emitter = new EventEmitter(GoCalcModule ?? NativeModulesProxy.GoCalc);

export function addChangeListener(listener: (event: ChangeEventPayload) => void): Subscription {
  return emitter.addListener<ChangeEventPayload>('onChange', listener);
}

export function addSubListener(listener: (event: ChangeEventPayload) => void): Subscription {
  return emitter.addListener<ChangeEventPayload>('onSub', listener);
}

export { GoCalcView, GoCalcViewProps, ChangeEventPayload };
