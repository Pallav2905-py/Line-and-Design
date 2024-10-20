import React, { useEffect, useState } from 'react';

function QuoteRequests() {
    const [enquiries, setEnquiries] = useState([]);
    const [activeTab, setActiveTab] = useState('Not Ack'); // State to track the active tab

    useEffect(() => {
        const fetchEnquiries = async () => {
            try {
                const response = await fetch('https://line-and-design.onrender.com/quote');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setEnquiries(data);
            } catch (error) {
                console.error('Error fetching enquiries:', error);
            }
        };

        fetchEnquiries();
    }, []);

    const toggleAck = async (id) => {
        try {
            const enquiry = enquiries.find(enquiry => enquiry.id === id);
            const updatedStatus = enquiry.status === 'Ack' ? 'Not Ack' : 'Ack';
            const response = await fetch(`https://line-and-design.onrender.com/quote/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ status: updatedStatus }),
            });

            if (!response.ok) {
                throw new Error('Failed to update status');
            }

            setEnquiries(enquiries.map(enq => (enq.id === id ? { ...enq, status: updatedStatus } : enq)));
        } catch (error) {
            console.error('Error updating status:', error);
        }
    };

    const deleteEnquiry = async (id) => {
        try {
            const response = await fetch(`https://line-and-design.onrender.com/quote/${id}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Failed to delete enquiry');
            }

            setEnquiries(enquiries.filter(enq => enq.id !== id));
        } catch (error) {
            console.error('Error deleting enquiry:', error);
        }
    };

    const filteredEnquiries = enquiries.filter(enquiry => enquiry.status === (activeTab === 'Ack' ? 'Ack' : 'Not Ack'));

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">Customer Support Contacts</h2>

            {/* Tab Navigation */}
            <ul className="nav nav-tabs justify-content-center mb-4">
                <li className="nav-item">
                    <button
                        className={`nav-link ${activeTab === 'Not Ack' ? 'active' : ''}`}
                        onClick={() => setActiveTab('Not Ack')}
                    >
                        Not Acknowledged
                    </button>
                </li>
                <li className="nav-item">
                    <button
                        className={`nav-link ${activeTab === 'Ack' ? 'active' : ''}`}
                        onClick={() => setActiveTab('Ack')}
                    >
                        Acknowledged
                    </button>
                </li>
            </ul>

            {/* Enquiries List */}
            <div className="row">
                {filteredEnquiries.map((quote) => (
                    <div className="col-md-6 mb-4" key={quote.id}>
                        <div className="card shadow-sm">
                            <div className="card-body">
                                <h5 className="card-title">{quote.name}</h5>
                                <p className="card-text">
                                    <strong>Phone:</strong> {quote.phone} <br />
                                    <strong>Design Type:</strong> {quote.interiorType} <br />
                                    <strong>Area:</strong> {quote.size} sq. ft. <br />
                                    <strong>Status:</strong> {quote.status}
                                </p>
                                <button
                                    className="btn btn-primary"
                                    onClick={() => toggleAck(quote.id)}
                                >
                                    {quote.status === 'Ack' ? 'Mark as Not Acknowledged' : 'Mark as Acknowledged'}
                                </button>
                                {quote.status === 'Ack' && (
                                    <button
                                        className="btn btn-danger ml-2"
                                        onClick={() => deleteEnquiry(quote.id)}
                                    >
                                        Delete
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default QuoteRequests
