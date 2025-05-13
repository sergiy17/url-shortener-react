import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function LinksPage() {
    const [urls, setUrls] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [meta, setMeta] = useState({});

    const fetchUrls = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`/api/urls?page=${page}&per_page=10`);
            setUrls(response.data.data);
            setMeta(response.data.meta);
        } catch (err) {
            setError(err.response?.data?.error || 'Failed to load URLs');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUrls();
    }, [page]);

    const handleDelete = async (slug) => {
        if (!window.confirm('Are you sure you want to delete this URL?')) return;
        try {
            await axios.delete(`/api/urls/${slug}`);
            fetchUrls(); // Refresh the list
        } catch (err) {
            setError(err.response?.data?.error || 'Failed to delete URL');
        }
    };

    const handlePrevPage = () => {
        if (page > 1) setPage(page - 1);
    };

    const handleNextPage = () => {
        if (page < meta.total_pages) setPage(page + 1);
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

    return (
        <div className='min-h-screen bg-gray-100 py-8'>
            <div className='max-w-fit mx-auto'>
                <h1 className='text-2xl font-bold text-center mb-6'>All Shortened URLs</h1>
                <div className='bg-white shadow-lg rounded-lg overflow-hidden'>
                    <div className='overflow-x-auto'>
                        <table className='min-w-full divide-y divide-gray-200'>
                            <thead className='bg-gray-50'>
                            <tr>
                                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Shortened Link</th>
                                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Original URL</th>
                                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Slug</th>
                                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Visits</th>
                                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Last Visit</th>
                                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Active</th>
                                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Actions</th>
                            </tr>
                            </thead>
                            <tbody className='bg-white divide-y divide-gray-200'>
                            {loading ? (
                                <tr>
                                    <td colSpan='7' className='px-6 py-4 text-center text-gray-500'>Loading...</td>
                                </tr>
                            ) : urls.length === 0 ? (
                                <tr>
                                    <td colSpan='7' className='px-6 py-4 text-center text-gray-500'>No URLs found</td>
                                </tr>
                            ) : (
                                urls.map((url) => (
                                    <tr key={url.slug}>
                                        <td className='px-6 py-4 whitespace-nowrap'>
                                            <Link
                                                to={`/links/${url.slug}`}
                                                className='text-blue-600 underline truncate'
                                            >
                                                {url.shortened_link}
                                            </Link>
                                        </td>
                                        <td className='px-6 py-4 whitespace-nowrap'>
                                            <a
                                                href={url.original_url}
                                                className='text-blue-600 underline truncate'
                                                target='_blank'
                                                rel='noopener noreferrer'
                                            >
                                                {url.original_url}
                                            </a>
                                        </td>
                                        <td className='px-6 py-4 whitespace-nowrap text-gray-900'>{url.slug}</td>
                                        <td className='px-6 py-4 whitespace-nowrap text-gray-900'>{url.visits}</td>
                                        <td className='px-6 py-4 whitespace-nowrap text-gray-900'>
                                            {url.last_visit_at ? new Date(url.last_visit_at).toLocaleString() : 'Never'}
                                        </td>
                                        <td className='px-6 py-4 whitespace-nowrap'>
                        <span
                            className={`inline-block py-1 px-3 rounded-full text-white ${url.is_active ? 'bg-green-600' : 'bg-red-600'}`}
                        >
                          {url.is_active ? 'Active' : 'Inactive'}
                        </span>
                                        </td>
                                        <td className='px-6 py-4 whitespace-nowrap'>
                                            <button
                                                type='button'
                                                onClick={() => handleDelete(url.slug)}
                                                className='py-1 px-3 bg-red-600 text-white rounded-md hover:bg-red-700'
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                            </tbody>
                        </table>
                    </div>
                </div>
                {meta.total_pages > 1 && (
                    <div className='mt-4 flex justify-between'>
                        <button
                            type='button'
                            onClick={handlePrevPage}
                            disabled={page === 1}
                            className={`py-2 px-4 bg-blue-600 text-white rounded-md ${page === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'}`}
                        >
                            Previous
                        </button>
                        <span className='py-2 text-gray-700'>
              Page {meta.current_page} of {meta.total_pages}
            </span>
                        <button
                            type='button'
                            onClick={handleNextPage}
                            disabled={page >= meta.total_pages}
                            className={`py-2 px-4 bg-blue-600 text-white rounded-md ${page >= meta.total_pages ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'}`}
                        >
                            Next
                        </button>
                    </div>
                )}
                <Link
                    to='/'
                    className='mt-4 inline-block py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700'
                >
                    Shorten New URL
                </Link>
            </div>
        </div>
    );
}

export default LinksPage;