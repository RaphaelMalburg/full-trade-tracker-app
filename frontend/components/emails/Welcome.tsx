import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Text,
} from "@react-email/components";
import * as React from "react";

export default function Welcome() {
  return (
    <Html>
      <Head />
      <Preview>Welcome to Trade Tracker Pro</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>Welcome to Trade Tracker Pro!</Heading>
          <Text style={text}>
            This is a test email from our system. Thank you for trying out our
            email service!
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

const main = {
  backgroundColor: "#0A0B0D",
  color: "#FFFFFF",
};

const container = {
  margin: "0 auto",
  padding: "20px 0",
  width: "580px",
};

const h1 = {
  color: "#47F3A3",
  fontSize: "32px",
  fontWeight: "bold",
  margin: "30px 0",
  padding: "0",
};

const text = {
  color: "#FFFFFF",
  fontSize: "16px",
  lineHeight: "26px",
};
