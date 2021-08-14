import {
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Text,
  Textarea,
  HStack,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Link,
  Select,
} from '@chakra-ui/react';
import React, {useState} from 'react';
import Page from '../components/Page';
import {GenreCategory} from '../types/graphql';
import {Formik, Form, Field} from 'formik';
import Step from '../components/Step';
import {AppContextT, useAppContext} from '../components/useAppContext';
import DistanceWarning from '../components/DistanceWarning';
import {useRouter} from 'next/dist/client/router';

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

export default function Home() {
  const [context, updateContext] = useAppContext();
  const [city, setCity] = useState(context.city);
  const router = useRouter();

  return (
    <Page>
      <Formik
        initialValues={
          context as Pick<
            AppContextT,
            | 'bandname'
            | 'genreCategory'
            | 'genre'
            | 'description'
            | 'city'
            | 'numberOfArtists'
            | 'numberOfNonMaleArtists'
          >
        }
        validate={(v) => ({
          bandname: v.bandname ? null : 'asd',
          description: v.description ? null : 'asd',
          city: v.city ? null : 'asd',
          numberOfArtists: v.numberOfArtists ? null : 'asd',
          numberOfNonMaleArtists: v.numberOfNonMaleArtists ? null : 'asd',
        })}
        onSubmit={(values) => {
          console.log('onSubmit');
          updateContext(values);
          router.push('/schritt2');
        }}
      >
        {({errors, touched, values, getFieldProps}) => {
          return (
            <Step>
              <FormControl
                id="bandname"
                isRequired
                isInvalid={touched.bandname && Boolean(errors.bandname)}
              >
                <FormLabel>Bandname</FormLabel>
                <Field as={Input} type="text" bg="white" name="bandname" />
              </FormControl>

              <HStack w="100%">
                <FormControl id="genreCategory" isRequired>
                  <FormLabel>Musikrichtung</FormLabel>
                  <Field
                    as={Select}
                    placeholder="bitte auswählen…"
                    bg="white"
                    name="genreCategory"
                  >
                    {Array.from(GENRE_CATEGORIES.entries()).map(([k, v]) => (
                      <option value={k} key={k}>
                        {v}
                      </option>
                    ))}
                  </Field>
                </FormControl>
                <FormControl id="genre">
                  <Field
                    as={Input}
                    placeholder="genaues Genre (optional)"
                    bg="white"
                    name="genre"
                    mt="8"
                  />
                </FormControl>
              </HStack>

              <FormControl
                isRequired
                id="description"
                isInvalid={touched.description && Boolean(errors.description)}
              >
                <FormLabel>Bandbeschreibung</FormLabel>
                <FormHelperText mt="-2" mb="2">
                  Erzählt uns etwas über eure Band! Was macht ihr für Musik? Was
                  ist eure Bandgeschichte?
                </FormHelperText>
                <Field
                  as={Textarea}
                  name="description"
                  type="text"
                  bg="white"
                />
              </FormControl>

              <FormControl
                id="city"
                isRequired
                isInvalid={touched.city && Boolean(errors.city)}
              >
                <FormLabel>Wohnort</FormLabel>
                <Field
                  as={Input}
                  name="city"
                  type="text"
                  bg="white"
                  onBlur={(e: React.BaseSyntheticEvent) =>
                    setCity(e.target.value)
                  }
                />
              </FormControl>

              <DistanceWarning origin={city} />

              <HStack w="100%">
                <FormControl id="numberOfArtists" isRequired>
                  <FormLabel>Anzahl Bandmitglieder</FormLabel>
                  <NumberInput size="md" min={1}>
                    <NumberInputField
                      bg="white"
                      {...getFieldProps('numberOfArtists')}
                    />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
                </FormControl>
                <FormControl id="numberOfNonMaleArtists" isRequired>
                  <FormLabel>
                    davon <strong>nicht</strong> männlich
                  </FormLabel>
                  <NumberInput size="md" min={1} max={values.numberOfArtists}>
                    <NumberInputField
                      bg="white"
                      {...getFieldProps('numberOfNonMaleArtists')}
                    />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
                </FormControl>
              </HStack>
              <Text fontSize="sm" color="gray.500">
                Die Festival-Branche hat eine geringe Geschlechter-Diversität (
                <Link
                  textDecoration="underline"
                  rel="noreferrer"
                  href="https://bit.ly/2HxZMgl"
                  target="_blank"
                >
                  mehr Informationen
                </Link>
                ). Wir wählen die Bands nicht nach Geschlechterverteilung aus,
                trotzdem wollen wir einen besseren Überblick über die Situation
                bekommen und ermutigen speziell unterrepräsentierte Gruppen sich
                bei uns zu bewerben.
              </Text>
            </Step>
          );
        }}
      </Formik>
    </Page>
  );
}
