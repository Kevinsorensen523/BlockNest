-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 31, 2024 at 09:14 AM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `tugas_akhir_if670`
--

-- --------------------------------------------------------

--
-- Table structure for table `comment`
--

CREATE TABLE `comment` (
  `id` int(11) NOT NULL,
  `post_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `content` varchar(500) NOT NULL,
  `date_posted` date NOT NULL,
  `likes` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `comment`
--

INSERT INTO `comment` (`id`, `post_id`, `user_id`, `username`, `content`, `date_posted`, `likes`) VALUES
(13, 1, 5, '', '#ejfjasfas', '2024-05-06', 0),
(14, 4, 8, '', 'mantap bang', '2024-05-08', 0),
(15, 4, 8, '', 'mantap bang', '2024-05-08', 0),
(16, 4, 8, '', 'mantap bang', '2024-05-08', 0),
(17, 4, 8, '', 'mantap bang', '2024-05-08', 0),
(18, 4, 8, '', 'mantap bang', '2024-05-08', 0),
(19, 4, 8, '', 'mantap bang', '2024-05-08', 0),
(20, 4, 8, '', 'mantap bang', '2024-05-08', 0),
(21, 4, 8, '', 'hhehe', '2024-05-08', 0),
(22, 13, 8, '', 'jdjsjdasd', '2024-05-08', 0),
(23, 13, 8, '', 'anjay cok', '2024-05-29', 0),
(24, 13, 8, '', 'anjay cokasdad', '2024-05-29', 0),
(25, 13, 8, '', 'anjay cokasdad', '2024-05-29', 0),
(26, 13, 8, '', 'anjay cokasdad', '2024-05-29', 0),
(27, 13, 8, '', 'anjay cokasdad', '2024-05-29', 0),
(28, 13, 8, '', 'anjay cokasdad', '2024-05-29', 0),
(29, 11, 8, '', 'adad', '2024-05-29', 0),
(30, 11, 8, '', 'adadad', '2024-05-29', 0),
(31, 11, 8, '', 'adadad', '2024-05-29', 0),
(32, 12, 8, '', 'adasda', '2024-05-29', 0),
(33, 12, 8, '', 'adasda', '2024-05-29', 0),
(34, 12, 8, '', 'adasda', '2024-05-29', 0),
(35, 12, 8, '', 'asdasd', '2024-05-29', 0),
(36, 12, 8, '', 'asdasd', '2024-05-29', 0),
(37, 12, 8, '', 'asdasd', '2024-05-29', 0),
(38, 12, 8, '', 'asdasd', '2024-05-29', 0),
(39, 12, 8, '', 'asdasd', '2024-05-29', 0),
(40, 14, 8, '', 'asdad', '2024-05-29', 0),
(41, 14, 8, '', '@antoni', '2024-05-29', 0),
(42, 14, 8, '', '@antoni', '2024-05-29', 0),
(43, 25, 8, '', '@vivo', '2024-05-29', 0),
(44, 25, 8, '', '@vivo', '2024-05-29', 0),
(45, 25, 8, '', '@vivo', '2024-05-29', 0),
(46, 24, 8, '', '@vivo', '2024-05-29', 0),
(47, 23, 8, '', '@vivo', '2024-05-29', 0),
(48, 14, 8, '', '@vivo', '2024-05-29', 0),
(49, 14, 8, '', '@vivo', '2024-05-29', 0),
(50, 25, 8, '', '@vivo', '2024-05-29', 0),
(51, 25, 8, '', '@vivo', '2024-05-29', 0),
(52, 25, 8, '', '@vivo', '2024-05-29', 0),
(53, 25, 8, '', '@vivo', '2024-05-29', 0),
(54, 23, 8, '', '@vivo', '2024-05-29', 0),
(55, 23, 8, '', '@vivo', '2024-05-29', 0),
(56, 27, 8, '', '@vivo', '2024-05-29', 0),
(57, 25, 17, '', 'mantap bang vivo', '2024-05-29', 0);

-- --------------------------------------------------------

--
-- Table structure for table `follow`
--

CREATE TABLE `follow` (
  `id` int(11) NOT NULL,
  `follower_user_id` int(11) NOT NULL,
  `following_user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `follow`
--

INSERT INTO `follow` (`id`, `follower_user_id`, `following_user_id`) VALUES
(25, 8, 5),
(28, 17, 4),
(31, 17, 16),
(32, 17, 9);

-- --------------------------------------------------------

--
-- Table structure for table `post`
--

CREATE TABLE `post` (
  `post_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `category` varchar(20) NOT NULL,
  `content` varchar(500) NOT NULL,
  `image` varchar(100) NOT NULL,
  `date_posted` date NOT NULL,
  `likes` int(11) NOT NULL DEFAULT 0,
  `comment_no` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `post`
--

INSERT INTO `post` (`post_id`, `user_id`, `username`, `category`, `content`, `image`, `date_posted`, `likes`, `comment_no`) VALUES
(1, 1, '', '', 'nefnjefnjw', 'uploads/post_img/tattinger-s-lounge.jpg', '2024-04-27', 1, 2),
(2, 1, '', '', 'The FitnessGram Pacer Test is a multistage aerobic capacity test that progressively gets more difficult as it continues. The 20 meter pacer test will begin in 30 seconds. Line up at the start. The running speed starts slowly, but gets faster each minute after you hear this signal. [beep] A single lap should be completed each time you hear this sound. [ding] Remember to run in a straight line, and run as long as possible. The second time you fail to complete a lap before the sound, your test is o', 'uploads/post_img/simulated annealing v3.png', '2024-04-27', 8, 0),
(3, 2, '', '', 'How much wood would a woodchuck chuck if a woodchuck could chuck wood? He would chuck, he would, as much as he could, and chuck as much wood, as a woodchuck would if a woodchuck could chuck wood.', 'uploads/post_img/Background Zoom_Seminar Literacy Week.jpg', '2024-04-27', 1, 6),
(4, 5, '', '', 'asadasd', 'uploads/post_img/IMG_8932.JPG', '2024-05-03', 2, 8),
(10, 5, '', '', 'mantap anj', 'uploads/post_img/1714982325781.png', '2024-05-06', 0, 0),
(11, 5, '', '', 'mantap anj #jfjsajjasjdas @memk', 'uploads/post_img/1714982325781.png', '2024-05-06', 1, 3),
(12, 5, '', '', 'mantap anj #jfjsajjasjdas @memk @bangsat anjeng tai', 'uploads/post_img/1714982325781.png', '2024-05-06', 1, 8),
(13, 8, '', '', 'aku ganteng sekali', 'uploads/post_img/S__4948025.jpg', '2024-05-06', 0, 7),
(14, 9, '', '', 'mantap bang jsjasdjdjasjd lorem ipsum dolor sit amet #mantap bosku, #hehe @mantap', 'uploads/post_img/S__4948025.jpg', '2024-05-07', 0, 5),
(15, 8, '', '', 'asdasdsa', 'uploads/post_img/1716983559723.png', '2024-05-29', 0, 0),
(16, 8, '', '', 'asdasd @antoni', 'uploads/post_img/1716983574549.png', '2024-05-29', 0, 0),
(17, 8, '', '', '@antoni', 'uploads/post_img/1716983651788.png', '2024-05-29', 0, 0),
(21, 8, '', '', 'adasd', 'uploads/post_img/1716984194544.png', '2024-05-29', 0, 0),
(22, 8, '', '', '@antoni', 'uploads/post_img/1716984209635.png', '2024-05-29', 0, 0),
(23, 8, '', '', '@antoni', 'uploads/post_img/1716984315993.png', '2024-05-29', 0, 3),
(24, 8, '', '', '@antoni', 'uploads/post_img/1716984406966.png', '2024-05-29', 0, 1),
(25, 16, '', '', '@mm mantap lu bang #bitcoin', 'uploads/post_img/1716984486054.png', '2024-05-29', 0, 8),
(26, 8, '', '', '@vivo', 'uploads/post_img/1716985627967.png', '2024-05-29', 0, 0),
(27, 8, '', '', '@antoni', 'uploads/post_img/1716985661120.png', '2024-05-29', 0, 1),
(33, 17, '', '', '@vivo #bitcoin adjdjasjdasjdas', 'uploads/post_img/1716989428141.png', '2024-05-29', 0, 0);

-- --------------------------------------------------------

--
-- Table structure for table `post_likes`
--

CREATE TABLE `post_likes` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `post_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `post_likes`
--

INSERT INTO `post_likes` (`id`, `user_id`, `post_id`) VALUES
(16, 5, 4),
(45, 1, 2),
(46, 1, 2),
(47, 1, 2),
(49, 1, 2),
(53, 5, 4),
(55, 8, 12),
(57, 8, 11);

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `user_id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `full_name` varchar(50) DEFAULT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(100) NOT NULL,
  `profile_pic` varchar(100) DEFAULT NULL,
  `bio` varchar(500) DEFAULT NULL,
  `followers` int(11) NOT NULL DEFAULT 0,
  `following` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`user_id`, `username`, `full_name`, `email`, `password`, `profile_pic`, `bio`, `followers`, `following`) VALUES
(1, 'yeehaw1', 'oof', 'yeehaw@mail.com', '$2y$10$nyKmSNGGO67oTxvosrPBP.xpqGWU8VIWd3SJ4sL.sZS.ajnOsMrSC', 'uploads/profile_pics/pp_johnthor_new.jpg', 'my name is oof and you will do what i say woop woop', 0, 0),
(2, 'jthor', 'Woo', 'johnthor@mail.com', '$2y$10$e0c8sfc6iFNlofEPTa8kWu/lQ2U7LSQFuo/VG7.pZMXrtHCSC6X5.', 'uploads/profile_pics/pp_johnwick.jpg', 'never gonna give you up', 0, 0),
(4, 'flamengo', 'No Name', 'abcd@gmail.com', '$2y$10$X8U/iIC2InNg.eev2cfpIe9/g8LhNCZOiLV0pIOMLxSOnKwD6WMQq', 'uploads/profile_pics/default.svg', 'Hello There! I am using Blocknest', 1, 0),
(5, 'kevin', 'No Name', 'kevinsorensen523@gmail.com', '$2y$10$.mt48KvpQbgf5tuwJ463G.9K.WiOuyK5wPP78QIFR3gpogw8RG3vC', 'uploads/profile_pics/IMG_8932.JPG', 'Hello There! I am using Blocknest', -1, 0),
(8, 'mm', 'username6638a7bf55c40', 'kkef@gmail.com', '$2y$10$QKeYITDyofYnIGacbi8jy.irHrfaQq1xnqTlMpCIctFSS8fRP8wIi', 'uploads/profile_pics/S__4948026.jpg', 'Hello There! I am using Blocknest', 0, -1),
(9, 'antoni', 'user6639014a65690', 'anton@gmail.com', '$2y$10$OeqeQtd/04PB/RcRkuSWnOyGZlVGR/W1FSheBZYDPpoGjBY25zg4C', 'uploads/profile_pics/default.svg', 'Hello There! I am using Blocknest', 1, 0),
(10, 'asd', 'user663b83df046e4', 'dasdad', '$2y$10$kysNZeAUnlwkaeEexEAH/.Cl46BqhNpdfYO/VR89WVqfF7JHB9wqy', 'uploads/profile_pics/default.svg', 'Hello There! I am using Blocknest', 0, 0),
(11, 'asd', 'user663b83dfa44d3', 'dasdad', '$2y$10$75TPq/IlJ8oQa.JN6b8CMegcT42VK/nk0roFqCDo1u6G41D8vcK8y', 'uploads/profile_pics/default.svg', 'Hello There! I am using Blocknest', 0, 0),
(12, 'asd', 'user663b83dfd11a9', 'dasdad', '$2y$10$j.3BxtgLbHG3VmIntxISCOW.GMLWGAbZ8lp7yXgogik6jtLqY1zwW', 'uploads/profile_pics/default.svg', 'Hello There! I am using Blocknest', 0, 0),
(13, 'asd', 'user663b83e00ad9e', 'dasdad', '$2y$10$tQu2nQMwm2K6Bw17HGhwgudbWPyZjdiXnPG2O9YXOmqvXos5gkCra', 'uploads/profile_pics/default.svg', 'Hello There! I am using Blocknest', 0, 0),
(14, 'asd', 'user663b83e0311d7', 'dasdad', '$2y$10$TJ0r5nQfOBOmFY.5CuhpGO3bw6I9xFrrhLlGO/jkk4jP7RNLRyK06', 'uploads/profile_pics/default.svg', 'Hello There! I am using Blocknest', 0, 0),
(15, 'kev', 'user663b84a752cb2', 'akdskdak', '$2y$10$h17gsKgwq60y3kFO8GSFXuv5WLYjzJAlj2ftaKBQdpgFpetJs8aUy', 'uploads/profile_pics/default.svg', 'Hello There! I am using Blocknest', 0, 0),
(16, 'vivo', 'user66571a93c4a28', 'vivo@gmail.com', '$2y$10$uBSrAMHqmUSfV8paCNADXeRCub58N0dd3g0J7X7YSxVYauSqqwPx6', 'uploads/profile_pics/default.svg', 'Hello There! I am using Blocknest', 1, 0),
(17, 'aleron', 'user66572b46b9798', 'aleron@gmail.com', '$2y$10$zf0tpeLKjylfwU9RlU0e9.4XHruruwp6LziEzDGEefzv2m9.ozQ/6', 'uploads/profile_pics/default.svg', 'Hello There! I am using Blocknest', 0, 3);

-- --------------------------------------------------------

--
-- Table structure for table `user_interactions`
--

CREATE TABLE `user_interactions` (
  `id` int(11) NOT NULL,
  `post_id` int(11) DEFAULT NULL,
  `user_id` int(11) NOT NULL,
  `action_type` enum('like','comment','mention','follow','comment_mention') NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `isOpen` tinyint(1) DEFAULT 0,
  `target_user_id` int(11) DEFAULT NULL,
  `comment` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user_interactions`
--

INSERT INTO `user_interactions` (`id`, `post_id`, `user_id`, `action_type`, `created_at`, `isOpen`, `target_user_id`, `comment`) VALUES
(19, 38, 8, 'comment', '2024-05-12 05:11:09', 0, NULL, NULL),
(20, 38, 8, 'comment', '2024-05-12 05:11:11', 0, NULL, NULL),
(21, 37, 8, 'comment', '2024-05-12 05:11:28', 0, NULL, NULL),
(22, 14, 8, 'comment', '2024-05-12 05:11:46', 0, NULL, NULL),
(47, 12, 8, 'like', '2024-05-29 11:42:47', 0, 5, NULL),
(49, 11, 8, 'like', '2024-05-29 11:44:36', 0, 5, NULL),
(50, NULL, 8, 'follow', '2024-05-29 11:44:42', 0, 5, NULL),
(51, 12, 8, 'comment', '2024-05-29 11:46:51', 0, 5, 'asdasd'),
(52, 12, 8, 'comment', '2024-05-29 11:46:51', 0, 5, 'asdasd'),
(53, 12, 8, 'comment', '2024-05-29 11:46:51', 0, 5, 'asdasd'),
(54, 12, 8, 'comment', '2024-05-29 11:46:51', 0, 5, 'asdasd'),
(55, 14, 8, 'comment', '2024-05-29 11:47:07', 0, 9, 'asdad'),
(56, 14, 8, 'comment', '2024-05-29 11:51:59', 0, 9, '@antoni'),
(57, 14, 8, 'comment', '2024-05-29 11:52:15', 0, 9, '@antoni'),
(60, 24, 8, 'mention', '2024-05-29 12:06:50', 0, 9, NULL),
(61, 25, 16, 'mention', '2024-05-29 12:08:14', 1, 8, NULL),
(62, 25, 8, 'comment', '2024-05-29 12:14:09', 1, 16, '@vivo'),
(63, 25, 8, 'comment', '2024-05-29 12:14:10', 1, 16, '@vivo'),
(64, 25, 8, 'comment', '2024-05-29 12:17:51', 1, 16, '@vivo'),
(65, 24, 8, 'comment', '2024-05-29 12:18:47', 1, 8, '@vivo'),
(66, 25, 8, 'comment', '2024-05-29 12:21:16', 1, 16, '@vivo'),
(67, 25, 8, 'comment', '2024-05-29 12:21:42', 1, 16, '@vivo'),
(68, 25, 8, 'comment', '2024-05-29 12:23:36', 1, 16, '@vivo'),
(69, 23, 8, 'comment', '2024-05-29 12:25:06', 1, 8, '@vivo'),
(70, 23, 8, 'comment', '2024-05-29 12:25:26', 1, 8, '@vivo'),
(71, 26, 8, 'mention', '2024-05-29 12:27:09', 1, 16, NULL),
(72, 27, 8, 'mention', '2024-05-29 12:27:44', 0, 9, NULL),
(73, 27, 8, 'comment', '2024-05-29 13:12:04', 0, 8, '@vivo'),
(74, NULL, 17, 'follow', '2024-05-29 13:19:32', 0, 4, NULL),
(77, 28, 22, 'mention', '2024-05-29 13:24:11', 0, 16, NULL),
(78, 30, 17, 'mention', '2024-05-29 13:28:21', 1, 16, NULL),
(79, 31, 17, 'mention', '2024-05-29 13:28:36', 1, 16, NULL),
(80, 32, 17, 'mention', '2024-05-29 13:29:46', 1, 16, NULL),
(81, 32, 17, 'mention', '2024-05-29 13:29:46', 0, 9, NULL),
(82, NULL, 17, 'follow', '2024-05-29 13:29:54', 1, 16, NULL),
(83, NULL, 17, 'follow', '2024-05-29 13:29:57', 0, 9, NULL),
(84, 33, 17, 'mention', '2024-05-29 13:30:35', 1, 16, NULL),
(86, 25, 17, 'comment', '2024-05-29 13:30:45', 1, 16, 'mantap bang vivo');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `comment`
--
ALTER TABLE `comment`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `follow`
--
ALTER TABLE `follow`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `post`
--
ALTER TABLE `post`
  ADD PRIMARY KEY (`post_id`);

--
-- Indexes for table `post_likes`
--
ALTER TABLE `post_likes`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`user_id`);

--
-- Indexes for table `user_interactions`
--
ALTER TABLE `user_interactions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `post_id` (`post_id`),
  ADD KEY `user_id` (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `comment`
--
ALTER TABLE `comment`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=58;

--
-- AUTO_INCREMENT for table `follow`
--
ALTER TABLE `follow`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- AUTO_INCREMENT for table `post`
--
ALTER TABLE `post`
  MODIFY `post_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;

--
-- AUTO_INCREMENT for table `post_likes`
--
ALTER TABLE `post_likes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=59;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `user_interactions`
--
ALTER TABLE `user_interactions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=87;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
