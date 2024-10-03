import React, { useState, useEffect } from 'react';
import shogun from '../assets/a Japanese shogun-geisha- red cherry blossom.webp';

const ImageCoordinateTracker = () => {
    const [coordinates, setCoordinates] = useState({ x: 0, y: 0 });
    const [savedCoordinates, setSavedCoordinates] = useState(() => {
        const saved = localStorage.getItem('coordinates');
        return saved ? JSON.parse(saved) : [];
    });
    const [deletedCoordinate, setDeletedCoordinate] = useState(null); // Store deleted coordinate for undo

    // Save to localStorage whenever savedCoordinates change
    useEffect(() => {
        localStorage.setItem('coordinates', JSON.stringify(savedCoordinates));
    }, [savedCoordinates]);

    const handleMouseMove = (e) => {
        const rect = e.target.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        setCoordinates({ x, y });
    };

    const handleClick = () => {
        const newCoordinates = { x: coordinates.x, y: coordinates.y };
        setSavedCoordinates([...savedCoordinates, newCoordinates]);
    };

    const handleDelete = (index) => {
        // Save the deleted coordinate for undo
        setDeletedCoordinate({ coord: savedCoordinates[index], index });
        const updatedCoordinates = savedCoordinates.filter((_, i) => i !== index);
        setSavedCoordinates(updatedCoordinates);
    };

    const handleClearAll = () => {
        setSavedCoordinates([]);
        setDeletedCoordinate(null); // Clear undo state when clearing all
    };

    const handleUndo = () => {
        if (deletedCoordinate) {
            // Restore the deleted coordinate in the original position
            const updatedCoordinates = [...savedCoordinates];
            updatedCoordinates.splice(deletedCoordinate.index, 0, deletedCoordinate.coord);
            setSavedCoordinates(updatedCoordinates);
            setDeletedCoordinate(null); // Clear the undo state after restoring
        }
    };

    return (
        <div style={{ padding: '20px', maxWidth: '800px', margin: 'auto' }}>
            {/* Display area for the most recently clicked coordinates */}
            <div style={{
                backgroundColor: '#f0f0f0',
                borderRadius: '8px',
                padding: '10px',
                marginBottom: '20px',
                textAlign: 'center',
                boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)'
            }}>
                <h3>Latest Click Coordinates</h3>
                {savedCoordinates.length > 0 ? (
                    <p>Last Click: X: {savedCoordinates[savedCoordinates.length - 1].x}, Y: {savedCoordinates[savedCoordinates.length - 1].y}</p>
                ) : (
                    <p>No coordinates clicked yet</p>
                )}
            </div>

            {/* Image with mouse tracking */}
            <img
                src={shogun}
                alt="Trackable Image"
                onMouseMove={handleMouseMove}
                onClick={handleClick}
                style={{ maxWidth: '100%', height: 'auto', display: 'block', margin: 'auto', cursor: 'crosshair' }}
            />

            {/* Section to show all saved coordinates with delete, clear all, and undo */}
            <div style={{ marginTop: '20px' }}>
                <h3>Saved Coordinates:</h3>
                <ul style={{ listStyleType: 'none', paddingLeft: 0 }}>
                    {savedCoordinates.map((coord, index) => (
                        <li key={index} style={{
                            padding: '5px',
                            backgroundColor: index % 2 === 0 ? '#e3e3e3' : '#cfcfcf',
                            marginBottom: '5px',
                            borderRadius: '4px',
                            textAlign: 'center'
                        }}>
                            X: {coord.x}, Y: {coord.y}
                            <button
                                onClick={() => handleDelete(index)}
                                style={{
                                    marginLeft: '10px',
                                    backgroundColor: 'red',
                                    color: 'white',
                                    border: 'none',
                                    padding: '5px 10px',
                                    borderRadius: '4px',
                                    cursor: 'pointer'
                                }}
                            >
                                Delete
                            </button>
                        </li>
                    ))}
                </ul>

                {savedCoordinates.length > 0 && (
                    <button
                        onClick={handleClearAll}
                        style={{
                            backgroundColor: 'red',
                            color: 'white',
                            border: 'none',
                            padding: '10px 20px',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            marginTop: '10px',
                            marginRight: '10px'
                        }}
                    >
                        Clear All
                    </button>
                )}

                {/* Undo button appears when a coordinate is deleted */}
                {deletedCoordinate && (
                    <button
                        onClick={handleUndo}
                        style={{
                            backgroundColor: 'green',
                            color: 'white',
                            border: 'none',
                            padding: '10px 20px',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            marginTop: '10px'
                        }}
                    >
                        Undo Delete
                    </button>
                )}
            </div>
        </div>
    );
};

export default ImageCoordinateTracker;
