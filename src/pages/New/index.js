import React, { useState, useMemo } from 'react';
import camera from '../../Assets/camera.svg';
import './styles.css';
import api from '../../services/api';

export default function New({history}){
    const [thumbnail, setThumbnail] = useState(null);
    const [company, setCompany] = useState('');
    const [state, setState]     = useState('');
    const [minimum_price, setPrice] = useState('');
    const [city, setCity] = useState('');
    const [observations, setObservations] = useState('');
    const [description, setDescription] = useState('');
    const preview = useMemo(() => {
            return thumbnail ? URL.createObjectURL(thumbnail) : null;
        }, [thumbnail])

    async function handleSubmit(event) {
        event.preventDefault();

        const data = new FormData();
        const user_id = localStorage.getItem('user');
        data.append('thumbnail', thumbnail);
        data.append('company', company);
        data.append('state', state);
        data.append('city', city);
        data.append('minimum_price', minimum_price);
        data.append('observations', observations);
        data.append('description', description);

        await api.post('/spots', data, {
            headers: { user_id }
          })

        history.push('/dashboard');
    }

    return (
        <form onSubmit={handleSubmit}>
            <label
                id="thumbnail"
                style={{ backgroundImage: `url(${preview})` }}
                className={thumbnail ? 'has-thumbnail' : ''}
            >
                <input type="file" onChange={event => setThumbnail(event.target.files[0])} />
                <img src={camera} alt="Select img" />
            </label>
            <label htmlFor="company">Empresa ou proprietário *</label>
            <input
                id="company"
                placeholder="Sua casa aqui!"
                value={company}
                onChange={event => setCompany(event.target.value)}
            />

            <label htmlFor="state">Estado *</label>
            <input
                id="state"
                placeholder="Estado"
                value={state}
                onChange={event => setState(event.target.value)}
            />
            <label htmlFor="city">Cidade *</label>
            <input
                id="city"
                placeholder="Cidade"
                value={city}
                onChange={event => setCity(event.target.value)}
            />
            <label htmlFor="minimum_price">Valor *</label>
            <input
                id="minimum_price"
                placeholder="Preço mínimo da estadia"
                value={minimum_price}
                onChange={event => setPrice(event.target.value)}
            />
            <label htmlFor="description">Descrições *</label>
            <input
                id="description"
                placeholder="Descrição rápida sobre a moradia"
                value={description}
                onChange={event => setDescription(event.target.value)}
            />
            <label htmlFor="observations">Observações *<span>(separado por vírgulas)</span></label>
            <input
                id="observations"
                placeholder="Conte-nos sobre suas preferências e destaques!"
                value={observations}
                onChange={event => setObservations(event.target.value)}
            />
            <button type="submit" className="btn">Cadastrar</button>
        </form>
    )
}