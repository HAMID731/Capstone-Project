import React, { useState } from 'react';
import { Menu, X, Shield, Users, Zap, Mail, Phone, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const PageContainer = styled.div`
  min-height: 100vh;
  background-color: white;
`;

const Nav = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background-color: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(8px);
  border-bottom: 1px solid #e5e7eb;
  z-index: 50;
`;

const NavContainer = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 1rem;

  @media (min-width: 640px) {
    padding: 0 1.5rem;
  }
  @media (min-width: 1024px) {
    padding: 0 2rem;
  }
`;

const NavContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 4rem;
`;

const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const LogoIcon = styled(Shield)`
  height: 2rem;
  width: 2rem;
  color: #2563eb;
  margin-right: 0.5rem;
`;

const LogoText = styled.span`
  font-size: 1.5rem;
  font-weight: bold;
  color: #111827;
`;

const DesktopNavLinks = styled.div`
  display: none;
  align-items: center;
  gap: 2rem;

  @media (min-width: 768px) {
    display: flex;
  }
`;

const NavButton = styled.button`
  color: #374151;
  background: none;
  border: none;
  cursor: pointer;
  transition: color 0.2s;

  &:hover {
    color: #2563eb;
  }
`;

const DesktopCTABox = styled.div`
  display: none;
  align-items: center;
  gap: 1rem;

  @media (min-width: 768px) {
    display: flex;
  }
`;

const LoginLink = styled(Link)`
  color: #2563eb;
  font-weight: 500;
  transition: color 0.2s;
  text-decoration: none; /* Remove default link underline */

  &:hover {
    color: #1d4ed8;
  }
`;

const SignUpLink = styled(Link)`
  background-color: #2563eb;
  color: white;
  padding: 0.5rem 1.5rem;
  border-radius: 0.5rem;
  border: none;
  cursor: pointer;
  transition: background-color 0.2s;
  text-decoration: none; /* Remove default link underline */

  &:hover {
    background-color: #1d4ed8;
  }
`;

const MobileMenuButtonWrapper = styled.div`
  @media (min-width: 768px) {
    display: none;
  }
`;

const MobileMenuButton = styled.button`
  display: block;
  color: #374151;
  background: none;
  border: none;
  cursor: pointer;
  transition: color 0.2s;

  &:hover {
    color: #2563eb;
  }
`;

const MobileNavMenu = styled.div`
  @media (min-width: 768px) {
    display: none;
  }
  background-color: white;
  border-top: 1px solid #e5e7eb;
`;

const MobileNavContent = styled.div`
  padding: 0.5rem;
  padding-top: 0.5rem;
  padding-bottom: 0.75rem;
  display: flex;
  flex-direction: column;
`;

const MobileNavLink = styled.button`
  display: block;
  width: 100%;
  text-align: left;
  padding: 0.5rem 0.75rem;
  color: #374151;
  background: none;
  border: none;
  cursor: pointer;
  transition: color 0.2s;

  &:hover {
    color: #2563eb;
  }
`;

const MobileCTABox = styled.div`
  padding: 0.5rem 0.75rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const MobileLoginLink = styled(LoginLink)`
  display: block;
  width: 100%;
  text-align: left;
`;

const MobileSignUpLink = styled(SignUpLink)`
  display: block;
  width: 100%;
`;

const HeroSection = styled.section`
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 4rem;
`;

const HeroBackground = styled.div`
  position: absolute;
  inset: 0;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-image: url("https://images.pexels.com/photos/325229/pexels-photo-325229.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1");
`;

const HeroOverlay = styled.div`
  position: absolute;
  inset: 0;
  background-color: rgba(30, 58, 138, 0.7);
`;

const HeroContent = styled.div`
  position: relative;
  z-index: 10;
  max-width: 64rem;
  margin: 0 auto;
  padding: 0 1rem;
  text-align: center;

  @media (min-width: 640px) {
    padding: 0 1.5rem;
  }
  @media (min-width: 1024px) {
    padding: 0 2rem;
  }
`;

const HeroTitle = styled.h1`
  font-size: 2.25rem;
  font-weight: bold;
  color: white;
  margin-bottom: 1.5rem;

  @media (min-width: 640px) {
    font-size: 3rem;
  }
  @media (min-width: 1024px) {
    font-size: 3.75rem;
  }
`;

const HeroSubtitle = styled.p`
  font-size: 1.25rem;
  color: #d1d5db;
  margin-bottom: 2rem;
  max-width: 48rem;
  margin-left: auto;
  margin-right: auto;

  @media (min-width: 640px) {
    font-size: 1.5rem;
  }
`;

const HeroButtons = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  justify-content: center;

  @media (min-width: 640px) {
    flex-direction: row;
  }
`;

const HeroLoginLink = styled(Link)`
  background-color: #2563eb;
  color: white;
  padding: 1rem 2rem;
  border-radius: 0.5rem;
  font-size: 1.125rem;
  font-weight: 600;
  border: none;
  cursor: pointer;
  transition: background-color 0.2s;
  text-decoration: none;

  &:hover {
    background-color: #1d4ed8;
  }
`;

const HeroSignUpLink = styled(Link)`
  background-color: transparent;
  border: 2px solid white;
  color: white;
  padding: 1rem 2rem;
  border-radius: 0.5rem;
  font-size: 1.125rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  text-decoration: none;

  &:hover {
    background-color: white;
    color: #1e3a8a;
  }
`;

const AboutSection = styled.section`
  padding: 4rem 0;
  background-color: #f9fafb;
`;

const AboutContainer = styled.div`
  max-width: 72rem;
  margin: 0 auto;
  padding: 0 1rem;

  @media (min-width: 640px) {
    padding: 0 1.5rem;
  }
  @media (min-width: 1024px) {
    padding: 0 2rem;
  }
`;

const AboutHeader = styled.div`
  text-align: center;
  margin-bottom: 3rem;
`;

const AboutTitle = styled.h2`
  font-size: 1.875rem;
  font-weight: bold;
  color: #111827;
  margin-bottom: 1rem;

  @media (min-width: 640px) {
    font-size: 2.25rem;
  }
`;

const AboutDivider = styled.div`
  width: 6rem;
  height: 0.25rem;
  background-color: #2563eb;
  margin: 0 auto;
`;

const AboutContentGrid = styled.div`
  display: grid;
  gap: 3rem;
  align-items: center;

  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }
