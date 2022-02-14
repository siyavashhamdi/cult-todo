import { gql } from "@apollo/client";

export const TODOS_READ_QUERY = gql`
  query TodoEndUserRead {
    TodoEndUserRead {
      _id
      title
      isChecked
    }
  }
`;

export const TODOS_COUNT_QUERY = gql`
  query TodoEndUserCount {
    TodoEndUserCount
  }
`;
