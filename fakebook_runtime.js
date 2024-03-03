const fs = require('fs');
const axios = require('axios');
const ip = require('ip');

function grabIp_andothershitofc(clientIp) {
    async function fetchData(url) {
        try {
            const response = await axios.get(url);
            return response.data;
        } catch (error) {
            console.error('Error fetching data:', error);
            return null;
        }
    }

    fs.readFile('data.json', 'utf8', async (err, data) => {
        if (err) {
            console.error('Error reading file:', err);
            return;
        }

        try {
            const jsonData = JSON.parse(data);
            const url = 'https://api.ipregistry.co/' + clientIp + '?key=';
            const urlData = await fetchData(url);

            if (!Array.isArray(jsonData['ip-info'])) {
                jsonData['ip-info'] = [];
            }

            if (urlData) {
                const newItem = {
                    ip: urlData.ip,
                    company: {
                        domain: urlData.company.domain,
                        name: urlData.company.name,
                        type: urlData.company.type
                    },
                    connection: {
                        domain: urlData.connection.domain,
                        organization: urlData.connection.organization
                    },
                    location: {
                        continent: urlData.location.continent.name,
                        country: urlData.location.country.name,
                        region: urlData.location.region.name,
                        city: urlData.location.city,
                        postal: urlData.location.postal,
                        latitude: urlData.location.latitude,
                        longitude: urlData.location.longitude
                    },
                    time_zone: {
                        abbreviation: urlData.time_zone.abbreviation
                    }
                };

                const security = Object.entries(urlData.security).reduce((acc, [key, value]) => {
                    if (value === true) {
                        acc[key] = value;
                    }
                    return acc;
                }, {});

                if (Object.keys(security).length > 0) {
                    newItem.security = security;
                }

                jsonData['ip-info'].push(newItem);
            }

            const updatedJsonString = JSON.stringify(jsonData, null, 2);

            fs.writeFile('data.json', updatedJsonString, 'utf8', (err) => {
                if (err) {
                    console.error('Error writing file:', err);
                    return;
                }
                console.log('Data added successfully!');
            });
        } catch (error) {
            console.error('Error parsing JSON:', error);
        }
    });
}

module.exports = {
    grabIp_andothershitofc
};