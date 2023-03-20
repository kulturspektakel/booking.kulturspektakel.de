import React from 'react';
import {Text, TextProps} from '@chakra-ui/react';
import hexRgb from 'hex-rgb';

export default function Mark({
  children,
  bgColor,
  ...props
}: {children: React.ReactNode} & TextProps) {
  const {red, green, blue} = hexRgb(String(bgColor ?? 'ffff00'));
  return (
    <Text
      as="mark"
      fontWeight="semibold"
      color="inherit"
      {...props}
      m="0 -0.4em"
      p="0.1em 0.4em"
      borderRadius="0.8em 0.3em"
      bgColor="transparent"
      boxDecorationBreak="clone"
      bgImage={`linear-gradient(
        to right,
        rgba(${red}, ${green}, ${blue}, 0.1),
        rgba(${red}, ${green}, ${blue}, 0.7) 4%,
        rgba(${red}, ${green}, ${blue}, 0.3)
      )`}
    >
      {children}
    </Text>
  );
}
