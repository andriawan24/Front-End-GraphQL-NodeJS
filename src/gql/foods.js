import {
  gql,
} from '@apollo/client';

export const GET_FOODS = gql`
    query GetAllFoods {
        getAllFoods {
            _id
            name
        }
    }
`;

export const GET_FOOD_DETAIL = gql`
    query GetFoods($_id: ID!) {
        getFoods(_id: $_id) {
            _id
            name
            description
            cook_time
            callories
            category
        }
    }
`;

export const NEW_FOOD = gql`
    mutation CreateFood(
        $name: String!
        $description: String
        $callories: Int!
        $cook_time: Int!
        $category: String!
    ) {
        createFood(
            name: $name
            description: $description
            callories: $callories
            cook_time: $cook_time
            category: $category
        ) {
            _id
            name
            description
            callories
            cook_time
            category
        }
    }
`;

export const UPDATE_FOOD = gql`
    mutation updateFood(
        $_id: ID!
        $name: String!
        $description: String
        $callories: Int!
        $cook_time: Int!
        $category: String!
    ) {
        updateFood(
            _id: $_id
            name: $name
            description: $description
            callories: $callories
            cook_time: $cook_time
            category: $category
        ) {
            _id
            name
            description
            callories
            cook_time
            category
        }
    }
`;

export const DELETE_FOOD = gql`
    mutation DeleteFood($_id: ID!) {
        deleteFood(_id: $_id)
    }
`;

const foods = {
  GET_FOODS,
  GET_FOOD_DETAIL,
  NEW_FOOD,
  UPDATE_FOOD,
  DELETE_FOOD,
};

export default foods;
