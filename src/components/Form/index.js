import React from 'react';
import {Link, useHistory} from 'react-router-dom';
import {NEW_FOOD} from 'gql/foods';
import {useMutation} from '@apollo/client';

export default function Form(props) {
  const history = useHistory();

  const [newFood, {loading, error}] = useMutation(NEW_FOOD);
  console.log(loading);
  console.log(error);

  async function onSubmit(event) {
    event.preventDefault();
    console.dir(event);

    const payload = {};

    for (let index = 0; index < event.target.length; index++) {
      const element = event.target[index];
      if (element.nodeName === 'INPUT') payload[element.name] = element.value;
    }

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
