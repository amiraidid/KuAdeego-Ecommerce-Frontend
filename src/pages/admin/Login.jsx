import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import {
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  useToast,
} from '@chakra-ui/react'

function Login() {

  const [inputs, setInputs] = useState({email: '', password: ''})
  const toast = useToast()
  const navigate = useNavigate()

  const handleLogin = async() => {
    try {
      const res = await axios.post(`http://localhost:5000/auth/login`, inputs)
      console.log(res.data)
      toast({title: 'login account', description: res.data.message, status: 'success', isClosable: 'true'})
      sessionStorage.setItem('token', res.data.token)
      sessionStorage.setItem('admin', res.data.role)
      if (res.data.role === 'admin') {
        navigate('/admin')
        window.location.reload()
      }
      else {
        navigate('/')
        window.location.reload()
      }
    } catch (error) {
      toast({title: 'login account', description: error.message, status: 'success', isClosable: 'true'})
    }
  }

  return (
    <div className='max-sm:w-80 w-[550px] container mx-auto mt-10 overflow-hidden mb-5'>
      <Heading my={'15px'} textTransform={'uppercase'} textAlign={'center'}>ADMIN</Heading>
      <FormControl>
        <FormLabel htmlFor='email'>Email</FormLabel>
        <Input id='email' type='email' placeholder='Enter Your Email' autoComplete='true' value={inputs.email} onChange={(e) => setInputs({...inputs, email: e.target.value})}/>
        <FormLabel htmlFor='password' mt={'4'}>Password</FormLabel>
        <Input id='password' type='password' placeholder='Enter Your password' autoComplete='true' value={inputs.password} onChange={(e) => setInputs({...inputs, password: e.target.value})}/>
        <Button onClick={handleLogin} colorScheme='blue' mt={'5'}>Login</Button>
      </FormControl>
    </div>
  )
}

export default Login