`;

const AboutText = styled.p`
  font-size: 1.125rem;
  color: #374151;
  margin-bottom: 1.5rem;

  &:last-of-type {
    margin-bottom: 2rem;
  }
`;

const AboutFeaturesGrid = styled.div`
  display: grid;
  gap: 2rem;

  @media (min-width: 640px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const FeatureItem = styled.div`
  text-align: center;
`;

const FeatureIcon = styled.div`
  height: 3rem;
  width: 3rem;
  margin: 0 auto 1rem;
`;

const FeatureTitle = styled.h3`
  font-size: 1.125rem;
  font-weight: 600;
  color: #111827;
  margin-bottom: 0.5rem;
`;

const FeatureDescription = styled.p`
  color: #4b5563;
`;

const AboutImageWrapper = styled.div`
  position: relative;
`;

const AboutImage = styled.img`
  border-radius: 0.5rem;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  width: 100%;
  height: auto;
`;

const ContactSection = styled.section`
  padding: 4rem 0;
  background-color: white;
`;

const ContactContainer = styled.div`
  max-width: 72rem;
  margin: 0 auto;
  padding: 0 1rem;

  @media (min-width: 640px) {
    padding: 0 1.5rem;
  }
  @media (min-width: 1024px) {
    padding: 0 2rem;
  }
`;

const ContactHeader = styled.div`
  text-align: center;
  margin-bottom: 3rem;
`;

const ContactTitle = styled.h2`
  font-size: 1.875rem;
  font-weight: bold;
  color: #111827;
  margin-bottom: 1rem;

  @media (min-width: 640px) {
    font-size: 2.25rem;
  }
`;

const ContactDivider = styled.div`
  width: 6rem;
  height: 0.25rem;
  background-color: #2563eb;
  margin: 0 auto;
`;

const ContactSubtitle = styled.p`
  font-size: 1.125rem;
  color: #4b5563;
  margin-top: 1rem;
`;

const ContactContentGrid = styled.div`
  display: grid;
  gap: 3rem;

  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }
`;

const ContactInfoTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  color: #111827;
  margin-bottom: 1.5rem;
`;

const ContactInfoList = styled.div`
  margin-bottom: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const ContactInfoItem = styled.div`
  display: flex;
  align-items: flex-start;
`;

const ContactInfoIcon = styled.div`
  height: 1.5rem;
  width: 1.5rem;
  color: #2563eb;
  margin-right: 1rem;
  margin-top: 0.25rem;
  flex-shrink: 0;
`;

const ContactInfoLabel = styled.h4`
  font-weight: 600;
  color: #111827;
  margin-bottom: 0.25rem;
`;

const ContactInfoText = styled.p`
  color: #4b5563;
`;

const BusinessHoursBox = styled.div`
  margin-top: 2rem;
  padding: 1.5rem;
  background-color: #eff6ff;
  border-radius: 0.5rem;
`;

const BusinessHoursTitle = styled.h4`
  font-weight: 600;
  color: #111827;
  margin-bottom: 0.5rem;
`;

const BusinessHoursText = styled.p`
  color: #4b5563;
`;

const ContactFormTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  color: #111827;
  margin-bottom: 1.5rem;
`;

const ContactFormElement = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const FormLabel = styled.label`
  display: block;
  font-size: 0.875rem;
  font-weight: 500;
  color: #374151;
  margin-bottom: 0.5rem;
`;

const FormInput = styled.input`
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid #d1d5db;
  border-radius: 0.5rem;
  transition: all 0.2s;
  font-family: inherit;
  font-size: 1rem;

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.5);
    border-color: transparent;
  }
