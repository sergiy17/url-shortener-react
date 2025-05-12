import { useState } from 'react';
import axios from 'axios';

function CreatePage() {
    const [originalUrl, setOriginalUrl] = useState('');
    const [shortenedUrl, setShortenedUrl] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setShortenedUrl('');
        setIsLoading(true);

        try {
            const response = await axios.post('/api/urls', {
                url: { original_url: originalUrl },
            });
            setShortenedUrl(response.data.short_url);
        } catch (err) {
            setError(err.response?.data?.error || 'Something went wrong');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h1 className="text-2xl font-bold text-center mb-6">URL Shortener</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="url" className="block text-sm font-medium text-gray-700">
                            Enter URL
                        </label>
                        <input
                            type="url"
                            id="url"
                            value={originalUrl}
                            onChange={(e) => setOriginalUrl(e.target.value)}
                            placeholder="https://example.com"
                            className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={isLoading}
                        className={`w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                            isLoading ? 'opacity-50 cursor-not-allowed' : ''
                        }`}
                    >
                        {isLoading ? 'Shortening...' : 'Shorten URL'}
                    </button>
                </form>
                {error && (
                    <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-md">
                        {error}
                    </div>
                )}
                {shortenedUrl && (
                    <div className="mt-4 p-3 bg-green-100 text-green-700 rounded-md">
                        Shortened URL:{' '}
                        <a href={shortenedUrl} className="underline" target="_blank" rel="noopener noreferrer">
                            {shortenedUrl}
                        </a>
                    </div>
                )}
            </div>
        </div>
    );
}

export default CreatePage;