import React, {useCallback} from 'react';
import {Button, HStack, Spacer, VStack} from '@chakra-ui/react';
import {useRouter} from 'next/dist/client/router';
import {Form, useFormikContext} from 'formik';
import {Step, Steps} from 'chakra-ui-steps';
import {useAppContext} from './useAppContext';
import {CreateBandApplicationInput} from '../types/graphql';

export default function Page({
  children,
  nextButtonLabel,
  step,
}: {
  children: React.ReactNode;
  nextButtonLabel?: string;
  step: number;
}) {
  const router = useRouter();
  const [_, updateContext] = useAppContext();
  const {isSubmitting, values} =
    useFormikContext<Partial<CreateBandApplicationInput>>();
  const onBack = useCallback(() => {
    updateContext(values);
    router.back();
  }, [router, updateContext, values]);

  return (
    <Form>
      <VStack spacing="5">
        <Steps
          activeStep={step - 1}
          responsive={false}
          colorScheme="blue"
          display={['none', 'flex']}
        >
          <Step label="Infos" />
          <Step label="Musik" />
          <Step label="Kontakt" />
        </Steps>
        {children}
        <HStack w="100%">
          <Button isDisabled={isSubmitting} onClick={onBack}>
            Zurück
          </Button>
          <Spacer />
          <Button
            colorScheme="blue"
            type="submit"
            isDisabled={isSubmitting}
            isLoading={isSubmitting}
          >
            {nextButtonLabel ?? 'Weiter'}
          </Button>
        </HStack>
      </VStack>
    </Form>
  );
}
