-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 23, 2026 at 01:56 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

DROP DATABASE IF EXISTS `be_studyjam`;
CREATE DATABASE `be_studyjam`;
USE `be_studyjam`;

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `be_studyjam`
--

-- --------------------------------------------------------

--
-- Table structure for table `news`
--

CREATE TABLE `news` (
  `news_id` int(11) NOT NULL,
  `headline` varchar(255) NOT NULL,
  `content` text NOT NULL,
  `author_id` int(10) UNSIGNED NOT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `deletedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `news`
--

INSERT INTO `news` (`news_id`, `headline`, `content`, `author_id`, `createdAt`, `updatedAt`, `deletedAt`) VALUES
(1, 'Pertumbuhan Startup AI di Jakarta Meningkat Pesat', 'Jakarta menjadi pusat inovasi teknologi di Asia Tenggara dengan munculnya berbagai startup yang fokus pada pengembangan kecerdasan buatan untuk sektor logistik.', 1, NOW(), NOW(), NULL),
(2, 'Pemerintah Resmikan Proyek Energi Terbarukan di Sulawesi', 'Proyek pembangkit listrik tenaga surya terbesar di Sulawesi resmi beroperasi hari ini, diharapkan mampu melistriki lebih dari 10.000 rumah.', 1, NOW(), NOW(), NULL),
(3, 'Tips Menjaga Kesehatan Mental di Era Digital', 'Para ahli menyarankan untuk melakukan digital detox setidaknya satu jam sebelum tidur guna menjaga kualitas istirahat dan kesehatan mental.', 1, NOW(), NOW(), NULL),
(4, 'Timnas Indonesia Raih Kemenangan Gemilang di Kualifikasi Dunia', 'Dengan skor tipis 1-0, Timnas Indonesia berhasil mengamankan poin penuh dalam laga tandang yang sangat sengit malam tadi.', 1, NOW(), NOW(), NULL),
(5, 'Resep Kuliner Nusantara yang Mendunia', 'Rendang kembali dinobatkan sebagai salah satu makanan terenak di dunia versi survei terbaru, membuktikan kekuatan rasa bumbu tradisional.', 1, NOW(), NOW(), NULL),
(6, 'Teknologi 6G Mulai Diuji Coba di Laboratorium Nasional', 'Meskipun 5G belum merata, pengembangan teknologi 6G sudah dimulai dengan kecepatan transmisi data yang diklaim 100 kali lebih cepat.', 1, NOW(), NOW(), NULL),
(7, 'Harga Pangan Stabil Menjelang Hari Raya', 'Menteri Perdagangan memastikan stok beras dan bahan pokok lainnya aman sehingga harga di pasar tradisional tetap stabil.', 1, NOW(), NOW(), NULL),
(8, 'Fenomena Alam Langka: Gerhana Matahari Cincin Terlihat di Kalimantan', 'Warga Kalimantan berkesempatan menyaksikan fenomena astronomi langka siang ini dengan peralatan pelindung mata yang memadai.', 1, NOW(), NOW(), NULL),
(9, 'Inovasi Mobil Listrik Buatan Mahasiswa Lokal', 'Sekelompok mahasiswa teknik berhasil menciptakan mobil listrik hemat energi yang mampu menempuh jarak 200km dalam sekali pengisian daya.', 1, NOW(), NOW(), NULL),
(10, 'Pariwisata Bali Kembali Pulih Sepenuhnya', 'Tingkat okupansi hotel di Bali mencapai angka tertinggi sejak tahun 2019, menandakan pulihnya sektor pariwisata secara total.', 1, NOW(), NOW(), NULL);

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `role_id` int(11) NOT NULL,
  `role_name` varchar(255) NOT NULL,
  `permissions` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`role_id`, `role_name`, `permissions`) VALUES
(1, 'user', '\"[{\\\"moduleName\\\":\\\"user\\\",\\\"permissions\\\":[\\\"get\\\"]},{\\\"moduleName\\\":\\\"news\\\",\\\"permissions\\\":[\\\"get\\\"]},{\\\"moduleName\\\":\\\"api\\\",\\\"permissions\\\":[\\\"get\\\",\\\"post\\\"]}]\"'),
(2, 'reporter', '\"[{\\\"moduleName\\\":\\\"user\\\",\\\"permissions\\\":[\\\"get\\\"]},{\\\"moduleName\\\":\\\"news\\\",\\\"permissions\\\":[\\\"get\\\",\\\"post\\\",\\\"put\\\",\\\"delete\\\"]},{\\\"moduleName\\\":\\\"api\\\",\\\"permissions\\\":[\\\"get\\\",\\\"post\\\"]}]\"'),
(3, 'admin', '\"[{\\\"moduleName\\\":\\\"user\\\",\\\"permissions\\\":[\\\"get\\\",\\\"post\\\",\\\"put\\\",\\\"delete\\\"]},{\\\"moduleName\\\":\\\"news\\\",\\\"permissions\\\":[\\\"get\\\",\\\"post\\\",\\\"put\\\",\\\"delete\\\"]},{\\\"moduleName\\\":\\\"api\\\",\\\"permissions\\\":[\\\"get\\\",\\\"post\\\"]}]\"');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` int(10) UNSIGNED NOT NULL,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role_id` int(11) NOT NULL DEFAULT 1,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `deletedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `username`, `email`, `password`, `role_id`, `createdAt`, `updatedAt`, `deletedAt`) VALUES
(1, 'admin', 'admin@gmail.com', '$2b$10$DVZOVeUknXRnHUc8nY4xjugYcgLxK/ZCDx3X3quNDO.CAJQrgu7gS', 3, '2026-04-23 07:25:28', '2026-04-23 11:38:05', NULL);
--
-- Indexes for dumped tables
--

--
-- Indexes for table `news`
--
ALTER TABLE `news`
  ADD PRIMARY KEY (`news_id`),
  ADD KEY `user_news` (`author_id`);

--
-- Indexes for table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`role_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`),
  ADD KEY `user_role` (`role_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `news`
--
ALTER TABLE `news`
  MODIFY `news_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;

--
-- AUTO_INCREMENT for table `roles`
--
ALTER TABLE `roles`
  MODIFY `role_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `news`
--
ALTER TABLE `news`
  ADD CONSTRAINT `user_news` FOREIGN KEY (`author_id`) REFERENCES `users` (`user_id`);

--
-- Constraints for table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `user_role` FOREIGN KEY (`role_id`) REFERENCES `roles` (`role_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
