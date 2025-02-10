import * as React from "react";
import { Html, Body, Head, Heading, Hr, Container, Preview, Section, Text } from "@react-email/components";
import { Tailwind } from "@react-email/tailwind";

interface InactivityWarningEmailProps {
  userName: string;
  daysUntilDeletion: number;
}

export const InactivityWarningEmail = ({ userName, daysUntilDeletion }: InactivityWarningEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>Account Inactivity Warning - Trade Tracker</Preview>
      <Tailwind>
        <Body className="bg-white my-auto mx-auto font-sans">
          <Container className="border border-solid border-[#eaeaea] rounded my-[40px] mx-auto p-[20px] w-[465px]">
            <Heading className="text-black text-[24px] font-normal text-center p-0 my-[30px] mx-0">Account Inactivity Notice</Heading>
            <Text className="text-black text-[14px] leading-[24px]">Hello {userName},</Text>
            <Text className="text-black text-[14px] leading-[24px]">
              We noticed that you haven't logged into your Trade Tracker account for an extended period. To maintain the security and quality of our service, inactive accounts are
              automatically deleted after 180 days of inactivity.
            </Text>
            <Section>
              <Text className="text-black text-[14px] leading-[24px] font-bold">Your account will be deleted in {daysUntilDeletion} days if you don't log in.</Text>
            </Section>
            <Text className="text-black text-[14px] leading-[24px]">
              To keep your account active and retain all your trading data, simply log in to your account. If you're having trouble accessing your account or have any questions,
              please don't hesitate to contact our support team.
            </Text>
            <Hr className="border border-solid border-[#eaeaea] my-[26px] mx-0 w-full" />
            <Text className="text-[#666666] text-[12px] leading-[24px]">
              This is an automated message from Trade Tracker. If you've already logged in recently, you can ignore this message.
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};
