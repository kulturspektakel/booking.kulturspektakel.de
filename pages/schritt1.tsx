import {
  FormControl,
  FormHelperText,
  FormLabel,
  Text,
  Textarea,
  HStack,
  Link,
  Select,
} from '@chakra-ui/react';
import React, {useState} from 'react';
import Page from '../components/Page';
import {GenreCategory} from '../types/graphql';
import {Formik} from 'formik';
import Step from '../components/Step';
import {AppContextT, useAppContext} from '../components/useAppContext';
import DistanceWarning from '../components/DistanceWarning';
import {useRouter} from 'next/dist/client/router';
import Field from '../components/Field';
import useIsDJ from '../components/useIsDJ';

const GENRE_CATEGORIES: Map<GenreCategory, string> = new Map([
  [GenreCategory.Pop, 'Pop'],
  [GenreCategory.Rock, 'Rock'],
  [GenreCategory.Indie, 'Indie'],
  [GenreCategory.HardrockMetalPunk, 'Hardrock / Metal / Punk'],
  [
    GenreCategory.FolkSingerSongwriterCountry,
    'Folk / Singer/Songwriter / Country',
  ],
  [GenreCategory.ElektroHipHop, 'Elektro / Hip-Hop'],
  [GenreCategory.BluesFunkJazzSoul, 'Blues / Funk / Jazz / Soul'],
  [GenreCategory.ReggaeSka, 'Reggae / Ska'],
  [GenreCategory.Other, 'andere Musikrichtung'],
]);

export default function Step1() {
  const [context, updateContext] = useAppContext();
  const isDJ = useIsDJ();
  const [city, setCity] = useState(context.city);
  const router = useRouter();

  return (
    <Page>
      <Formik
        initialValues={context}
        onSubmit={(values) => {
          updateContext(values);
          router.push({pathname: '/schritt2', query: router.query});
        }}
        validate={(v) => {
          const errors: {[key in keyof AppContextT]: string} = {};
          if (
            v.numberOfNonMaleArtists &&
            v.numberOfArtists &&
            v.numberOfNonMaleArtists > v.numberOfArtists
          ) {
            errors.numberOfNonMaleArtists =
              'Anzahl der nicht männlichen Künstler*innen kann nicht größer als Anzahl der männlichen Künster sein.';
          }
          return errors;
        }}
      >
        {({values}) => {
          return (
            <Step step={1}>
              <FormControl id="bandname" isRequired>
                <FormLabel>
                  {isDJ ? 'Künstler:innen-Name' : 'Bandname'}
                </FormLabel>
                <Field />
              </FormControl>

              <HStack w="100%">
                <FormControl id={isDJ ? 'genre' : 'genreCategory'} isRequired>
                  <FormLabel>Musikrichtung</FormLabel>
                  {isDJ ? (
                    <Field />
                  ) : (
                    <Field as={Select} placeholder="bitte auswählen…">
                      {Array.from(GENRE_CATEGORIES.entries()).map(([k, v]) => (
                        <option value={k} key={k}>
                          {v}
                        </option>
                      ))}
                    </Field>
                  )}
                </FormControl>
                {!isDJ && (
                  <FormControl id="genre">
                    <Field placeholder="genaues Genre (optional)" mt="8" />
                  </FormControl>
                )}
              </HStack>

              <FormControl isRequired id="description">
                <FormLabel>
                  {isDJ ? 'Beschreibung' : 'Bandbeschreibung'}
                </FormLabel>
                <FormHelperText mt="-2" mb="2">
                  {isDJ
                    ? 'Erzähl uns was über dich! Was legst du auf? Wie lange machst du das schon?'
                    : `Erzählt uns etwas über eure Band! Was macht ihr für Musik? Was
                  ist eure Bandgeschichte?`}
                </FormHelperText>
                <Field as={Textarea} />
              </FormControl>

              <FormControl id="city" isRequired>
                <FormLabel>Wohnort</FormLabel>
                <Field
                  onBlur={(e: React.BaseSyntheticEvent) =>
                    setCity(e.target.value)
                  }
                />
              </FormControl>

              <DistanceWarning origin={city} />

              {!isDJ && (
                <>
                  <HStack w="100%" mt="5">
                    <FormControl id="numberOfArtists" isRequired>
                      <FormLabel>Anzahl Bandmitglieder</FormLabel>
                      <Field type="number" min={1} />
                    </FormControl>
                    <FormControl id="numberOfNonMaleArtists" isRequired>
                      <FormLabel>
                        davon <strong>nicht</strong> männlich
                      </FormLabel>
                      <Field
                        type="number"
                        min={0}
                        max={values.numberOfArtists ?? 100}
                      />
                    </FormControl>
                  </HStack>
                  <Text fontSize="sm" color="gray.500">
                    Die Festival-Branche hat eine geringe
                    Geschlechter&shy;diversität (
                    <Link
                      textDecoration="underline"
                      rel="noreferrer"
                      href="https://bit.ly/2HxZMgl"
                      target="_blank"
                    >
                      mehr Informationen
                    </Link>
                    ). Wir wählen die Bands nicht nach
                    Geschlechter&shy;verteilung aus, trotzdem wollen wir einen
                    besseren Überblick über die Situation bekommen. Personen und
                    Gruppen die auf Festival&shy;bühnen unter&shy;repräsentiert
                    sind möchten wir explizit ermutigen sich bei uns zu
                    bewerben.
                  </Text>
                </>
              )}
            </Step>
          );
        }}
      </Formik>
    </Page>
  );
}
