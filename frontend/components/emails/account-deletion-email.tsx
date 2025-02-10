import * as React from "react";
import { Html, Body, Head, Heading, Hr, Container, Preview, Section, Text } from "@react-email/components";
import { Tailwind } from "@react-email/tailwind";

interface AccountDeletionEmailProps {
  userName: string;
}

export const AccountDeletionEmail = ({ userName }: AccountDeletionEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>Account Deleted Due to Inactivity - Trade Tracker</Preview>
      <Tailwind>
        <Body className="bg-white my-auto mx-auto font-sans">
          <Container className="border border-solid border-[#eaeaea] rounded my-[40px] mx-auto p-[20px] w-[465px]">
            <Heading className="text-black text-[24px] font-normal text-center p-0 my-[30px] mx-0">Account Deletion Notice</Heading>
            <Text className="text-black text-[14px] leading-[24px]">Hello {userName},</Text>
            <Text className="text-black text-[14px] leading-[24px]">
              We wanted to inform you that your Trade Tracker account has been deleted due to 180 days of inactivity. This action was taken in accordance with our account
              management policies to maintain the security and quality of our service.
            </Text>
            <Section>
              <Text className="text-black text-[14px] leading-[24px]">
                If you wish to continue using Trade Tracker, you'll need to create a new account. Please note that your previous trading data and settings cannot be recovered.
              </Text>
            </Section>
            <Text className="text-black text-[14px] leading-[24px]">
              We value your privacy and security. All your personal data has been permanently deleted from our systems in accordance with our privacy policy.
            </Text>
            <Hr className="border border-solid border-[#eaeaea] my-[26px] mx-0 w-full" />
            <Text className="text-[#666666] text-[12px] leading-[24px]">
              This is an automated message from Trade Tracker. If you believe this was done in error, please contact our support team immediately.
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};
