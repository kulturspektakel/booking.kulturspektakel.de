import {
  FormControl,
  FormHelperText,
  FormLabel,
  Textarea,
  Select,
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
  [HeardAboutBookingFrom.Friends, 'Freunde / Bekannte'],
  [HeardAboutBookingFrom.Newspaper, 'Zeitung'],
  [HeardAboutBookingFrom.Website, 'Webseite'],
]);

export default function Step3() {
  const [context, updateContext] = useAppContext();
  const router = useRouter();
  const [create] = useCreateBandApplicationMutation();

  return (
    <Page>
      <Formik
        initialValues={context}
        onSubmit={async (values) => {
          updateContext(values);
          const data = {...context, ...values} as CreateBandApplicationInput;
          try {
            await create({
              variables: {
                data,
              },
              errorPolicy: 'all',
            });
            router.push('/danke');
          } catch (e) {
            alert(e);
          }
        }}
      >
        <Step>
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
        </Step>
      </Formik>
    </Page>
  );
}
