export const isAuthenticated = (token: string | undefined | null) => {
  if (typeof token === undefined) {
    return false;
  }

  if (typeof token === null) {
    return false;
  }

  if (typeof token === "string") {
    return true;
  }
};
