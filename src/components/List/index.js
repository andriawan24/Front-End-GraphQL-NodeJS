import React from 'react';
import {Link} from 'react-router-dom';
import {useQuery, useMutation} from '@apollo/client';
import {GET_FOODS, DELETE_FOOD} from 'gql/foods';

export default function List(props) {
  const [id, setId] = React.useState(null);
  const {loading, error, data} = useQuery(GET_FOODS, {
    fetchPolicy: 'no-cache',
  });

  const [deleteFood, {loading: loadingDeleteFood}] = useMutation(DELETE_FOOD, {
    refetchQueries: [GET_FOODS],
    onError: (res) => {
      console.log(res.networkError);
    },
  });

  function fnDelete(_id) {
    setId(_id);
    deleteFood({
      variables: {
        _id,
      },
    });
  }

  if (loading) return 'Loading...';

  if (error) {
    console.log('error');
    return error?.graphQLErrors.map((error) => error) ?? error.networkError;
  }

  if (data.getAllFoods.length === 0) return 'Tidak ada data';

  return (
    <div>
      <h3>
        Link Makanan
        (<Link to="/foods/new" style={{fontSize: 12}}>Add Foods</Link>)
      </h3>
      {
        data.getAllFoods.map((item) => {
          return <div key={item._id}>
            {item.name} (<Link to={`/foods/${item._id}/edit`}>Edit</Link>)
            <span style={{textDecoration: 'underline',
              cursor: 'pointer',
              color: 'blue'}}
            onClick={() => fnDelete(item._id)}>
              {(id === item._id && loadingDeleteFood) ? 'Loading...' : 'Delete'}
            </span>
          </div>;
        })
      }
    </div>
  );
}
