'use client';

import { useState, FormEvent } from 'react';

export default function Home() {
  const [ticker, setTicker] = useState('');
  const [date, setDate] = useState('');
  const [predictedPrice, setPredictedPrice] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setPredictedPrice(null);

    try {
      const response = await fetch(
        `http://localhost:8000/api/stocks/${ticker}/predict`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ date }),
        }
      );

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setPredictedPrice(data.predicted_price);
    } catch {
      setError('Could not fetch prediction. Please check your input.');
    }
  };

  const minDate = new Date().toISOString().split('T')[0];

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-gray-200 to-gray-900 text-green-600">
      <div className="bg-black p-8 rounded-lg shadow-lg w-full max-w-md">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-green-700">
              Stock Ticker (e.g., AAPL):
            </label>
            <input
              type="text"
              className="w-full p-2 border border-green-800 bg-gray-800 text-green-400 rounded focus:outline-none focus:ring-2 focus:ring-green-700"
              value={ticker}
              onChange={(e) => setTicker(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-green-700">Date</label>
            <input
              type="date"
              min={minDate}
              className="w-full p-2 border border-green-800 bg-gray-800 text-green-400 rounded focus:outline-none focus:ring-2 focus:ring-green-700"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full p-2 bg-green-700 text-white rounded hover:bg-green-800 transition duration-200"
          >
            Predict Price
          </button>
        </form>

        {predictedPrice && (
          <div className="mt-6 p-4 bg-green-900 text-green-300 rounded">
            Predicted Price: <strong>${predictedPrice}</strong>
          </div>
        )}

        {error && (
          <div className="mt-6 p-4 bg-red-800 text-red-200 rounded">
            {error}
          </div>
        )}
      </div>
    </div>
  );
}
