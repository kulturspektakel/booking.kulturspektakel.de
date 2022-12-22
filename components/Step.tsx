import React from 'react';
import {Button, HStack, Spacer, VStack} from '@chakra-ui/react';
import {Form, useFormikContext} from 'formik';
import {Step, Steps} from 'chakra-ui-steps';
import {Beforeunload} from 'react-beforeunload';

export default function Page({
  children,
  nextButtonLabel,
  nextDisabled,
  step,
  onBack,
}: {
  children: React.ReactNode;
  nextButtonLabel?: string;
  nextDisabled: boolean;
  step: number;
  onBack: () => void;
}) {
  const {isSubmitting, dirty} = useFormikContext();

  return (
    <Form>
      <Beforeunload
        onBeforeunload={() => {
          if (dirty) {
            return 'Deine Bewerbung ist noch nicht abgesendet.';
          }
        }}
      />
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
          <Button isDisabled={isSubmitting || nextDisabled} onClick={onBack}>
            Zurück
          </Button>
          <Spacer />
          <Button
            colorScheme="blue"
            type="submit"
            isDisabled={isSubmitting || nextDisabled}
            isLoading={isSubmitting || nextDisabled}
          >
            {nextButtonLabel ?? 'Weiter'}
          </Button>
        </HStack>
      </VStack>
    </Form>
  );
}
