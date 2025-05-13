import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function ShowPage() {
    const { slug } = useParams();
    const navigate = useNavigate();
    const [urlData, setUrlData] = useState(null);
    const [error, setError] = useState('');
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        const fetchUrlData = async () => {
            try {
                const response = await axios.get(`/api/urls/${slug}`);
                setUrlData(response.data);
            } catch (err) {
                setError(err.response?.data?.error || 'Failed to load URL data');
            }
        };
        fetchUrlData();
    }, [slug]);

    const handleCopy = () => {
        if (urlData?.shortened_link) {
            navigator.clipboard.writeText(urlData.shortened_link);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    const handleDelete = async () => {
        if (!window.confirm('Are you sure you want to delete this URL?')) return;
        try {
            await axios.delete(`/api/urls/${slug}`);
            navigate('/links');
        } catch (err) {
            setError(err.response?.data?.error || 'Failed to delete URL');
        }
    };

    if (error) {
        return (
            <div className='min-h-screen bg-gray-100 flex items-center justify-center'>
                <div className='bg-white p-8 rounded-lg shadow-lg w-full max-w-md'>
                    <div className='p-3 bg-red-100 text-red-700 rounded-md'>{error}</div>
                </div>
            </div>
        );
    }

    if (!urlData) {
        return (
            <div className='min-h-screen bg-gray-100 flex items-center justify-center'>
                <div className='text-gray-700'>Loading...</div>
            </div>
        );
    }

    return (
        <div className='min-h-screen bg-gray-100 flex items-center justify-center'>
            <div className='bg-white p-8 rounded-lg shadow-lg w-full max-w-md'>
                <h1 className='text-2xl font-bold text-center mb-6'>Shortened URL Details</h1>
                <div className='space-y-4'>
                    <div>
                        <label className='block text-sm font-medium text-gray-700'>Shortened Link</label>
                        <div className='mt-1 flex items-center space-x-2'>
                            <a
                                href={urlData.shortened_link}
                                className='text-blue-600 underline truncate'
                                target='_blank'
                                rel='noopener noreferrer'
                            >
                                {urlData.shortened_link}
                            </a>
                            <button
                                type='button'
                                onClick={handleCopy}
                                className={`py-1 px-3 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 ${copied ? 'opacity-50' : ''}`}
                            >
                                {copied ? 'Copied!' : 'Copy'}
                            </button>
                        </div>
                    </div>
                    <div>
                        <label className='block text-sm font-medium text-gray-700'>Original URL</label>
                        <a
                            href={urlData.original_url}
                            className='mt-1 text-blue-600 underline truncate block'
                            target='_blank'
                            rel='noopener noreferrer'
                        >
                            {urlData.original_url}
                        </a>
                    </div>
                    <div>
                        <label className='block text-sm font-medium text-gray-700'>Slug</label>
                        <p className='mt-1 text-gray-900'>{urlData.slug}</p>
                    </div>
                    <div>
                        <label className='block text-sm font-medium text-gray-700'>Visits</label>
                        <p className='mt-1 text-gray-900'>{urlData.visits}</p>
                    </div>
                    <div>
                        <label className='block text-sm font-medium text-gray-700'>Last Visit</label>
                        <p className='mt-1 text-gray-900'>
                            {urlData.last_visit_at ? new Date(urlData.last_visit_at).toLocaleString() : 'Never'}
                        </p>
                    </div>
                    <div>
                        <label className='block text-sm font-medium text-gray-700'>Active</label>
                        <p className='mt-1'>
              <span
                  className={`inline-block py-1 px-3 rounded-full text-white ${urlData.is_active ? 'bg-green-600' : 'bg-red-600'}`}
              >
                {urlData.is_active ? 'Active' : 'Inactive'}
              </span>
                        </p>
                    </div>
                </div>
                <div className='mt-6 flex space-x-4'>
                    <button
                        type='button'
                        onClick={handleDelete}
                        className='w-full py-2 px-4 bg-red-600 text-white rounded-md hover:bg-red-700'
                    >
                        Delete URL
                    </button>
                    <a
                        href='/'
                        className='w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-center'
                    >
                        Shorten Another URL
                    </a>
                </div>
            </div>
        </div>
    );
}

export default ShowPage;