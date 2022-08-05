import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  HStack,
  Input,
  Select,
  Text,
  useToast,
  VStack,
} from '@chakra-ui/react'
import { useState } from 'react'

export default function FormPage() {
  const toast = useToast()
  const [formData, setFormData] = useState()

  const onSubmitHandler = async (e) => {
    e.preventDefault()

    const formData = new FormData(e.target)
    const inputObject = Object.fromEntries(formData)

    setFormData(inputObject)

    let res = ''
    if (inputObject['request-type'] === 'GET') {
      const urlParam = new URLSearchParams(inputObject)
      res = await fetch('/api/form?' + urlParam)
    } else {
      res = await fetch('/api/form', {
        method: 'POST',
        body: JSON.stringify(inputObject),
      })
    }

    res.text().then((data) =>
      toast({
        description: data,
        status: 'info',
        duration: 5000,
        isClosable: true,
      })
    )
  }

  return (
    <Box bg="white" color="black" minH="100vh">
      <Box maxW="container.sm" mx="auto">
        <Heading pt="4">New FormData API</Heading>

        <VStack
          mt="4"
          p="4"
          as="form"
          boxShadow="sm"
          border="1px solid"
          borderRadius="md"
          maxW="container.sm"
          borderColor="gray.200"
          onSubmit={onSubmitHandler}
        >
          <FormControl>
            <FormLabel>Request Type</FormLabel>
            <Select isRequired name="request-type" placeholder="Select option">
              <option value="GET">GET</option>
              <option value="POST">POST</option>
            </Select>
          </FormControl>

          <FormControl>
            <FormLabel>Email address</FormLabel>
            <Input name="email" type="email" isRequired />
            <FormHelperText>We'll never share your email.</FormHelperText>
          </FormControl>

          <FormControl>
            <FormLabel>Password</FormLabel>
            <Input name="password" type="password" isRequired />
            <FormHelperText>We'll never share your password.</FormHelperText>
          </FormControl>

          <FormControl>
            <FormLabel>Phone Number</FormLabel>
            <Input name="tel" type="tel" isRequired />
            <FormHelperText>
              We'll never share your phone number.
            </FormHelperText>
          </FormControl>

          <FormControl>
            <HStack justify="flex-end">
              <Button type="submit" colorScheme="blue">
                Submit
              </Button>
            </HStack>
          </FormControl>
        </VStack>

        <Text as="pre" mt="4">
          {JSON.stringify(formData, null, 2)}
        </Text>
      </Box>
    </Box>
  )
}
