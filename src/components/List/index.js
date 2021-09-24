import React from 'react';
import {Link} from 'react-router-dom';

export default function List(props) {
  return (
    <div>
      <h3>
        Link Makanan
        (<Link to="/foods/new" style={{fontSize: 12}}>Add Foods</Link>)
      </h3>
    </div>
  );
}
