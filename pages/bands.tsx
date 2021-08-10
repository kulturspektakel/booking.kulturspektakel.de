import {gql} from '@apollo/client';
import {
  Button,
  HStack,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Spinner,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Text,
  Tr,
} from '@chakra-ui/react';
import React from 'react';
import Page from '../components/Page';
import {useBandApplicationsQuery} from '../types/graphql';

gql`
  query BandApplications {
    bandApplications(eventYear: 2020) {
      id
      bandname
      city
      facebookLikes
      description
      genre
      genreCategory
    }
  }
`;

export default function Confirm() {
  const {data, loading} = useBandApplicationsQuery();

  return (
    <Page>
      {loading ? (
        <Spinner />
      ) : (
        <Table>
          <Thead>
            <Tr>
              <Th>Artist</Th>
              <Th>City</Th>
              <Th>Genre</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data?.bandApplications?.map((band) => (
              <Tr key={band.id}>
                <Td>
                  <strong>{band.bandname}</strong>
                </Td>
                <Td>{band.city}</Td>
                <Td>{band.genre}</Td>
                <Td>
                  <HStack>
                    <Popover>
                      <PopoverTrigger>
                        <Button>Details</Button>
                      </PopoverTrigger>
                      <PopoverContent>
                        <PopoverArrow />
                        <PopoverCloseButton />
                        <PopoverHeader>
                          <strong>{band.bandname}</strong>
                        </PopoverHeader>
                        <PopoverBody>
                          <Text noOfLines={3}>
                            {band.description?.substr(0, 140)}...
                          </Text>
                          <strong>Facebook Likes: </strong>{' '}
                          {band.facebookLikes ?? 0}
                          <br />
                          <strong>Instagram Follower: </strong> {0}
                          <br />
                          <strong>YouTube Subscriber: </strong> {0}
                          <br />
                        </PopoverBody>
                      </PopoverContent>
                    </Popover>
                    <Button>Follow</Button>
                  </HStack>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      )}
    </Page>
  );
}
