import React, { useState } from 'react';
import { Box, Input, Textarea, Button, FormControl, FormLabel, Text, SimpleGrid, Image } from '@chakra-ui/react';
import contact from "../../assets/contact.jpg";
import FadeInObserve from '../../components/FadeInObserve';


const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [status, setStatus] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.message) {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_KEY}/send-email`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            authorization: localStorage.getItem('token')
          }, 
          body: JSON.stringify(formData)
        })

        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await res.json();
        setStatus(result.message);
      } catch (error) {
        console.log(error.message);
      }
      setFormData({ name: '', email: '', message: '' });
    } else {
      setStatus('Please fill in all fields.');
    }
  };

  return (
    <FadeInObserve>
      <Box className="py-12 ">
        <Text fontSize="3xl" fontWeight="bold" textAlign="center" mb={6}>Contact Us</Text>
        <SimpleGrid columns={[1, 1, 2]} spacing={8} maxW="6xl" mx="auto" px={6}>
          {/* Contact Form */}
          <Box bg="white" p={6} borderRadius="lg" shadow="lg">
            {status && (
              <Text textAlign="center" mb={4} color={status.includes('sent') ? 'green.500' : 'red.500'}>
                {status}
              </Text>
            )}
            <form onSubmit={handleSubmit}>
              <FormControl mb={4} isRequired>
                <FormLabel>Name</FormLabel>
                <Input 
                  type="text" 
                  name="name" 
                  value={formData.name} 
                  onChange={handleInputChange} 
                  placeholder="Your name" 
                />
              </FormControl>
              <FormControl mb={4} isRequired>
                <FormLabel>Email</FormLabel>
                <Input 
                  type="email" 
                  name="email" 
                  value={formData.email} 
                  onChange={handleInputChange} 
                  placeholder="Your email" 
                />
              </FormControl>
              <FormControl mb={4} isRequired>
                <FormLabel>Message</FormLabel>
                <Textarea 
                  name="message" 
                  value={formData.message} 
                  onChange={handleInputChange} 
                  placeholder="Your message" 
                  rows={4} 
                  h={'28'}
                  resize={'none'}
                />
              </FormControl>
              <Button colorScheme="teal" size="lg" type="submit" width="full">
                Send Message
              </Button>
            </form>
          </Box>

          {/* Image Section */}
          <Box bg="white" borderRadius="lg" shadow="lg" className='max-sm:hidden'>
            <Image 
              src={contact}
              alt="Contact Image" 
              borderRadius="lg" 
              objectFit="cover" 
              height="100%" 
            />
          </Box>
        </SimpleGrid>
      </Box>
    </FadeInObserve>
  );
};

export default Contact;
