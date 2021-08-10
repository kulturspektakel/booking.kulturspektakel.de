import {Center, Text} from '@chakra-ui/react';
import React from 'react';
import Page from '../components/Page';
import FacebookLogin from 'react-facebook-login';
import {useRouter} from 'next/router';

export default function Home() {
  const router = useRouter();

  return (
    <Page>
      <Text>
        Kulturspektakel Gauting is the annual music festival taking place in
        Gauting, that allows you discover new and upcoming artists. Here you can
        learn more about all artists and analyze how they are performing on
        social media. Please sign in, to continue to use the application.
      </Text>
      <Center pt="10">
        <FacebookLogin
          appId="410654955715384"
          autoLoad={true}
          fields="name,email,picture"
          callback={() => {
            router.push('/bands');
          }}
        />
      </Center>
    </Page>
  );
}
