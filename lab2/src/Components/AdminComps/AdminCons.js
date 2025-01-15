import React, { useEffect, useState } from 'react';
import '../css/Console.css';

function AdminCons() {

    const [consoleData, setConsoleData] = useState([{}])

    useEffect(() => {
        fetch("http://localhost:5000/api")
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch');
                }
                return response.json();
            })
            .then(data => {
                setConsoleData(data);
                console.log(data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

    return (
        <div className='cHolder'>
            {consoleData.length > 0 ? (
                consoleData.map((user, index) => (
                    <p key={index} className='consoletext'>
                        Server found: {user.username} - {user.useremail}
                        {user.userDateOfCreation ? 
                            `, date of creation: ${user.userDateOfCreation.day}/${user.userDateOfCreation.month}/${user.userDateOfCreation.year}` 
                            : ''}
                    </p>
                ))
            ) : (
                <h2>Loading...</h2>
            )
            }
        </div>
    );
}

export default AdminCons;
