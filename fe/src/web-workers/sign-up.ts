import axios from 'axios';

// Message event listener to handle messages from the main thread
self.onmessage = async (event) => {
    const { url, payload } = event.data;

    try {
        // Make an API call using Axios
        const response = await axios.get(url, {
            params: payload, // Pass any necessary parameters
        });

        // Send the response data back to the main thread
        self.postMessage(response.data);
    } catch (error) {
        // Send any errors back to the main thread
        self.postMessage({ error: error.message });
    }
};