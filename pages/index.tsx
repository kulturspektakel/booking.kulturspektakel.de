import {gql} from '@apollo/client';
import {CheckCircleIcon} from '@chakra-ui/icons';
import {
  FormControl,
  FormHelperText,
  FormLabel,
  VStack,
  Input,
  InputGroup,
  InputLeftAddon,
  Text,
  Textarea,
  HStack,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Select,
  Accordion,
  AccordionItem,
  AccordionPanel,
  AccordionButton,
  Spacer,
  Heading,
  Button,
  ExpandedIndex,
  Alert,
  AlertDescription,
  AlertIcon,
  Link,
} from '@chakra-ui/react';
import React, {useState} from 'react';
import Page from '../components/Page';
import {GenreCategory} from '../types/graphql';
import {Formik, Form, Field} from 'formik';

gql`
  mutation CreateBandApplication($data: CreateBandApplicationInput!) {
    createBandApplication(data: $data) {
      id
    }
  }
`;

const category: Record<GenreCategory, string> = {
  [GenreCategory.Pop]: 'Pop',
  [GenreCategory.Rock]: 'Rock',
  [GenreCategory.Indie]: 'Indie',
  [GenreCategory.HardrockMetalPunk]: 'Hardrock / Metal / Punk',
  [GenreCategory.FolkSingerSongwriterCountry]:
    'Folk / Singer/Songwriter / Country',
  [GenreCategory.ElektroHipHop]: 'Elektro / Hip-Hop',
  [GenreCategory.BluesFunkJazzSoul]: 'Blues / Funk / Jazz / Soul',
  [GenreCategory.ReggaeSka]: 'Reggae / Ska',
  [GenreCategory.Other]: 'andere Musikrichtung',
};

