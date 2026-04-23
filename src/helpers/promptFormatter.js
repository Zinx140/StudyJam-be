const promptFormatter = (jsonData) => {
  const daftarBerita = jsonData;

  const teksBerita = daftarBerita
    .map((item, index) => {
      return `${index + 1}. Judul: ${item.headline}
        Penulis: ${item.User?.username || item.Users?.username || "-"}
        Isi: ${item.content}`;
    })
    .join("\n\n");

  const promptFinal = `
        Anda adalah asisten editor berita yang cerdas. 
        Saya akan memberikan beberapa data berita di bawah ini. 
        Tolong buatkan rangkuman eksekutif dalam Bahasa Indonesia yang mencakup:
        - Inti dari setiap berita (1-2 kalimat per berita).
        - Sebutkan siapa penulisnya (author).
        - Berikan satu kesimpulan umum tentang tren berita ini.

        DATA BERITA:
        ${teksBerita}

        Hasil Rangkuman:
`.trim();

  return promptFinal;
};

module.exports = promptFormatter;
