import React from 'react';
import {gql} from '@apollo/client';
import {
  BandDetailDocument,
  BandDetailQuery,
  BandDetailStaticPathsQuery,
} from '../../../types/graphql';
import Page from '../../../components/Page';
import {GetStaticPaths, GetStaticProps} from 'next';
import {initializeApollo} from '../../_app';
import {ArrowBackIcon} from '@chakra-ui/icons';
import {
  Button,
  Heading,
  SimpleGrid,
  AspectRatio,
  Box,
  Text,
} from '@chakra-ui/react';
import DateString from '../../../components/DateString';
import NextLink from 'next/link';
import Image from 'next/image';
import Mark from '../../../components/Mark';

type Props = {
  data: BandDetailQuery;
};

gql`
  query BandDetail($eventId: ID!, $slug: String!) {
    bandPlaying(eventId: $eventId, slug: $slug) {
      name
      description
      startTime
      genre
      photo {
        uri
        title
        width
        height
      }
      area {
        displayName
        themeColor
      }
    }
  }
`;

export default function BandPage({data}: Props) {
  const band = data.bandPlaying;
  console.log(data);
  if (band == null) {
    throw new Error();
  }

  return (
    <Page>
      <Button
        as={NextLink}
        href={`/lineup/${band.startTime.getFullYear()}`}
        leftIcon={<ArrowBackIcon />}
      >
        Lineup {band.startTime.getFullYear()}
      </Button>

      <Box>
        <DateString
          date={band.startTime}
          options={{
            hour: '2-digit',
            minute: '2-digit',
            weekday: 'short',
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
          }}
        />
        &nbsp;Uhr
        <Mark bgColor={band.area.themeColor}>{band.area.displayName}</Mark>
        <Heading>{band.name}</Heading>
        {band.genre}
      </Box>
      <SimpleGrid columns={2} spacing={6}>
        {band.photo && (
          <AspectRatio
            ratio={band.photo.width / band.photo.height}
            borderRadius="xl"
            overflow="hidden"
          >
            <Image src={band.photo?.uri} alt={band.photo.title ?? ''} fill />
          </AspectRatio>
        )}
        <Box>
          <Text>{band.description}</Text>
        </Box>
      </SimpleGrid>
    </Page>
  );
}

export const getStaticPaths: GetStaticPaths<ParsedUrlQuery> = async () => {
  const client = initializeApollo();
  const {data} = await client.query<BandDetailStaticPathsQuery>({
    query: gql`
      query BandDetailStaticPaths {
        events(type: Kulturspektakel) {
          id
          start
          bandsPlaying {
            edges {
              node {
                slug
              }
            }
          }
        }
      }
    `,
  });

  return {
    paths: data.events.flatMap((n) =>
      n.bandsPlaying.edges.map((b) => ({
        params: {year: String(n.start.getFullYear()), slug: b.node.slug},
      })),
    ),
    fallback: false,
  };
};

type ParsedUrlQuery = {
  year: string;
  slug: string;
};

export const getStaticProps: GetStaticProps<Props, ParsedUrlQuery> = async (
  ctx,
) => {
  const client = initializeApollo();
  const {data} = await client.query<BandDetailQuery>({
    query: BandDetailDocument,
    variables: {
      eventId: `Event:kult${ctx.params?.year}`,
      slug: ctx.params?.slug,
    },
  });

  return {
    props: {data},
  };
};
