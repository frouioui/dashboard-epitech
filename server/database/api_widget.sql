-- phpMyAdmin SQL Dump
-- version 4.9.1
-- https://www.phpmyadmin.net/
--
-- Host: db
-- Generation Time: Oct 30, 2019 at 08:15 AM
-- Server version: 5.7.28
-- PHP Version: 7.2.23

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `api_widget`
--

-- --------------------------------------------------------

--
-- Table structure for table `services`
--

CREATE TABLE `services` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `widgets`
--

CREATE TABLE `widgets` (
  `id` int(11) NOT NULL,
  `service_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `widgets_user`
--

CREATE TABLE `widgets_user` (
  `id` int(11) NOT NULL,
  `position` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `widget_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `widget_params`
--

CREATE TABLE `widget_params` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `type` varchar(255) NOT NULL,
  `widget_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `widget_user_params`
--

CREATE TABLE `widget_user_params` (
  `id` int(11) NOT NULL,
  `value` varchar(255) NOT NULL,
  `user_widget_id` int(11) NOT NULL,
  `widget_param_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `services`
--
ALTER TABLE `services`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `widgets`
--
ALTER TABLE `widgets`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_service_id` (`service_id`);

--
-- Indexes for table `widgets_user`
--
ALTER TABLE `widgets_user`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_widget_id` (`widget_id`),
  ADD KEY `fk_user_id` (`user_id`);

--
-- Indexes for table `widget_params`
--
ALTER TABLE `widget_params`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_widget_id_param` (`widget_id`);

--
-- Indexes for table `widget_user_params`
--
ALTER TABLE `widget_user_params`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_user_id_params` (`user_id`),
  ADD KEY `fk_user_widget_id` (`user_widget_id`) USING BTREE,
  ADD KEY `fk_widget_param_id` (`widget_param_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `services`
--
ALTER TABLE `services`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `widgets`
--
ALTER TABLE `widgets`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `widgets_user`
--
ALTER TABLE `widgets_user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `widget_params`
--
ALTER TABLE `widget_params`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `widget_user_params`
--
ALTER TABLE `widget_user_params`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `widgets`
--
ALTER TABLE `widgets`
  ADD CONSTRAINT `fk_service_id` FOREIGN KEY (`service_id`) REFERENCES `services` (`id`);

--
-- Constraints for table `widgets_user`
--
ALTER TABLE `widgets_user`
  ADD CONSTRAINT `fk_user_id` FOREIGN KEY (`user_id`) REFERENCES `api_users`.`users` (`id`),
  ADD CONSTRAINT `fk_widget_id` FOREIGN KEY (`widget_id`) REFERENCES `widgets` (`id`);

--
-- Constraints for table `widget_params`
--
ALTER TABLE `widget_params`
  ADD CONSTRAINT `fk_widget_id_param` FOREIGN KEY (`widget_id`) REFERENCES `widgets` (`id`);

--
-- Constraints for table `widget_user_params`
--
ALTER TABLE `widget_user_params`
  ADD CONSTRAINT `fk_user_id_params` FOREIGN KEY (`user_id`) REFERENCES `api_users`.`users` (`id`),
  ADD CONSTRAINT `fk_user_widget_id` FOREIGN KEY (`user_widget_id`) REFERENCES `widgets_user` (`id`),
  ADD CONSTRAINT `fk_widget_param_id` FOREIGN KEY (`widget_param_id`) REFERENCES `widget_params` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