`;

const FormTextarea = styled.textarea`
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid #d1d5db;
  border-radius: 0.5rem;
  transition: all 0.2s;
  font-family: inherit;
  font-size: 1rem;
  resize: vertical;
  min-height: 120px;

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.5);
    border-color: transparent;
  }
`;

const FormSubmitButton = styled.button`
  width: 100%;
  background-color: #2563eb;
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  font-weight: 600;
  border: none;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #1d4ed8;
  }
`;

const FooterContainer = styled.footer`
  background-color: #111827;
  color: white;
  padding: 2rem 0;
`;

const FooterInner = styled.div`
  max-width: 72rem;
  margin: 0 auto;
  padding: 0 1rem;

  @media (min-width: 640px) {
    padding: 0 1.5rem;
  }
  @media (min-width: 1024px) {
    padding: 0 2rem;
  }
`;

const FooterContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

const FooterLogoWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;

  @media (min-width: 768px) {
    margin-bottom: 0;
  }
`;

const FooterLogoIcon = styled(Shield)`
  height: 2rem;
  width: 2rem;
  color: #60a5fa;
  margin-right: 0.5rem;
`;

const FooterLogoText = styled.span`
  font-size: 1.5rem;
  font-weight: bold;
`;

const FooterTextWrapper = styled.div`
  text-align: center;
  color: #9ca3af;

  @media (min-width: 768px) {
    text-align: right;
  }

  p {
    margin: 0.25rem 0;
  }
`;

// --- HomePage Component ---

function HomePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <PageContainer>
      <Nav>
        <NavContainer>
          <NavContent>
            <LogoWrapper>
              <LogoIcon />
              <LogoText>SafeKeep</LogoText>
            </LogoWrapper>

            <DesktopNavLinks>
              <NavButton onClick={() => scrollToSection('home')}>Home</NavButton>
              <NavButton onClick={() => scrollToSection('about')}>About Us</NavButton>
              <NavButton onClick={() => scrollToSection('contact')}>Contact Us</NavButton>
            </DesktopNavLinks>

            <DesktopCTABox>
              <LoginLink to="/login">Login</LoginLink>
              <SignUpLink to="/signup">Sign Up</SignUpLink>
            </DesktopCTABox>

            <MobileMenuButtonWrapper>
              <MobileMenuButton onClick={() => setIsMenuOpen(!isMenuOpen)}>
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </MobileMenuButton>
            </MobileMenuButtonWrapper>
          </NavContent>
        </NavContainer>

        {isMenuOpen && (
          <MobileNavMenu>
            <MobileNavContent>
              <MobileNavLink onClick={() => scrollToSection('home')}>Home</MobileNavLink>
              <MobileNavLink onClick={() => scrollToSection('about')}>About Us</MobileNavLink>
              <MobileNavLink onClick={() => scrollToSection('contact')}>Contact Us</MobileNavLink>
              <MobileCTABox>
                <MobileLoginLink to="/login">Login</MobileLoginLink>
                <MobileSignUpLink to="/signup">Sign Up</MobileSignUpLink>
              </MobileCTABox>
            </MobileNavContent>
          </MobileNavMenu>
        )}
      </Nav>

      <HeroSection id="home">
        <HeroBackground />
        <HeroOverlay />
        <HeroContent>
          <HeroTitle>Secure, Simple & Affordable Storage</HeroTitle>
          <HeroSubtitle>
            Empowering small businesses in Nigeria with reliable and cost-effective data storage solutions.
            Your data deserves the best protection without breaking the bank.
          </HeroSubtitle>
        </HeroContent>
      </HeroSection>

      <AboutSection id="about">
        <AboutContainer>
          <AboutHeader>
            <AboutTitle>About SafeKeep</AboutTitle>
            <AboutDivider />
          </AboutHeader>

          <AboutContentGrid>
            <div>
              <AboutText>
                SafeKeep was founded with a simple mission: to provide small businesses in Nigeria with enterprise-grade
                data storage solutions that are both secure and affordable. We understand that data is the lifeblood of
                modern businesses, and protecting it shouldn't be a luxury.
              </AboutText>
              <AboutText>
                Our vision is to democratize data storage across Africa, ensuring that every business, regardless of size,
                has access to reliable, scalable, and cost-effective storage solutions. We're committed to supporting the
                growth of Nigerian businesses through technology that just works.
              </AboutText>

              <AboutFeaturesGrid>
                <FeatureItem>
                  <FeatureIcon><Shield className="h-12 w-12 text-blue-600 mx-auto mb-4" /></FeatureIcon>
                  <FeatureTitle>Security First</FeatureTitle>
                  <FeatureDescription>Enterprise-grade encryption and security protocols</FeatureDescription>
                </FeatureItem>
                <FeatureItem>
                  <FeatureIcon><Zap className="h-12 w-12 text-green-600 mx-auto mb-4" /></FeatureIcon>
                  <FeatureTitle>Lightning Fast</FeatureTitle>
                  <FeatureDescription>Optimized for speed and reliability</FeatureDescription>
                </FeatureItem>
                <FeatureItem>
                  <FeatureIcon><Users className="h-12 w-12 text-purple-600 mx-auto mb-4" /></FeatureIcon>
                  <FeatureTitle>Customer Focus</FeatureTitle>
                  <FeatureDescription>Dedicated support for Nigerian businesses</FeatureDescription>
                </FeatureItem>
              </AboutFeaturesGrid>
            </div>

            <AboutImageWrapper>
              <AboutImage
                src="https://images.pexels.com/photos/3861958/pexels-photo-3861958.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt="Team collaboration"
              />
            </AboutImageWrapper>
          </AboutContentGrid>
        </AboutContainer>
      </AboutSection>

      <ContactSection id="contact">
        <ContactContainer>
          <ContactHeader>
            <ContactTitle>Get in Touch</ContactTitle>
            <ContactDivider />
            <ContactSubtitle>
              Ready to secure your business data? We're here to help you get started.
            </ContactSubtitle>
          </ContactHeader>

          <ContactContentGrid>
            <div>
              <ContactInfoTitle>Contact Information</ContactInfoTitle>
              <ContactInfoList>
                <ContactInfoItem>
                  <ContactInfoIcon><Mail /></ContactInfoIcon>
                  <div>
                    <ContactInfoLabel>Email</ContactInfoLabel>
                    <ContactInfoText>abdulhamidabari@gmail.com</ContactInfoText>
                  </div>
                </ContactInfoItem>

                <ContactInfoItem>
                  <ContactInfoIcon><Phone /></ContactInfoIcon>
                  <div>
                    <ContactInfoLabel>Phone</ContactInfoLabel>
                    <ContactInfoText>+234 800 123 4567</ContactInfoText>
                  </div>
                </ContactInfoItem>

                <ContactInfoItem>
                  <ContactInfoIcon><MapPin /></ContactInfoIcon>
                  <div>
                    <ContactInfoLabel>Address</ContactInfoLabel>
                    <ContactInfoText>
                      277 borno way<br />
                      Lagos, Nigeria
                    </ContactInfoText>
                  </div>
                </ContactInfoItem>
              </ContactInfoList>

              <BusinessHoursBox>
                <BusinessHoursTitle>Business Hours</BusinessHoursTitle>
                <BusinessHoursText>
                  Monday - Friday: 8:00 AM - 6:00 PM<br />
                  Saturday: 9:00 AM - 2:00 PM<br />
                  Sunday: Closed
                </BusinessHoursText>
              </BusinessHoursBox>
            </div>

            <div>
              <ContactFormTitle>Send us a Message</ContactFormTitle>
              <ContactFormElement>
                <FormGroup>
                  <FormLabel htmlFor="name">Full Name</FormLabel>
                  <FormInput
                    type="text"
                    id="name"
                    placeholder="Enter your full name"
                  />
                </FormGroup>

                <FormGroup>
                  <FormLabel htmlFor="email">Email Address</FormLabel>
                  <FormInput
                    type="email"
                    id="email"
                    placeholder="Enter your email address"
                  />
                </FormGroup>

                <FormGroup>
                  <FormLabel htmlFor="subject">Subject</FormLabel>
                  <FormInput
                    type="text"
                    id="subject"
                    placeholder="Enter message subject"
                  />
                </FormGroup>

                <FormGroup>
                  <FormLabel htmlFor="message">Message</FormLabel>
                  <FormTextarea
                    id="message"
                    rows={5}
                    placeholder="Enter your message"
                  ></FormTextarea>
                </FormGroup>

                <FormSubmitButton type="submit">Send Message</FormSubmitButton>
              </ContactFormElement>
            </div>
          </ContactContentGrid>
        </ContactContainer>
      </ContactSection>

      <FooterContainer>
        <FooterInner>
          <FooterContent>
            <FooterLogoWrapper>
              <FooterLogoIcon />
              <FooterLogoText>SafeKeep</FooterLogoText>
            </FooterLogoWrapper>
            <FooterTextWrapper>
              <p>© 2025 SafeKeep. All rights reserved.</p>
              <p>Secure storage solutions for Nigerian businesses.</p>
            </FooterTextWrapper>
          </FooterContent>
        </FooterInner>
      </FooterContainer>
    </PageContainer>
  );
}

export default HomePage;