import React from 'react';
import {Link, useHistory, useParams} from 'react-router-dom';
import {NEW_FOOD, GET_FOOD_DETAIL, UPDATE_FOOD} from 'gql/foods';
import {useMutation, useLazyQuery} from '@apollo/client';

export default function Form(props) {
  const history = useHistory();
  const params = useParams();

  const [newFood] = useMutation(NEW_FOOD);

  const [updateFood] = useMutation(UPDATE_FOOD);

  const [getFoodDetail, {loading: loadingFood, error: errorFood, data: dataFood}] = useLazyQuery(GET_FOOD_DETAIL, {
    variables: {_id: params.id},
  });

  console.log(loadingFood);
  console.log(errorFood);

  async function onSubmit(event) {
    event.preventDefault();
    console.dir(event);

    const payload = {};

    for (let index = 0; index < event.target.length; index++) {
      const element = event.target[index];
      if (element.nodeName === 'INPUT') payload[element.name] = element.value;
    }

    if (params.id) {
      try {
        const res = await updateFood({
          variables: {
            ...payload,
            _id: params.id,
            cook_time: Number(payload.cook_time),
            callories: Number(payload.callories),
          },
        });
        if (res) {
          history.push('/foods');
        }
      } catch (error) {
        console.error(error);
      }
    } else {
      try {
        const res = await newFood({
          variables: {
            ...payload,
            cook_time: Number(payload.cook_time),
            callories: Number(payload.callories),
          },
        });
        if (res) {
          history.push('/foods');
        }
      } catch (error) {
        console.error(error);
      }
    }
  }

  React.useEffect(() => {
    if (params.id) getFoodDetail();
  }, [params.id, getFoodDetail]);

  React.useEffect(() => {
    if (dataFood) {
      const form = document.getElementById('form-food');
      console.log(form);

      for (let index = 0; index < form.length; index++) {
        const element = form[index];

        if (element.nodeName === 'INPUT') {
          element.value = dataFood.getFoods[element.name];
        }
      }
    }
  }, [dataFood]);

  if (params.id && loadingFood) return 'Loading...';
  if (errorFood) return 'Network Error';

  return (
    <div>
      <h3>
        <Link to="/foods">{`(<= Back)`}</Link> Formulir Penambahan Makanan
      </h3>
      <form id="form-food" style={{maxWidth: 500}} onSubmit={onSubmit}>
        <div style={{display: 'flex', flexDirection: 'column'}}>
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" name="name" />
        </div>
        <div style={{display: 'flex', flexDirection: 'column'}}>
          <label htmlFor="description">Description:</label>
          <input type="text" id="description" name="description" />
        </div>
        <div style={{display: 'flex', flexDirection: 'column'}}>
          <label htmlFor="callories">Callories:</label>
          <input type="number" id="callories" name="callories" />
        </div>
        <div style={{display: 'flex', flexDirection: 'column'}}>
          <label htmlFor="cook_time">Cook Time:</label>
          <input type="number" id="cook_time" name="cook_time" />
        </div>
        <div style={{display: 'flex', flexDirection: 'column'}}>
          <label htmlFor="category">Category:</label>
          <input type="text" id="category" name="category" />
        </div>
        <button type="button" onClick={() => history.push('/foods')}>
          Back
        </button>
        <button type="submit">
          Save
        </button>
      </form>
    </div>
  );
}
