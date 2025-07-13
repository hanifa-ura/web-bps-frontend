// src/components/PublicationListPage.jsx
import React from 'react';
import { usePublications } from '../hooks/usePublications';
import { useNavigate } from 'react-router-dom';

export default function PublicationListPage() {
  const { publications } = usePublications();
  const navigate = useNavigate();

return (
<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
  <header className="mb-8 text-center md:text-left">
    <h1 className="text-3xl sm:text-4xl font-bold text-gray-800">Daftar Publikasi BPS Provinsi Kalimantan Timur</h1>
    <p className="text-gray-500 mt-1">Sumber data publikasi terkini</p>
  </header>

  <div className="relative overflow-x-auto shadow-xl rounded-lg">
    <table className="w-full text-sm text-left text-gray-500">
    <thead className="text-xs text-white uppercase bg-slate-700">
      <tr>
        <th scope="col" className="px-6 py-3 text-center w-16">No</th>
        <th scope="col" className="px-6 py-3">Judul</th>
        <th scope="col" className="px-6 py-3">Tanggal Rilis</th>
        <th scope="col" className="px-6 py-3 text-center">Sampul</th>
        <th scope="col" className="px-6 py-3 text-center">Aksi</th>
      </tr>
    </thead>

    <tbody>
      {publications.map((pub, idx) => (
      <tr key={pub.id} className="bg-white border-b hover:bg-gray-50 transition-colors duration-200">
      <td className="px-6 py-4 font-medium text-gray-900 text-center">{idx + 1}</td>
      <td className="px-6 py-4 font-semibold text-gray-800">{pub.title}</td>
      <td className="px-6 py-4 text-gray-600">{pub.releaseDate}</td>
      <td className="px-6 py-4 flex justify-center items-center">
      <img
      src={pub.coverUrl}
      alt={`Sampul ${pub.title}`}
      className="h-24 w-auto object-cover rounded shadow-md"
      onError={e => { e.target.onerror = null; e.target.src = 'https://placehold.co/100x140/cccccc/ffffff?text=Error'; }}/> 
      </td>
      <td className="px-6 py-4 text-center">
        <div className='flex justify-center gap-2'>
        <button
          className="bg-yellow-400 text-white px-3 py-1 rounded hover:bg-yellow-500"
          onClick={() => handleEditClick(pub)}
        >
          Edit
        </button>

        <button
          onClick={() => handleDeleteClick(pub.id)}
          className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-3 rounded shadow">
          Hapus
        </button>
        </div>

      </td>

      </tr>
      ))}
    </tbody>
    </table>
  </div>
</div>
);
}