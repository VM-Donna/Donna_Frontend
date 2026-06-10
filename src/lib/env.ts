export const env = {
  get apiBaseUrl() {
    const value = process.env.NEXT_PUBLIC_API_BASE_URL;

    if (!value) {
      throw new Error("Missing environment variable: NEXT_PUBLIC_API_BASE_URL");
    }

    return value;
  }
};
