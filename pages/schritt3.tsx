import {
  FormControl,
  FormHelperText,
  FormLabel,
  Textarea,
  Select,
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Code,
} from '@chakra-ui/react';
import React from 'react';
import Page from '../components/Page';
import {Formik} from 'formik';
import Step from '../components/Step';
import {useAppContext} from '../components/useAppContext';
import {useRouter} from 'next/dist/client/router';
import Field from '../components/Field';
import {gql} from '@apollo/client';
import {
  CreateBandApplicationInput,
  HeardAboutBookingFrom,
  useCreateBandApplicationMutation,
  PreviouslyPlayed,
} from '../types/graphql';

gql`
  mutation CreateBandApplication($data: CreateBandApplicationInput!) {
    createBandApplication(data: $data) {
      id
    }
  }
`;

const HEARD_ABOUT: Map<HeardAboutBookingFrom, string> = new Map([
  [HeardAboutBookingFrom.BYon, 'BY-on'],
  [HeardAboutBookingFrom.Facebook, 'Facebook'],
  [HeardAboutBookingFrom.Instagram, 'Instagram'],
  [HeardAboutBookingFrom.Friends, 'Freunde / Bekannte'],
  [HeardAboutBookingFrom.Newspaper, 'Zeitung'],
  [HeardAboutBookingFrom.Website, 'Webseite'],
]);

const PLAYED_PREVIOUSLY: Map<PreviouslyPlayed, string> = new Map([
  [PreviouslyPlayed.Yes, 'Ja'],
  [PreviouslyPlayed.OtherFormation, 'Mit einer anderen Band'],
  [PreviouslyPlayed.No, 'Nein'],
]);

export default function Step3() {
  const [context, updateContext, resetContext] = useAppContext();
  const router = useRouter();
  const [create, {error, loading}] = useCreateBandApplicationMutation();

  return (
    <Page>
      <Formik
        initialValues={context}
        onSubmit={async (values) => {
          updateContext(values);
          const data = {...context, ...values} as CreateBandApplicationInput;
          const {data: res} = await create({
            variables: {
              data,
            },
            errorPolicy: 'all',
          });
          if (res?.createBandApplication?.id) {
            resetContext();
            router.push('/danke');
          }
        }}
      >
        <Step nextButtonLabel="Bewerbung absenden" step={3}>
          <FormControl id="contactName" isRequired>
            <FormLabel>Ansprechpartner*in</FormLabel>
            <Field />
          </FormControl>

          <FormControl id="email" isRequired>
            <FormLabel>Email-Adresse</FormLabel>
            <Field type="email" />
          </FormControl>

          <FormControl id="contactPhone" isRequired>
            <FormLabel>Handynummer</FormLabel>
            <Field type="tel" />
          </FormControl>

          <FormControl id="knowsKultFrom">
            <FormLabel>Woher kennt ihr das Kult?</FormLabel>
            <FormHelperText mt="-2" mb="2">
              Was verbindet euch mit unserer Veranstaltung? Wart ihr schonmal
              da? Woher kennt ihr das Kulturspektakel? Was wolltet ihr uns schon
              immer mal erzählen?
            </FormHelperText>
            <Field as={Textarea} />
          </FormControl>

          <FormControl id="hasPreviouslyPlayed">
            <FormLabel>Habt ihr schonmal bei uns gespielt?</FormLabel>
            <Field as={Select} placeholder="bitte auswählen…">
              {Array.from(PLAYED_PREVIOUSLY.entries()).map(([k, v]) => (
                <option key={k} value={k}>
                  {v}
                </option>
              ))}
            </Field>
          </FormControl>

          <FormControl id="heardAboutBookingFrom">
            <FormLabel>
              Wie seid ihr auf unser Booking aufmerksam geworden?
            </FormLabel>
            <Field as={Select} placeholder="bitte auswählen…">
              {Array.from(HEARD_ABOUT.entries()).map(([k, v]) => (
                <option key={k} value={k}>
                  {v}
                </option>
              ))}
            </Field>
          </FormControl>
          {!loading && error && (
            <Alert status="error" borderRadius="md">
              <AlertIcon />
              <Box flex="1">
                <AlertTitle mr={2}>
                  Die Bewerbung konnte nicht abgeschickt werden.
                </AlertTitle>
                <AlertDescription>
                  <p>
                    Bitte versuche es nochmals, falls es immer noch nicht
                    klappt, schreibe bitte eine Mail an{' '}
                    <strong>booking@kulturspektakel.de</strong>.
                  </p>
                  <Code borderRadius="md">
                    {error.name}: {error.message}
                  </Code>
                </AlertDescription>
              </Box>
            </Alert>
          )}
        </Step>
      </Formik>
    </Page>
  );
}
