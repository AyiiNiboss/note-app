const formatDate = (dateString) => {
    // Membuat objek Date dari string tanggal
    const date = new Date(dateString);
  
    // Daftar nama bulan dalam bahasa Indonesia
    const months = [
      "Januari", "Februari", "Maret", "April", "Mei", "Juni",
      "Juli", "Agustus", "September", "Oktober", "November", "Desember"
    ];
  
    // Mengambil tanggal, bulan, dan tahun dari objek Date
    const day = date.getDate();
    const monthIndex = date.getMonth();
    const year = date.getFullYear();
  
    // Menggabungkan tanggal, nama bulan, dan tahun ke dalam format yang diinginkan
    const formattedDate = `${day} ${months[monthIndex]} ${year}`;
  
    return formattedDate;
  };

export default formatDate