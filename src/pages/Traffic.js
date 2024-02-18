import React, { useState } from 'react';
import Chart from 'chart.js/auto';

const Traffic = () => {
    const [email, setEmail] = useState('');
    const [apiKey, setApiKey] = useState('');
    const [zoneTag, setZoneTag] = useState('');
    const [chartInstance, setChartInstance] = useState(null);
    const [error, setError] = useState('');

    const fetchAPI = async () => {
        // Implementation of the fetchAPI function
        console.log('Fetching data from GraphQL API');
        console.log('Email:', email);
        console.log('API Key:', apiKey);
        console.log('Zone Tag:', zoneTag);
        const query = `
        query {
            viewer {
              zones(filter: {zoneTag: "${zoneTag}"}) {
                httpRequests1dGroups(limit: 30) {
                  sum {
                    bytes
                    cachedBytes
                  }
                  date {
                    date
                  }
                }
              }
            }
          }
        `;

        const response = await fetch('https://api.cloudflare.com/client/v4/graphql', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Auth-Email': email,
                'X-Auth-Key': apiKey,
            },
            body: JSON.stringify({ query }),
        });

        return response;

    };

    function chartInit(date, total, cached) {
        var config = {
            type: 'line',
            data: {
                labels: date,
                datasets: [{
                    label: 'total traffic',
                    backgroundColor: window.chartColors.red,
                    borderColor: window.chartColors.red,
                    data: total,
                    fill: false,
                }, {
                    label: 'Cached traffic',
                    fill: false,
                    backgroundColor: window.chartColors.blue,
                    borderColor: window.chartColors.blue,
                    data: cached
                }]
            },
            options: {
                responsive: true,
                title: {
                    display: true,
                    text: 'Cached vs Uncached traffic'
                },
                tooltips: {
                    mode: 'index',
                    intersect: false,
                },
                hover: {
                    mode: 'nearest',
                    intersect: true
                },
                scales: {
                    xAxes: [{
                        display: true,
                        scaleLabel: {
                            display: true,
                            labelString: 'Month'
                        }
                    }],
                    yAxes: [{
                        display: true,
                        scaleLabel: {
                            display: true,
                            labelString: 'Value'
                        }
                    }]
                }
            }
        };
        return config;
    }


    const handleFetchClick = async () => {
        if (email && apiKey && zoneTag) {
            setError('');

            try {
                const response = await fetchAPI();
                const json = await response.json();

                if (response.status === 200) {
                    const date = [];
                    const total = [];
                    const cached = [];
                    const array = json.data.viewer.zones[0].httpRequests1dGroups;

                    for (let i = 0; i < array.length; i++) {
                        date.push(array[i].date.date);
                        total.push(array[i].sum.bytes);
                        cached.push(array[i].sum.cachedBytes);
                    }

                    const ctx = document.getElementById('canvas').getContext('2d');

                    if (chartInstance) {
                        chartInstance.destroy();
                    }

                    const config = chartInit(date, total, cached);
                    const newChartInstance = new Chart(ctx, config);
                    setChartInstance(newChartInstance);
                } else {
                    setError('Error: \n' + JSON.stringify(json));
                }
            } catch (error) {
                setError('Error: \n' + error.message);
            }
        } else {
            setError('Please fill the form with your email, API key, and zone tag');
        }
    };

    return (
        <div>
            <h3>Visualise your traffic from GraphQL!</h3>
            <br />
            <div>
                <form>
                    <label htmlFor="email">Enter your API details:</label>
                    <input
                        type="text"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                    />
                    <input
                        type="text"
                        id="apiKey"
                        value={apiKey}
                        onChange={(e) => setApiKey(e.target.value)}
                        placeholder="API Token"
                    />
                </form>
            </div>
            <label htmlFor="zoneTag">Choose the zone tag you want to fetch for:</label>
            <div>
                <input
                    type="text"
                    id="zoneTag"
                    value={zoneTag}
                    onChange={(e) => setZoneTag(e.target.value)}
                    placeholder="Zone Tag"
                />
            </div>
            <button id="fetch" type="button" onClick={handleFetchClick}>
                <p>Fetch analytics</p>
            </button>
            {error && <div style={{ color: 'red' }}>{error}</div>}
            <div style={{ width: '50%' }}>
                <canvas id="canvas" style={{ width: '100%' }}></canvas>
            </div>
            <br />
            <br />
        </div>
    );
};

export default Traffic;
