import React, { useState, useRef, useEffect } from 'react';
import { toast } from 'react-toastify';
import API, { baseImageURL } from '../../services/api';

function ProfilUpload({ formData }) {
  const [photo, setPhoto] = useState(null);  // untuk menyimpan file foto yang dipilih
  const [uploadedPhoto, setUploadedPhoto] = useState(null);  // untuk menyimpan URL foto yang sudah di-upload
  const fileInputRef = useRef();

  useEffect(() => {
    // Memuat foto yang telah di-upload sebelumnya
    const savedUploadedPhoto = localStorage.getItem('uploadedPhoto');
    if (savedUploadedPhoto) {
      setUploadedPhoto(savedUploadedPhoto);
    } else {
      const userData = JSON.parse(localStorage.getItem('user'));
      if (userData?.photo) {
        const fullURL = `${baseImageURL}${userData.photo}`;
        setUploadedPhoto(fullURL);
      }
    }

    // Jika ada foto yang sudah ada dalam formData (misalnya saat edit profil)
    if (formData?.photo) {
      setPhoto(formData.photo);
    }
  }, [formData]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setPhoto(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!photo) {
      toast.error('Pilih foto terlebih dahulu');
      return;
    }

    const formDataToUpdate = new FormData();
    formDataToUpdate.append('photo', photo);

    try {
      const response = await API.put('/auth/update-foto-profile', formDataToUpdate);

      toast.success('Profil berhasil diperbarui');

      // Simpan path foto yang baru ke localStorage dan state
      const photoPath = response.data.user.photo;
      const fullPhotoURL = `${baseImageURL}${photoPath}`;

      // Set uploaded photo dengan URL yang baru
      setUploadedPhoto(fullPhotoURL);
      setPhoto(null); // Reset preview ke null agar foto default muncul
      fileInputRef.current.value = null; // Reset input file

      // Simpan ke localStorage
      localStorage.setItem('uploadedPhoto', fullPhotoURL);

      const userData = JSON.parse(localStorage.getItem('user')) || {};
      userData.photo = photoPath;
      localStorage.setItem('user', JSON.stringify(userData));

    } catch (error) {
      console.error('Gagal memperbarui profil:', error);
      toast.error(error.response?.data?.message || 'Gagal memperbarui profil');
    }
  };

  return (
    <div style={{ flex: '0 0 300px' }}>
      <h4>Upload Foto</h4>

      {uploadedPhoto && (
        <div style={{ marginBottom: '1rem' }}>
          <strong>Foto Profil Saat Ini:</strong>
          <br />
          <img
            src={uploadedPhoto || 'https://cdn-icons-png.flaticon.com/512/149/149071.png'} // Gunakan uploadedPhoto jika ada, jika tidak tampilkan gambar default
            alt="Uploaded Profile"
            style={{
              width: '200px',
              height: '200px',
              objectFit: 'cover',
              borderRadius: '8px',
              border: '1px solid #ddd',
            }}
          />
        </div>
      )}

      {/* Input file tersembunyi */}
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />

      {/* Tombol Pilih Foto */}
      <button
        type="button"
        onClick={() => fileInputRef.current.click()}
        style={{
          padding: '10px 24px',
          background: 'linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)',
          color: '#fff',
          fontWeight: 'bold',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer',
          boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
          transition: 'transform 0.2s ease',
        }}
        onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
        onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')}
      >
        📷 Pilih Foto
      </button>

      {/* Preview foto yang akan di-upload */}
      <div style={{ marginTop: '1rem' }}>
        <strong>Preview:</strong>
        <br />
        <img
          src={
            photo
              ? typeof photo === 'string'
                ? photo
                : URL.createObjectURL(photo)
              : 'https://cdn-icons-png.flaticon.com/512/149/149071.png'
          }
          alt="Preview"
          style={{
            width: '100%',
            maxWidth: '200px',
            marginTop: '0.5rem',
            borderRadius: '8px',
            objectFit: 'cover',
            border: '1px solid #ddd',
          }}
        />
      </div>

      {/* Tombol Update Profil */}
      <button
        onClick={handleSubmit}
        style={{
          marginTop: '1rem',
          padding: '10px 24px',
          background: 'linear-gradient(135deg, #00b09b 0%, #96c93d 100%)',
          color: '#fff',
          fontWeight: 'bold',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer',
          boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
          transition: 'transform 0.2s ease',
        }}
        onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
        onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')}
      >
        ✅ Update Profil
      </button>
    </div>
  );
}

export default ProfilUpload;
