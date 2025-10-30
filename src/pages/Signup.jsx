import { useState } from 'react'
import axios from 'axios'
import {
  Button,
  Center,
  FormControl,
  FormLabel,
  Heading,
  Input,
  useToast,
} from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'


function Signup() {

  const [inputs, setInputs] = useState({email: '', password: ''})
  const toast = useToast()
  const navigate = useNavigate()

  const handleSignUp = async() => {
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_KEY}/auth/signup`, inputs)
      toast({title: 'a new account', description: res.data.message, status:'success', isClosable: 'true'})
    } catch (error) {
      toast({title: 'Error', description: error.message, status:'error', isClosable: 'true'})
    }
    navigate('/login')
  }

  return (
    <AnimateSignup>
      <div className='max-sm:w-80 w-[570px] container mx-auto mt-5 overflow-hidden mb-5'>
        <Heading my={''} textTransform={'uppercase'} textAlign={'center'}>welcome to Create Your Account</Heading>
        <FormControl>
          <FormLabel htmlFor='name'>Name</FormLabel>
          <Input id='name' type='text' placeholder='Enter Your Name' autoComplete='true' value={inputs.name} onChange={(e) => setInputs({ ...inputs, name: e.target.value })} />
          <FormLabel htmlFor='lastName' mt={'4'}>LastName</FormLabel>
          <Input id='lastName' type='lastName' placeholder='Enter Your password' autoComplete='true' value={inputs.lastName} onChange={(e) => setInputs({ ...inputs, lastName: e.target.value })} />
          <FormLabel htmlFor='email'>Email</FormLabel>
          <Input id='email' type='email' placeholder='Enter Your Email' autoComplete='true' value={inputs.email} onChange={(e) => setInputs({ ...inputs, email: e.target.value })} />
          <FormLabel htmlFor='password' mt={'4'}>Password</FormLabel>
          <Input id='password' type='password' placeholder='Enter Your password' autoComplete='true' value={inputs.password} onChange={(e) => setInputs({ ...inputs, password: e.target.value })} />
          <Button onClick={handleSignUp} colorScheme='blue' mt={'5'}>Create Your Account</Button>
        </FormControl>
      </div>
    </AnimateSignup>
  )
}

export default Signup

export const AnimateSignup = ({ children }) => {
  return <div className='animate'>{children}</div>
}