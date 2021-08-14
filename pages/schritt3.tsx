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
  useCreateBandApplicationMutation,
} from '../types/graphql';

gql`
  mutation CreateBandApplication($data: CreateBandApplicationInput!) {
    createBandApplication(data: $data) {
      id
    }
  }
`;

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
            });
          } catch (e) {
            alert(e);
          }
          router.push('/danke');
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
              <option value="option1">Option 1</option>
              <option value="option2">Option 2</option>
              <option value="option3">Option 3</option>
            </Field>
          </FormControl>
        </Step>
      </Formik>
    </Page>
  );
}
