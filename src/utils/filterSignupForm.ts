export function filterSignupForm(data: any) {
    return {
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      username: data.username,
      agreeTerms: data.agreeTerms,
    };
  }