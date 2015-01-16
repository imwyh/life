-- phpMyAdmin SQL Dump
-- version phpStudy 2014
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Jan 17, 2015 at 03:14 AM
-- Server version: 5.5.38
-- PHP Version: 5.3.28

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `life`
--

-- --------------------------------------------------------

--
-- Table structure for table `life_posts`
--

CREATE TABLE IF NOT EXISTS `life_posts` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Date` date DEFAULT NULL,
  `Time` time DEFAULT NULL,
  `Interval` varchar(31) DEFAULT NULL,
  `Locate` varchar(255) DEFAULT NULL,
  `Contant` mediumtext,
  `Zan` int(11) NOT NULL DEFAULT '0',
  `CommentNum` int(11) NOT NULL DEFAULT '0',
  `IP` varchar(15) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

--
-- Dumping data for table `life_posts`
--

--
-- Table structure for table `life_users`
--

CREATE TABLE IF NOT EXISTS `life_users` (
  `uid` int(11) NOT NULL AUTO_INCREMENT,
  `FirstTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `name` varchar(31) NOT NULL DEFAULT '匿名',
  `mail` varchar(255) DEFAULT NULL,
  `site` varchar(255) DEFAULT NULL,
  `zan` mediumtext,
  `ip` varchar(15) DEFAULT NULL,
  PRIMARY KEY (`uid`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

--
-- Dumping data for table `life_users`
--
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
