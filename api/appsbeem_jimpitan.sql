-- phpMyAdmin SQL Dump
-- version 5.2.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Aug 19, 2025 at 02:45 PM
-- Server version: 10.6.21-MariaDB-log
-- PHP Version: 8.3.19

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `appsbeem_jimpitan`
--

-- --------------------------------------------------------

--
-- Table structure for table `devices`
--

CREATE TABLE `devices` (
  `id` int(11) NOT NULL,
  `user_id` varchar(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `device_id` varchar(100) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `devices`
--

INSERT INTO `devices` (`id`, `user_id`, `name`, `device_id`, `created_at`) VALUES
(27, 'USER033', 'Adi Hermawan', 'c168f961-cd57-433b-9ae8-49de5f115f6d', '2025-06-18 03:45:27'),
(28, 'USER033', 'Adi Hermawan', '50c2115b-03ce-4c09-84a4-1598f644ee74', '2025-06-18 03:48:30'),
(32, 'USER037', 'Doni Abiyantoro', '85926f9f-77d1-493c-bd06-745967d3550d', '2025-06-18 10:05:11'),
(33, 'USER037', 'Doni Abiyantoro', '7160eb97-3246-4849-a5a4-e64db8288fcf', '2025-06-19 10:56:17');

-- --------------------------------------------------------

--
-- Table structure for table `kas_sub`
--

CREATE TABLE `kas_sub` (
  `id_trx` int(11) NOT NULL,
  `coa_code` varchar(20) NOT NULL,
  `date_trx` date NOT NULL,
  `desc_trx` varchar(50) NOT NULL,
  `reff` varchar(5) NOT NULL,
  `debet` int(11) NOT NULL,
  `kredit` int(11) NOT NULL,
  `timestamp` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Table structure for table `kas_umum`
--

CREATE TABLE `kas_umum` (
  `id_trx` int(11) NOT NULL,
  `coa_code` varchar(20) NOT NULL,
  `date_trx` date NOT NULL,
  `desc_trx` varchar(50) NOT NULL,
  `reff` varchar(5) NOT NULL,
  `debet` int(11) NOT NULL,
  `kredit` int(11) NOT NULL,
  `timestamp` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Table structure for table `master_kk`
--

CREATE TABLE `master_kk` (
  `id` int(11) NOT NULL,
  `code_id` varchar(20) NOT NULL,
  `nokk` varchar(50) NOT NULL,
  `kk_name` varchar(100) NOT NULL,
  `system_date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `master_kk`
--

INSERT INTO `master_kk` (`id`, `code_id`, `nokk`, `kk_name`, `system_date`) VALUES
(1, 'RT0700001', '3373032302110002', 'Adi Hermany', '2025-06-25 09:54:32'),
(2, 'RT0700002', '3373030202080287', 'Agus Purwanto', '2025-06-25 10:00:03'),
(3, 'RT0700003', '3373033101082099', 'Agus Sulistyo', '2025-06-25 10:02:55'),
(4, 'RT0700004', '3373032002180001', 'Agus Puji Raharjo', '2025-06-25 09:57:00'),
(5, 'RT0700005', '3373031507220001', 'Alfian Syafii', '2025-06-25 10:49:22'),
(6, 'RT0700006', '3373030212130004', 'Andi Setiyono', '2025-06-25 10:15:45'),
(7, 'RT0700007', '3373033012080009', 'Andri Purwoko', '2025-06-25 10:25:42'),
(8, 'RT0700009', '3373030209090008', 'Ari Priyambudi', '2025-06-25 10:26:06'),
(9, 'RT0700010', '3373032709170002', 'Ari Syafroni', '2025-06-25 10:26:21'),
(10, 'RT0700011', '3373033101083384', 'Didik Yahyono Purwo', '2025-06-25 10:26:39'),
(11, 'RT0700012', '3373032206090056', 'Dimas Wisnu Cahyadi', '2025-06-25 10:26:54'),
(12, 'RT0700013', '3373030310090005', 'Doni Abiyantoro', '2025-06-25 07:19:20'),
(13, 'RT0700014', '3373031405100005', 'Eny Sri Hartini', '2025-06-25 10:27:36'),
(14, 'RT0700016', '3373031111150003', 'Hermawan Setyo Adi', '2025-06-25 10:28:25'),
(15, 'RT0700017', '3373033012210003', 'Heru Setiawan', '2025-06-25 10:29:10'),
(16, 'RT0700018', '3373030102080815', 'Heru Sulistiyono', '2025-06-25 10:29:36'),
(17, 'RT0700019', '3373030102081033', 'Ignatius Loyola Sutarto', '2025-06-25 10:37:00'),
(18, 'RT0700020', '3373032810090013', 'Imanuel Susanto', '2025-06-25 10:46:28'),
(19, 'RT0700021', '3373030712230005', 'Indra Sriyanto', '2025-06-25 10:47:08'),
(20, 'RT0700022', '3373030102083592', 'Jafar Sodiq', '2025-06-25 10:49:43'),
(21, 'RT0700023', '3373031608230003', 'Jariyah', '2025-06-25 10:50:03'),
(22, 'RT0700024', '3373031612100001', 'Johanes Marjuki', '2025-06-25 10:50:13'),
(23, 'RT0700025', '3373030608100002', 'Jumadi', '2025-06-25 10:50:29'),
(24, 'RT0700026', '3373032811080009', 'Kadarismanto', '2025-06-25 10:50:49'),
(25, 'RT0700027', '3373032702090001', 'Marno (Ramini)', '2025-06-25 10:54:04'),
(26, 'RT0700028', '3373032504120001', 'Marno (Mariyana)', '2025-06-25 10:54:15'),
(27, 'RT0700029', '3374021512050462', 'Marsudi', '2025-06-25 10:58:02'),
(28, 'RT0700030', '3373030502090009', 'Mistriyanto', '2025-06-25 10:58:14'),
(29, 'RT0700032', '3373032808090001', 'Muljadi Hardono', '2025-06-25 10:58:23'),
(30, 'RT0700033', '3373032206170007', 'Nanang Setyo Wibowo', '2025-06-25 10:58:32'),
(31, 'RT0700034', '3373030102084678', 'Nari Haryo Sadono', '2025-06-25 10:58:41'),
(32, 'RT0700035', '3373033005170006', 'Oki Hermawan', '2025-06-25 10:58:49'),
(33, 'RT0700036', '3373032612190001', 'Ponco Yulianto', '2025-06-25 10:58:58'),
(35, 'RT0700038', '3373042602180002', 'Ristanto Adi Nugroho', '2025-06-25 10:59:27'),
(36, 'RT0700039', '3373033101080289', 'Rudiyono', '2025-06-25 10:59:48'),
(37, 'RT0700040', '3373031612140004', 'Rudjito', '2025-06-25 10:59:57'),
(38, 'RT0700041', '3373033101081668', 'Sarno', '2025-06-25 11:00:07'),
(39, 'RT0700042', '3373032305170005', 'Sigit Hermawan', '2025-06-25 11:00:17'),
(40, 'RT0700043', '3373031404100008', 'Slamet Istianto', '2025-06-25 11:00:27'),
(41, 'RT0700044', '3373033101082252', 'Sri Rohyati', '2025-06-25 11:00:38'),
(42, 'RT0700046', '3373031812100014', 'Supriyadi', '2025-06-25 11:09:25'),
(43, 'RT0700047', '3373033101083367', 'Suryantoro', '2025-06-25 11:09:35'),
(44, 'RT0700048', '3373031512100013', 'Suyatmi', '2025-06-25 11:09:47'),
(45, 'RT0700049', '3373033009240004', 'Tatik Rahayu', '2025-06-25 11:09:57'),
(46, 'RT0700050', '3373032211170001', 'Tomas Kristianto', '2025-06-25 11:10:06'),
(47, 'RT0700051', '3373032903170004', 'Tri September Rini', '2025-06-25 11:10:16'),
(48, 'RT0700052', '3373030102083345', 'Tri Warsono', '2025-06-25 11:10:30'),
(49, 'RT0700053', '3373030601200002', 'Triyono', '2025-06-25 11:10:39'),
(50, 'RT0700054', '3373030010208183', 'Tukijan Siswo Andoyo', '2025-06-25 11:10:49'),
(51, 'RT0700055', '3373030102083090', 'Tukirin', '2025-06-25 11:10:59'),
(52, 'RT0700056', '3373030507220001', 'Wahyu Wijayanto', '2025-06-25 11:11:08'),
(53, 'RT0700057', '3373031509150003', 'Yonathan Christianto', '2025-06-25 11:11:19'),
(54, 'RT0700058', '3373032810090017', 'Yoseph Mareta Dwiyono Pamujianto', '2025-06-25 11:11:35'),
(55, 'RT0700059', '3373041303240006', 'Rivaldo Armando Bekabel', '2025-06-25 11:11:51'),
(56, 'RT0700060', '3373032509240002', 'Supriyati Yoyok', '2025-06-25 11:12:52'),
(57, 'RT0700061', '3373032911210002', 'Sunarti', '2025-06-25 11:13:01'),
(58, 'RT0700063', '3373031307210003', 'Dyah Kusmiyaningrum', '2025-06-25 10:27:21'),
(59, 'RT0700064', '3373032003170002', 'Tri Hartini Bu Diro', '2025-06-25 15:20:30'),
(60, 'RT0700065', '3373031610200002', 'Sutiyem', '2025-06-25 11:13:23'),
(61, 'RT0700066', '3373031312130001', 'Ety Prasetyoningsih', '2025-06-25 10:28:02'),
(62, 'RT0700067', '3373031309230002', 'Sutini', '2025-06-25 11:13:33'),
(65, 'RT0700015', '3322063008086801', 'Supardjo', '2025-06-25 16:29:20');

-- --------------------------------------------------------

--
-- Table structure for table `report`
--

CREATE TABLE `report` (
  `id` int(11) NOT NULL,
  `report_id` varchar(20) NOT NULL,
  `jimpitan_date` date NOT NULL,
  `nominal` decimal(10,0) NOT NULL,
  `collector` varchar(100) NOT NULL,
  `kode_u` varchar(10) NOT NULL,
  `nama_u` varchar(100) NOT NULL,
  `scan_time` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `alasan` text NOT NULL DEFAULT '\'-\''
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `report`
--

INSERT INTO `report` (`id`, `report_id`, `jimpitan_date`, `nominal`, `collector`, `kode_u`, `nama_u`, `scan_time`, `alasan`) VALUES
(80, 'RT0700002', '2024-11-15', 500, 'doni', 'USER037', 'Doni Abiyantoro', '2025-03-13 15:15:52', '-'),
(81, 'RT0700023', '2024-11-22', 500, 'adiher', 'USER033', 'Adi Hermawan', '2025-03-13 15:15:52', '-'),
(82, 'RT0700016', '2024-11-22', 500, 'adiher', 'USER033', 'Adi Hermawan', '2025-03-13 15:15:52', '-'),
(84, 'RT0700053', '2024-11-22', 500, 'adiher', 'USER033', 'Adi Hermawan', '2025-03-13 15:15:52', '-'),
(85, 'RT0700040', '2024-11-22', 500, 'adiher', 'USER033', 'Adi Hermawan', '2025-03-13 15:15:52', '-'),
(86, 'RT0700005', '2024-11-22', 500, 'adiher', 'USER033', 'Adi Hermawan', '2025-03-13 15:15:52', '-'),
(88, 'RT0700057', '2024-11-22', 500, 'adiher', 'USER033', 'Adi Hermawan', '2025-03-13 15:15:52', '-'),
(89, 'RT0700061', '2024-11-22', 500, 'adiher', 'USER033', 'Adi Hermawan', '2025-03-13 15:15:52', '-'),
(91, 'RT0700034', '2024-11-22', 500, 'adiher', 'USER033', 'Adi Hermawan', '2025-03-13 15:15:52', '-'),
(92, 'RT0700007', '2024-11-22', 500, 'adiher', 'USER033', 'Adi Hermawan', '2025-03-13 15:15:52', '-'),
(93, 'RT0700043', '2024-11-22', 500, 'adiher', 'USER033', 'Adi Hermawan', '2025-03-13 15:15:52', '-'),
(94, 'RT0700024', '2024-11-22', 500, 'adiher', 'USER033', 'Adi Hermawan', '2025-03-13 15:15:52', '-'),
(95, 'RT0700052', '2024-11-22', 500, 'adiher', 'USER033', 'Adi Hermawan', '2025-03-13 15:15:52', '-'),
(96, 'RT0700044', '2024-11-22', 500, 'adiher', 'USER033', 'Adi Hermawan', '2025-03-13 15:15:52', '-'),
(97, 'RT0700006', '2024-11-22', 500, 'adiher', 'USER033', 'Adi Hermawan', '2025-03-13 15:15:52', '-'),
(98, 'RT0700059', '2024-11-22', 500, 'adiher', 'USER033', 'Adi Hermawan', '2025-03-13 15:15:52', '-'),
(99, 'RT0700025', '2024-11-22', 500, 'adiher', 'USER033', 'Adi Hermawan', '2025-03-13 15:15:52', '-'),
(100, 'RT0700033', '2024-11-22', 500, 'adiher', 'USER033', 'Adi Hermawan', '2025-03-13 15:15:52', '-'),

-- --------------------------------------------------------

--
-- Table structure for table `tb_barang`
--

CREATE TABLE `tb_barang` (
  `kode` int(11) NOT NULL,
  `kode_brg` varchar(50) NOT NULL,
  `nama` varchar(100) NOT NULL,
  `jumlah` int(11) NOT NULL,
  `tanggal` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `tb_barang`
--

INSERT INTO `tb_barang` (`kode`, `kode_brg`, `nama`, `jumlah`, `tanggal`) VALUES
(1, 'CDK00001', 'Cendok Makan', 250, '2025-02-14 05:43:43'),
(2, 'GRP00001', 'Garpu Makan', 300, '2025-02-14 05:43:43'),
(4, 'CDK00002', 'Cendok Teh (Kecil)', 150, '2025-06-22 13:02:54');

-- --------------------------------------------------------

--
-- Table structure for table `tb_botmenu`
--

CREATE TABLE `tb_botmenu` (
  `id` int(11) NOT NULL,
  `parent_id` int(11) DEFAULT NULL,
  `keyword` varchar(10) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `url` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `tb_botmenu`
--

INSERT INTO `tb_botmenu` (`id`, `parent_id`, `keyword`, `description`, `url`) VALUES
(1, NULL, '1', 'Data Kepala Keluarga', 'http://botwa.appsbee.my.id/api/ambil_data_kk.php'),
(2, NULL, '2', 'Jadwal jaga hari ini', 'http://botwa.appsbee.my.id/api/ambil_data_jaga.php'),
(3, NULL, '3', 'Semua Jadwal Jaga', NULL),
(4, NULL, '4', 'Laporan', ''),
(5, 3, '31', 'Senin', 'http://botwa.appsbee.my.id/api/ambil_data_jaga_semua.php?hari=Monday'),
(6, 3, '32', 'Selasa', 'http://botwa.appsbee.my.id/api/ambil_data_jaga_semua.php?hari=Tuesday'),
(7, 3, '33', 'Rabu', 'http://botwa.appsbee.my.id/api/ambil_data_jaga_semua.php?hari=Wednesday'),
(8, 3, '34', 'Kamis', 'http://botwa.appsbee.my.id/api/ambil_data_jaga_semua.php?hari=Thursday'),
(9, 3, '35', 'Jumat', 'http://botwa.appsbee.my.id/api/ambil_data_jaga_semua.php?hari=Friday'),
(10, 3, '36', 'Sabtu', 'http://botwa.appsbee.my.id/api/ambil_data_jaga_semua.php?hari=Saturday'),
(11, 3, '37', 'Minggu', 'http://botwa.appsbee.my.id/api/ambil_data_jaga_semua.php?hari=Sunday'),
(13, 4, '41', 'Laporan jimpitan semalam', 'http://botwa.appsbee.my.id/api/ambil_data_jimpitan.php'),
(14, 4, '42', 'Laporan lain', 'Masih dalam pengembangan'),
(18, NULL, '5', 'Informasi lain', 'Masih dalam pengembangan');

-- --------------------------------------------------------

--
-- Table structure for table `tb_dashboard_menu`
--

CREATE TABLE `tb_dashboard_menu` (
  `id` int(11) NOT NULL,
  `title` varchar(100) DEFAULT NULL,
  `icon` varchar(50) DEFAULT NULL,
  `url` varchar(100) DEFAULT NULL,
  `urutan` int(11) DEFAULT 0,
  `role` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `tb_dashboard_menu`
--

INSERT INTO `tb_dashboard_menu` (`id`, `title`, `icon`, `url`, `urutan`, `role`) VALUES
(1, 'Dashboard', 'bxs-home', 'index.php', 1, 'pengurus,admin,s_admin'),
(2, 'Jadwal Jaga', 'bxs-calendar', 'jadwal.php', 2, 'admin,s_admin'),
(3, 'Kepala Keluarga', 'bxs-group', 'kk.php', 3, 'pengurus,admin,s_admin'),
(4, 'Inventaris', 'bxs-box', 'inventaris.php', 4, 'pengurus,admin,s_admin'),
(5, 'Report', 'bxs-report', 'report.php', 5, 'admin,s_admin'),
(6, 'Keuangan', 'bxs-wallet', 'keuangan.php', 6, 'pengurus,admin,s_admin'),
(7, 'Settings', 'bxs-cog', 'setting.php', 21, 'pengurus,admin,s_admin'),
(8, 'Menu Dashboard', 'bxs-dashboard', 'menu-manage.php', 24, 's_admin'),
(9, 'Menu Bot', 'bxs-message', 'bot_menu.php', 23, 's_admin'),
(10, 'Profile', 'bxs-lock', 'profile.php', 31, 'admin,s_admin'),
(11, 'Logout', 'bxs-log-out-circle', 'logout.php', 99, 'pengurus,admin,s_admin'),
(12, 'Data Warga', 'bx-user-pin', 'warga.php', 7, 'pengurus,admin,s_admin'),
(14, 'Tarif Iuran', 'bx-money', 'tarif.php', 22, 's_admin'),
(15, 'Setting Menu HP', 'bx-wrench', 'setting_menu.php', 25, 's_admin'),
(16, 'Iuran Warga', 'bx-money', 'iuran.php', 8, 'pengurus,admin,s_admin');

-- --------------------------------------------------------

--
-- Table structure for table `tb_iuran`
--

CREATE TABLE `tb_iuran` (
  `id_iuran` int(11) NOT NULL,
  `kode_tarif` varchar(20) NOT NULL,
  `nikk` varchar(20) NOT NULL,
  `jenis_iuran` enum('wajib','sosial','17an','merti') NOT NULL,
  `bulan` varchar(10) NOT NULL,
  `tahun` int(11) NOT NULL,
  `jumlah` int(11) NOT NULL,
  `jml_bayar` int(11) NOT NULL,
  `status` enum('Lunas','Belum') DEFAULT 'Belum',
  `tgl_bayar` datetime NOT NULL,
  `keterangan` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `tb_iuran`
--

INSERT INTO `tb_iuran` (`id_iuran`, `kode_tarif`, `nikk`, `jenis_iuran`, `bulan`, `tahun`, `jumlah`, `jml_bayar`, `status`, `tgl_bayar`, `keterangan`, `created_at`) VALUES
(16, 'TR002', '3373032302110002', 'wajib', 'Januari', 2025, 5000, 5000, '', '2025-06-28 17:39:07', '', '2025-06-28 10:39:07'),
(24, 'TR002', '3373032302110002', 'wajib', 'Februari', 2025, 5000, 2000, '', '2025-06-28 17:57:05', '', '2025-06-28 10:57:05'),
(29, 'TR002', '3373032302110002', 'wajib', 'Maret', 2025, 5000, 2000, '', '2025-05-28 18:18:10', '', '2025-06-28 11:18:10'),
(37, 'TR003', '3373032302110002', 'wajib', 'Januari', 2025, 5000, 1000, '', '2025-06-28 23:14:08', '', '2025-06-28 16:14:08'),
(40, 'TR003', '3373032302110002', 'wajib', 'Januari', 2025, 5000, 2000, '', '2025-06-28 23:15:31', '', '2025-06-28 16:15:31'),
(44, 'TR003', '3373032302110002', 'wajib', 'Maret', 2025, 5000, 5000, '', '2025-06-28 23:18:41', '', '2025-06-28 16:18:41'),
(46, 'TR003', '3373032002180001', 'wajib', 'Januari', 2025, 5000, 1000, '', '2025-06-29 01:44:40', '', '2025-06-28 18:44:40'),
(49, 'TR003', '3373032002180001', 'wajib', 'Januari', 2025, 5000, 2000, '', '2025-06-29 01:45:36', '', '2025-06-28 18:45:36'),
(55, 'TR002', '3373032002180001', 'wajib', 'Januari', 2025, 5000, 5000, '', '2025-06-29 02:02:48', '', '2025-06-28 19:02:48'),
(57, 'TR002', '3373032302110002', 'wajib', 'Februari', 2025, 5000, 1000, '', '2025-06-29 10:38:08', '', '2025-06-29 03:38:08'),
(60, 'TR003', '3373032302110002', 'wajib', 'Februari', 2025, 5000, 1000, '', '2025-06-29 15:55:05', '', '2025-06-29 08:55:05'),
(63, 'TR004', '3373032302110002', 'wajib', 'Tahunan', 2025, 50000, 30000, '', '2025-06-29 17:36:36', '', '2025-06-29 10:36:36'),
(65, 'TR002', '3373032302110002', 'wajib', 'Maret', 2025, 5000, 3000, '', '2025-06-29 17:58:37', '', '2025-06-29 10:58:37'),
(67, 'TR005', '3373032302110002', 'wajib', 'Tahunan', 2025, 35000, 35000, '', '2025-06-29 22:21:47', '', '2025-06-29 15:21:47'),
(68, 'TR003', '3373032302110002', 'wajib', 'Januari', 2025, 5000, 2000, '', '2025-06-30 07:18:09', '', '2025-06-30 00:18:09'),
(69, 'TR002', '3373032302110002', 'wajib', 'April', 2025, 5000, 5000, '', '2025-06-30 18:10:36', '', '2025-06-30 11:10:36'),
(70, 'TR004', '3373032002180001', 'wajib', 'Tahunan', 2025, 50000, 50000, '', '2025-06-30 18:11:32', '', '2025-06-30 11:11:32'),
(74, 'TR002', '3373032302110002', 'wajib', 'Februari', 2025, 5000, 2000, '', '2025-07-02 07:44:33', '', '2025-07-02 00:44:33'),
(75, 'TR003', '3373032302110002', 'wajib', 'April', 2025, 5000, 5000, '', '2025-07-02 07:45:52', '', '2025-07-02 00:45:52'),
(76, 'TR004', '3373030202080287', 'wajib', 'Tahunan', 2025, 50000, 10000, '', '2025-07-02 07:46:20', '', '2025-07-02 00:46:20'),
(77, 'TR005', '3373032002180001', 'wajib', 'Tahunan', 2025, 35000, 35000, '', '2025-07-02 07:46:36', '', '2025-07-02 00:46:36'),
(80, 'TR006', '3373032302110002', 'wajib', 'Selamanya', 2025, 25000, 25000, '', '2025-07-02 08:17:45', '', '2025-07-02 01:17:45'),
(81, 'TR006', '3373032002180001', 'wajib', 'Selamanya', 2025, 25000, 15000, '', '2025-07-02 08:24:44', '', '2025-07-02 01:24:44'),
(82, 'TR006', '3373032002180001', 'wajib', 'Selamanya', 2025, 25000, 10000, '', '2025-07-02 10:46:33', '', '2025-07-02 03:46:33'),
(83, 'TR002', '3373032302110002', 'wajib', 'Mei', 2025, 5000, 5000, '', '2025-07-02 16:22:32', '', '2025-07-02 09:22:32');

-- --------------------------------------------------------

--
-- Table structure for table `tb_konfigurasi`
--

CREATE TABLE `tb_konfigurasi` (
  `id` int(11) NOT NULL,
  `group` varchar(50) NOT NULL,
  `nama` varchar(100) NOT NULL,
  `value` text NOT NULL,
  `keterangan` text DEFAULT NULL,
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `tb_konfigurasi`
--

INSERT INTO `tb_konfigurasi` (`id`, `group`, `nama`, `value`, `keterangan`, `updated_at`) VALUES
(1, 'File Report', 'report1', 'ambil_data_jimpitan.php', 'Nama file PHP yang menghasilkan isi pesan laporan jimpitan semalam', '2025-06-13 07:05:39'),
(2, 'Group ID', 'group_id1', '6285729705810-1505093181@g.us', 'ID Grup WhatsApp Warga RT.07', '2025-06-13 08:19:15'),
(3, 'Url API', 'api_url_group', 'https://rt07.appsbee.my.id/api/send_wa_group.php', 'URL endpoint API WA', '2025-06-13 07:04:53'),
(4, 'Sessions ID', 'session_id', 'f85c44c05e514007aeed9f0d232dcf32', 'Session ID untuk autentikasi API', '2025-08-08 03:08:15'),
(5, 'File Report', 'report2', 'ambil_data_jaga.php', 'Nama file PHP yang menghasilkan isi pesan jadwal jaga hari ini', '2025-06-13 07:05:51'),
(6, 'Group ID', 'group_id2', '120363398680818900@g.us', 'ID Grup WhatsApp Group Q', '2025-06-13 08:19:27'),
(7, 'Group ID', 'group_id3', '6285729705810-1505093181@g.us', NULL, '2025-06-26 17:08:46'),
(8, 'File Report', 'report3', 'ambil_data_ultah.php', NULL, '2025-06-21 16:45:25'),
(9, 'File Report', 'report4', '-', NULL, '2025-06-13 07:05:58'),
(10, 'File Report', 'report5', '-', NULL, '2025-06-13 07:06:00'),
(11, 'Url API', 'api_url_phone', 'https://rt07.appsbee.my.id/api/send_wa.php', 'URL endpoint API WA', '2025-06-13 07:05:08'),
(12, 'Url API', 'url_group', 'https://botwa.appsbee.my.id/send-group-message', 'API WA untuk group', '2025-07-31 04:14:43'),
(13, 'Url API', 'url_phone', 'https://botwa.appsbee.my.id/send-message', 'API WA untuk phone', '2025-07-31 04:14:43');

-- --------------------------------------------------------

--
-- Table structure for table `tb_menu`
--

CREATE TABLE `tb_menu` (
  `kode` int(11) NOT NULL,
  `nama` varchar(50) NOT NULL,
  `alamat_url` varchar(500) NOT NULL,
  `ikon` varchar(100) NOT NULL,
  `tanggal` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `status` int(11) NOT NULL,
  `pengurus` int(5) NOT NULL DEFAULT 0,
  `admin` int(11) NOT NULL,
  `s_admin` int(11) NOT NULL,
  `warga` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `tb_menu`
--

INSERT INTO `tb_menu` (`kode`, `nama`, `alamat_url`, `ikon`, `tanggal`, `status`, `pengurus`, `admin`, `s_admin`, `warga`) VALUES
(1, 'Jadwal Jaga', 'jadwal', 'calendar-outline', '2025-05-30 17:03:37', 1, 1, 1, 1, 1),
(2, 'Data KK', 'kk', 'people-outline', '2025-05-30 17:03:48', 1, 1, 1, 1, 1),
(3, 'Laporan Jimpitan', 'jimpitan', 'cash-outline', '2025-05-30 17:04:00', 1, 1, 1, 1, 1),
(4, 'Iuran Wajib', 'wajib', 'wallet-outline', '2025-07-03 08:17:05', 0, 0, 0, 1, 0),
(5, 'Iuran Sosial', 'sosial', 'heart-outline', '2025-05-23 03:54:43', 0, 0, 0, 1, 0),
(6, 'Iuran 17an', '17an', 'list-outline', '2025-05-23 03:54:58', 0, 0, 0, 1, 0),
(7, 'Inventori Barang', 'barang', 'construct-outline', '2025-05-30 17:04:20', 1, 1, 1, 1, 1),
(9, 'Rekor Scan', 'rekor_scan', 'trophy', '2025-05-30 17:04:29', 1, 1, 1, 1, 0),
(10, 'Scan Hari Ini', 'detail_scan2', 'scan-outline', '2025-05-30 17:04:53', 1, 1, 1, 1, 0),
(11, 'Pendapatan Jimpitan', 'pdpt_jimpitan', 'cash-outline', '2025-05-30 17:05:05', 1, 1, 1, 1, 1),
(12, 'Detail Jadwal', 'detail_jadwal', 'time-outline', '2025-05-23 04:01:23', 0, 0, 0, 1, 0),
(13, 'Pesan Group', 'pesan_group', 'chatbox-ellipses-outline', '2025-05-23 08:50:12', 0, 0, 1, 1, 0),
(14, 'Jimpitan Manual', 'jimpitan_manual', 'save-outline', '2025-05-25 14:08:00', 0, 0, 1, 1, 0),
(15, 'KK Belum Discan', 'detail_belum_scan', 'scan-outline', '2025-06-23 14:45:16', 0, 0, 1, 1, 0),
(16, 'Iuran Warga', 'iuran_hp', 'cash-outline', '2025-06-29 04:27:26', 0, 1, 1, 1, 0);

-- --------------------------------------------------------

--
-- Table structure for table `tb_profil`
--

CREATE TABLE `tb_profil` (
  `kode` int(11) NOT NULL DEFAULT 1,
  `nama` varchar(50) DEFAULT NULL,
  `alamat` mediumtext DEFAULT NULL,
  `cp` varchar(100) NOT NULL,
  `hp` varchar(50) DEFAULT NULL,
  `logo` varchar(100) DEFAULT NULL,
  `gambar` varchar(100) DEFAULT NULL,
  `catatan` longtext DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `tb_profil`
--

INSERT INTO `tb_profil` (`kode`, `nama`, `alamat`, `cp`, `hp`, `logo`, `gambar`, `catatan`) VALUES
(1, 'Jimpitan', 'Randuares RT.07 RW.01 Kumpulrejo, Kec. Argomulyo Salatiga 50734', 'Hermawan Setyo Adi', '085786740013', 'jimpitan.png', 'walqr.jpg', 'Randuares RT.07 Berkembang dan Maju Terus dengan kebersamaan');

-- --------------------------------------------------------

--
-- Table structure for table `tb_tarif`
--

CREATE TABLE `tb_tarif` (
  `id` int(11) NOT NULL,
  `kode_tarif` varchar(10) NOT NULL,
  `nama_tarif` varchar(50) NOT NULL,
  `tarif` int(10) NOT NULL,
  `metode` int(11) NOT NULL,
  `icon` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `tb_tarif`
--

INSERT INTO `tb_tarif` (`id`, `kode_tarif`, `nama_tarif`, `tarif`, `metode`, `icon`) VALUES
(1, 'TR003', 'Iuran Sosial', 5000, 1, 'bx-user-plus'),
(2, 'TR002', 'Iuran Wajib', 5000, 1, 'bx-home'),
(3, 'TR001', 'Jimpitan', 500, 0, ''),
(4, 'TR004', 'Iuran 17an', 50000, 2, 'bx-group'),
(5, 'TR005', 'Iuran Merti Dusun', 35000, 2, 'bx-calendar'),
(6, 'TR006', 'Iuran Dana Kematian', 25000, 3, 'bx-file');

-- --------------------------------------------------------

--
-- Table structure for table `tb_warga`
--

CREATE TABLE `tb_warga` (
  `id_warga` int(11) NOT NULL,
  `nama` varchar(100) NOT NULL,
  `nik` varchar(20) NOT NULL,
  `hubungan` varchar(50) NOT NULL,
  `nikk` varchar(20) NOT NULL,
  `jenkel` varchar(20) NOT NULL,
  `tpt_lahir` varchar(50) NOT NULL,
  `tgl_lahir` date NOT NULL,
  `alamat` text NOT NULL,
  `rt` int(10) NOT NULL,
  `rw` int(10) NOT NULL,
  `kelurahan` varchar(50) NOT NULL,
  `kecamatan` varchar(50) NOT NULL,
  `kota` varchar(50) NOT NULL,
  `propinsi` varchar(50) NOT NULL,
  `negara` varchar(50) NOT NULL,
  `agama` varchar(20) NOT NULL,
  `status` varchar(20) NOT NULL,
  `pekerjaan` varchar(50) NOT NULL,
  `hp` varchar(20) NOT NULL,
  `foto` varchar(100) NOT NULL,
  `tgl_warga` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `tb_warga`
--

INSERT INTO `tb_warga` (`id_warga`, `nama`, `nik`, `hubungan`, `nikk`, `jenkel`, `tpt_lahir`, `tgl_lahir`, `alamat`, `rt`, `rw`, `kelurahan`, `kecamatan`, `kota`, `propinsi`, `negara`, `agama`, `status`, `pekerjaan`, `hp`, `foto`, `tgl_warga`) VALUES
(1118, 'Supardjo', '3322062909580001', 'Kepala Keluarga', '3322063008086801', 'L', 'Salatiga', '1958-09-29', 'Randuares', 7, 1, 'KUMPULREJO', 'ARGOMULYO', 'KOTA SALATIGA', 'JAWA TENGAH', 'Indonesia', 'Kristen', 'Kawin', 'Wirausaha', '081325466838', '', '2025-06-25 08:35:54'),
(1119, 'Kemirah', '3324035006710001', 'Lainnya', '3322063008086801', 'P', 'Salatiga', '1971-06-10', 'Randuares', 7, 1, 'KUMPULREJO', 'ARGOMULYO', 'KOTA SALATIGA', 'JAWA TENGAH', 'Indonesia', 'Kristen', 'Lainnya', 'Swasta', '081392904281', '', '2025-06-21 08:51:25'),
(1120, 'Tukijan Siswo Andoyo', '3373033008500001', 'Kepala Keluarga', '3373030010208183', 'L', 'Salatiga', '1950-08-30', 'Randuares', 7, 1, 'KUMPULREJO', 'ARGOMULYO', 'KOTA SALATIGA', 'JAWA TENGAH', 'Indonesia', 'Kristen', 'Kawin', 'Pensiunan', '082138398988', '', '2025-06-25 08:35:27'),
(1121, 'Anastasia Sumarsih', '3373034905510001', 'Lainnya', '3373030010208183', 'P', 'Salatiga', '1951-06-09', 'Randuares', 7, 1, 'KUMPULREJO', 'ARGOMULYO', 'KOTA SALATIGA', 'JAWA TENGAH', 'Indonesia', 'Kristen', 'Lainnya', 'Swasta', '082138398988', '', '2025-06-21 08:51:25'),
(1122, 'Heru Sulistiyono', '3373032104570001', 'Kepala Keluarga', '3373030102080815', 'L', 'Salatiga', '1957-04-21', 'Randuares', 7, 1, 'KUMPULREJO', 'ARGOMULYO', 'KOTA SALATIGA', 'JAWA TENGAH', 'Indonesia', 'Katolik', 'Kawin', 'Tidak Bekerja', '0895359055793', '', '2025-06-25 08:35:01'),
(1123, 'Dwi Suwartini', '3373035502630001', 'Lainnya', '3373030102080815', 'P', 'Salatiga', '1963-02-15', 'Randuares', 7, 1, 'KUMPULREJO', 'ARGOMULYO', 'KOTA SALATIGA', 'JAWA TENGAH', 'Indonesia', 'Kristen', 'Lainnya', 'Swasta', '0895359055793', '', '2025-06-21 08:51:25'),
(1124, 'ALDHI SULISTIYAN', '3373032001080001', 'Lainnya', '3373030102080815', 'L', 'Salatiga', '2008-01-20', 'Randuares', 7, 1, 'KUMPULREJO', 'ARGOMULYO', 'KOTA SALATIGA', 'JAWA TENGAH', 'Indonesia', 'Kristen', 'Lainnya', 'Swasta', '0895359055793', '', '2025-06-21 08:51:25'),
(1125, 'Ignatius Loyola Sutarto', '3373030702480001', 'Kepala Keluarga', '3373030102081033', 'L', 'Salatiga', '1948-02-07', 'Randuares', 7, 1, 'KUMPULREJO', 'ARGOMULYO', 'KOTA SALATIGA', 'JAWA TENGAH', 'Indonesia', 'Katolik', 'Kawin', 'Pensiunan', '088902953631', '', '2025-06-25 08:34:36'),
(1126, 'Sutinah', '3373034310530001', 'Lainnya', '3373030102081033', 'P', 'Salatiga', '1953-10-03', 'Randuares', 7, 1, 'KUMPULREJO', 'ARGOMULYO', 'KOTA SALATIGA', 'JAWA TENGAH', 'Indonesia', 'Kristen', 'Lainnya', 'Swasta', '088902953631', '', '2025-06-21 08:51:25'),
(1127, 'Tukirin', '3373030101480002', 'Kepala Keluarga', '3373030102083090', 'L', 'Salatiga', '1948-01-01', 'Randuares', 7, 1, 'KUMPULREJO', 'ARGOMULYO', 'KOTA SALATIGA', 'JAWA TENGAH', 'Indonesia', 'Kristen', 'Kawin', 'Petani', '0858786681564', '', '2025-06-25 08:34:15'),
(1128, 'Watinem', '3373036006520001', 'Lainnya', '3373030102083090', 'P', 'Salatiga', '1952-06-20', 'Randuares', 7, 1, 'KUMPULREJO', 'ARGOMULYO', 'KOTA SALATIGA', 'JAWA TENGAH', 'Indonesia', 'Kristen', 'Lainnya', 'Swasta', '0858786681564', '', '2025-06-21 08:51:25'),
(1129, 'Tri Warsono', '3373031803650003', 'Kepala Keluarga', '3373030102083345', 'L', 'Salatiga', '1965-03-18', 'Randuares', 7, 1, 'KUMPULREJO', 'ARGOMULYO', 'KOTA SALATIGA', 'JAWA TENGAH', 'Indonesia', 'Kristen', 'Kawin', 'Pensiunan', '08956620101396', '', '2025-06-25 08:33:55'),
(1130, 'Eni Priyanti Nugrahaningsih', '3373035004720002', 'Lainnya', '3373030102083345', 'P', 'Salatiga', '1972-04-10', 'Randuares', 7, 1, 'KUMPULREJO', 'ARGOMULYO', 'KOTA SALATIGA', 'JAWA TENGAH', 'Indonesia', 'Kristen', 'Lainnya', 'Swasta', '08956620101396', '', '2025-06-21 08:51:25'),
(1131, 'Edwin Sanggra', '3373032511950001', 'Lainnya', '3373030102083345', 'L', 'Salatiga', '1995-11-25', 'Randuares', 7, 1, 'KUMPULREJO', 'ARGOMULYO', 'KOTA SALATIGA', 'JAWA TENGAH', 'Indonesia', 'Kristen', 'Lainnya', 'Swasta', '08956620101396', '', '2025-06-21 08:51:25'),
(1132, 'Clara Arnesty Putri', '3373035205010003', 'Lainnya', '3373030102083345', 'P', 'Salatiga', '2001-05-12', 'Randuares', 7, 1, 'KUMPULREJO', 'ARGOMULYO', 'KOTA SALATIGA', 'JAWA TENGAH', 'Indonesia', 'Kristen', 'Lainnya', 'Swasta', '083144604504', '', '2025-06-21 08:51:25'),
(1133, 'EGGY BASTIAN', '3373031008140001', 'Lainnya', '3373030102083345', 'L', 'Salatiga', '2014-08-10', 'Randuares', 7, 1, 'KUMPULREJO', 'ARGOMULYO', 'KOTA SALATIGA', 'JAWA TENGAH', 'Indonesia', 'Kristen', 'Lainnya', 'Swasta', '08956620101396', '', '2025-06-21 08:51:25'),
(1134, 'Jafar Sodiq', '3373030503610001', 'Kepala Keluarga', '3373030102083592', 'L', 'Salatiga', '1961-03-05', 'Randuares', 7, 1, 'KUMPULREJO', 'ARGOMULYO', 'KOTA SALATIGA', 'JAWA TENGAH', 'Indonesia', 'Islam', 'Kawin', 'Wirausaha', '0895370164448', '', '2025-06-25 10:48:17'),
(1135, 'Ngatiyah', '3373036307610002', 'Lainnya', '3373030102083592', 'P', 'Salatiga', '1961-07-23', 'Randuares', 7, 1, 'KUMPULREJO', 'ARGOMULYO', 'KOTA SALATIGA', 'JAWA TENGAH', 'Indonesia', 'Kristen', 'Lainnya', 'Swasta', '085877567651', '', '2025-06-21 08:51:25'),
(1136, 'Nari Haryo Sadono', '3373030603510002', 'Kepala Keluarga', '3373030102084678', 'L', 'Salatiga', '1951-03-05', 'Randuares', 7, 1, 'KUMPULREJO', 'ARGOMULYO', 'KOTA SALATIGA', 'JAWA TENGAH', 'Indonesia', 'Kristen', 'Kawin', 'Wirausaha', '085876886724', '', '2025-06-25 08:26:24'),
(1137, 'Supitrah', '3373036706520001', 'Lainnya', '3373030102084678', 'P', 'Salatiga', '1952-06-27', 'Randuares', 7, 1, 'KUMPULREJO', 'ARGOMULYO', 'KOTA SALATIGA', 'JAWA TENGAH', 'Indonesia', 'Kristen', 'Lainnya', 'Swasta', '085876886724', '', '2025-06-21 08:51:25'),
(1138, 'Agus Purwanto', '3373031308650001', 'Kepala Keluarga', '3373030202080287', 'L', 'Salatiga', '1965-08-13', 'Randuares', 7, 1, 'KUMPULREJO', 'ARGOMULYO', 'KOTA SALATIGA', 'JAWA TENGAH', 'Indonesia', 'Islam', 'Kawin', 'PNS', '0895421730011', '', '2025-06-25 08:25:50'),
(1139, 'Munjaidah', '3373035509730001', 'Lainnya', '3373030202080287', 'P', 'Salatiga', '1973-09-15', 'Randuares', 7, 1, 'KUMPULREJO', 'ARGOMULYO', 'KOTA SALATIGA', 'JAWA TENGAH', 'Indonesia', 'Kristen', 'Lainnya', 'Swasta', '0895421730011', '', '2025-06-21 08:51:25'),
(1140, 'Dicky Nugroho Saputra', '3373032402030003', 'Lainnya', '3373030202080287', 'L', 'Salatiga', '2003-02-23', 'Randuares', 7, 1, 'KUMPULREJO', 'ARGOMULYO', 'KOTA SALATIGA', 'JAWA TENGAH', 'Indonesia', 'Kristen', 'Lainnya', 'Swasta', '0895421730011', '', '2025-06-21 08:51:25'),
(1141, 'Ari Priyambudi', '3373030303740002', 'Kepala Keluarga', '3373030209090008', 'L', 'Salatiga', '1974-03-03', 'Randuares', 7, 1, 'KUMPULREJO', 'ARGOMULYO', 'KOTA SALATIGA', 'JAWA TENGAH', 'Indonesia', 'Katolik', 'Kawin', 'Petani', '082137229825', '', '2025-06-25 08:25:32'),
(1142, 'Dwi Winarni', '3373035507740001', 'Lainnya', '3373030209090008', 'P', 'Salatiga', '1974-07-15', 'Randuares', 7, 1, 'KUMPULREJO', 'ARGOMULYO', 'KOTA SALATIGA', 'JAWA TENGAH', 'Indonesia', 'Kristen', 'Lainnya', 'Swasta', '081227730656', '', '2025-06-21 08:51:26'),
(1143, 'Tangkas Arya Bunaputra', '3373031210040003', 'Lainnya', '3373030209090008', 'L', 'Salatiga', '2004-10-12', 'Randuares', 7, 1, 'KUMPULREJO', 'ARGOMULYO', 'KOTA SALATIGA', 'JAWA TENGAH', 'Indonesia', 'Kristen', 'Lainnya', 'Swasta', '082137988660', '', '2025-06-21 08:51:26'),
(1144, 'Andi Setiyono', '3373031904840002', 'Kepala Keluarga', '3373030212130004', 'L', 'Salatiga', '1984-04-19', 'Randuares', 7, 1, 'KUMPULREJO', 'ARGOMULYO', 'KOTA SALATIGA', 'JAWA TENGAH', 'Indonesia', 'Kristen', 'Kawin', 'Swasta', '085640327727', '', '2025-06-25 08:25:04'),
(1145, 'Wavukani', '3373046304920001', 'Lainnya', '3373030212130004', 'P', 'Salatiga', '1992-04-23', 'Randuares', 7, 1, 'KUMPULREJO', 'ARGOMULYO', 'KOTA SALATIGA', 'JAWA TENGAH', 'Indonesia', 'Kristen', 'Lainnya', 'Swasta', '0856414400554', '', '2025-06-21 08:51:26'),
(1146, 'RYSHAKA GIANZOLA ABHIMANGGALA', '3373031612210002', 'Lainnya', '3373030212130004', 'P', 'Salatiga', '2021-12-16', 'Randuares', 7, 1, 'KUMPULREJO', 'ARGOMULYO', 'KOTA SALATIGA', 'JAWA TENGAH', 'Indonesia', 'Kristen', 'Lainnya', 'Swasta', '0856414400554', '', '2025-06-21 08:51:26'),
(1147, 'RALINE SHEENA GLORY IMANNIAR', '3373034105190001', 'Lainnya', '3373030212130004', 'L', 'Salatiga', '2019-05-01', 'Randuares', 7, 1, 'KUMPULREJO', 'ARGOMULYO', 'KOTA SALATIGA', 'JAWA TENGAH', 'Indonesia', 'Kristen', 'Lainnya', 'Swasta', '0856414400554', '', '2025-06-21 08:51:26'),
(1148, 'Doni Abiyantoro', '3373030805800003', 'Kepala Keluarga', '3373030310090005', 'L', 'Salatiga', '1980-05-08', 'Randuares', 7, 1, 'KUMPULREJO', 'ARGOMULYO', 'KOTA SALATIGA', 'JAWA TENGAH', 'Indonesia', 'Kristen', 'Kawin', 'Swasta', '085291202202', 'images/warga/warga_1750580058_6857bb5ae4632.jpg', '2025-06-22 08:14:18'),
(1149, 'Rika Widhiyati', '3373035502850001', 'Istri', '3373030310090005', 'P', 'Salatiga', '1985-02-15', 'Randuares', 7, 1, 'KUMPULREJO', 'ARGOMULYO', 'KOTA SALATIGA', 'JAWA TENGAH', 'Indonesia', 'Kristen', 'Kawin', 'Tidak Bekerja', '085291202202', 'images/warga/warga_1751203174_68613d6604b11.jpg', '2025-06-29 13:19:34'),
(1150, 'CIARA BEVINAFEEZA ABIEKA', '3373036104100001', 'Anak', '3373030310090005', 'P', 'Salatiga', '2010-04-21', 'Randuares', 7, 1, 'KUMPULREJO', 'ARGOMULYO', 'KOTA SALATIGA', 'JAWA TENGAH', 'Indonesia', 'Kristen', 'Belum Kawin', 'Pelajar', '085291202202', 'images/warga/warga_1751204301_686141cd92026.jpg', '2025-06-29 13:38:21'),
(1151, 'Emi Herawati', '3373035305690002', 'Lainnya', '3373030502090009', 'P', 'Salatiga', '1969-05-13', 'Randuares', 7, 1, 'KUMPULREJO', 'ARGOMULYO', 'KOTA SALATIGA', 'JAWA TENGAH', 'Indonesia', 'Kristen', 'Lainnya', 'Swasta', '0895359101723', '', '2025-06-21 08:51:26'),
(1152, 'Mistriyanto', '3373030206680001', 'Kepala Keluarga', '3373030502090009', 'L', 'Salatiga', '1968-06-02', 'Randuares', 7, 1, 'KUMPULREJO', 'ARGOMULYO', 'KOTA SALATIGA', 'JAWA TENGAH', 'Indonesia', 'Kristen', 'Kawin', 'Swasta', '083193340629', '', '2025-06-25 08:24:29'),
(1153, 'Herdanto Yoginata', '3373031410970000', 'Lainnya', '3373030502090009', 'L', 'Salatiga', '1997-10-14', 'Randuares', 7, 1, 'KUMPULREJO', 'ARGOMULYO', 'KOTA SALATIGA', 'JAWA TENGAH', 'Indonesia', 'Kristen', 'Lainnya', 'Swasta', '085129289799', '', '2025-06-21 08:51:26'),
(1154, 'Ezer Widhi Hartaji', '3373031704020001', 'Lainnya', '3373030502090009', 'L', 'Salatiga', '2002-04-17', 'Randuares', 7, 1, 'KUMPULREJO', 'ARGOMULYO', 'KOTA SALATIGA', 'JAWA TENGAH', 'Indonesia', 'Kristen', 'Lainnya', 'Swasta', '083874480351', '', '2025-06-21 08:51:26'),
(1155, 'EUODIA OLYVIA NATALIA HERMI', '3373036912110002', 'Lainnya', '3373030502090009', 'P', 'Salatiga', '2011-12-29', 'Randuares', 7, 1, 'KUMPULREJO', 'ARGOMULYO', 'KOTA SALATIGA', 'JAWA TENGAH', 'Indonesia', 'Kristen', 'Lainnya', 'Swasta', '0895359101723', '', '2025-06-21 08:51:26'),
(1156, 'Wahyu Wijayanto', '3373030703850002', 'Kepala Keluarga', '3373030507220001', 'L', 'Salatiga', '1985-03-07', 'Randuares', 7, 1, 'KUMPULREJO', 'ARGOMULYO', 'KOTA SALATIGA', 'JAWA TENGAH', 'Indonesia', 'Kristen', 'Belum Kawin', 'Wirausaha', '085865156143', '', '2025-06-25 08:24:07'),
(1157, 'Iska Trimayasari', '3373035703870002', 'Lainnya', '3373030507220001', 'P', 'Salatiga', '1987-03-17', 'Randuares', 7, 1, 'KUMPULREJO', 'ARGOMULYO', 'KOTA SALATIGA', 'JAWA TENGAH', 'Indonesia', 'Kristen', 'Lainnya', 'Swasta', '087734274347', '', '2025-06-21 08:51:26'),
(1158, 'Triyono', '3373040609630002', 'Kepala Keluarga', '3373030601200002', 'L', 'Salatiga', '1963-09-06', 'Randuares', 7, 1, 'KUMPULREJO', 'ARGOMULYO', 'KOTA SALATIGA', 'JAWA TENGAH', 'Indonesia', 'Kristen', 'Kawin', 'Swasta', '088902953631', '', '2025-06-25 08:23:50'),
(1159, 'Magdalina Irnawati', '3373034810690002', 'Lainnya', '3373030601200002', 'P', 'Salatiga', '1969-10-08', 'Randuares', 7, 1, 'KUMPULREJO', 'ARGOMULYO', 'KOTA SALATIGA', 'JAWA TENGAH', 'Indonesia', 'Kristen', 'Lainnya', 'Swasta', '085640285219', '', '2025-06-21 08:51:26'),
(1160, 'Handika Irvana Putra', '3373030606990001', 'Lainnya', '3373030601200002', 'L', 'Salatiga', '1999-06-06', 'Randuares', 7, 1, 'KUMPULREJO', 'ARGOMULYO', 'KOTA SALATIGA', 'JAWA TENGAH', 'Indonesia', 'Kristen', 'Lainnya', 'Swasta', '085869112958', '', '2025-06-21 08:51:26'),
(1161, 'Jumadi', '3373030411680003', 'Kepala Keluarga', '3373030608100002', 'L', 'Salatiga', '1968-11-04', 'Randuares', 7, 1, 'KUMPULREJO', 'ARGOMULYO', 'KOTA SALATIGA', 'JAWA TENGAH', 'Indonesia', 'Kristen', 'Kawin', 'Swasta', '082158815015', '', '2025-06-25 08:23:33'),
(1162, 'Krismiyati', '3373035607670002', 'Lainnya', '3373030608100002', 'P', 'Salatiga', '1967-07-16', 'Randuares', 7, 1, 'KUMPULREJO', 'ARGOMULYO', 'KOTA SALATIGA', 'JAWA TENGAH', 'Indonesia', 'Kristen', 'Lainnya', 'Swasta', '083168380745', '', '2025-06-21 08:51:26'),
(1163, 'Okta Yeremias Akhiriyanto', '3373031210030003', 'Lainnya', '3373030608100002', 'L', 'Salatiga', '2003-10-12', 'Randuares', 7, 1, 'KUMPULREJO', 'ARGOMULYO', 'KOTA SALATIGA', 'JAWA TENGAH', 'Indonesia', 'Kristen', 'Lainnya', 'Swasta', '083168380745', '', '2025-06-21 08:51:26'),
(1164, 'Indra Sriyanto', '3322012102840001', 'Kepala Keluarga', '3373030712230005', 'L', 'Salatiga', '1984-02-21', 'Randuares', 7, 1, 'KUMPULREJO', 'ARGOMULYO', 'KOTA SALATIGA', 'JAWA TENGAH', 'Indonesia', 'Islam', 'Kawin', 'Swasta', '085727072108', '', '2025-06-25 08:23:14'),
(1165, 'Dita Yunita Sari', '3374026306930002', 'Lainnya', '3373030712230005', 'P', 'Salatiga', '1993-06-23', 'Randuares', 7, 1, 'KUMPULREJO', 'ARGOMULYO', 'KOTA SALATIGA', 'JAWA TENGAH', 'Indonesia', 'Kristen', 'Lainnya', 'Swasta', '085878488694', '', '2025-06-21 08:51:26'),
(1166, 'HANUM OKTARA QATHRTUNNADA', '3374027010170003', 'Lainnya', '3373030712230005', 'P', 'Salatiga', '2017-10-30', 'Randuares', 7, 1, 'KUMPULREJO', 'ARGOMULYO', 'KOTA SALATIGA', 'JAWA TENGAH', 'Indonesia', 'Kristen', 'Lainnya', 'Swasta', '085878488694', '', '2025-06-21 08:51:26'),
(1167, 'KABSYA ARUNAYA ZUHAIRY', '3374026412200002', 'Lainnya', '3373030712230005', 'P', 'Salatiga', '2020-12-24', 'Randuares', 7, 1, 'KUMPULREJO', 'ARGOMULYO', 'KOTA SALATIGA', 'JAWA TENGAH', 'Indonesia', 'Kristen', 'Lainnya', 'Swasta', '085878488694', '', '2025-06-21 08:51:26'),
(1168, 'XAVIER UWAIS AL HUDZAIFY', '3374022912220001', 'Lainnya', '3373030712230005', 'L', 'Salatiga', '2022-12-29', 'Randuares', 7, 1, 'KUMPULREJO', 'ARGOMULYO', 'KOTA SALATIGA', 'JAWA TENGAH', 'Indonesia', 'Kristen', 'Lainnya', 'Swasta', '085878488694', '', '2025-06-21 08:51:26'),
(1169, 'Hermawan Setyo Adi', '3373030906890001', 'Kepala Keluarga', '3373031111150003', 'L', 'Salatiga', '1989-06-09', 'Randuares', 7, 1, 'KUMPULREJO', 'ARGOMULYO', 'KOTA SALATIGA', 'JAWA TENGAH', 'Indonesia', 'Kristen', 'Kawin', 'Swasta', '085786740013', '', '2025-06-25 08:22:44'),
(1170, 'Kristianingsih', '3373027012900001', 'Lainnya', '3373031111150003', 'P', 'Salatiga', '1990-12-30', 'Randuares', 7, 1, 'KUMPULREJO', 'ARGOMULYO', 'KOTA SALATIGA', 'JAWA TENGAH', 'Indonesia', 'Kristen', 'Lainnya', 'Swasta', '085158257335', '', '2025-06-21 08:51:26'),
(1171, 'YOVELA KHEVA VALENCIA', '3373034909160002', 'Lainnya', '3373031111150003', 'P', 'Salatiga', '2016-09-09', 'Randuares', 7, 1, 'KUMPULREJO', 'ARGOMULYO', 'KOTA SALATIGA', 'JAWA TENGAH', 'Indonesia', 'Kristen', 'Lainnya', 'Swasta', '085158257335', '', '2025-06-21 08:51:26'),
(1172, 'Dyah Kusmiyaningrum', '3373034909810001', 'Kepala Keluarga', '3373031307210003', 'P', 'Salatiga', '1981-09-09', 'Randuares', 7, 1, 'KUMPULREJO', 'ARGOMULYO', 'KOTA SALATIGA', 'JAWA TENGAH', 'Indonesia', 'Islam', 'Cerai Hidup', 'Swasta', '087722257178', '', '2025-06-25 08:22:13'),
(1173, 'Sutini', '3373034909520001', 'Kepala Keluarga', '3373031309230002', 'P', 'Salatiga', '1952-09-09', 'Randuares', 7, 1, 'KUMPULREJO', 'ARGOMULYO', 'KOTA SALATIGA', 'JAWA TENGAH', 'Indonesia', 'Kristen', 'Cerai Mati', 'Tidak Bekerja', '085291202202', 'images/warga/warga_1751205303_686145b7a1f14.jpg', '2025-06-29 13:55:03'),
(1174, 'NAYUDYA RANGGA ANUGRAHANTO', '3373030301110001', 'Lainnya', '3373031307210003', 'P', 'Salatiga', '2011-01-03', 'Randuares', 7, 1, 'KUMPULREJO', 'ARGOMULYO', 'KOTA SALATIGA', 'JAWA TENGAH', 'Indonesia', 'Kristen', 'Lainnya', 'Swasta', '087722257178', '', '2025-06-21 08:51:26'),
(1175, 'Nayudya Sekar Arumi', '3373036210040001', 'Lainnya', '3373031307210003', 'P', 'Salatiga', '2004-10-22', 'Randuares', 7, 1, 'KUMPULREJO', 'ARGOMULYO', 'KOTA SALATIGA', 'JAWA TENGAH', 'Indonesia', 'Kristen', 'Lainnya', 'Swasta', '087722257178', '', '2025-06-21 08:51:27'),
(1176, 'Ety Prasetyoningsih', '3373036011600001', 'Kepala Keluarga', '3373031312130001', 'P', 'Salatiga', '1960-11-20', 'Randuares', 7, 1, 'KUMPULREJO', 'ARGOMULYO', 'KOTA SALATIGA', 'JAWA TENGAH', 'Indonesia', 'Kristen', 'Cerai Mati', 'Tidak Bekerja', '085291202202', 'images/warga/warga_1751204937_686144490e2a0.jpeg', '2025-06-29 13:48:57'),
(1177, 'Yhona Tri Priyanto', '3373031806900002', 'Anak', '3373031312130001', 'L', 'Salatiga', '1990-06-18', 'Randuares', 7, 1, 'KUMPULREJO', 'ARGOMULYO', 'KOTA SALATIGA', 'JAWA TENGAH', 'Indonesia', 'Kristen', 'Belum Kawin', 'Swasta', '0895368641100', '', '2025-06-22 03:08:19'),
(1178, 'Slamet Istianto', '3373032005800007', 'Kepala Keluarga', '3373031404100008', 'L', 'Salatiga', '1980-05-20', 'Randuares', 7, 1, 'KUMPULREJO', 'ARGOMULYO', 'KOTA SALATIGA', 'JAWA TENGAH', 'Indonesia', 'Kristen', 'Cerai Hidup', 'Swasta', '081327725025', '', '2025-06-25 08:21:35'),
(1179, 'FAHREZZA IZZAN ALVIANO', '3373031706190002', 'Lainnya', '3373031404100008', 'L', 'Salatiga', '2019-06-17', 'Randuares', 7, 1, 'KUMPULREJO', 'ARGOMULYO', 'KOTA SALATIGA', 'JAWA TENGAH', 'Indonesia', 'Kristen', 'Lainnya', 'Swasta', '081327725025', '', '2025-06-21 08:51:27'),
(1180, 'Eny Sri Hartini', '3373035702650001', 'Kepala Keluarga', '3373031405100005', 'P', 'Salatiga', '1965-02-17', 'Randuares', 7, 1, 'KUMPULREJO', 'ARGOMULYO', 'KOTA SALATIGA', 'JAWA TENGAH', 'Indonesia', 'Kristen', 'Cerai Mati', 'Pensiunan', '083831928460', '', '2025-06-25 08:21:14'),
(1181, 'Hendiar Novianto', '3373030111940003', 'Lainnya', '3373031405100005', 'L', 'Salatiga', '1994-11-01', 'Randuares', 7, 1, 'KUMPULREJO', 'ARGOMULYO', 'KOTA SALATIGA', 'JAWA TENGAH', 'Indonesia', 'Kristen', 'Lainnya', 'Swasta', '083831928460', '', '2025-06-21 08:51:27'),
(1182, 'Yoses Tri Anggoro', '3373030512000002', 'Lainnya', '3373031405100005', 'L', 'Salatiga', '2000-12-05', 'Randuares', 7, 1, 'KUMPULREJO', 'ARGOMULYO', 'KOTA SALATIGA', 'JAWA TENGAH', 'Indonesia', 'Kristen', 'Lainnya', 'Swasta', '083831928460', '', '2025-06-21 08:51:27'),
(1183, 'Alfian Syafii', '3322041109930003', 'Kepala Keluarga', '3373031507220001', 'L', 'Salatiga', '1993-09-11', 'Randuares', 7, 1, 'KUMPULREJO', 'ARGOMULYO', 'KOTA SALATIGA', 'JAWA TENGAH', 'Indonesia', 'Islam', 'Kawin', 'Wirausaha', '08157673319', '', '2025-06-25 10:48:35'),
(1184, 'Yonanda Billy Surya Putri', '3373035011940006', 'Lainnya', '3373031507220001', 'P', 'Salatiga', '1994-11-10', 'Randuares', 7, 1, 'KUMPULREJO', 'ARGOMULYO', 'KOTA SALATIGA', 'JAWA TENGAH', 'Indonesia', 'Kristen', 'Lainnya', 'Swasta', '0895370164448', '', '2025-06-21 08:51:27'),
(1185, 'ARSHAKA ARSHAQ HAMIZAN', '3373031608220001', 'Lainnya', '3373031507220001', 'L', 'Salatiga', '2022-08-16', 'Randuares', 7, 1, 'KUMPULREJO', 'ARGOMULYO', 'KOTA SALATIGA', 'JAWA TENGAH', 'Indonesia', 'Kristen', 'Lainnya', 'Swasta', '0895370164448', '', '2025-06-21 08:51:27'),
(1186, 'Yonathan Christianto', '3373030612870002', 'Kepala Keluarga', '3373031509150003', 'L', 'Salatiga', '1987-12-06', 'Randuares', 7, 1, 'KUMPULREJO', 'ARGOMULYO', 'KOTA SALATIGA', 'JAWA TENGAH', 'Indonesia', 'Kristen', 'Kawin', 'Swasta', '085640792623', '', '2025-06-25 08:20:06'),
(1187, 'Ester Dewis Septina ', '3373034312870001', 'Lainnya', '3373031509150003', 'P', 'Salatiga', '1987-12-03', 'Randuares', 7, 1, 'KUMPULREJO', 'ARGOMULYO', 'KOTA SALATIGA', 'JAWA TENGAH', 'Indonesia', 'Kristen', 'Lainnya', 'Swasta', '085640792623', '', '2025-06-21 08:51:27'),
(1188, 'ALVARO CHRISNA PUTRA', '3373032704160002', 'Lainnya', '3373031509150003', 'L', 'Salatiga', '2016-04-27', 'Randuares', 7, 1, 'KUMPULREJO', 'ARGOMULYO', 'KOTA SALATIGA', 'JAWA TENGAH', 'Indonesia', 'Kristen', 'Lainnya', 'Swasta', '085640860452', '', '2025-06-21 08:51:27'),
(1189, 'GAVRIEL CHRISNA DIRANDRA', '3373032109200001', 'Lainnya', '3373031509150003', 'L', 'Salatiga', '2020-09-21', 'Randuares', 7, 1, 'KUMPULREJO', 'ARGOMULYO', 'KOTA SALATIGA', 'JAWA TENGAH', 'Indonesia', 'Kristen', 'Lainnya', 'Swasta', '085640792623', '', '2025-06-21 08:51:27'),
(1190, 'Suyatmi', '3373036404640001', 'Kepala Keluarga', '3373031512100013', 'P', 'Salatiga', '1961-04-24', 'Randuares', 7, 1, 'KUMPULREJO', 'ARGOMULYO', 'KOTA SALATIGA', 'JAWA TENGAH', 'Indonesia', 'Kristen', 'Cerai Mati', 'Tidak Bekerja', '085641999900', '', '2025-06-25 08:19:44'),
(1191, 'Jariyah', '3373037010630001', 'Kepala Keluarga', '3373031608230003', 'P', 'Salatiga', '1963-10-30', 'Randuares', 7, 1, 'KUMPULREJO', 'ARGOMULYO', 'KOTA SALATIGA', 'JAWA TENGAH', 'Indonesia', 'Kristen', 'Cerai Mati', 'Swasta', '089636818690', '', '2025-06-25 08:19:21'),
(1192, 'Suprihatin', '3373037112400038', 'Lainnya', '3373031608230003', 'P', 'Salatiga', '1940-12-31', 'Randuares', 7, 1, 'KUMPULREJO', 'ARGOMULYO', 'KOTA SALATIGA', 'JAWA TENGAH', 'Indonesia', 'Kristen', 'Lainnya', 'Swasta', '089636818690', '', '2025-06-21 08:51:27'),
(1193, 'Sutiyem', '3373034704590001', 'Kepala Keluarga', '3373031610200002', 'P', 'Salatiga', '1959-04-07', 'Randuares', 7, 1, 'KUMPULREJO', 'ARGOMULYO', 'KOTA SALATIGA', 'JAWA TENGAH', 'Indonesia', 'Kristen', 'Cerai Mati', 'Pensiunan', '085877567651', '', '2025-06-25 08:18:12'),
(1194, 'Johanes Marjuki', '3373030407560001', 'Kepala Keluarga', '3373031612100001', 'L', 'Salatiga', '1956-07-04', 'Randuares', 7, 1, 'KUMPULREJO', 'ARGOMULYO', 'KOTA SALATIGA', 'JAWA TENGAH', 'Indonesia', 'Kristen', 'Kawin', 'Wirausaha', '081327725025', '', '2025-06-25 08:17:54'),
(1195, 'Sutiyem', '3373035902610001', 'Lainnya', '3373031612100001', 'P', 'Salatiga', '1961-02-19', 'Randuares', 7, 1, 'KUMPULREJO', 'ARGOMULYO', 'KOTA SALATIGA', 'JAWA TENGAH', 'Indonesia', 'Kristen', 'Lainnya', 'Swasta', '081327725025', '', '2025-06-21 08:51:27'),
(1196, 'Rudjito', '3373030104720003', 'Kepala Keluarga', '3373031612140004', 'L', 'Salatiga', '1972-04-01', 'Randuares', 7, 1, 'KUMPULREJO', 'ARGOMULYO', 'KOTA SALATIGA', 'JAWA TENGAH', 'Indonesia', 'Kristen', 'Belum Kawin', 'Wirausaha', '085640879197', '', '2025-06-25 08:17:35'),
(1197, 'Supriyadi', '3373031202830004', 'Kepala Keluarga', '3373031812100014', 'L', 'Salatiga', '1983-02-17', 'Randuares', 7, 1, 'KUMPULREJO', 'ARGOMULYO', 'KOTA SALATIGA', 'JAWA TENGAH', 'Indonesia', 'Islam', 'Kawin', 'Swasta', '085225936965', '', '2025-06-25 08:15:16'),
(1198, 'Jasiyem', '3373035709820002', 'Lainnya', '3373031812100014', 'P', 'Salatiga', '1982-09-17', 'Randuares', 7, 1, 'KUMPULREJO', 'ARGOMULYO', 'KOTA SALATIGA', 'JAWA TENGAH', 'Indonesia', 'Kristen', 'Lainnya', 'Swasta', '085225936965', '', '2025-06-21 08:51:27'),
(1199, 'REINHEART CAMELIA', '3373035605100002', 'Lainnya', '3373031812100014', 'P', 'Salatiga', '2010-05-16', 'Randuares', 7, 1, 'KUMPULREJO', 'ARGOMULYO', 'KOTA SALATIGA', 'JAWA TENGAH', 'Indonesia', 'Kristen', 'Lainnya', 'Swasta', '085225936965', '', '2025-06-21 08:51:27'),
(1200, 'ANGEL VIKA AULIA', '3373035108120001', 'Lainnya', '3373031812100014', 'P', 'Salatiga', '2011-08-11', 'Randuares', 7, 1, 'KUMPULREJO', 'ARGOMULYO', 'KOTA SALATIGA', 'JAWA TENGAH', 'Indonesia', 'Kristen', 'Lainnya', 'Swasta', '085225936965', '', '2025-06-21 08:51:27'),
(1201, 'ADI SETYO AJI', '3373030202220001', 'Lainnya', '3373031812100014', 'L', 'Salatiga', '2022-02-02', 'Randuares', 7, 1, 'KUMPULREJO', 'ARGOMULYO', 'KOTA SALATIGA', 'JAWA TENGAH', 'Indonesia', 'Kristen', 'Lainnya', 'Swasta', '085225936965', '', '2025-06-21 08:51:27'),
(1202, 'Tri Hartini Bu Diro', '3373044608490001', 'Kepala Keluarga', '3373032003170002', 'P', 'Salatiga', '1949-08-06', 'Randuares', 7, 1, 'KUMPULREJO', 'ARGOMULYO', 'KOTA SALATIGA', 'JAWA TENGAH', 'Indonesia', 'Kristen', 'Cerai Mati', 'Tidak Bekerja', '0895605379410', '', '2025-06-25 15:20:15'),
(1203, 'Agus Puji Raharjo', '9171010101790007', 'Kepala Keluarga', '3373032002180001', 'L', 'Salatiga', '1979-01-01', 'Randuares', 7, 1, 'KUMPULREJO', 'ARGOMULYO', 'KOTA SALATIGA', 'JAWA TENGAH', 'Indonesia', 'Islam', 'Kawin', 'TNI', '0895330137534', '', '2025-06-25 08:14:53'),
(1204, 'Tuti Mulyani', '9171015801790003', 'Lainnya', '3373032002180001', 'P', 'Salatiga', '1979-01-18', 'Randuares', 7, 1, 'KUMPULREJO', 'ARGOMULYO', 'KOTA SALATIGA', 'JAWA TENGAH', 'Indonesia', 'Kristen', 'Lainnya', 'Swasta', '0895330137534', '', '2025-06-21 08:51:27'),
(1205, 'Aditya Ryan Febriansyah', '9171012402050006', 'Lainnya', '3373032002180001', 'L', 'Salatiga', '2005-02-24', 'Randuares', 7, 1, 'KUMPULREJO', 'ARGOMULYO', 'KOTA SALATIGA', 'JAWA TENGAH', 'Indonesia', 'Kristen', 'Lainnya', 'Swasta', '0895330137534', '', '2025-06-21 08:51:27'),
(1206, 'SATRIA PRAMUDITA', '9171010503110001', 'Lainnya', '3373032002180001', 'L', 'Salatiga', '2011-03-05', 'Randuares', 7, 1, 'KUMPULREJO', 'ARGOMULYO', 'KOTA SALATIGA', 'JAWA TENGAH', 'Indonesia', 'Kristen', 'Lainnya', 'Swasta', '0895330137534', '', '2025-06-21 08:51:27'),
(1207, 'NAURA KHAIRUNNISA', '9171014408160003', 'Lainnya', '3373032002180001', 'P', 'Salatiga', '2016-08-04', 'Randuares', 7, 1, 'KUMPULREJO', 'ARGOMULYO', 'KOTA SALATIGA', 'JAWA TENGAH', 'Indonesia', 'Kristen', 'Lainnya', 'Swasta', '0895330137534', '', '2025-06-21 08:51:28'),
(1208, 'Rudiyono', '3373032202710002', 'Kepala Keluarga', '3373033101080289', 'L', 'Jakarta', '1971-02-22', 'Randuares', 7, 1, 'KUMPULREJO', 'ARGOMULYO', 'KOTA SALATIGA', 'JAWA TENGAH', 'Indonesia', 'Kristen', 'Kawin', 'Swasta', '082119213329', '', '2025-06-22 03:02:58'),
(1209, 'Yuli Asuti', '3373036507720002', 'Istri', '3373033101080289', 'P', 'Salatiga', '1972-07-25', 'Randuares', 7, 1, 'KUMPULREJO', 'ARGOMULYO', 'KOTA SALATIGA', 'JAWA TENGAH', 'Indonesia', 'Kristen', 'Kawin', 'Swasta', '082119213329', '', '2025-06-22 03:02:13'),
(1210, 'Avhiyana Ariestazya Sari', '3373036004990002', 'Anak', '3373033101080289', 'P', 'Salatiga', '1999-04-20', 'Randuares', 7, 1, 'KUMPULREJO', 'ARGOMULYO', 'KOTA SALATIGA', 'JAWA TENGAH', 'Indonesia', 'Kristen', 'Belum Kawin', 'Wiraswasta', '085643306224', '', '2025-06-22 03:03:42'),
(1211, 'Danu Dhirta Dwi Prasetyo', '3373032107040001', 'Anak', '3373033101080289', 'L', 'Salatiga', '2004-07-21', 'Randuares', 7, 1, 'KUMPULREJO', 'ARGOMULYO', 'KOTA SALATIGA', 'JAWA TENGAH', 'Indonesia', 'Kristen', 'Belum Kawin', 'Swasta', '082138641393', '', '2025-06-22 03:04:06'),
(1212, 'Suryantoro', '3373030202680003', 'Kepala Keluarga', '3373033101083367', 'L', 'Salatiga', '1968-02-02', 'Randuares', 7, 1, 'KUMPULREJO', 'ARGOMULYO', 'KOTA SALATIGA', 'JAWA TENGAH', 'Indonesia', 'Kristen', 'Kawin', 'Tidak Bekerja', '08975492181', '', '2025-06-22 02:58:49'),
(1213, 'Marta Imawati', '3373036603760001', 'Istri', '3373033101083367', 'P', 'Salatiga', '1976-03-26', 'Randuares', 7, 1, 'KUMPULREJO', 'ARGOMULYO', 'KOTA SALATIGA', 'JAWA TENGAH', 'Indonesia', 'Kristen', 'Kawin', 'Swasta', '081329212644', '', '2025-06-22 02:59:17'),
(1214, 'Vivian Devi Ananda', '3373034610020001', 'Anak', '3373033101083367', 'P', 'Salatiga', '2002-10-06', 'Randuares', 7, 1, 'KUMPULREJO', 'ARGOMULYO', 'KOTA SALATIGA', 'JAWA TENGAH', 'Indonesia', 'Kristen', 'Belum Kawin', 'Swasta', '0895392710400', '', '2025-06-22 02:57:30'),
(1215, 'DIANDRA CITRA PRAMESWARA', '3373036008120001', 'Anak', '3373033101083367', 'P', 'Salatiga', '2012-08-20', 'Randuares', 7, 1, 'KUMPULREJO', 'ARGOMULYO', 'KOTA SALATIGA', 'JAWA TENGAH', 'Indonesia', 'Kristen', 'Belum Kawin', 'Pelajar', '081329212644', '', '2025-06-22 02:58:09'),
(1216, 'Dimas Wisnu Cahyadi', '3373030608800001', 'Kepala Keluarga', '3373032206090056', 'L', 'Salatiga', '1980-08-06', 'Randuares', 7, 1, 'KUMPULREJO', 'ARGOMULYO', 'KOTA SALATIGA', 'JAWA TENGAH', 'Indonesia', 'Kristen', 'Kawin', 'Swasta', '083197463949', '', '2025-06-25 08:13:51'),
(1217, 'Wahyu Umiyati', '3373034608830003', 'Lainnya', '3373032206090056', 'P', 'Salatiga', '1980-08-06', 'Randuares', 7, 1, 'KUMPULREJO', 'ARGOMULYO', 'KOTA SALATIGA', 'JAWA TENGAH', 'Indonesia', 'Kristen', 'Lainnya', 'Swasta', '083197463949', '', '2025-06-21 08:51:28'),
(1218, 'Devara Anggra Saputra', '3373031508050001', 'Lainnya', '3373032206090056', 'L', 'Salatiga', '2005-08-15', 'Randuares', 7, 1, 'KUMPULREJO', 'ARGOMULYO', 'KOTA SALATIGA', 'JAWA TENGAH', 'Indonesia', 'Kristen', 'Lainnya', 'Swasta', '083197463949', '', '2025-06-21 08:51:28'),
(1219, 'ADRIAN WISNU PRADITYA', '3373032701150003', 'Lainnya', '3373032206090056', 'L', 'Salatiga', '2015-01-27', 'Randuares', 7, 1, 'KUMPULREJO', 'ARGOMULYO', 'KOTA SALATIGA', 'JAWA TENGAH', 'Indonesia', 'Kristen', 'Lainnya', 'Swasta', '083197463949', '', '2025-06-21 08:51:28'),
(1220, 'RAJENDRA AZKA ARSENIO', '3373030802190001', 'Lainnya', '3373032206090056', 'L', 'Salatiga', '2019-02-08', 'Randuares', 7, 1, 'KUMPULREJO', 'ARGOMULYO', 'KOTA SALATIGA', 'JAWA TENGAH', 'Indonesia', 'Kristen', 'Lainnya', 'Swasta', '083197463949', '', '2025-06-21 08:51:28'),
(1221, 'Nanang Setyo Wibowo', '3373032705900003', 'Kepala Keluarga', '3373032206170007', 'L', 'Salatiga', '1990-05-27', 'Randuares', 7, 1, 'KUMPULREJO', 'ARGOMULYO', 'KOTA SALATIGA', 'JAWA TENGAH', 'Indonesia', 'Kristen', 'Kawin', 'Swasta', '082225426050', '', '2025-06-25 08:13:23'),
(1222, 'Siti Aminah', '3374024806850003', 'Lainnya', '3373032206170007', 'P', 'Salatiga', '1985-09-14', 'Randuares', 7, 1, 'KUMPULREJO', 'ARGOMULYO', 'KOTA SALATIGA', 'JAWA TENGAH', 'Indonesia', 'Kristen', 'Lainnya', 'Swasta', '082225426050', '', '2025-06-21 08:51:28'),
(1223, 'AURELLIA CITRA NAOMI WIBOWO', '3373036908140002', 'Lainnya', '3373032206170007', 'P', 'Salatiga', '2014-08-29', 'Randuares', 7, 1, 'KUMPULREJO', 'ARGOMULYO', 'KOTA SALATIGA', 'JAWA TENGAH', 'Indonesia', 'Kristen', 'Lainnya', 'Swasta', '082225426050', '', '2025-06-21 08:51:28'),
(1224, 'ELVANO FARESTA KENZO WIBOWO', '3373031102190001', 'Lainnya', '3373032206170007', 'L', 'Salatiga', '2019-02-11', 'Randuares', 7, 1, 'KUMPULREJO', 'ARGOMULYO', 'KOTA SALATIGA', 'JAWA TENGAH', 'Indonesia', 'Kristen', 'Lainnya', 'Swasta', '082225426050', '', '2025-06-21 08:51:28'),
(1225, 'GEVARIEL CLARETTA APRILIA WIBOWO', '3373034604240001', 'Lainnya', '3373032206170007', 'P', 'Salatiga', '2024-04-06', 'Randuares', 7, 1, 'KUMPULREJO', 'ARGOMULYO', 'KOTA SALATIGA', 'JAWA TENGAH', 'Indonesia', 'Kristen', 'Lainnya', 'Swasta', '082225426050', '', '2025-06-21 08:51:28'),
(1226, 'Tomas Kristianto', '3373023004860001', 'Kepala Keluarga', '3373032211170001', 'L', 'Salatiga', '1986-04-30', 'Randuares', 7, 1, 'KUMPULREJO', 'ARGOMULYO', 'KOTA SALATIGA', 'JAWA TENGAH', 'Indonesia', 'Kristen', 'Kawin', 'Swasta', '081914205799', '', '2025-06-25 08:12:59'),
(1227, 'Natalia Lestariningrum', '3373036712890001', 'Lainnya', '3373032211170001', 'P', 'Salatiga', '1989-12-27', 'Randuares', 7, 1, 'KUMPULREJO', 'ARGOMULYO', 'KOTA SALATIGA', 'JAWA TENGAH', 'Indonesia', 'Kristen', 'Lainnya', 'Swasta', '085641999900', '', '2025-06-21 08:51:28'),
(1228, 'CIESA MICHELLE KRISTIANTO', '3373034712230001', 'Lainnya', '3373032211170001', 'P', 'Salatiga', '2023-12-07', 'Randuares', 7, 1, 'KUMPULREJO', 'ARGOMULYO', 'KOTA SALATIGA', 'JAWA TENGAH', 'Indonesia', 'Kristen', 'Lainnya', 'Swasta', '085641999900', '', '2025-06-21 08:51:28'),
(1229, 'Adi Hermany', '3373032805820002', 'Kepala Keluarga', '3373032302110002', 'L', 'Salatiga', '1982-05-25', 'Randuares', 7, 1, 'KUMPULREJO', 'ARGOMULYO', 'KOTA SALATIGA', 'JAWA TENGAH', 'Indonesia', 'Kristen', 'Kawin', 'Wiraswasta', '085878121476', '', '2025-06-25 08:11:16'),
(1230, 'Tri Ningtyas Suryarini', '3373034208850005', 'Lainnya', '3373032302110002', 'P', 'Salatiga', '1985-08-02', 'Randuares', 7, 1, 'KUMPULREJO', 'ARGOMULYO', 'KOTA SALATIGA', 'JAWA TENGAH', 'Indonesia', 'Kristen', 'Lainnya', 'Swasta', '085640192043', '', '2025-06-21 08:51:28'),
(1231, 'Sigit Hermawan', '3318102104770004', 'Kepala Keluarga', '3373032305170005', 'L', 'Salatiga', '1977-04-21', 'Randuares', 7, 1, 'KUMPULREJO', 'ARGOMULYO', 'KOTA SALATIGA', 'JAWA TENGAH', 'Indonesia', 'Kristen', 'Kawin', 'PNS', '085747581039', '', '2025-06-25 08:10:45'),
(1232, 'Sri Rusmiyati', '3318104104790002', 'Lainnya', '3373032305170005', 'P', 'Salatiga', '1979-04-01', 'Randuares', 7, 1, 'KUMPULREJO', 'ARGOMULYO', 'KOTA SALATIGA', 'JAWA TENGAH', 'Indonesia', 'Kristen', 'Lainnya', 'Swasta', '083128458366', '', '2025-06-21 08:51:28'),
(1233, 'Moses Landung Herwanto', '3318101106050003', 'Lainnya', '3373032305170005', 'L', 'Salatiga', '2005-06-11', 'Randuares', 7, 1, 'KUMPULREJO', 'ARGOMULYO', 'KOTA SALATIGA', 'JAWA TENGAH', 'Indonesia', 'Kristen', 'Lainnya', 'Swasta', '083128458366', '', '2025-06-21 08:51:28'),
(1234, 'EDELWEISS RINJANI PUTRI HERMAWAN', '3318106802100003', 'Lainnya', '3373032305170005', 'P', 'Salatiga', '2010-02-28', 'Randuares', 7, 1, 'KUMPULREJO', 'ARGOMULYO', 'KOTA SALATIGA', 'JAWA TENGAH', 'Indonesia', 'Kristen', 'Lainnya', 'Swasta', '083128458366', '', '2025-06-21 08:51:28'),
(1235, 'WINTANG SEDAYU PUTRI HERMAWAN', '3373034909190002', 'Lainnya', '3373032305170005', 'P', 'Salatiga', '2019-09-09', 'Randuares', 7, 1, 'KUMPULREJO', 'ARGOMULYO', 'KOTA SALATIGA', 'JAWA TENGAH', 'Indonesia', 'Kristen', 'Lainnya', 'Swasta', '083128458366', '', '2025-06-21 08:51:28'),
(1236, 'Marno Mariyana', '3322011804770004', 'Kepala Keluarga', '3373032504120001', 'L', 'Salatiga', '1977-04-18', 'Randuares', 7, 1, 'KUMPULREJO', 'ARGOMULYO', 'KOTA SALATIGA', 'JAWA TENGAH', 'Indonesia', 'Islam', 'Kawin', 'Swasta', '08981618605', '', '2025-06-25 11:01:37'),
(1237, 'Tri Mariyana', '3373037107890003', 'Lainnya', '3373032504120001', 'L', 'Salatiga', '1989-07-31', 'Randuares', 7, 1, 'KUMPULREJO', 'ARGOMULYO', 'KOTA SALATIGA', 'JAWA TENGAH', 'Indonesia', 'Kristen', 'Lainnya', 'Swasta', '085641867167', '', '2025-06-21 08:51:29'),
(1238, 'Supriyati Yoyok', '3373036710530001', 'Kepala Keluarga', '3373032509240002', 'P', 'Salatiga', '1953-10-27', 'Randuares', 7, 1, 'KUMPULREJO', 'ARGOMULYO', 'KOTA SALATIGA', 'JAWA TENGAH', 'Indonesia', 'Islam', 'Cerai Mati', 'Tidak Bekerja', '083844173754', '', '2025-06-25 11:12:42'),
(1239, 'Nurcahyo Prihandoko', '3373031409840004', 'Lainnya', '3373032509240002', 'L', 'Salatiga', '1984-09-14', 'Randuares', 7, 1, 'KUMPULREJO', 'ARGOMULYO', 'KOTA SALATIGA', 'JAWA TENGAH', 'Indonesia', 'Kristen', 'Lainnya', 'Swasta', '083844173754', '', '2025-06-21 08:51:29'),
(1240, 'Ponco Yulianto', '3373032007930001', 'Kepala Keluarga', '3373032612190001', 'L', 'Salatiga', '1993-07-20', 'Randuares', 7, 1, 'KUMPULREJO', 'ARGOMULYO', 'KOTA SALATIGA', 'JAWA TENGAH', 'Indonesia', 'Kristen', 'Kawin', 'Swasta', '089677345842', '', '2025-06-25 08:09:12'),
(1241, 'Yeusy Vitasari', '3373036508940001', 'Lainnya', '3373032612190001', 'P', 'Salatiga', '1994-08-25', 'Randuares', 7, 1, 'KUMPULREJO', 'ARGOMULYO', 'KOTA SALATIGA', 'JAWA TENGAH', 'Indonesia', 'Kristen', 'Lainnya', 'Swasta', '085713332229', '', '2025-06-21 08:51:29'),
(1242, 'JANUNDRA GALANT KASTADHARMA', '3373032812200002', 'Lainnya', '3373032612190001', 'L', 'Salatiga', '2020-12-28', 'Randuares', 7, 1, 'KUMPULREJO', 'ARGOMULYO', 'KOTA SALATIGA', 'JAWA TENGAH', 'Indonesia', 'Kristen', 'Lainnya', 'Swasta', '085713332229', '', '2025-06-21 08:51:29'),
(1243, 'Marno Ramini', '3373032209580001', 'Kepala Keluarga', '3373032702090001', 'L', 'Salatiga', '1958-09-22', 'Randuares', 7, 1, 'KUMPULREJO', 'ARGOMULYO', 'KOTA SALATIGA', 'JAWA TENGAH', 'Indonesia', 'Kristen', 'Kawin', 'Pensiunan', '085877818307', '', '2025-06-25 11:01:24'),
(1244, 'Ramini', '3373035002600002', 'Lainnya', '3373032702090001', 'P', 'Salatiga', '1960-02-10', 'Randuares', 7, 1, 'KUMPULREJO', 'ARGOMULYO', 'KOTA SALATIGA', 'JAWA TENGAH', 'Indonesia', 'Kristen', 'Lainnya', 'Swasta', '085877818307', '', '2025-06-21 08:51:29'),
(1245, 'Aeyuk Setiyono', '3373030207800003', 'Lainnya', '3373032702090001', 'L', 'Salatiga', '1980-07-02', 'Randuares', 7, 1, 'KUMPULREJO', 'ARGOMULYO', 'KOTA SALATIGA', 'JAWA TENGAH', 'Indonesia', 'Kristen', 'Lainnya', 'Swasta', '085877818307', '', '2025-06-21 08:51:29'),
(1246, 'Ari Syafroni', '3322060405900002', 'Kepala Keluarga', '3373032709170002', 'L', 'Salatiga', '1990-05-04', 'Randuares', 7, 1, 'KUMPULREJO', 'ARGOMULYO', 'KOTA SALATIGA', 'JAWA TENGAH', 'Indonesia', 'Islam', 'Kawin', 'Swasta', '085713003069', '', '2025-06-25 08:06:21'),
(1247, 'Agustin Rosiana', '3373034308910004', 'Lainnya', '3373032709170002', 'P', 'Salatiga', '1991-08-03', 'Randuares', 7, 1, 'KUMPULREJO', 'ARGOMULYO', 'KOTA SALATIGA', 'JAWA TENGAH', 'Indonesia', 'Kristen', 'Lainnya', 'Swasta', '085713003069', '', '2025-06-21 08:51:29'),
(1248, 'SEPTIA ARIAZETI RAHAYU', '3322066209120004', 'Lainnya', '3373032709170002', 'P', 'Salatiga', '2012-09-22', 'Randuares', 7, 1, 'KUMPULREJO', 'ARGOMULYO', 'KOTA SALATIGA', 'JAWA TENGAH', 'Indonesia', 'Kristen', 'Lainnya', 'Swasta', '085713003069', '', '2025-06-21 08:51:29'),
(1249, 'RACHEL ARIANA ZHELYNA', '3373032709170002', 'Lainnya', '3373032709170002', 'P', 'Salatiga', '2019-07-08', 'Randuares', 7, 1, 'KUMPULREJO', 'ARGOMULYO', 'KOTA SALATIGA', 'JAWA TENGAH', 'Indonesia', 'Kristen', 'Lainnya', 'Swasta', '085713003069', '', '2025-06-25 15:13:47'),
(1250, 'Muljadi Hardono', '3373032112480001', 'Kepala Keluarga', '3373032808090001', 'L', 'Salatiga', '1948-12-21', 'Randuares', 7, 1, 'KUMPULREJO', 'ARGOMULYO', 'KOTA SALATIGA', 'JAWA TENGAH', 'Indonesia', 'Islam', 'Kawin', 'Swasta', '089823003301', '', '2025-06-25 08:05:59'),
(1251, 'Dian Lelawati', '3373034605670002', 'Lainnya', '3373032808090001', 'P', 'Salatiga', '1967-05-06', 'Randuares', 7, 1, 'KUMPULREJO', 'ARGOMULYO', 'KOTA SALATIGA', 'JAWA TENGAH', 'Indonesia', 'Kristen', 'Lainnya', 'Swasta', '081326025013', '', '2025-06-21 08:51:29'),
(1252, 'Shalsalina Mulya Wardani', '3373034603990001', 'Lainnya', '3373032808090001', 'P', 'Salatiga', '1999-03-06', 'Randuares', 7, 1, 'KUMPULREJO', 'ARGOMULYO', 'KOTA SALATIGA', 'JAWA TENGAH', 'Indonesia', 'Kristen', 'Lainnya', 'Swasta', '081326025013', '', '2025-06-21 08:51:29'),
(1253, 'Imanuel Susanto', '3373031212780003', 'Kepala Keluarga', '3373032810090013', 'L', 'Salatiga', '1978-12-12', 'Randuares', 7, 1, 'KUMPULREJO', 'ARGOMULYO', 'KOTA SALATIGA', 'JAWA TENGAH', 'Indonesia', 'Katolik', 'Kawin', 'Swasta', '081325911712', '', '2025-06-25 08:05:31'),
(1254, 'Niken Sulistyo Rini', '3373036506760004', 'Lainnya', '3373032810090013', 'P', 'Salatiga', '1976-06-25', 'Randuares', 7, 1, 'KUMPULREJO', 'ARGOMULYO', 'KOTA SALATIGA', 'JAWA TENGAH', 'Indonesia', 'Kristen', 'Lainnya', 'Swasta', '085747482115', '', '2025-06-21 08:51:29'),
(1255, 'NICHOLAS DAFFIN SUSANTO', '3373030205160002', 'Lainnya', '3373032810090013', 'L', 'Salatiga', '2016-05-02', 'Randuares', 7, 1, 'KUMPULREJO', 'ARGOMULYO', 'KOTA SALATIGA', 'JAWA TENGAH', 'Indonesia', 'Kristen', 'Lainnya', 'Swasta', '081325911712', '', '2025-06-21 08:51:29'),
(1256, 'ZEFANYA NATHANIA STEPHANI', '3373035103170001', 'Lainnya', '3373032810090013', 'P', 'Salatiga', '2017-03-11', 'Randuares', 7, 1, 'KUMPULREJO', 'ARGOMULYO', 'KOTA SALATIGA', 'JAWA TENGAH', 'Indonesia', 'Kristen', 'Lainnya', 'Swasta', '081325911712', '', '2025-06-21 08:51:29'),
(1257, 'Yoseph Mareta Dwiyono Pamujianto', '3373031203760003', 'Kepala Keluarga', '3373032810090017', 'L', 'Salatiga', '1976-03-12', 'Randuares', 7, 1, 'KUMPULREJO', 'ARGOMULYO', 'KOTA SALATIGA', 'JAWA TENGAH', 'Indonesia', 'Katolik', 'Kawin', 'Swasta', '081391811997', '', '2025-06-25 08:05:03'),
(1258, 'Weni Deniawati', '3373036206760001', 'Lainnya', '3373032810090017', 'P', 'Salatiga', '1976-06-22', 'Randuares', 7, 1, 'KUMPULREJO', 'ARGOMULYO', 'KOTA SALATIGA', 'JAWA TENGAH', 'Indonesia', 'Kristen', 'Lainnya', 'Swasta', '082138398988', '', '2025-06-21 08:51:29'),
(1259, 'Lewita Puspa Elok Pambayun', '3373036912040002', 'Lainnya', '3373032810090017', 'P', 'Salatiga', '2004-12-29', 'Randuares', 7, 1, 'KUMPULREJO', 'ARGOMULYO', 'KOTA SALATIGA', 'JAWA TENGAH', 'Indonesia', 'Kristen', 'Lainnya', 'Swasta', '085877572004', '', '2025-06-21 08:51:29'),
(1260, 'VINALIA AVE GRATIA', '3373036803130001', 'Lainnya', '3373032810090017', 'P', 'Salatiga', '2013-03-18', 'Randuares', 7, 1, 'KUMPULREJO', 'ARGOMULYO', 'KOTA SALATIGA', 'JAWA TENGAH', 'Indonesia', 'Kristen', 'Lainnya', 'Swasta', '082138398988', '', '2025-06-21 08:51:29'),
(1261, 'Kadarismanto', '3373031108700001', 'Kepala Keluarga', '3373032811080009', 'L', 'Salatiga', '1970-08-11', 'Randuares', 7, 1, 'KUMPULREJO', 'ARGOMULYO', 'KOTA SALATIGA', 'JAWA TENGAH', 'Indonesia', 'Islam', 'Kawin', 'PNS', '0895359055793', '', '2025-06-25 08:03:50'),
(1262, 'Sulasmi', '3373035711650002', 'Lainnya', '3373032811080009', 'P', 'Salatiga', '1965-11-17', 'Randuares', 7, 1, 'KUMPULREJO', 'ARGOMULYO', 'KOTA SALATIGA', 'JAWA TENGAH', 'Indonesia', 'Kristen', 'Lainnya', 'Swasta', '0895359055793', '', '2025-06-21 08:51:29'),
(1263, 'Tri September Rini', '3373034809800001', 'Kepala Keluarga', '3373032903170004', 'P', 'Salatiga', '1980-09-08', 'Randuares', 7, 1, 'KUMPULREJO', 'ARGOMULYO', 'KOTA SALATIGA', 'JAWA TENGAH', 'Indonesia', 'Kristen', 'Cerai Hidup', 'Swasta', '083110359866', '', '2025-06-25 08:02:35'),
(1264, 'Ade Julian Arisalasa Putra', '3373030207020001', 'Lainnya', '3373032903170004', 'L', 'Salatiga', '2002-07-02', 'Randuares', 7, 1, 'KUMPULREJO', 'ARGOMULYO', 'KOTA SALATIGA', 'JAWA TENGAH', 'Indonesia', 'Kristen', 'Lainnya', 'Swasta', '083110359866', '', '2025-06-21 08:51:29'),
(1265, 'Adinda Marcheilla Putri', '3373036203050002', 'Lainnya', '3373032903170004', 'P', 'Salatiga', '2005-05-22', 'Randuares', 7, 1, 'KUMPULREJO', 'ARGOMULYO', 'KOTA SALATIGA', 'JAWA TENGAH', 'Indonesia', 'Kristen', 'Lainnya', 'Swasta', '083110359866', '', '2025-06-21 08:51:29'),
(1266, 'YOSIA ARYA SATYAKI', '3373031205110002', 'Lainnya', '3373032903170004', 'L', 'Salatiga', '2011-05-12', 'Randuares', 7, 1, 'KUMPULREJO', 'ARGOMULYO', 'KOTA SALATIGA', 'JAWA TENGAH', 'Indonesia', 'Kristen', 'Lainnya', 'Swasta', '083110359866', '', '2025-06-21 08:51:29'),
(1267, 'Sunarti', '3373035708580002', 'Kepala Keluarga', '3373032911210002', 'P', 'Salatiga', '1958-08-17', 'Randuares', 7, 1, 'KUMPULREJO', 'ARGOMULYO', 'KOTA SALATIGA', 'JAWA TENGAH', 'Indonesia', 'Kristen', 'Cerai Mati', 'IRT', '085876886724', '', '2025-06-25 08:03:15'),
(1268, 'Oki Hermawan', '3373030110900002', 'Kepala Keluarga', '3373033005170006', 'L', 'Salatiga', '1990-10-01', 'Randuares', 7, 1, 'KUMPULREJO', 'ARGOMULYO', 'KOTA SALATIGA', 'JAWA TENGAH', 'Indonesia', 'Kristen', 'Kawin', 'Wiraswasta', '085640599544', '', '2025-06-25 08:01:55'),
(1269, 'Rena Oktavia Untaya', '3373044910920002', 'Lainnya', '3373033005170006', 'P', 'Salatiga', '1992-10-09', 'Randuares', 7, 1, 'KUMPULREJO', 'ARGOMULYO', 'KOTA SALATIGA', 'JAWA TENGAH', 'Indonesia', 'Kristen', 'Lainnya', 'Swasta', '081548490070', '', '2025-06-21 08:51:29'),
(1270, 'JEANNIETA RACHEL MARCHEILLA HERMAWAN', '3373036403170003', 'Lainnya', '3373033005170006', 'P', 'Salatiga', '2017-03-24', 'Randuares', 7, 1, 'KUMPULREJO', 'ARGOMULYO', 'KOTA SALATIGA', 'JAWA TENGAH', 'Indonesia', 'Kristen', 'Lainnya', 'Swasta', '081548490070', '', '2025-06-21 08:51:29'),
(1271, 'JUNIOR OTHNIEL NATHANAEL HERMAWAN', '3373032106230003', 'Lainnya', '3373033005170006', 'L', 'Salatiga', '2023-06-21', 'Randuares', 7, 1, 'KUMPULREJO', 'ARGOMULYO', 'KOTA SALATIGA', 'JAWA TENGAH', 'Indonesia', 'Kristen', 'Lainnya', 'Swasta', '081548490070', '', '2025-06-21 08:51:29'),
(1272, 'Tatik Rahayu', '1606076204700003', 'Kepala Keluarga', '3373033009240004', 'P', 'Salatiga', '1970-04-25', 'Randuares', 7, 1, 'KUMPULREJO', 'ARGOMULYO', 'KOTA SALATIGA', 'JAWA TENGAH', 'Indonesia', 'Islam', 'Kawin', 'Swasta', '085269312290', '', '2025-06-25 08:01:33'),
(1273, 'Andri Purwoko', '3373032712800003', 'Kepala Keluarga', '3373033012080009', 'L', 'Salatiga', '1980-12-27', 'Randuares', 7, 1, 'KUMPULREJO', 'ARGOMULYO', 'KOTA SALATIGA', 'JAWA TENGAH', 'Indonesia', 'Kristen', 'Kawin', 'Swasta', '081229332223', '', '2025-06-25 10:21:05'),
(1274, 'Misaria Artipadi', '3373036005800003', 'Lainnya', '3373033012080009', 'P', 'Salatiga', '1980-05-20', 'Randuares', 7, 1, 'KUMPULREJO', 'ARGOMULYO', 'KOTA SALATIGA', 'JAWA TENGAH', 'Indonesia', 'Kristen', 'Lainnya', 'Swasta', '085878280021', '', '2025-06-21 08:51:30'),
(1275, 'LIONEL EVAN', '3373032308090002', 'Lainnya', '3373033012080009', 'L', 'Salatiga', '2009-08-23', 'Randuares', 7, 1, 'KUMPULREJO', 'ARGOMULYO', 'KOTA SALATIGA', 'JAWA TENGAH', 'Indonesia', 'Kristen', 'Lainnya', 'Swasta', '085878280021', '', '2025-06-21 08:51:30'),
(1276, 'Heru Setiawan', '3322041603960003', 'Kepala Keluarga', '3373033012210003', 'L', 'Salatiga', '1996-03-16', 'Randuares', 7, 1, 'KUMPULREJO', 'ARGOMULYO', 'KOTA SALATIGA', 'JAWA TENGAH', 'Indonesia', 'Katolik', 'Kawin', 'Tidak Bekerja', '082138282238', '', '2025-06-25 08:00:48'),
(1277, 'Elsa Anindya Putri', '3373034110950001', 'Lainnya', '3373033012210003', 'P', 'Salatiga', '1995-10-01', 'Randuares', 7, 1, 'KUMPULREJO', 'ARGOMULYO', 'KOTA SALATIGA', 'JAWA TENGAH', 'Indonesia', 'Kristen', 'Lainnya', 'Swasta', '082138282238', '', '2025-06-21 08:51:30'),
(1278, 'QUEENSHA AMARA ADILA', '3373036311210003', 'Lainnya', '3373033012210003', 'L', 'Salatiga', '2021-11-23', 'Randuares', 7, 1, 'KUMPULREJO', 'ARGOMULYO', 'KOTA SALATIGA', 'JAWA TENGAH', 'Indonesia', 'Kristen', 'Lainnya', 'Swasta', '082138282238', '', '2025-06-21 08:51:30'),
(1279, 'NADINE AURELIA EVELYN', '3373037105230001', 'Lainnya', '3373033012210003', 'L', 'Salatiga', '2023-05-31', 'Randuares', 7, 1, 'KUMPULREJO', 'ARGOMULYO', 'KOTA SALATIGA', 'JAWA TENGAH', 'Indonesia', 'Kristen', 'Lainnya', 'Swasta', '082138282238', '', '2025-06-21 08:51:30'),
(1280, 'Sarno', '3373030708650003', 'Kepala Keluarga', '3373033101081668', 'L', 'Salatiga', '1965-08-07', 'Randuares', 7, 1, 'KUMPULREJO', 'ARGOMULYO', 'KOTA SALATIGA', 'JAWA TENGAH', 'Indonesia', 'Kristen', 'Kawin', 'Wiraswasta', '082323351717', '', '2025-06-25 07:55:37'),
(1281, 'Raminah', '3373034612610001', 'Lainnya', '3373033101081668', 'P', 'Salatiga', '1961-12-06', 'Randuares', 7, 1, 'KUMPULREJO', 'ARGOMULYO', 'KOTA SALATIGA', 'JAWA TENGAH', 'Indonesia', 'Kristen', 'Lainnya', 'Swasta', '0895605379410', '', '2025-06-21 08:51:30'),
(1282, 'Anggrin Ervana Sari', '3373035905960001', 'Lainnya', '3373033101081668', 'P', 'Salatiga', '1996-05-19', 'Randuares', 7, 1, 'KUMPULREJO', 'ARGOMULYO', 'KOTA SALATIGA', 'JAWA TENGAH', 'Indonesia', 'Kristen', 'Lainnya', 'Swasta', '081295442080', '', '2025-06-21 08:51:30'),
(1283, 'Ella Afrida', '3373036104080001', 'Lainnya', '3373033101081668', 'P', 'Salatiga', '2008-04-21', 'Randuares', 7, 1, 'KUMPULREJO', 'ARGOMULYO', 'KOTA SALATIGA', 'JAWA TENGAH', 'Indonesia', 'Kristen', 'Lainnya', 'Swasta', '083141089800', '', '2025-06-21 08:51:30'),
(1284, 'Agus Sulistyo', '3373031208580002', 'Kepala Keluarga', '3373033101082099', 'L', 'Salatiga', '1958-08-12', 'Randuares', 7, 1, 'KUMPULREJO', 'ARGOMULYO', 'KOTA SALATIGA', 'JAWA TENGAH', 'Indonesia', 'Islam', 'Kawin', 'Wiraswasta', '081392115418', '', '2025-06-25 07:54:59'),
(1285, 'Maryuningsih', '3373034906620002', 'Lainnya', '3373033101082099', 'P', 'Salatiga', '1962-06-09', 'Randuares', 7, 1, 'KUMPULREJO', 'ARGOMULYO', 'KOTA SALATIGA', 'JAWA TENGAH', 'Indonesia', 'Kristen', 'Lainnya', 'Swasta', '081392115418', '', '2025-06-21 08:51:30'),
(1286, 'Sri Rohyati', '3373034710700004', 'Kepala Keluarga', '3373033101082252', 'P', 'Salatiga', '1970-10-07', 'Randuares', 7, 1, 'KUMPULREJO', 'ARGOMULYO', 'KOTA SALATIGA', 'JAWA TENGAH', 'Indonesia', 'Kristen', 'Cerai Hidup', 'Wiraswasta', '085702657737', '', '2025-06-25 07:52:26'),
(1287, 'Deni Chandra Setiawan', '3373031003940002', 'Lainnya', '3373033101082252', 'L', 'Salatiga', '1994-03-10', 'Randuares', 7, 1, 'KUMPULREJO', 'ARGOMULYO', 'KOTA SALATIGA', 'JAWA TENGAH', 'Indonesia', 'Kristen', 'Lainnya', 'Swasta', '08989974264', '', '2025-06-21 08:51:30'),
(1288, 'Didik Yahyono Purwo', '3373031911690001', 'Kepala Keluarga', '3373033101083384', 'L', 'Salatiga', '1969-11-16', 'Randuares', 7, 1, 'KUMPULREJO', 'ARGOMULYO', 'KOTA SALATIGA', 'JAWA TENGAH', 'Indonesia', 'Kristen', 'Kawin', 'PNS', '083162173200', '', '2025-06-25 07:51:33'),
(1289, 'Andarwati', '3373034401740001', 'Lainnya', '3373033101083384', 'P', 'Salatiga', '1974-01-04', 'Randuares', 7, 1, 'KUMPULREJO', 'ARGOMULYO', 'KOTA SALATIGA', 'JAWA TENGAH', 'Indonesia', 'Kristen', 'Lainnya', 'Swasta', '085702040904', '', '2025-06-21 08:51:30'),
(1290, 'Sherly Antharista Ervina', '3373036805020001', 'Lainnya', '3373033101083384', 'P', 'Salatiga', '2002-05-28', 'Randuares', 7, 1, 'KUMPULREJO', 'ARGOMULYO', 'KOTA SALATIGA', 'JAWA TENGAH', 'Indonesia', 'Kristen', 'Lainnya', 'Swasta', '083857164909', '', '2025-06-21 08:51:30'),
(1291, 'MIRANDA SHANYKA RASTI', '3373034907130001', 'Lainnya', '3373033101083384', 'P', 'Salatiga', '2013-07-09', 'Randuares', 7, 1, 'KUMPULREJO', 'ARGOMULYO', 'KOTA SALATIGA', 'JAWA TENGAH', 'Indonesia', 'Kristen', 'Lainnya', 'Swasta', '085702040904', '', '2025-06-21 08:51:30'),
(1292, 'Rivaldo Armando Bekabel', '3373042711990002', 'Kepala Keluarga', '3373041303240006', 'L', 'Salatiga', '1999-11-29', 'Randuares', 7, 1, 'KUMPULREJO', 'ARGOMULYO', 'KOTA SALATIGA', 'JAWA TENGAH', 'Indonesia', 'Kristen', 'Kawin', 'Swasta', '085875878852', '', '2025-06-25 07:51:02'),
(1293, 'MARIA DEWI PUSPITASARI', '3373036203010001', 'Lainnya', '3373041303240006', 'P', 'Salatiga', '2001-03-22', 'Randuares', 7, 1, 'KUMPULREJO', 'ARGOMULYO', 'KOTA SALATIGA', 'JAWA TENGAH', 'Indonesia', 'Kristen', 'Lainnya', 'Swasta', '085875878852', '', '2025-06-21 08:51:30'),
(1294, 'ZEFANYA MECCAYLA BEKABEL', '3373034903250001', 'Lainnya', '3373041303240006', 'P', 'Salatiga', '2025-03-09', 'Randuares', 7, 1, 'KUMPULREJO', 'ARGOMULYO', 'KOTA SALATIGA', 'JAWA TENGAH', 'Indonesia', 'Kristen', 'Lainnya', 'Swasta', '085875878852', '', '2025-06-21 08:51:30'),
(1295, 'Ristanto Adi Nugroho', '3373041607890002', 'Kepala Keluarga', '3373042602180002', 'L', 'Salatiga', '1989-07-16', 'Randuares', 7, 1, 'KUMPULREJO', 'ARGOMULYO', 'KOTA SALATIGA', 'JAWA TENGAH', 'Indonesia', 'Kristen', 'Kawin', 'Swasta', '081227481134', '', '2025-06-25 07:50:31');
INSERT INTO `tb_warga` (`id_warga`, `nama`, `nik`, `hubungan`, `nikk`, `jenkel`, `tpt_lahir`, `tgl_lahir`, `alamat`, `rt`, `rw`, `kelurahan`, `kecamatan`, `kota`, `propinsi`, `negara`, `agama`, `status`, `pekerjaan`, `hp`, `foto`, `tgl_warga`) VALUES
(1296, 'Tri Natalina', '3309156512850002', 'Lainnya', '3373042602180002', 'P', 'Salatiga', '1985-12-25', 'Randuares', 7, 1, 'KUMPULREJO', 'ARGOMULYO', 'KOTA SALATIGA', 'JAWA TENGAH', 'Indonesia', 'Kristen', 'Lainnya', 'Swasta', '089659708548', '', '2025-06-21 08:51:30'),
(1297, 'ANDRA GANGSAR NUGROHO', '3373040303180002', 'Lainnya', '3373042602180002', 'L', 'Salatiga', '2018-03-03', 'Randuares', 7, 1, 'KUMPULREJO', 'ARGOMULYO', 'KOTA SALATIGA', 'JAWA TENGAH', 'Indonesia', 'Kristen', 'Lainnya', 'Swasta', '089659708548', '', '2025-06-21 08:51:30'),
(1298, 'Marsudi', '3374021110570004', 'Kepala Keluarga', '3374021512050462', 'L', 'Salatiga', '1957-10-11', 'Randuares', 7, 1, 'KUMPULREJO', 'ARGOMULYO', 'KOTA SALATIGA', 'JAWA TENGAH', 'Indonesia', 'Islam', 'Kawin', 'Swasta', '081390317713', '', '2025-06-25 07:22:14'),
(1299, 'Dwi Setyaning Rahayu', '3322075212600001', 'Lainnya', '3374021512050462', 'P', 'Salatiga', '1960-12-12', 'Randuares', 7, 1, 'KUMPULREJO', 'ARGOMULYO', 'KOTA SALATIGA', 'JAWA TENGAH', 'Indonesia', 'Kristen', 'Lainnya', 'Swasta', '081390317713', '', '2025-06-21 08:51:31'),
(1300, 'Gatot Novantoro', '3374061911810001', 'Kepala Keluarga', '3374061007180007', 'L', 'Salatiga', '1981-11-19', 'Randuares', 7, 1, 'KUMPULREJO', 'ARGOMULYO', 'KOTA SALATIGA', 'JAWA TENGAH', 'Indonesia', 'Islam', 'Kawin', 'Swasta', '081229926661', 'images/warga/warga_1750746693_685a4645d6788.png', '2025-06-24 06:31:33'),
(1301, 'Reni Rosa Riana Yulianingtyas', '3373034607870002', 'Istri', '3374061007180007', 'P', 'Salatiga', '1987-07-06', 'Randuares', 7, 1, 'KUMPULREJO', 'ARGOMULYO', 'KOTA SALATIGA', 'JAWA TENGAH', 'Indonesia', 'Islam', 'Kawin', 'Swasta', '081229926661', '', '2025-06-24 06:29:58'),
(1302, 'GIBRAN MAULANA DAMARJATI AL-FATIH', '3374060401190003', 'Anak', '3374061007180007', 'L', 'Salatiga', '2019-01-04', 'Randuares', 7, 1, 'KUMPULREJO', 'ARGOMULYO', 'KOTA SALATIGA', 'JAWA TENGAH', 'Indonesia', 'Islam', 'Belum Kawin', 'Pelajar', '081229926661', 'images/warga/warga_1750727101_6859f9bdb82f9.png', '2025-06-24 06:29:30');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id_code` varchar(20) NOT NULL,
  `user_name` varchar(50) NOT NULL,
  `name` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `shift` varchar(20) NOT NULL,
  `role` varchar(20) NOT NULL DEFAULT 'user'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id_code`, `user_name`, `name`, `password`, `shift`, `role`) VALUES
('USER000', 'warga', 'Warga RT.07', '$2y$10$LBXavf35Z1r/vz.1.UHsEO4VE5lZlvP7cMW28NOb6mimlHyTpqH8i', '-', 'warga'),
('USER001', 'surya', 'Suryantoro', '$2y$10$yaEy6wiGta7PJeHb4Rm9oezaOcqJ9ge1/pwrSFfGF/mkY.UbKq16W', 'Monday', 'user'),
('USER002', 'julian', 'Julian', '$2y$10$Lz2.OAhS1XjlfFS/sY1elu1FRu3CJxn5J3tfj04C3WotpJBfgLuDG', 'Monday', 'user'),
('USER003', 'aguss', 'Agus Sulistyo', '$2y$10$ObmtZY5T/17tkUElhLbOwuYx8RN2atvVji2hAtzQeMTtQxzkTyTNW', 'Monday', 'user'),
('USER004', 'yoses', 'Yoses', '$2y$10$yZjGW/Me/KsQM6XuoE/2luVUIEsLardAqURwfYemh0gYxw1Gp664O', 'Monday', 'user'),
('USER005', 'thomas', 'Tomas Kristianto', '$2y$10$rRFSvHkLY.eTzMrGlZtETOFeDWRVRDsW1YnsvGzZ/zk06.xrtJhnO', 'Monday', 'user'),
('USER006', 'jumadi', 'Jumadi', '$2y$10$.drr.mwo2/wR8FTKGoBS7eh5vxgU59vpJzciH6.ekn2uV2c.HjNrC', 'Monday', 'user'),
('USER007', 'indra', 'Indra Sriyanto', '$2y$10$fPN437KrRaCTku99bhVKJOSRhk8AXe66qqLikbH8eeYe3N7nO/Mi.', 'Monday', 'user'),
('USER009', 'cahyo', 'Nur Cahyo Prihandoko', '$2y$10$P2rYfG3YubsU/I4NAnIwP.a7uTzCu52eTirSDFMg5etkvE6.01Vwi', 'Tuesday', 'pengurus'),
('USER010', 'yosep', 'Yoseph Mareta Dwiyono Pamujianto', '$2y$10$3IEj6XogY7qgT5UJt8dBau/gZqrcEvJeKPTuAl.WvMb6NgEPjt1SC', 'Tuesday', 'user'),
('USER011', 'djito', 'Rudjito', '$2y$10$TsNDAOlRX99xOSnQyzLjieqVqIv3lYPsiakWZj.8ChmMbLJ1ih.2K', 'Tuesday', 'user'),
('USER012', 'sodiq', 'Jafar Sodiq', '$2y$10$AKwfzyskDtzBOUsfIuj45.XeJKLIlc9XyWzA27YZQzWu5mr6vlIu.', 'Tuesday', 'user'),
('USER013', 'marnoa', 'Marno Ayuk', '$2y$10$hFX6Po0.nH5KMEsdYDKpH.KqLgmXSwjJyEfmc.yhi8FQDtauSIOda', 'Tuesday', 'user'),
('USER014', 'dimas', 'Dimas Wisnu (DEVARA)', '$2y$10$poKEEEQSbEDrdGTL/ena4.2JzROJas.xcA3JJJpKIvccsta3YBK0S', 'Tuesday', 'user'),
('USER015', 'sakiman', 'Sakiman', '$2y$10$pMoml76wVItETMloM/QyTei7hXcHt5k7Wr1p6a/S34VEaxU5cAPva', 'Tuesday', 'user'),
('USER016', 'sigit', 'Sigit Hermawan', '$2y$10$LmQmiIEH99OUMrfS0/wef.T9Ez5z5jvAVHdaMZuIBUC.svilzqe2q', 'Wednesday', 'pengurus'),
('USER017', 'rivaldo', 'Rivaldo Armando Bekabel', '$2y$10$SosbKPd4KAWGgUqNKxFnCOIQumPT25FlURmyEYxU4x0tkjNTrlnDG', 'Wednesday', 'user'),
('USER018', 'sarno', 'Sarno', '$2y$10$xJ26Iu1gzW1M5Dl0EKAkGe9aWDVOTzP0QAuk4poEOV5JeeGQHEI6K', 'Wednesday', 'user'),
('USER019', 'arip', 'Ari Priyambudi', '$2y$10$KiPNrRBYW77ZsOC9JP.KLOKqFie13EEAIhoeIYyJvVehrM6h0UuW2', 'Wednesday', 'user'),
('USER020', 'agussutiyem', 'Agus Puji Raharjo', '$2y$10$oWI6w13sqw5rbh0GTkAuSuTwDaeWjooHSC66cp2MKwxzs6evAOGby', 'Wednesday', 'user'),
('USER021', 'marjuki', 'Marjuki', '$2y$10$5oqO4lwvHxlr6QSrCZOOcOxEISZetKA.GH3nhzwufMoG8xoMmDGYy', 'Wednesday', 'user'),
('USER022', 'alfian', 'Alfian Syafii', '$2y$10$ByAwhNN9IjhOsj1dT4p2MeQs9le12oJreVZGCb6gpc9GaUsENLJiq', 'Wednesday', 'user'),
('USER023', 'aris', 'Ari Syafroni', '$2y$10$uFKfVWrxss5YpFeZDeYWKun592cHQRLewh9.HAPsv5Pb9siZ3pI3e', 'Wednesday', 'user'),
('USER024', 'triyono', 'Triyono', '$2y$10$FrAo5kkCoYtUWYNBnYaK1ePnIG7FUmCn6xOFjd4i07qC77aCt..XS', 'Thursday', 'user'),
('USER025', 'kadar', 'Kadarismanto', '$2y$10$.HnPnQwX52J45NtfRBv.8.GxYSiVoYl3Irvc0Bv4F09pDaFfGuGxq', 'Thursday', 'user'),
('USER026', 'triw', 'Tri Warsono', '$2y$10$OoneN4Vz/Zqd298e96X7s.igAjEjtwYYx7N8lHn4.uULV6NUjTnE.', 'Thursday', 'user'),
('USER027', 'deni', 'Deni Sri', '$2y$10$9OkWswnEj3WlNGnaRBHN1u20Uuds11v0gHOSGf2pH.oumiGxnDQTa', 'Thursday', 'user'),
('USER028', 'ristantoadi', 'Ristanto Adi', '$2y$10$bVWRx0ugNsCG.hb7il9xbe8DB0aNFW1HGg.RzbSGJRgMHL.G7n6.y', 'Thursday', 'user'),
('USER029', 'didik', 'Didik Yahyono', '$2y$10$mEmigKq5niIglWCr6mvifO.Lv3MayHlLfqAJQ9LfC.NL3UtFhjfya', 'Thursday', 'user'),
('USER030', 'marnob', 'Marno (Mariyana)', '$2y$10$q6Q84Cyh8eJSDHwiQeRMXeX9utHXlR/wc72zW3/hpiFwiJFt7LW8W', 'Friday', 'user'),
('USER031', 'santo', 'Imanuel Susanto', '$2y$10$0ZrZOTHdNsWHPrxjPHjh4e4.xZsMmxZQv911h6D9g25e4HXWpZowa', 'Friday', 'user'),
('USER032', 'andis', 'Andi Setiono', '$2y$10$P/Q/TG5IdVsVvRzoYkSIseSU/Ykx/ub0oj.nvEhnl6yz5o897Cwkq', 'Friday', 'pengurus'),
('USER033', 'adiher', 'Hermawan Setyo Adi', '$2y$10$ecbndPj4MK7CRCOilRQyguU7iI82G0ONUSm.gC38.dAeTQsXMSJDG', 'Friday', 'admin'),
('USER034', 'oki', 'Oki Hermawan', '$2y$10$H5Ljb.UT0VII90sMyKcIx.AMIRdDJkio6tYD4l/2fYyypMJ28TrxK', 'Friday', 'user'),
('USER035', 'yoyokes', 'Yonathan Christianto', '$2y$10$NVKZmGhBOfu/.pZIBYt0w.Pesymbbmr1Z34xQGtA6qbUOYgx3thb.', 'Friday', 'user'),
('USER036', 'istianto', 'Slamet Istianto', '$2y$10$1G6y6SjqlLPEAMwOidtyCe3nTaduJ3aimlWH3Y0aXOKdiiNYKj0A.', 'Saturday', 'user'),
('USER037', 'doni', 'Doni Abiyantoro', '$2y$10$Nc7p/6YpNydy3zOoBPf9f.nMsPp9/i/yUMqYBqWvle2qzK6TeY69K', 'Saturday', 's_admin'),
('USER038', 'wahyu', 'Wahyu Wijayanto', '$2y$10$9/kWwoD5TbhzmCEh8Ru4tejDpjgqJS3UFnzt0LRDSGJ9dHTzZd2k.', 'Saturday', 'user'),
('USER039', 'supri', 'Supri', '$2y$10$8LbgMMdgPc5RfMvE8uQx9e/tQkb3R5pHqkxsamUGhqYS0EFiQ2cyW', 'Saturday', 'user'),
('USER040', 'yhona', 'Yhona', '$2y$10$kki8ga/6AEd0Y6JiyJrmQ.C3QwbsxUjEzuEDyTAHTI2H66tqnKgZq', 'Saturday', 'user'),
('USER041', 'heru', 'Heru Sulistiyono', '$2y$10$ugtQjDzwemipuo4nWw2ZBe8SM7ObvAsB0olwVsWF4Z74I.nXBc9Bq', 'Saturday', 'user'),
('USER042', 'yuda', 'Heri Yuda P', '$2y$10$cXQM6G/VarHMEO.4FndyNOEDRQppe7dx32uLWhm.GjlYhGsxova2i', 'Saturday', 'user'),
('USER043', 'agusp', 'Agus Purwanto (DICKY)', '$2y$10$NCXZrQpQOO5Laksjx4z0m..U0fD.Wjx9IiWAN4JiAPeRBcneE1LBi', 'Sunday', 'user'),
('USER044', 'ponco', 'Ponco Yulianto', '$2y$10$yZ/.XjSBbYW316vqm4erU.RpaNPUlX3XKInkjN.NEIQFvogidaiX.', 'Sunday', 'user'),
('USER045', 'hermani', 'Adi Hermani', '$2y$10$51wXLlCow0fvVDZ2wewmTecbyQ9nvKv10.eyYMmiUlmKennEEfesm', 'Sunday', 'user'),
('USER046', 'bowo', 'Nanang Setyo Wibowo', '$2y$10$ldMgyjhFXYORf3NAsLNuh.hlubBdXiIGHR0s1W6n1i39llFE8AAQe', 'Sunday', 'user'),
('USER047', 'mistriyanto', 'Mistrianto (YOGI)', '$2y$10$itNIB1Reg5wMof6LFfzufOLf4oLGPdFTwT2BUw/SjnlsSJ1Ij4NW2', 'Sunday', 'user'),
('USER048', 'andri', 'Andri Purwoko', '$2y$10$EtT.wSBqrlgXQaAJ.vo72.aRZ5NzwfwAKvOcObBMCrfsRVd0xmaS6', 'Sunday', 'user'),
('USER049', 'heruelsa', 'Heru Setiawan', '$2y$10$Dp6qCf20Zimp.XCK40362ukRZ22PY1EyxcOLnS94zKU5LWdVDmduG', 'Sunday', 'user'),
('USER050', 'danu', 'Danu Dirta DP', '$2y$10$aM8ArNv.QrJtw66HZCnfheUq7xkINJq.86XrTN1Bj.EsX3kFDrUwq', 'Sunday', 'user');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `devices`
--
ALTER TABLE `devices`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `device_id` (`device_id`);

--
-- Indexes for table `kas_sub`
--
ALTER TABLE `kas_sub`
  ADD PRIMARY KEY (`id_trx`),
  ADD KEY `idxcoa_code` (`coa_code`);

--
-- Indexes for table `kas_umum`
--
ALTER TABLE `kas_umum`
  ADD PRIMARY KEY (`id_trx`),
  ADD KEY `idxcoa_code` (`coa_code`);

--
-- Indexes for table `master_kk`
--
ALTER TABLE `master_kk`
  ADD PRIMARY KEY (`id`),
  ADD KEY `code_idindx` (`code_id`) USING BTREE;

--
-- Indexes for table `report`
--
ALTER TABLE `report`
  ADD PRIMARY KEY (`id`),
  ADD KEY `kode_u` (`kode_u`),
  ADD KEY `report_id` (`report_id`),
  ADD KEY `jimpitan_date` (`jimpitan_date`);

--
-- Indexes for table `tb_barang`
--
ALTER TABLE `tb_barang`
  ADD PRIMARY KEY (`kode`);

--
-- Indexes for table `tb_botmenu`
--
ALTER TABLE `tb_botmenu`
  ADD PRIMARY KEY (`id`),
  ADD KEY `parent_id` (`parent_id`);

--
-- Indexes for table `tb_dashboard_menu`
--
ALTER TABLE `tb_dashboard_menu`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tb_iuran`
--
ALTER TABLE `tb_iuran`
  ADD PRIMARY KEY (`id_iuran`);

--
-- Indexes for table `tb_konfigurasi`
--
ALTER TABLE `tb_konfigurasi`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `nama` (`nama`);

--
-- Indexes for table `tb_menu`
--
ALTER TABLE `tb_menu`
  ADD PRIMARY KEY (`kode`);

--
-- Indexes for table `tb_profil`
--
ALTER TABLE `tb_profil`
  ADD PRIMARY KEY (`kode`);

--
-- Indexes for table `tb_tarif`
--
ALTER TABLE `tb_tarif`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_kode_tarif` (`kode_tarif`);

--
-- Indexes for table `tb_warga`
--
ALTER TABLE `tb_warga`
  ADD PRIMARY KEY (`id_warga`),
  ADD KEY `kode` (`nik`,`nikk`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id_code`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `devices`
--
ALTER TABLE `devices`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;

--
-- AUTO_INCREMENT for table `kas_sub`
--
ALTER TABLE `kas_sub`
  MODIFY `id_trx` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `kas_umum`
--
ALTER TABLE `kas_umum`
  MODIFY `id_trx` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `master_kk`
--
ALTER TABLE `master_kk`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=66;

--
-- AUTO_INCREMENT for table `report`
--
ALTER TABLE `report`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12761;

--
-- AUTO_INCREMENT for table `tb_barang`
--
ALTER TABLE `tb_barang`
  MODIFY `kode` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `tb_botmenu`
--
ALTER TABLE `tb_botmenu`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `tb_dashboard_menu`
--
ALTER TABLE `tb_dashboard_menu`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `tb_iuran`
--
ALTER TABLE `tb_iuran`
  MODIFY `id_iuran` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=84;

--
-- AUTO_INCREMENT for table `tb_konfigurasi`
--
ALTER TABLE `tb_konfigurasi`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `tb_menu`
--
ALTER TABLE `tb_menu`
  MODIFY `kode` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `tb_tarif`
--
ALTER TABLE `tb_tarif`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `tb_warga`
--
ALTER TABLE `tb_warga`
  MODIFY `id_warga` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1303;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
