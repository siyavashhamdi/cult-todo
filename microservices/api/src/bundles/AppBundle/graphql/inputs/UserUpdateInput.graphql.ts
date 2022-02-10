export default /* GraphQL */ `
  input UserUpdateInput {
    email: String
    isEnabled: Boolean
    profile: UserProfileInput
    roles: [UserRole]
  }

  input UserProfileInput {
    firstName: String!
    lastName: String!
  }
`;
