import React, { useState } from 'react';
import axios from 'axios';
import { Container, Form, Button } from 'react-bootstrap';

function CreateAd() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [targetUrl, setTargetUrl] = useState("");
    const [status, setStatus] = useState("active");

    const createAd = async (event) => {
        event.preventDefault();

        try {
            const adData = { title, description, imageUrl, targetUrl, status };
            const response = await axios.post('http://localhost:8000/ads/create', adData);

            if (response.data) {
                alert("Ad created successfully!");

                setTitle("");
                setDescription("");
                setImageUrl("");
                setTargetUrl("");
                setStatus("active");
            }
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <Container>
            <Form onSubmit={createAd}>
                <Form.Group>
                    <Form.Label>Title:</Form.Label>
                    <Form.Control type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Description:</Form.Label>
                    <Form.Control as="textarea" value={description} onChange={(e) => setDescription(e.target.value)} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Image URL:</Form.Label>
                    <Form.Control type="text" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Target URL:</Form.Label>
                    <Form.Control type="text" value={targetUrl} onChange={(e) => setTargetUrl(e.target.value)} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Status:</Form.Label>
                    <Form.Control as="select" value={status} onChange={(e) => setStatus(e.target.value)}>
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                    </Form.Control>
                </Form.Group>
                <Button type="submit">Create Ad</Button>
            </Form>
        </Container>
    );
}

export default CreateAd;
