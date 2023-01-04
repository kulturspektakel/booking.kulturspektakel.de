import React, {useState} from 'react';
import Page from '../../components/Page';
import useIsDJ from '../../components/useIsDJ';
import Step1 from '../../components/Step1';
import Step2 from '../../components/Step2';
import Step3 from '../../components/Step3';
import {Formik} from 'formik';
import Step from '../../components/Step';
import {useRouter} from 'next/router';
import {
  CreateBandApplicationInput,
  GenreCategory,
  HeardAboutBookingFrom,
  useCreateBandApplicationMutation,
} from '../../types/graphql';
import {gql} from '@apollo/client';
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Code,
} from '@chakra-ui/react';
import {getUtmSource} from '../_app';

gql`
  mutation CreateBandApplication($data: CreateBandApplicationInput!) {
    createBandApplication(data: $data) {
      id
    }
  }
`;

const utmSourceMapping: Record<string, HeardAboutBookingFrom> = Object.freeze({
  fb: HeardAboutBookingFrom.Facebook,
  ig: HeardAboutBookingFrom.Instagram,
});

export type FormikContextT = Partial<CreateBandApplicationInput>;

const STEPS = [Step1, Step2, Step3];
export default function Application() {
  const isDJ = useIsDJ();
  const router = useRouter();
  const [create, {error, loading}] = useCreateBandApplicationMutation();
  const [currentStep, setCurrentStep] = useState(1);

  return (
    <Page>
      <Formik
        initialValues={{
          heardAboutBookingFrom: utmSourceMapping[getUtmSource() ?? ''],
          genreCategory: isDJ ? GenreCategory.Dj : '',
        }}
        onSubmit={async (values) => {
          if (currentStep === 3) {
            const data = {
              ...values,
            } as CreateBandApplicationInput;
            const {data: res} = await create({
              variables: {
                data,
              },
              errorPolicy: 'all',
            });
            if (res?.createBandApplication?.id) {
              await router.push(`${router.query.applicationType}/danke`);
            }
          } else {
            setCurrentStep(currentStep + 1);
          }
        }}
        validateOnChange={false}
      >
        <Step
          nextButtonLabel={currentStep === 3 ? 'Bewerbung absenden' : undefined}
          onBack={async () => {
            if (currentStep === 1) {
              await router.push('/');
            } else {
              setCurrentStep(currentStep - 1);
            }
          }}
          step={currentStep}
        >
          {React.createElement(STEPS[currentStep - 1])}
        </Step>
      </Formik>
      {!loading && error && (
        <Alert status="error" borderRadius="md">
          <AlertIcon />
          <Box flex="1">
            <AlertTitle mr={2}>
              Die Bewerbung konnte nicht abgeschickt werden.
            </AlertTitle>
            <AlertDescription>
              <p>
                Bitte versuche es nochmals, falls es immer noch nicht klappt,
                schreibe bitte eine Mail an{' '}
                <strong>{isDJ ? 'info' : 'booking'}@kulturspektakel.de</strong>.
              </p>
              <Code borderRadius="md">
                {error.name}: {error.message}
              </Code>
            </AlertDescription>
          </Box>
        </Alert>
      )}
    </Page>
  );
}
