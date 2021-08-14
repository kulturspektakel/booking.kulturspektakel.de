import React from 'react';
import {Button, HStack, Spacer, VStack} from '@chakra-ui/react';
import {useRouter} from 'next/dist/client/router';
import {Form, useFormikContext} from 'formik';

export default function Page({children}: {children: React.ReactNode}) {
  const router = useRouter();
  const {isSubmitting, errors} = useFormikContext();
  console.log({isSubmitting, errors});

  return (
    <VStack spacing="5">
      {children}
      <HStack w="100%">
        <Button
          onClick={() => {
            // if (step1Valid) {
            //   setIndex(1);
            // }
            router.back();
          }}
        >
          Zurück
        </Button>
        <Spacer />
        <Button
          colorScheme="blue"
          type="submit"
          isDisabled={isSubmitting}
          isLoading={isSubmitting}
        >
          Weiter
        </Button>
      </HStack>
    </VStack>
  );
}
