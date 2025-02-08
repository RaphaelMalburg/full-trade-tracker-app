import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/messages.ts");

/** @type {import('next').NextConfig} */
const config = {};

export default withNextIntl(config);
