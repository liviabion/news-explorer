import React from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import { type ComponentProps } from 'react';

type NavBarIconProps = IconProps & {
  name: ComponentProps<typeof Ionicons>['name'];
  style?: object;
};

export function NavBarIcon({ style, ...rest }: NavBarIconProps) {
  return <Ionicons size={28} style={[{ marginBottom: -3 }, style]} {...rest} />;
}

