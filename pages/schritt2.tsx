import {
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
  InputGroup,
  Text,
  InputLeftElement,
} from '@chakra-ui/react';
import React from 'react';
import Page from '../components/Page';
import {Formik} from 'formik';
import Step from '../components/Step';
import {useAppContext} from '../components/useAppContext';
import {useRouter} from 'next/dist/client/router';
import Field from '../components/Field';

export default function Step2() {
  const [context, updateContext] = useAppContext();
  const router = useRouter();

  return (
    <Page>
      <Formik
        initialValues={context}
        onSubmit={(values) => {
          updateContext(values);
          router.push('/schritt3');
        }}
      >
        <Step>
          <FormControl id="demo" isRequired>
            <FormLabel>Demomaterial: YouTube, Soundcloud, etc.</FormLabel>
            <FormHelperText mt="-2" mb="2">
              Bitte gebt uns einen direkten Link zu Demomaterial eurer Band,
              egal wo. Hauptsache wir können uns etwas von euch anhören.
            </FormHelperText>
            <Field
              type="url"
              placeholder="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
            />
          </FormControl>

          <FormControl id="instagram">
            <FormLabel>Instagram</FormLabel>
            <InputGroup>
              <InputLeftElement pointerEvents="none" color="gray.400">
                @
              </InputLeftElement>
              <Field placeholder="kulturspektakel" paddingStart="7" />
            </InputGroup>
          </FormControl>

          <FormControl id="facebook">
            <FormLabel>Facebook</FormLabel>
            <Field
              type="url"
              placeholder="https://facebook.com/kulturspektakel"
            />
            <FormErrorMessage>tes</FormErrorMessage>
          </FormControl>

          <FormControl id="website">
            <FormLabel>Webseite</FormLabel>
            <Field type="url" placeholder="https://kulturspektakel.de" />
          </FormControl>
        </Step>
      </Formik>
    </Page>
  );
}