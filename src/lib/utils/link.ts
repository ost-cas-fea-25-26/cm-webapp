export const getBaseUrl = () => {
  if (process.env.NODE_ENV === "development") {
    return `${process.env.NEXT_PUBLIC_BASE_URL}`;
  } else if (process.env.NODE_ENV === "test") {
    return `http://localhost:3000`;
  }

  return `https://${process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL}`;
};
