export function filterSignupForm(data: Record<string, unknown>) {
  return {
    email: data.email,
    firstName: data.firstName,
    lastName: data.lastName,
    username: data.username,
    agreeTerms: data.agreeTerms,
  };
}