CREATE TABLE `user` (
  `ID` integer PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(255),
  `phone` varchar(255) UNIQUE,
  `otp` varchar(255),
  `image` varchar(255) DEFAULT null,
  `region` varchar(255),
  `hashedPassword` varchar(255),
  `hashedRefreshToken` varchar(255),
  `createdAt` timestamp DEFAULT now(),
  `updatedAt` timestamp DEFAULT now()
);

CREATE TABLE `category` (
  `ID` integer PRIMARY KEY AUTO_INCREMENT,
  `nameUz` varchar(255),
  `nameRu` varchar(255),
  `parentCategoryID` integer,
  `viewCount` integer,
  `image` varchar(255),
  `descUz` varchar(255) DEFAULT null,
  `descRu` varchar(255) DEFAULT null,
  `createdAt` timestamp DEFAULT now(),
  `updatedAt` timestamp DEFAULT now()
);

CREATE TABLE `product` (
  `ID` integer PRIMARY KEY AUTO_INCREMENT,
  `nameUz` varchar(255),
  `nameRu` varchar(255),
  `images` text,
  `categoryID` integer,
  `descShortUz` varchar(255),
  `descShortRu` varchar(255),
  `descRu` text,
  `descUz` text,
  `isPopular` boolean DEFAULT false,
  `viewCount` integer DEFAULT 0,
  `price` integer DEFAULT 0,
  `cartCount` integer DEFAULT 0,
  `favoriteCount` integer DEFAULT 0,
  `orderCount` integer DEFAULT 0,
  `discount` integer DEFAULT null,
  `createdAt` timestamp DEFAULT now(),
  `updatedAt` timestamp DEFAULT now()
);

CREATE TABLE `basket` (
  `ID` integer PRIMARY KEY AUTO_INCREMENT,
  `productID` integer,
  `userID` integer,
  `count` integer,
  `createdAt` timestamp DEFAULT now()
);

CREATE TABLE `favorite` (
  `ID` integer PRIMARY KEY AUTO_INCREMENT,
  `productID` integer,
  `userID` integer,
  `createdAt` timestamp DEFAULT now(),
  `updatedAt` timestamp DEFAULT now()
);

CREATE TABLE `address` (
  `ID` integer PRIMARY KEY AUTO_INCREMENT,
  `userID` integer,
  `region` varchar(255),
  `referencePoint` varchar(255),
  `street` varchar(255),
  `house` varchar(255),
  `room` varchar(255),
  `createdAt` timestamp DEFAULT now(),
  `updatedAt` timestamp DEFAULT now()
);

CREATE TABLE `attribute` (
  `ID` integer PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(255),
  `createdAt` timestamp DEFAULT now()
);

CREATE TABLE `attributeValue` (
  `ID` integer PRIMARY KEY AUTO_INCREMENT,
  `attributeID` integer,
  `name` varchar(255),
  `createdAt` timestamp DEFAULT now()
);

CREATE TABLE `order` (
  `ID` integer PRIMARY KEY AUTO_INCREMENT,
  `productID` integer,
  `userID` integer,
  `addressID` integer,
  `deliveryTime` varchar(255) DEFAULT "1day",
  `orderStatus` varchar(255) DEFAULT "pending",
  `deliveryPrice` integer DEFAULT 15000,
  `createdAt` timestamp DEFAULT now(),
  `updatedAt` timestamp DEFAULT now()
);

CREATE TABLE `review` (
  `ID` integer PRIMARY KEY AUTO_INCREMENT,
  `comment` text,
  `userID` integer,
  `stars` integer,
  `productID` integer,
  `createdAt` timestamp DEFAULT now(),
  `updatedAt` timestamp DEFAULT now()
);

ALTER TABLE `category` ADD FOREIGN KEY (`parentCategoryID`) REFERENCES `category` (`ID`);

CREATE TABLE `category_product` (
  `category_ID` integer,
  `product_ID` integer,
  PRIMARY KEY (`category_ID`, `product_ID`)
);

ALTER TABLE `category_product` ADD FOREIGN KEY (`category_ID`) REFERENCES `category` (`ID`);

ALTER TABLE `category_product` ADD FOREIGN KEY (`product_ID`) REFERENCES `product` (`ID`);


ALTER TABLE `basket` ADD FOREIGN KEY (`productID`) REFERENCES `product` (`ID`);

ALTER TABLE `basket` ADD FOREIGN KEY (`userID`) REFERENCES `user` (`ID`);

ALTER TABLE `favorite` ADD FOREIGN KEY (`productID`) REFERENCES `product` (`ID`);

ALTER TABLE `favorite` ADD FOREIGN KEY (`userID`) REFERENCES `user` (`ID`);

ALTER TABLE `address` ADD FOREIGN KEY (`userID`) REFERENCES `user` (`ID`);

CREATE TABLE `category_attribute` (
  `category_ID` integer,
  `attribute_ID` integer,
  PRIMARY KEY (`category_ID`, `attribute_ID`)
);

ALTER TABLE `category_attribute` ADD FOREIGN KEY (`category_ID`) REFERENCES `category` (`ID`);

ALTER TABLE `category_attribute` ADD FOREIGN KEY (`attribute_ID`) REFERENCES `attribute` (`ID`);


CREATE TABLE `product_attributeValue` (
  `product_ID` integer,
  `attributeValue_ID` integer,
  PRIMARY KEY (`product_ID`, `attributeValue_ID`)
);

ALTER TABLE `product_attributeValue` ADD FOREIGN KEY (`product_ID`) REFERENCES `product` (`ID`);

ALTER TABLE `product_attributeValue` ADD FOREIGN KEY (`attributeValue_ID`) REFERENCES `attributeValue` (`ID`);


ALTER TABLE `attributeValue` ADD FOREIGN KEY (`attributeID`) REFERENCES `attribute` (`ID`);

ALTER TABLE `order` ADD FOREIGN KEY (`productID`) REFERENCES `product` (`ID`);

ALTER TABLE `order` ADD FOREIGN KEY (`userID`) REFERENCES `user` (`ID`);

ALTER TABLE `order` ADD FOREIGN KEY (`addressID`) REFERENCES `address` (`ID`);

ALTER TABLE `review` ADD FOREIGN KEY (`userID`) REFERENCES `user` (`ID`);

ALTER TABLE `review` ADD FOREIGN KEY (`productID`) REFERENCES `product` (`ID`);
