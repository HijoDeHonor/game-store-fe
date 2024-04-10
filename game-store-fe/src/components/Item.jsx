import React from 'react';

function Item({ item }) {
    const { Name, Img, Id } = item;

    return (
        <div key={Id}>
            <img src={Img} alt={Name} />
            <h2>{Name}</h2>
        </div>
    );
}

export default Item;