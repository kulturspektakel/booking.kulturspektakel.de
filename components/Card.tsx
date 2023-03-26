import React from 'react';
import {BoxProps, Link, Box} from '@chakra-ui/react';
import NextLink from 'next/link';

const Card = React.forwardRef(function CardInner(
  {
    href,
    children,
    aspectRatio,
    ...props
  }: {
    children: React.ReactNode;
    href?: string;
    aspectRatio?: string;
  } & BoxProps,
  ref,
) {
  const _hover = {
    transform: 'scale(1.03) rotate(1deg)',
    boxShadow: 'lg',
  };

  const p: BoxProps = {
    bg: 'white',
    borderRadius: 'lg',
    boxShadow: 'sm',
    overflow: 'hidden',
    ...props,
    _hover,
    ref,
    transition: '.15s all',
    sx: {aspectRatio},
    display: 'flex',
    flexDirection: 'column',
  };

  if (href != null) {
    return (
      <Link
        as={NextLink}
        href={href}
        {...p}
        _focusVisible={{
          ..._hover,
          outlineColor: 'blue',
        }}
        _active={{
          ..._hover,
          outlineColor: 'blue',
        }}
      >
        {children}
      </Link>
    );
  }
  return <Box {...p}>{children}</Box>;
});

export default Card;
