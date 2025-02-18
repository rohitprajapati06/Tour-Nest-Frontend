import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './EmergencyContact.css';
import api from '../Users/api';

function EmergencyContact() {
    const [emergencies, setEmergencies] = useState([]);
    const [filteredEmergencies, setFilteredEmergencies] = useState([]);
    const [openIndex, setOpenIndex] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate(); // Navigate for redirection

    useEffect(() => {
        const fetchEmergencyData = async () => {
            try {
                const response = await api.get('/Emergency');
                setEmergencies(response.data);
                setFilteredEmergencies(response.data);
            } catch (error) {
                console.error("An error occurred:", error);
                // Check if the error is related to authentication
                if (error.message === 'Authentication error') {
                    navigate('/login'); // Redirect to login page
                }
            }
        };

        fetchEmergencyData(); // Call the function to fetch data
    }, [navigate]);

    const togglePanel = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    const handleSearch = (event) => {
        const term = event.target.value.toLowerCase();
        setSearchTerm(term);
        setFilteredEmergencies(
            emergencies.filter(
                (emergency) =>
                    emergency.location.toLowerCase().includes(term) ||
                    emergency.country.toLowerCase().includes(term)
            )
        );
    };

    return (
        <div className='Emergencychange'>
            <div className="success">
                <p><i>Learning key phrases in the local language can greatly enhance travel experiences, helping with navigation, social interactions, and even safety.</i></p>
                <ul>
                    <strong>Greetings and Politeness:</strong> "Hello," "Goodbye," "Please," "Thank you," and "Excuse me" are universal essentials for polite interactions.
                    <br /> <strong>Directions and Navigation:</strong> Phrases like "Where is…?" "Left," "Right," "Near," and "Far" are invaluable for navigating.
                    <br /> <strong>Emergency Phrases:</strong> "Help," "Doctor," "Police," and "I need assistance" are important for safety.
                    <br /> <strong>Numbers:</strong> Being able to recognize numbers (1-10) helps in markets, transportation, and understanding prices.
                </ul>
            </div>

            <div className="search-bar-container">
                <input
                    type="text"
                    className="search-bar"
                    placeholder="Search by country or location..."
                    value={searchTerm}
                    onChange={handleSearch}
                />
            </div>

            {filteredEmergencies.map((emergency, index) => (
                <div key={emergency.id}>
                    <button className="accordion" onClick={() => togglePanel(index)}>
                        {emergency.location}, {emergency.country}
                        <span className="symbol">{openIndex === index ? '−' : '+'}</span>
                    </button>
                    <div className={`panel ${openIndex === index ? 'active' : ''}`}>
                        <p><strong>Embassy Phone:</strong> {emergency.embassyPhone}</p>
                        <p><strong>Embassy Email:</strong> {emergency.embassyEmail}</p>
                        <p><strong>Embassy Address:</strong> {emergency.embassyAddress}</p>
                        <p><strong>Police:</strong> {emergency.police}</p>
                        <p><strong>Fire:</strong> {emergency.fire}</p>
                        <p><strong>Ambulance:</strong> {emergency.ambulance}</p>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default EmergencyContact;
