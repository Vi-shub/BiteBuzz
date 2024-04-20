import React, { useState } from 'react';
import styled from 'styled-components';
import TextInput from '../components/TextInput';
import Button from '../components/Button';
import { useDispatch } from 'react-redux';
import { openSnackbar } from '../redux/reducers/SnackbarSlice';
import Iframe from 'react-iframe';

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  padding: 20px;
  height: 100%;
  overflow-y: auto;
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
  background: ${({ theme }) => theme.bg};
`;

const MapContainer = styled.div`
  margin-top: 30px;
  margin-left: 20px;
  height: 500px;
  width: 100%;
`;

const Section = styled.div`
  padding: 32px 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.div`
  font-size: 28px;
  font-weight: 500;
  margin-bottom: 20px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  width: 80%; /* Adjust the width here */
`;

const InputContainer = styled.div`
  width: 100%;
`;

const Contact = () => {
  const dispatch = useDispatch();
  const [contactDetails, setContactDetails] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleInputChange = (field) => (e) => {
    setContactDetails({
      ...contactDetails,
      [field]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    try {
      console.log('Submitting contact form', contactDetails);
      dispatch(openSnackbar({
        message: 'Message sent successfully!',
        severity: 'success',
      }));
      setContactDetails({ name: '', email: '', message: '' });
    } catch (error) {
      dispatch(openSnackbar({
        message: 'Failed to send message.',
        severity: 'error',
      }));
    }
  };

  return (
    <Container>
      <MapContainer>
        <Iframe
          url="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3769.353874986638!2d72.83102047490624!3d19.13598105008738!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7b72767abcd71%3A0x4e3236064c02bb46!2zw5JzdGVyaWE!5e0!3m2!1sen!2sin!4v1713647584276!5m2!1sen!2sin"
          width="100%"
          height="100%"
          display="initial"
          position="relative"
        />
      </MapContainer>
      <Section>
        <Title>Contact Us</Title>
        <Form onSubmit={handleSubmit}>
          <InputContainer>
            <TextInput
              small
              placeholder="Your Name"
              value={contactDetails.name}
              onChange={handleInputChange('name')}
            />
          </InputContainer>
          <InputContainer>
            <TextInput
              small
              placeholder="Your Email Address"
              value={contactDetails.email}
              onChange={handleInputChange('email')}
            />
          </InputContainer>
          <InputContainer>
            <TextInput
              small
              textArea
              rows="5"
              placeholder="Your Message"
              value={contactDetails.message}
              onChange={handleInputChange('message')}
            />
          </InputContainer>
          <Button
            text="Send Message"
            small
            type="submit"
          />
        </Form>
      </Section>
    </Container>
  );
};

export default Contact;
