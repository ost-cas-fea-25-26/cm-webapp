export const resetCookieConfig = async (browser: {
  newContext: (arg0: {
    storageState: { cookies: never[]; origins: never[] };
  }) => any;
}) => {
  const context = await browser.newContext({
    storageState: { cookies: [], origins: [] },
  });
  const page = await context.newPage();

  return page;
};
