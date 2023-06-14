import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './../AdsDisplay.css';
//axios.get(`http://${api_url}/entities/entity/${userId}`).then(function (resp) {

function Ads() {
    const [ads, setAds] = useState([]);
  

    const api_url = process.env.REACT_APP_ADSURI;
    useEffect(() => {
        async function fetchAds() {
            try {
                const response = await axios.get(`http://${api_url}/ads`,
            {
                headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    "Content-type": "application/json",
                }
            }
                );
                setAds(response.data.ads);
            } catch (error) {
                console.error("Error fetching ads:", error);
            }
        }
        fetchAds();
    }, []);

    const onAdClick = async (adUrl, adId) => {
        try {
            const response = await axios.post(`http://${api_url}/ads/click/${adId}`,{},
            {
                headers: {
                    "Content-type": "application/json",
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            }
            );
            if(response.status === 200) {
                window.open(adUrl, '_blank');
            } else {
                console.error("Failed to increment clicks");
            }
        } catch (error) {
            console.error("Error incrementing clicks", error);
        }
    }
  
    return (
        <div className="ad-container">
            {ads && ads.map(ad =>  (
                <div className="ad" key={ad._id}>
                    <h3>{ad.title}</h3>
                    <p>{ad.description}</p>
                    <a href="#" onClick={() => onAdClick(ad.targetUrl, ad._id)}>
                        <img className="ad-image" src={ad.imageUrl} alt={ad.title} />
                    </a>
                </div>
            ))}
        </div>
    );
}

export default Ads;
