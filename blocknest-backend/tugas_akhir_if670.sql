-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 08, 2024 at 08:57 PM
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
(22, 13, 8, '', 'jdjsjdasd', '2024-05-08', 0);

-- --------------------------------------------------------

--
-- Table structure for table `follow`
--

CREATE TABLE `follow` (
  `id` int(11) NOT NULL,
  `follower_user_id` int(11) NOT NULL,
  `following_user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

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
(11, 5, '', '', 'mantap anj #jfjsajjasjdas @memk', 'uploads/post_img/1714982325781.png', '2024-05-06', 0, 0),
(12, 5, '', '', 'mantap anj #jfjsajjasjdas @memk @bangsat anjeng tai', 'uploads/post_img/1714982325781.png', '2024-05-06', 0, 0),
(13, 8, '', '', 'aku ganteng sekali', 'uploads/post_img/S__4948025.jpg', '2024-05-06', 0, 1),
(14, 9, '', '', 'mantap bang jsjasdjdjasjd lorem ipsum dolor sit amet #mantap bosku, #hehe @mantap', 'uploads/post_img/S__4948025.jpg', '2024-05-07', 0, 0);

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
(53, 5, 4);

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
(4, 'flamengo', 'No Name', 'abcd@gmail.com', '$2y$10$X8U/iIC2InNg.eev2cfpIe9/g8LhNCZOiLV0pIOMLxSOnKwD6WMQq', 'uploads/profile_pics/default.svg', 'Hello There! I am using Blocknest', 0, 0),
(5, 'kevin', 'No Name', 'kevinsorensen523@gmail.com', '$2y$10$.mt48KvpQbgf5tuwJ463G.9K.WiOuyK5wPP78QIFR3gpogw8RG3vC', 'uploads/profile_pics/IMG_8932.JPG', 'Hello There! I am using Blocknest', 0, 0),
(8, 'mm', 'username6638a7bf55c40', 'kkef@gmail.com', '$2y$10$QKeYITDyofYnIGacbi8jy.irHrfaQq1xnqTlMpCIctFSS8fRP8wIi', 'uploads/profile_pics/S__4948026.jpg', 'Hello There! I am using Blocknest', 0, 0),
(9, 'antoni', 'user6639014a65690', 'anton@gmail.com', '$2y$10$OeqeQtd/04PB/RcRkuSWnOyGZlVGR/W1FSheBZYDPpoGjBY25zg4C', 'uploads/profile_pics/default.svg', 'Hello There! I am using Blocknest', 0, 0),
(10, 'asd', 'user663b83df046e4', 'dasdad', '$2y$10$kysNZeAUnlwkaeEexEAH/.Cl46BqhNpdfYO/VR89WVqfF7JHB9wqy', 'uploads/profile_pics/default.svg', 'Hello There! I am using Blocknest', 0, 0),
(11, 'asd', 'user663b83dfa44d3', 'dasdad', '$2y$10$75TPq/IlJ8oQa.JN6b8CMegcT42VK/nk0roFqCDo1u6G41D8vcK8y', 'uploads/profile_pics/default.svg', 'Hello There! I am using Blocknest', 0, 0),
(12, 'asd', 'user663b83dfd11a9', 'dasdad', '$2y$10$j.3BxtgLbHG3VmIntxISCOW.GMLWGAbZ8lp7yXgogik6jtLqY1zwW', 'uploads/profile_pics/default.svg', 'Hello There! I am using Blocknest', 0, 0),
(13, 'asd', 'user663b83e00ad9e', 'dasdad', '$2y$10$tQu2nQMwm2K6Bw17HGhwgudbWPyZjdiXnPG2O9YXOmqvXos5gkCra', 'uploads/profile_pics/default.svg', 'Hello There! I am using Blocknest', 0, 0),
(14, 'asd', 'user663b83e0311d7', 'dasdad', '$2y$10$TJ0r5nQfOBOmFY.5CuhpGO3bw6I9xFrrhLlGO/jkk4jP7RNLRyK06', 'uploads/profile_pics/default.svg', 'Hello There! I am using Blocknest', 0, 0),
(15, 'kev', 'user663b84a752cb2', 'akdskdak', '$2y$10$h17gsKgwq60y3kFO8GSFXuv5WLYjzJAlj2ftaKBQdpgFpetJs8aUy', 'uploads/profile_pics/default.svg', 'Hello There! I am using Blocknest', 0, 0);

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
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `comment`
--
ALTER TABLE `comment`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT for table `follow`
--
ALTER TABLE `follow`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `post`
--
ALTER TABLE `post`
  MODIFY `post_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `post_likes`
--
ALTER TABLE `post_likes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=55;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
