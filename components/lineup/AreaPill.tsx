import React, {useState} from 'react';
import {gql} from '@apollo/client';
import {Button, Center, ScaleFade} from '@chakra-ui/react';
import {CloseIcon} from '@chakra-ui/icons';
import {AreaPillFragment} from '../../types/graphql';

gql`
  fragment AreaPill on Area {
    id
    displayName
    themeColor
  }
`;

export default function AreaPill({
  area,
  isSelected,
  onChange,
}: {
  area: AreaPillFragment;
  isSelected: boolean;
  onChange: (value: string | null) => void;
}) {
  const [hover, setHover] = useState(false);

  return (
    <Button
      size="md"
      onMouseEnter={() => setHover(isSelected)}
      onMouseLeave={() => setHover(false)}
      borderRadius="full"
      aria-pressed={isSelected}
      position="relative"
      onClick={() => onChange(isSelected ? null : area.id)}
      bgColor={isSelected ? area.themeColor : undefined}
      _hover={
        {
          // bgColor: isSelected ? area.themeColor : undefined,
        }
      }
    >
      <ScaleFade in={!hover || !isSelected}>{area.displayName}</ScaleFade>
      <Center position="absolute">
        <ScaleFade in={hover && isSelected}>
          <CloseIcon />
        </ScaleFade>
      </Center>
    </Button>
  );
}
