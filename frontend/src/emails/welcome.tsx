import { Body, Container, Head, Heading, Html, Link, Preview, Text } from "@react-email/components";
import { Tailwind } from "@react-email/tailwind";

interface WelcomeEmailProps {
  name: string;
  confirmLink: string;
}

export default function WelcomeEmail({ name = "Trader", confirmLink }: WelcomeEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Welcome to Trading App - Confirm your email</Preview>
      <Tailwind>
        <Body className="bg-white font-sans">
          <Container className="mx-auto py-8 px-4">
            <Heading className="text-2xl font-bold text-gray-900 mb-4">Welcome to Trading App!</Heading>
            <Text className="text-gray-700 mb-4">Hi {name},</Text>
            <Text className="text-gray-700 mb-4">
              Thank you for signing up for Trading App. We're excited to have you on board! Please confirm your email address by clicking the button below.
            </Text>
            <Link href={confirmLink} className="inline-block bg-blue-600 text-white py-3 px-6 rounded-lg font-medium">
              Confirm Email
            </Link>
            <Text className="text-gray-700 mt-6">If you didn't create an account, you can safely ignore this email.</Text>
            <Text className="text-gray-500 text-sm mt-8">
              Best regards,
              <br />
              The Trading App Team
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
