// src/pages/Login.js
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Box, Button, Flex, FormControl, FormErrorMessage, FormLabel, HStack, Icon, Image, Input, Stack, Text, VStack, useBreakpointValue, useToast } from '@chakra-ui/react';
import axios from '../api';
import useSWRMutation from 'swr/mutation';
import { SiBeats } from 'react-icons/si';
import { useNavigate } from 'react-router-dom';
import settings from '../config/settings';

const startChekerFetcher = (url, { arg }) => axios.post(url, arg);

function Login() {
  const toast = useToast()
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors } } = useForm();
  const isMobile = useBreakpointValue({ base: true, md: false }); // Hides SVG on mobile
  const { trigger: loginTrigger, isMutating: loginIsMutating } = useSWRMutation(
    `/users/login`,
    startChekerFetcher,
    {
      onSuccess: (responseData) => {
        console.log(responseData?.data?.access_token, "fsdfasfasdfsad")
        localStorage.setItem(settings.tokenKey, responseData?.data?.access_token)
        toast({ description: "ورود موفق", status: "success" , position:'bottom-left'})
        navigate("/")
      },
      onError: (responseData) => {
        toast({ "description": responseData?.response?.data?.detail || "خطا", "status": "error" , position:'bottom-left'})
      }
    }
  );
  const onSubmit = (data) => {
    try {
      loginTrigger(data)
      // const response = axios.post('/login', data); // Change endpoint as needed
      console.log('Login successful:', response.data);
      // Handle successful login here (e.g., save token, redirect)
    } catch (error) {
      console.error('Login error:', error);
      // Handle login error (e.g., show error message)
    }
  };

  useEffect(()=> {
    if (localStorage.getItem(settings.tokenKey)) {
      // localStorage.removeItem(settings.tokenKey)
      navigate("/")
    }
    console.log(localStorage.getItem(settings.tokenKey), "fasdfasdfasdfsadfsda")
  },[])

  return (
    <HStack dir={'rtl'} as='main' h='calc(100vh)' spacing={0}>
      <VStack flexGrow={1} h='full' bg='white' p={0} justify='center' >
        <Stack w='sm' spacing={12} mt={-20}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={6} p={4}>
              <Stack>
                <Text fontWeight='bold' fontSize='2xl'>ورود به سامانه</Text>
                <Text textColor='gray.500' fontSize='sm'>خوش آمدید، لطفا اطلاعات خود را وارد نمایید</Text>
              </Stack>
              <FormControl isInvalid={errors?.username}>
                <FormLabel>نام کاربری</FormLabel>
                <Input dir='ltr' size='lg' {...register('username', { required: 'نام کاربری ضروری است' })} type='text' />
                {errors?.username?.message && <FormErrorMessage mt={0}>{errors?.username?.message}</FormErrorMessage>}
              </FormControl>
              <FormControl isInvalid={errors?.password}>
                <FormLabel>رمز عبور</FormLabel>
                <Input dir='ltr' size='lg'{...register('password', { required: 'گذرواژه ضروری است' })} type='password' />
                {errors?.password?.message && <FormErrorMessage mt={0}>{errors?.password?.message}</FormErrorMessage>}
              </FormControl>
              <Button width={"30%"} type="submit" size='md' isLoading={loginIsMutating}>ورود</Button>
            </Stack>
          </form>
          <HStack>
            <Icon textColor='blue.600' fontSize='5xl' as={SiBeats} />
            <Stack spacing={0}>
              <Text fontSize='lg' fontWeight='bold'>سامانه llm tree</Text>
              <Text fontSize='sm' textColor='gray.500'>موسسه باقرالعلوم (ع)</Text>
            </Stack>
          </HStack>
        </Stack>
      </VStack>
      <VStack display={{ sm: 'none', lg: 'flex' }} w='60%' h='full' justify='center' align='center' p={12} bgGradient='linear(to-br, blue.500, blue.700)'>
        <Image w='3xl' src='/login-bg.svg' />
      </VStack>
    </HStack>
  );
};

export default Login;
