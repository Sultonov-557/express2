DROP TABLE IF EXISTS `user`;
DROP TABLE IF EXISTS `review`;
DROP TABLE IF EXISTS `address`;
DROP TABLE IF EXISTS `attribute`;
DROP TABLE IF EXISTS `attribute_value`;
DROP TABLE IF EXISTS `product`;
DROP TABLE IF EXISTS `order`;
DROP TABLE IF EXISTS `cart`;
DROP TABLE IF EXISTS `favorite`;
DROP TABLE IF EXISTS `category`;
DROP TABLE IF EXISTS `category_attribute`;

CREATE TABLE `user` (
  `ID` integer PRIMARY KEY auto,
  `username` varchar(255),
  `name` varchar(255),
  `photo` varchar(255),
  `password` varchar(255),
  `region` varchar(255),
  `phone` varchar(255),
  `otp` varchar(255),
  `role` varchar(255),
  `refresh_token` varchar(255),
  `created_at` timestamp DEFAULT now(),
  `updated_at` timestamp DEFAULT now()
);

CREATE TABLE `review` (
  `ID` integer PRIMARY KEY,
  `user_ID` integer,
  `product_ID` integer,
  `text` text,
  `stars` integer,
  `created_at` timestamp DEFAULT now(),
  `updated_at` timestamp DEFAULT now()
);

CREATE TABLE `address` (
  `ID` integer PRIMARY KEY,
  `user_ID` integer,
  `region` varchar(255),
  `reference_point` varchar(255),
  `street` varchar(255),
  `house` varchar(255),
  `room` varchar(255),
  `created_at` timestamp DEFAULT now(),
  `updated_at` timestamp DEFAULT now()
);

CREATE TABLE `attribute` (
  `ID` integer PRIMARY KEY,
  `product_ID` integer,
  `category_ID` integer,
  `name` varchar(255)
);

CREATE TABLE `attribute_value` (
  `ID` integer PRIMARY KEY,
  `value` varchar(255),
  `attribute_ID` varchar(255)
);

CREATE TABLE `product` (
  `ID` integer PRIMARY KEY,
  `category` integer,
  `images` text,
  `name` varchar(255),
  `des_short` varchar(255),
  `des` text,
  `price` integer,
  `count` integer,
  `view` integer,
  `cart_count` integer DEFAULT 0,
  `favorite_count` integer DEFAULT 0,
  `order_count` integer DEFAULT 0,
  `discount` integer DEFAULT null,
  `created_at` timestamp DEFAULT now(),
  `updated_at` timestamp DEFAULT now()
);

CREATE TABLE `order` (
  `ID` integer PRIMARY KEY,
  `user_ID` integer,
  `product_ID` integer,
  `address_ID` integer,
  `status` varchar(255),
  `price` integer,
  `delivery_time` varchar(255),
  `created_at` timestamp DEFAULT now(),
  `updated_at` timestamp DEFAULT now()
);

CREATE TABLE `cart` (
  `user_ID` integer,
  `product_ID` integer,
  `created_at` timestamp DEFAULT now(),
  `updated_at` timestamp DEFAULT now()
);

CREATE TABLE `favorite` (
  `ID` integer PRIMARY KEY,
  `user_ID` integer,
  `product_ID` integer,
  `created_at` timestamp DEFAULT now(),
  `updated_at` timestamp DEFAULT now()
);

CREATE TABLE `category` (
  `ID` integer PRIMARY KEY,
  `name_UZ` varchar(255),
  `name_RU` varchar(255),
  `photo` varchar(255),
  `parent_category_ID` integer,
  `created_at` timestamp DEFAULT now(),
  `updated_at` timestamp DEFAULT now()
);

ALTER TABLE `cart` ADD FOREIGN KEY (`user_ID`) REFERENCES `user` (`ID`);

ALTER TABLE `cart` ADD FOREIGN KEY (`product_ID`) REFERENCES `product` (`ID`);

ALTER TABLE `favorite` ADD FOREIGN KEY (`user_ID`) REFERENCES `user` (`ID`);

ALTER TABLE `favorite` ADD FOREIGN KEY (`product_ID`) REFERENCES `product` (`ID`);

ALTER TABLE `category` ADD FOREIGN KEY (`parent_category_ID`) REFERENCES `category` (`ID`);

ALTER TABLE `address` ADD FOREIGN KEY (`user_ID`) REFERENCES `user` (`ID`);

ALTER TABLE `attribute` ADD FOREIGN KEY (`product_ID`) REFERENCES `product` (`ID`);

CREATE TABLE `category_attribute` (
  `category_ID` integer,
  `attribute_category_ID` integer,
  PRIMARY KEY (`category_ID`, `attribute_category_ID`)
);

ALTER TABLE `category_attribute` ADD FOREIGN KEY (`category_ID`) REFERENCES `category` (`ID`);


ALTER TABLE `order` ADD FOREIGN KEY (`product_ID`) REFERENCES `product` (`ID`);

ALTER TABLE `order` ADD FOREIGN KEY (`address_ID`) REFERENCES `address` (`ID`);

ALTER TABLE `order` ADD FOREIGN KEY (`user_ID`) REFERENCES `user` (`ID`);

ALTER TABLE `review` ADD FOREIGN KEY (`user_ID`) REFERENCES `user` (`ID`);

ALTER TABLE `review` ADD FOREIGN KEY (`product_ID`) REFERENCES `product` (`ID`);
