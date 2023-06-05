import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Table, Button } from 'react-bootstrap';

function DisplayAds() {
    const [ads, setAds] = useState([]);

    useEffect(() => {
        fetchAds();
    }, []);

    const fetchAds = async () => {
        try {
            const response = await fetch('http://localhost:8000/ads/showAll');
            if (response.ok) {
                const data = await response.json();
                setAds(data);
            } else {
                console.error('Error fetching ads: ', response.statusText);
            }
        } catch (error) {
            console.error('Error fetching ads: ', error);
        }
    }

    const deleteAd = async (id) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this ad?');
        if (confirmDelete) {
            try {
                const response = await axios.delete(`http://localhost:8000/ads/delete/${id}`);
                if (response.status === 200) {
                    fetchAds();  
                } else {
                    console.error('Error deleting ad: ', response.statusText);
                }
            } catch (error) {
                console.error('Error deleting ad: ', error);
            }
        }
    }

    return (
        <Container>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Image</th>
                        <th>Clicks</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {ads && ads.map(ad => (
                        <tr key={ad._id}>
                            <td>{ad.title}</td>
                            <td>{ad.description}</td>
                            <td>
                                <a href={ad.targetUrl} target="_blank" rel="noreferrer">
                                    <img className="ad-image" src={ad.imageUrl} alt={ad.title} style={{width: '50px', height: '50px'}}/>
                                </a>
                            </td>
                            <td>{ad.clicks}</td>
                            <td>
                                <Button variant="danger" onClick={() => deleteAd(ad._id)}>X</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    );
}

export default DisplayAds;
