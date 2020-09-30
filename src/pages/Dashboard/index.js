import React,   { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import './styles.css';

export default function Dashboard (){
    const [spots, setSpots] = useState([]);
    useEffect(() => {
        async function loadSpots() {
            const user_id = localStorage.getItem('user');
            const response = await api.get('/dashboard', {
                headers: { user_id }
            })
        setSpots(response.data);
        }
        loadSpots();
    }, [])

    return (
        <>
            <ul className="spot-list">
                {spots.map( spot => {
                    return (
                        <li key={spot._id}>
                            <header style={{ backgroundImage: `url(${spot.thumbnail_url})` }} />
                            <strong>{spot.company}</strong>
                            <span>{spot.minimum_price}</span>
                        </li>
                    );
                })}
            </ul>

            <Link to='/new'>
                Cadastrar novo ponto
            </Link>
        </>
    )
}