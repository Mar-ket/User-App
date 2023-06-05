import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './../AdsDisplay.css';

function Ads() {
    const [ads, setAds] = useState([]);
  
    useEffect(() => {
        async function fetchAds() {
            try {
                const response = await axios.get('http://localhost:8000/ads');
                setAds(response.data.ads);
            } catch (error) {
                console.error("Error fetching ads:", error);
            }
        }
        fetchAds();
    }, []);

    const onAdClick = async (adUrl, adId) => {
        try {
            const response = await axios.post(`http://localhost:8000/ads/click/${adId}`);
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
