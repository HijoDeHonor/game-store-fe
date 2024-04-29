async function deleteOffer(id) {
    const updatedOffer = await fetch(URL + '/Offers/' + id, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }

    })
        .then(res => {
            if (!res.ok) {
                throw new Error('Error: algo salio mal');
            }
            return res.json();
        })
        .then(data => {
            return data;
        })
        .catch(err => {
            console.log(err);
        })
    return updatedOffer;    
}

export default deleteOffer;