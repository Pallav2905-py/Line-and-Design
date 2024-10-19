import React, { useEffect, useState } from 'react';

function CustomerSupport() {
    const [enquiries, setEnquiries] = useState([]);
    const [activeTab, setActiveTab] = useState('Not Ack'); // State to track the active tab

    useEffect(() => {
        const fetchEnquiries = async () => {
            try {
                const response = await fetch('http://localhost:3001/contact');
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
            const response = await fetch(`http://localhost:3001/contact/${id}`, {
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
            const response = await fetch(`http://localhost:3001/contact/${id}`, {
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
        <div>
            <h2>Customer Support Contacts</h2>

            {/* Tab Navigation */}
            <div className="tabs">
                <button
                    className={activeTab === 'Not Ack' ? 'active' : ''}
                    onClick={() => setActiveTab('Not Ack')}
                >
                    Not Acknowledged
                </button>
                <button
                    className={activeTab === 'Ack' ? 'active' : ''}
                    onClick={() => setActiveTab('Ack')}
                >
                    Acknowledged
                </button>
            </div>

            <ul>
                {filteredEnquiries.map((contact) => (
                    <li key={contact.id}>
                        <strong>Name:</strong> {contact.name} <br />
                        <strong>Email:</strong> {contact.email} <br />
                        <strong>Subject:</strong> {contact.subject} <br />
                        <strong>Message:</strong> {contact.message} <br />
                        <strong>Status:</strong> {contact.status} <br />
                        <button onClick={() => toggleAck(contact.id)}>
                            Mark as {contact.status === 'Ack' ? 'Not Acknowledged' : 'Acknowledged'}
                        </button>
                        {contact.status === 'Ack' && ( // Show Delete button only for acknowledged enquiries
                            <button onClick={() => deleteEnquiry(contact.id)} style={{ marginLeft: '10px', backgroundColor: '#dc3545' }}>
                                Delete
                            </button>
                        )}
                    </li>
                ))}
            </ul>

            <style jsx>{`
                .tabs {
                    display: flex;
                    justify-content: center;
                    margin-bottom: 20px;
                }
                .tabs button {
                    margin: 0 10px;
                    padding: 10px 20px;
                    border: none;
                    cursor: pointer;
                    border-radius: 5px;
                    background-color: #f0f0f0;
                }
                .tabs button.active {
                    background-color: #007bff;
                    color: white;
                }
                ul {
                    list-style-type: none;
                    padding: 0;
                }
                li {
                    margin-bottom: 15px;
                    border: 1px solid #ddd;
                    padding: 15px;
                    border-radius: 5px;
                }
                button {
                    margin-top: 10px;
                    padding: 5px 10px;
                    border: none;
                    border-radius: 5px;
                    background-color: #28a745;
                    color: white;
                    cursor: pointer;
                }
                button:hover {
                    background-color: #218838;
                }
            `}</style>
        </div>
    );
}

export default CustomerSupport;
