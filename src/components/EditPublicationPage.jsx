import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { usePublications } from '../hooks/usePublications';

export default function EditPublicationPage() {
  
  const { id } = useParams();
  const navigate = useNavigate();
  const { publications, editPublication } = usePublications();
  const publication = publications.find(pub => pub.id === Number(id));

  const [title, setTitle] = useState('');
  const [releaseDate, setReleaseDate] = useState('');
  const [coverFile, setCoverFile] = useState(null);
  const [coverUrl, setCoverUrl] = useState('');

  useEffect(() => {
    if (publication) {
      setTitle(publication.title || '');
      setReleaseDate(publication.releaseDate || '');
      setCoverUrl(publication.coverUrl || '');
    }
  }, [publication]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !releaseDate) {
      alert('Judul dan Tanggal Rilis harus diisi!');
      return;
    }
    let newCoverUrl = coverUrl;
    if (coverFile) {
      newCoverUrl = URL.createObjectURL(coverFile);
    }
    const updatedPublication = {
      ...publication,
      title,
      releaseDate,
      coverUrl: newCoverUrl,
    };
    editPublication(updatedPublication);
    navigate('/publications');
  };

  if (!publication) {
    return <div className="text-center mt-10">Publikasi tidak ditemukan.</div>;
  }

  return (
    <div className="min-h-screen flex justify-center items-start pt-12 bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
        <h2 className="text-xl font-semibold mb-4">Edit Publikasi</h2>
        
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Judul</label>
          <input type="text" value={title} onChange={e => setTitle(e.target.value)} className="w-full border p-2 rounded" />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Tanggal Rilis</label>
          <input type="date" value={releaseDate} onChange={e => setReleaseDate(e.target.value)} className="w-full border p-2 rounded" />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Sampul (Gambar)</label>
          <input type="file" accept="image/*" onChange={handleFileChange} className="w-full border p-2 rounded" />
          <img src={coverUrl} alt="Preview Sampul" className="mt-2 w-32 h-auto" />
        </div>

        <div className="flex justify-end space-x-2">
          <button onClick={onCancel} className="px-4 py-2 bg-gray-300 text-gray-800 rounded">Batal</button>
          <button onClick={handleSave} className="px-4 py-2 bg-blue-700 text-white rounded">Simpan</button>
        </div>
      </div>
    </div>
  );
}
