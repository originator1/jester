import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;
// ============== ^^^^ can stay
//  =====================below must change================
export const SAVE_JEST = gql`
  mutation saveJest($postData: PostInput!) {
    saveJest(postData: $postData) {
      _id
      username
      email
      savedJests {
        jestId
        username
        image
        caption
      }
    }
  }
`;

export const REMOVE_JEST = gql`
mutation removeJest($_id: ID!){
  removeJest(jestId: $_id) {
    _id
  
  }
}
`;

export const UPDATE_LIKE = gql`
mutation updateLike($jestId: ID!){
  updateLike(jestId: $jestId) {
    likes
  }
}
`;

export const NEW_JEST = gql`
mutation newJest($caption: String!, $image: String!){
  newJest(caption: $caption, image: $image) {
    _id
    createdBy{
      username
    }
    caption
    image
    likes
  }
}
`;

// export const DELETE_JEST = gql`
// mutation deleteJest($jestId: ID!){
//   deleteJest(jestId: $jestId) {
//     _id
//     createdBy{
//       username
//     }
//     caption
//     image
//     likes
//   }
// }
// `;