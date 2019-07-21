-- --------------------------------------------------------
-- 主机:                           127.0.0.1
-- 服务器版本:                        5.6.26 - MySQL Community Server (GPL)
-- 服务器操作系统:                      Win32
-- HeidiSQL 版本:                  9.4.0.5125
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;


-- 导出 mhzqx 的数据库结构
CREATE DATABASE IF NOT EXISTS `mhzqx` /*!40100 DEFAULT CHARACTER SET utf8 COLLATE utf8_bin */;
USE `mhzqx`;

-- 导出  表 mhzqx.cusorders 结构
CREATE TABLE IF NOT EXISTS `cusorders` (
  `ORDERID` varchar(50) COLLATE utf8_bin NOT NULL,
  `CUSID` varchar(50) COLLATE utf8_bin DEFAULT NULL,
  `ORDERTIME` int(11) DEFAULT NULL,
  `ORDERSTATE` int(11) DEFAULT NULL COMMENT '0--临时\r\n            1--下单\r\n            2--正在处理\r\n            3--处理完成',
  `ORDERTOTLEPRICE` decimal(10,2) DEFAULT NULL,
  `ORDERNUM` int(10) unsigned zerofill NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`ORDERNUM`),
  KEY `FK_Relationship_5` (`CUSID`),
  CONSTRAINT `FK_Relationship_5` FOREIGN KEY (`CUSID`) REFERENCES `customer` (`CUSID`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- 正在导出表  mhzqx.cusorders 的数据：~2 rows (大约)
/*!40000 ALTER TABLE `cusorders` DISABLE KEYS */;
INSERT INTO `cusorders` (`ORDERID`, `CUSID`, `ORDERTIME`, `ORDERSTATE`, `ORDERTOTLEPRICE`, `ORDERNUM`) VALUES
	('0ca880f0-98ab-11e9-bbf5-5be13d8682cd', 'ca1f0540-5659-4809-8708-0be47bf33f18', 26, 1, 186.00, 0000000014);
/*!40000 ALTER TABLE `cusorders` ENABLE KEYS */;

-- 导出  表 mhzqx.customer 结构
CREATE TABLE IF NOT EXISTS `customer` (
  `CUSID` varchar(50) COLLATE utf8_bin NOT NULL,
  `OPENID` varchar(50) COLLATE utf8_bin DEFAULT NULL,
  `NICKNAME` varchar(200) COLLATE utf8_bin DEFAULT NULL,
  PRIMARY KEY (`CUSID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- 正在导出表  mhzqx.customer 的数据：~1 rows (大约)
/*!40000 ALTER TABLE `customer` DISABLE KEYS */;
INSERT INTO `customer` (`CUSID`, `OPENID`, `NICKNAME`) VALUES
	('ca1f0540-5659-4809-8708-0be47bf33f18', 'otfCH5OCSsiM1k_-7Lwy4puUBuYE', '飙');
/*!40000 ALTER TABLE `customer` ENABLE KEYS */;

-- 导出  表 mhzqx.goods 结构
CREATE TABLE IF NOT EXISTS `goods` (
  `GID` varchar(50) COLLATE utf8_bin NOT NULL,
  `GTID` varchar(50) COLLATE utf8_bin DEFAULT NULL,
  `GNAME` varchar(100) COLLATE utf8_bin DEFAULT NULL,
  `GPRICE` decimal(10,2) DEFAULT NULL,
  `GSTATE` int(11) DEFAULT NULL,
  `GCONTENT` text COLLATE utf8_bin,
  `GIMG` varchar(200) COLLATE utf8_bin DEFAULT NULL,
  `GTIME` int(11) DEFAULT NULL COMMENT '需要时间（单位：分钟）',
  `GCOUNT` int(3) DEFAULT '0',
  `GINFO` varchar(50) COLLATE utf8_bin DEFAULT NULL,
  PRIMARY KEY (`GID`),
  KEY `FK_Relationship_4` (`GTID`),
  CONSTRAINT `FK_Relationship_4` FOREIGN KEY (`GTID`) REFERENCES `goodstype` (`GTID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- 正在导出表  mhzqx.goods 的数据：~6 rows (大约)
/*!40000 ALTER TABLE `goods` DISABLE KEYS */;
INSERT INTO `goods` (`GID`, `GTID`, `GNAME`, `GPRICE`, `GSTATE`, `GCONTENT`, `GIMG`, `GTIME`, `GCOUNT`, `GINFO`) VALUES
	('3018da52-6fa4-4ad8-8412-98333a1bc1f4', '2', '樱桃', 30.00, 1, '夏季供应', 'wxc7f540d89f35da73.o6zAJs7hq-Iyd7O4lOvl11LFDr6c.eAm2jjPDykQt3f7e6451e277c5c73f6f7f3ddf66433b.jpg', 5, 0, '好吃不贵'),
	('4b9363b7-a4f8-4329-8024-b53386cf4ddc', '3', '咖啡\r\n', 50.00, 1, '周三到周五供应', 'food3.png', 4, 0, '这是一份儿非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非'),
	('58d9a28f-8746-492b-9f25-bcbe440ed636', '2', '山竹', 20.00, 1, '不供应', 'food9.png', 10, 0, '这是一份儿非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非'),
	('82cb2db1-fd7e-48ed-89f5-24813da9dca6', '2', '梨', 20.00, 1, '全年供应', 'food1.png', 5, 0, '这是一份儿非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常好'),
	('89e8ec77-8820-48c1-9d4e-f001f093ff93', '1', '饭团', 5.00, 1, '周一至周六供应', 'food6.png', 4, 0, '这是一份儿非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非'),
	('d5646197-83c5-459e-85f9-f69e4207e52a', '3', '布丁', 38.00, 1, '周一至周六供应', 'food2.png', 5, 0, '这是一份儿非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非');
/*!40000 ALTER TABLE `goods` ENABLE KEYS */;

-- 导出  表 mhzqx.goodstype 结构
CREATE TABLE IF NOT EXISTS `goodstype` (
  `GTID` varchar(50) COLLATE utf8_bin NOT NULL,
  `GTNAME` varchar(30) COLLATE utf8_bin DEFAULT NULL,
  `GTSTATE` int(11) DEFAULT NULL,
  PRIMARY KEY (`GTID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- 正在导出表  mhzqx.goodstype 的数据：~4 rows (大约)
/*!40000 ALTER TABLE `goodstype` DISABLE KEYS */;
INSERT INTO `goodstype` (`GTID`, `GTNAME`, `GTSTATE`) VALUES
	('1', '主食', 1),
	('2', '水果', 1),
	('3', '甜点', 1);
/*!40000 ALTER TABLE `goodstype` ENABLE KEYS */;

-- 导出  表 mhzqx.orderdetail 结构
CREATE TABLE IF NOT EXISTS `orderdetail` (
  `GID` varchar(50) COLLATE utf8_bin DEFAULT NULL,
  `ORDERID` varchar(50) COLLATE utf8_bin DEFAULT NULL,
  `GNAME` varchar(50) COLLATE utf8_bin DEFAULT NULL,
  `GCOUNT` decimal(10,2) DEFAULT NULL,
  `GPRICE` varchar(50) COLLATE utf8_bin DEFAULT NULL,
  `GTIME` int(11) DEFAULT NULL,
  KEY `FK_Relationship_6` (`ORDERID`),
  KEY `FK_Relationship_7` (`GID`),
  CONSTRAINT `FK_Relationship_7` FOREIGN KEY (`GID`) REFERENCES `goods` (`GID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- 正在导出表  mhzqx.orderdetail 的数据：~12 rows (大约)
/*!40000 ALTER TABLE `orderdetail` DISABLE KEYS */;
INSERT INTO `orderdetail` (`GID`, `ORDERID`, `GNAME`, `GCOUNT`, `GPRICE`, `GTIME`) VALUES
	('58d9a28f-8746-492b-9f25-bcbe440ed636', 'ef137ef0-9887-11e9-9960-e90128ae1bef', '山竹', 11.00, '20', 10),
	('89e8ec77-8820-48c1-9d4e-f001f093ff93', 'f855cbd0-9887-11e9-9960-e90128ae1bef', '饭团', 2.00, '5', 4),
	('58d9a28f-8746-492b-9f25-bcbe440ed636', 'f855cbd0-9887-11e9-9960-e90128ae1bef', '山竹', 4.00, '20', 10),
	('4b9363b7-a4f8-4329-8024-b53386cf4ddc', 'f855cbd0-9887-11e9-9960-e90128ae1bef', '咖啡\r\n', 1.00, '50', 4),
	('d5646197-83c5-459e-85f9-f69e4207e52a', 'f855cbd0-9887-11e9-9960-e90128ae1bef', '布丁', 1.00, '38', 5),
	('89e8ec77-8820-48c1-9d4e-f001f093ff93', 'dee398b0-9889-11e9-afc3-1d12f18a915f', '饭团', 20.00, '5', 4),
	('89e8ec77-8820-48c1-9d4e-f001f093ff93', '0894df60-98a9-11e9-acc3-f7241ce36425', '饭团', 4.00, '5', 4),
	('89e8ec77-8820-48c1-9d4e-f001f093ff93', '12c6bc60-98a9-11e9-acc3-f7241ce36425', '饭团', 4.00, '5', 4),
	('58d9a28f-8746-492b-9f25-bcbe440ed636', '12c6bc60-98a9-11e9-acc3-f7241ce36425', '山竹', 2.00, '20', 10),
	('89e8ec77-8820-48c1-9d4e-f001f093ff93', 'ef7f8ec0-98a9-11e9-a2b1-cf87d44fe9f7', '饭团', 2.00, '5', 4),
	('89e8ec77-8820-48c1-9d4e-f001f093ff93', '0ca880f0-98ab-11e9-bbf5-5be13d8682cd', '饭团', 2.00, '5', 4),
	('4b9363b7-a4f8-4329-8024-b53386cf4ddc', '0ca880f0-98ab-11e9-bbf5-5be13d8682cd', '咖啡\r\n', 2.00, '50', 4),
	('d5646197-83c5-459e-85f9-f69e4207e52a', '0ca880f0-98ab-11e9-bbf5-5be13d8682cd', '布丁', 2.00, '38', 5);
/*!40000 ALTER TABLE `orderdetail` ENABLE KEYS */;

-- 导出  表 mhzqx.overorder 结构
CREATE TABLE IF NOT EXISTS `overorder` (
  `ORDERID` varchar(50) COLLATE utf8_bin NOT NULL,
  `CUSID` varchar(50) COLLATE utf8_bin DEFAULT NULL,
  `ORDERTIME` int(11) DEFAULT NULL,
  `ORDERSTATE` int(11) DEFAULT '3' COMMENT '0--临时\\\\\\\\r\\\\\\\\n            1--下单\\\\\\\\r\\\\\\\\n            2--正在处理\\\\\\\\r\\\\\\\\n            3--处理完成',
  `ORDERTOTLEPRICE` decimal(10,2) DEFAULT NULL,
  `ORDERNUM` int(10) unsigned zerofill NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`ORDERNUM`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- 正在导出表  mhzqx.overorder 的数据：~4 rows (大约)
/*!40000 ALTER TABLE `overorder` DISABLE KEYS */;
INSERT INTO `overorder` (`ORDERID`, `CUSID`, `ORDERTIME`, `ORDERSTATE`, `ORDERTOTLEPRICE`, `ORDERNUM`) VALUES
	('ef137ef0-9887-11e9-9960-e90128ae1bef', 'ca1f0540-5659-4809-8708-0be47bf33f18', 110, 3, 220.00, 0000000003),
	('f855cbd0-9887-11e9-9960-e90128ae1bef', 'ca1f0540-5659-4809-8708-0be47bf33f18', 57, 3, 178.00, 0000000004),
	('0894df60-98a9-11e9-acc3-f7241ce36425', 'ca1f0540-5659-4809-8708-0be47bf33f18', 16, 3, 20.00, 0000000005),
	('12c6bc60-98a9-11e9-acc3-f7241ce36425', 'ca1f0540-5659-4809-8708-0be47bf33f18', 36, 3, 60.00, 0000000006),
	('ef7f8ec0-98a9-11e9-a2b1-cf87d44fe9f7', 'ca1f0540-5659-4809-8708-0be47bf33f18', 8, 3, 10.00, 0000000007);
/*!40000 ALTER TABLE `overorder` ENABLE KEYS */;

-- 导出  表 mhzqx.roleright 结构
CREATE TABLE IF NOT EXISTS `roleright` (
  `RRID` varchar(50) COLLATE utf8_bin NOT NULL,
  `ROLEID` varchar(50) COLLATE utf8_bin DEFAULT NULL,
  `FUNID` varchar(50) COLLATE utf8_bin DEFAULT NULL,
  PRIMARY KEY (`RRID`),
  KEY `FK_Relationship_1` (`ROLEID`),
  KEY `FK_Relationship_2` (`FUNID`),
  CONSTRAINT `FK_Relationship_1` FOREIGN KEY (`ROLEID`) REFERENCES `sysrole` (`ROLEID`),
  CONSTRAINT `FK_Relationship_2` FOREIGN KEY (`FUNID`) REFERENCES `sysfunction` (`FUNID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- 正在导出表  mhzqx.roleright 的数据：~0 rows (大约)
/*!40000 ALTER TABLE `roleright` DISABLE KEYS */;
/*!40000 ALTER TABLE `roleright` ENABLE KEYS */;

-- 导出  表 mhzqx.syscus 结构
CREATE TABLE IF NOT EXISTS `syscus` (
  `CUSID` varchar(50) COLLATE utf8_bin NOT NULL,
  `NICKNAME` varchar(50) COLLATE utf8_bin NOT NULL,
  `LIMITS` varchar(50) COLLATE utf8_bin DEFAULT NULL,
  PRIMARY KEY (`CUSID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- 正在导出表  mhzqx.syscus 的数据：~1 rows (大约)
/*!40000 ALTER TABLE `syscus` DISABLE KEYS */;
INSERT INTO `syscus` (`CUSID`, `NICKNAME`, `LIMITS`) VALUES
	('ca1f0540-5659-4809-8708-0be47bf33f18', '飙', 'true');
/*!40000 ALTER TABLE `syscus` ENABLE KEYS */;

-- 导出  表 mhzqx.sysfunction 结构
CREATE TABLE IF NOT EXISTS `sysfunction` (
  `FUNID` varchar(50) COLLATE utf8_bin NOT NULL,
  `FUNNAME` varchar(30) COLLATE utf8_bin DEFAULT NULL,
  `FUNPID` varchar(50) COLLATE utf8_bin DEFAULT NULL,
  `FUNURL` varchar(200) COLLATE utf8_bin DEFAULT NULL,
  `FUNSTATE` int(11) DEFAULT NULL,
  PRIMARY KEY (`FUNID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- 正在导出表  mhzqx.sysfunction 的数据：~0 rows (大约)
/*!40000 ALTER TABLE `sysfunction` DISABLE KEYS */;
/*!40000 ALTER TABLE `sysfunction` ENABLE KEYS */;

-- 导出  表 mhzqx.sysrole 结构
CREATE TABLE IF NOT EXISTS `sysrole` (
  `ROLEID` varchar(50) COLLATE utf8_bin NOT NULL,
  `ROLENAME` varchar(20) COLLATE utf8_bin DEFAULT NULL,
  `ROLESTATE` int(11) DEFAULT NULL,
  PRIMARY KEY (`ROLEID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- 正在导出表  mhzqx.sysrole 的数据：~0 rows (大约)
/*!40000 ALTER TABLE `sysrole` DISABLE KEYS */;
/*!40000 ALTER TABLE `sysrole` ENABLE KEYS */;

-- 导出  表 mhzqx.sysuser 结构
CREATE TABLE IF NOT EXISTS `sysuser` (
  `USERID` varchar(50) COLLATE utf8_bin NOT NULL,
  `ROLEID` varchar(50) COLLATE utf8_bin DEFAULT NULL,
  `USERNAME` varchar(30) COLLATE utf8_bin DEFAULT NULL,
  `USERPWD` varchar(30) COLLATE utf8_bin DEFAULT NULL,
  `USERSEX` char(2) COLLATE utf8_bin DEFAULT NULL,
  `USERTRUENAME` varchar(30) COLLATE utf8_bin DEFAULT NULL,
  `USERSTATE` int(11) DEFAULT NULL,
  PRIMARY KEY (`USERID`),
  KEY `FK_Relationship_3` (`ROLEID`),
  CONSTRAINT `FK_Relationship_3` FOREIGN KEY (`ROLEID`) REFERENCES `sysrole` (`ROLEID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- 正在导出表  mhzqx.sysuser 的数据：~0 rows (大约)
/*!40000 ALTER TABLE `sysuser` DISABLE KEYS */;
/*!40000 ALTER TABLE `sysuser` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
