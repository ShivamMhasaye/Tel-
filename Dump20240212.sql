-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: localhost    Database: my_project
-- ------------------------------------------------------
-- Server version	8.0.34

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `contact_number` varchar(15) DEFAULT NULL,
  `email_id` varchar(255) DEFAULT NULL,
  `role` enum('user','admin') DEFAULT 'user',
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'utkarshkorade10','$2b$10$CQtokGM755vzMSsnA7jnyOX9o.vTOlIN8fQcQkt7yMFyXtArDxMU6','+917057097993','utkarshkorade10@gmail.com','user'),(6,'Vaibhav','$2b$10$vzi.JJx7ImVmwBiiBuXDj.TvYTobofxrswWp9FYzyVBUJ8e3rG0RS','7770040256','Vaibhab@gmail','user'),(9,'utkarshkorade11','$2b$10$o2C7G7F354I1jjnfDoy8o.O0N5yPWbFfCVQWi4n0KPlzGXTnScUlm','+917057097993','utkarshkorade10@gmail.com','user'),(12,'Vaibhav5','$2b$10$KmzEfW1JLs9MHpji.UiQqOC8CkW/93ezMSKB84QOShDDIPVG9pjPS','+9170570979','utkarshkorade@gmail.com','user'),(13,'Vaibhav6','$2b$10$wwLZNDILfXubod5jPbUx8OH5jwM57h3aLuJE0qXS9ZMS/miMS98U.','07057097993','utkarshkorade1@gmai','user'),(16,'Vaibhav7','$2b$10$jGkFF1mwIL.cFQdCAut55.Y/kSQgmkS2uWP9yILTcM5oyncDHHbJu','7770040256','Vaibhab@gmail','admin'),(17,'Vaibhav8','$2b$10$R6Z8N5rKGGFmwklGQYc0fuDYc5lWolbsKk7p1tmpkEnv2h4tmWY.u','07057097993','utkarshkorade10@gmai','admin'),(18,'Vaibhav9','$2b$10$uD1d.U0NhXo9kBQLWu0KeOA3qa5N.TxcBw5LHbadJcp3d9tZvCz5q','+917057097993','utkarshkorade10@gmail.com','admin');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-02-12 20:33:38