export default function Home() {
  const [index, setIndex] = useState<ExpandedIndex | undefined>(0);
  return (
    <Page>
      <VStack spacing="2">
        <Text>
          Das Kulturspektakel Gauting findet vom 17.07. - 19.07.2022 statt.
        </Text>
        <Text>
          Dieses Bewerbungsformular ist für SolokünstlerInnen und Bands für das
          Kulturspektakel Gauting 2022. Nach dem Absenden des Formulars wird
          sich unser Booking-Team per E-Mail bei euch melden. Allerdings
          voraussichtlich erst nach Ablauf der Bewerbungsfrist.
        </Text>
        <Text>
          Bewerbungsschluss ist der 24.02.2022, trotzdem möchten wir euch dazu
          aufrufen eure Bewerbung so früh wie möglich einzureichen.
        </Text>
      </VStack>

      <Accordion index={index} mt="10" allowToggle={false}>
        <Formik
          initialValues={{
            description: '',
          }}
          validate={(v) => ({
            description: 's',
          })}
          onSubmit={(values, {setSubmitting}) => {
            //
          }}
        >
          {({isSubmitting, touched, values, setTouched, isValid, errors}) => {
            const step1Valid = true;
            return (
              <Form>
                <AccordionItem>
                  <PanelHeader title="Schritt 1: Band" completed={step1Valid} />
                  <AccordionPanel>
                    <VStack spacing="5">
                      <FormControl id="bandname" isRequired>
                        <FormLabel>Bandname</FormLabel>
                        <Input type="text" bg="white" />
                      </FormControl>

                      <FormControl
                        isRequired
                        id="description"
                        isInvalid={Boolean(errors.description)}
                      >
                        <FormLabel>Bandbeschreibung</FormLabel>
                        <FormHelperText mt="-2" mb="2">
                          Erzählt uns etwas über eure Band! Was macht ihr für
                          Musik? Was ist eure Bandgeschichte?
                        </FormHelperText>
                        <Field
                          as={Textarea}
                          name="description"
                          type="text"
                          bg="white"
                        />
                      </FormControl>

                      <FormControl id="city" isRequired>
                        <FormLabel>Wohnort</FormLabel>
                        <Input type="text" bg="white" />
                      </FormControl>

                      <Alert
                        status="warning"
                        borderRadius="md"
                        alignItems="flex-start"
                      >
                        <AlertIcon mt="0.5" />
                        <AlertDescription color="yellow.900">
                          Unser Festival findet in Gauting statt und die meisten
                          Bands kommen aus der Region. Wir freuen uns natürlich
                          über eure Bewerbung, egal von wo ihr anreist. Trotzdem
                          bitten wir euch zu überlegen, ob eine Anreise zu
                          unserem Festival für euch realistisch und finanzierbar
                          ist.
                        </AlertDescription>
                      </Alert>

                      <HStack w="100%">
                        <FormControl id="numberOfArtists" isRequired>
                          <FormLabel>Anzahl Bandmitglieder</FormLabel>
                          <NumberInput size="md" min={1}>
                            <NumberInputField bg="white" />
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
                          <NumberInput size="md" min={1}>
                            <NumberInputField bg="white" />
                            <NumberInputStepper>
                              <NumberIncrementStepper />
                              <NumberDecrementStepper />
                            </NumberInputStepper>
                          </NumberInput>
                        </FormControl>
                      </HStack>
                      <Text fontSize="sm" color="gray.500">
                        Die Festival-Branche hat eine geringe
                        Geschlechter-Diversität (
                        <Link
                          textDecoration="underline"
                          rel="noreferrer"
                          href="https://bit.ly/2HxZMgl"
                          target="_blank"
                        >
                          mehr Informationen
                        </Link>
                        ). Wir wählen die Bands nicht nach
                        Geschlechterverteilung aus, trotzdem wollen wir einen
                        besseren Überblick über die Situation bekommen und
                        ermutigen speziell unterrepräsentierte Gruppen sich bei
                        uns zu bewerben.
                      </Text>
                      <HStack w="100%">
                        <Spacer />
                        <Button
                          colorScheme="blue"
                          onClick={() => {
                            if (step1Valid) {
                              setIndex(1);
                            }
                          }}
                        >
                          Weiter
                        </Button>
                      </HStack>
                    </VStack>
                  </AccordionPanel>
                </AccordionItem>
              </Form>
            );
          }}
        </Formik>
        <AccordionItem>
          <PanelHeader title="Schritt 2: Musik" completed={false} />
          <AccordionPanel>
            <VStack spacing="5">
              <FormControl id="genreCategory" isRequired>
                <FormLabel>grobe Musikrichtung</FormLabel>
                <Select placeholder="bitte auswählen…" bg="white">
                  {Object.values(category).map((c) => (
                    <option value={GenreCategory[c]} key={GenreCategory[c]}>
                      {c}
                    </option>
                  ))}
                </Select>
              </FormControl>

              <FormControl id="genre" isRequired>
                <FormLabel>Genre</FormLabel>
                <Input type="text" bg="white" />
              </FormControl>

              <FormControl id="demo" isRequired>
                <FormLabel>Demomaterial: YouTube, Soundcloud, etc.</FormLabel>
                <FormHelperText mt="-2" mb="2">
                  Bitte gebt uns einen direkten Link zu Demomaterial eurer Band,
                  egal wo. Hauptsache wir können uns etwas von euch anhören.
                </FormHelperText>
                <Input
                  type="text"
                  bg="white"
                  placeholder="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                />
              </FormControl>

              <FormControl id="instagram">
                <FormLabel>Instagram</FormLabel>
                <InputGroup>
                  <InputLeftAddon>@</InputLeftAddon>
                  <Input bg="white" placeholder="kulturspektakel" />
                </InputGroup>
              </FormControl>

              <FormControl id="facebook">
                <FormLabel>Facebook</FormLabel>
                <Input
                  type="text"
                  bg="white"
                  placeholder="https://facebook.com/kulturspektakel"
                />
              </FormControl>

              <FormControl id="website">
                <FormLabel>Webseite</FormLabel>
                <Input
                  type="text"
                  bg="white"
                  placeholder="https://kulturspektakel.de"
                />
              </FormControl>
              <HStack w="100%">
                <Spacer />
                <Button colorScheme="blue" onClick={() => setIndex(2)}>
                  Weiter
                </Button>
              </HStack>
            </VStack>
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem>
          <PanelHeader title="Schritt 3: Kontakt" completed={false} />

          <AccordionPanel>
            <VStack spacing="5">
              <FormControl id="contactName" isRequired>
                <FormLabel>Ansprechpartner*in</FormLabel>
                <Input type="text" bg="white" />
              </FormControl>

              <FormControl id="email" isRequired>
                <FormLabel>Email-Adresse</FormLabel>
                <Input type="email" bg="white" />
              </FormControl>

              <FormControl id="contactPhone" isRequired>
                <FormLabel>Handynummer</FormLabel>
                <Input type="phone" bg="white" />
              </FormControl>

              <FormControl id="knowsKultFrom">
                <FormLabel>Woher kennt ihr das Kult?</FormLabel>
                <FormHelperText mt="-2" mb="2">
                  Was verbindet euch mit unserer Veranstaltung? Wart ihr
                  schonmal da? Woher kennt ihr das Kulturspektakel? Was wolltet
                  ihr uns schon immer mal erzählen?
                </FormHelperText>
                <Textarea type="text" bg="white" />
              </FormControl>

              <FormControl id="heardAboutBookingFrom">
                <FormLabel>
                  Wie seid ihr auf unser Booking aufmerksam geworden?
                </FormLabel>
                <Select placeholder="bitte auswählen…" bg="white">
                  <option value="option1">Option 1</option>
                  <option value="option2">Option 2</option>
                  <option value="option3">Option 3</option>
                </Select>
              </FormControl>
              <HStack w="100%">
                <Spacer />
                <Button
                  colorScheme="blue"
                  type="submit"
                  isLoading={true}
                  isDisabled={true}
                >
                  Bewerbung absenden
                </Button>
              </HStack>
            </VStack>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </Page>
  );
}

function PanelHeader({title, completed}: {title: string; completed: boolean}) {
  return (
    <h2>
      <AccordionButton>
        <Heading size="sm">{title}</Heading>
        <Spacer />
        <CheckCircleIcon color={completed ? 'green.400' : 'gray.300'} mr="2" />
      </AccordionButton>
    </h2>
  );
}
