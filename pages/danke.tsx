import {gql} from '@apollo/client';
import {VStack, Heading, Text, Img} from '@chakra-ui/react';
import React, {useState} from 'react';
import {useEffect} from 'react';
import Page from '../components/Page';
import {useAppContext} from '../components/useAppContext';
import {GenreCategory, useThanksQuery} from '../types/graphql';

gql`
  query Thanks {
    node(id: "Event:kult2022") {
      ... on Event {
        bandApplicationEnd
      }
    }
  }
`;

const GENRE_ICONS: Map<GenreCategory, string> = new Map([
  [GenreCategory.Pop, 'pop.svg'],
  [GenreCategory.Rock, 'rock.svg'],
  [GenreCategory.Indie, 'indie.svg'],
  [GenreCategory.HardrockMetalPunk, 'metal.svg'],
  [GenreCategory.FolkSingerSongwriterCountry, 'country.svg'],
  [GenreCategory.ElektroHipHop, 'hip_hop.svg'],
  [GenreCategory.BluesFunkJazzSoul, 'jazz.svg'],
  [GenreCategory.ReggaeSka, 'hippie.svg'],
  [GenreCategory.Other, 'vocal.svg'],
]);

export default function Thanks() {
  const {data} = useThanksQuery();
  const [context, _, resetContext] = useAppContext();
  const [genre, setGenre] = useState<GenreCategory>(GenreCategory.Rock);
  useEffect(() => {
    if (context.genreCategory) {
      setGenre(context.genreCategory);
    }
    resetContext();
  }, [context.genreCategory, resetContext]);

  return (
    <Page>
      <VStack spacing="5" textAlign="center">
        <Img src={`/genre/${GENRE_ICONS.get(genre)}`} width="16" />
        <Heading size="lg">Danke für eure Bewerbung!</Heading>
        <Text>
          Wir haben dir soeben eine E-Mail zur Bestätigung geschickt. Wir
          beantworten jede Bewerbung allerdings kann es bis nach dem
          Bewerbungsschluss am{' '}
          {data?.node?.__typename === 'Event' &&
            data.node.bandApplicationEnd?.toLocaleDateString('de')}{' '}
          dauern, bis wir uns bei euch melden.
        </Text>
      </VStack>
    </Page>
  );
}
