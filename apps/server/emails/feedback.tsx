import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Link,
  Preview,
  Text,
} from '@react-email/components'

interface SlackConfirmEmailProps {
  url?: string
}

const FeedbackEmail = ({
  url = 'https://builder.baraa.app',
}: SlackConfirmEmailProps) => (
  <Html>
    <Head />
    <Preview>We have received your feedback</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>
          Thank you for taking the time to provide feedback!
        </Heading>
        <Text style={{ ...text, marginBottom: '14px' }}>
          We have received your feedback and will use it to improve the
          application. If you want to review your feedback, you can do so at any
          time by clicking the link below.
        </Text>
        <Link
          href={url}
          style={{
            ...link,
            fontSize: '18px',
            fontWeight: 'bold',
            marginBottom: '14px',
          }}>
          {url}
        </Link>
        <Text style={text}>
          If you didn't request this email, you can safely ignore it.
        </Text>

        <Container style={{ marginTop: '80px' }}>
          <Img
            src="https://baraa.app/logo-square.png"
            width="24"
            height="24"
            alt="Baraa's Logo"
          />
          <Text style={footer}>
            <Link
              href="https://baraa.app"
              target="_blank"
              style={{ ...link, color: '#898989' }}>
              baraa.app
            </Link>
            <br />
            creating thoughtful, intuitive software
          </Text>
          <Text style={footer}>
            This is an auto generated email. Please do not reply to this email -
            if you have any questions, please email me at{' '}
            <Link
              href="mailto:hey@baraa.app"
              target="_blank"
              style={{ ...link, color: '#898989', fontSize: 'inherit' }}>
              hey@baraa.app
            </Link>
            .
          </Text>
        </Container>
      </Container>
    </Body>
  </Html>
)

const main = {
  backgroundColor: '#ffffff',
}

const container = {
  paddingLeft: '12px',
  paddingRight: '12px',
  margin: '0 auto',
}

const h1 = {
  color: '#333',
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  fontSize: '24px',
  fontWeight: 'bold',
  margin: '40px 0',
  padding: '0',
}

const h2 = {
  color: '#333',
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  fontSize: '20px',
  fontWeight: 'bold',
  margin: '32px 0',
  padding: '0',
}

const link = {
  color: '#2754C5',
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  fontSize: '14px',
  textDecoration: 'underline',
}

const text = {
  color: '#333',
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  fontSize: '14px',
  margin: '24px 0',
}

const footer = {
  color: '#898989',
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  fontSize: '12px',
  lineHeight: '22px',
  marginTop: '12px',
  marginBottom: '24px',
}

const code = {
  display: 'inline-block',
  padding: '16px 4.5%',
  backgroundColor: '#f4f4f4',
  borderRadius: '5px',
  border: '1px solid #eee',
  color: '#333',
  fontFamily: 'monospace',
  fontSize: '24px',
  margin: '0 auto',
  width: '92%',
  textAlign: 'center' as const,
}

export default FeedbackEmail
