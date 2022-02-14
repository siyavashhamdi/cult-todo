import { gql } from "@apollo/client";

export const TODOS_CREATE_MUTATION = gql`
  mutation TodoEndUserCreate($input: EndUsersTodosCreateInput!) {
    TodoEndUserCreate(input: $input) {
      _id
    }
  }
`;

export const TODOS_UPDATE_MUTATION = gql`
  mutation TodoEndUserUpdate(
    $id: ObjectId!
    $input: EndUsersTodosUpdateInput!
  ) {
    TodoEndUserUpdate(_id: $id, input: $input) {
      _id
    }
  }
`;

export const TODOS_DELETE_MUTATION = gql`
  mutation TodoEndUserDelete($id: ObjectId!) {
    TodoEndUserDelete(_id: $id)
  }
`;
