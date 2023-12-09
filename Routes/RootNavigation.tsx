import * as React from 'react';

export const navigationRef: React.RefObject<any> = React.createRef();

export function navigate(name: string, params: any): void {
  navigationRef.current?.navigate(name, params);
}

export function replace(name: string, params: any): void {
  navigationRef.current?.replace(name, params);
}