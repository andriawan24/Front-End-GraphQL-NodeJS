import {
  gql,
} from '@apollo/client';

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

const foods = {
  NEW_FOOD,
};

export default foods;
