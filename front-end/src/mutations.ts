import { gql } from "@apollo/client";

export const Mutations = {
    LOGIN: gql `mutation login($input: LoginUserInput!) {
        login(loginUserInput: $input) {
            user {
                id
                username
            }
            authToken
        }
    }
    `,
    REGISTER: gql `mutation register($input: RegisterUserInput!) {
        register(registerUserInput: $input) {
            user {
                id
                username
            }
            authToken
        }
    }
    `,
}