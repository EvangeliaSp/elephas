-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema elephas
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema elephas
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `elephas` DEFAULT CHARACTER SET utf8 COLLATE utf8_bin ;
USE `elephas` ;

-- -----------------------------------------------------
-- Table `elephas`.`Color`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `elephas`.`Color` (
  `idColor` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`idColor`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8
COLLATE = utf8_bin;


-- -----------------------------------------------------
-- Table `elephas`.`Material`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `elephas`.`Material` (
  `idMaterial` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`idMaterial`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8
COLLATE = utf8_bin;


-- -----------------------------------------------------
-- Table `elephas`.`Type`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `elephas`.`Type` (
  `idType` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`idType`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8
COLLATE = utf8_bin;


-- -----------------------------------------------------
-- Table `elephas`.`Product`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `elephas`.`Product` (
  `idProduct` INT(11) NOT NULL AUTO_INCREMENT,
  `type` INT(11) NOT NULL,
  `color` INT(11) NOT NULL,
  `material` INT(11) NOT NULL,
  `description` TEXT NULL DEFAULT NULL,
  `price` DECIMAL(10,2) NOT NULL,
  `discount` FLOAT NULL DEFAULT NULL,
  PRIMARY KEY (`idProduct`),
  INDEX `fk_color_idx` (`color` ASC) VISIBLE,
  INDEX `fk_material_idx` (`material` ASC) VISIBLE,
  INDEX `fk_type_idx` (`type` ASC) VISIBLE,
  CONSTRAINT `fk_color`
    FOREIGN KEY (`color`)
    REFERENCES `elephas`.`Color` (`idColor`)
    ON DELETE CASCADE,
  CONSTRAINT `fk_material`
    FOREIGN KEY (`material`)
    REFERENCES `elephas`.`Material` (`idMaterial`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_type`
    FOREIGN KEY (`type`)
    REFERENCES `elephas`.`Type` (`idType`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8
COLLATE = utf8_bin;


-- -----------------------------------------------------
-- Table `elephas`.`User`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `elephas`.`User` (
  `email` VARCHAR(45) NOT NULL,
  `firstname` VARCHAR(45) NOT NULL,
  `lastname` VARCHAR(45) NOT NULL,
  `streetName` VARCHAR(45) NOT NULL,
  `streetNumber` INT(11) NOT NULL,
  `country` VARCHAR(45) NOT NULL,
  `zipcode` VARCHAR(10) NOT NULL,
  `telephone` VARCHAR(45) NOT NULL,
  `idUser` BIGINT(11) NOT NULL,
  PRIMARY KEY (`idUser`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8
COLLATE = utf8_bin;


-- -----------------------------------------------------
-- Table `elephas`.`Order`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `elephas`.`Order` (
  `idOrder` INT(11) NOT NULL AUTO_INCREMENT,
  `idUser` BIGINT(11) NOT NULL,
  `idProduct` INT(11) NOT NULL,
  `status` ENUM('completed', 'cancelled', 'shiped', 'in_progress') NOT NULL,
  `paymentType` ENUM('credit_card', 'payPal', 'swish') NOT NULL,
  PRIMARY KEY (`idOrder`),
  INDEX `fk_email_idx` (`idProduct` ASC) VISIBLE,
  INDEX `fk_userID_idx` (`idUser` ASC) VISIBLE,
  CONSTRAINT `fk_productID`
    FOREIGN KEY (`idProduct`)
    REFERENCES `elephas`.`Product` (`idProduct`)
    ON DELETE CASCADE,
  CONSTRAINT `fk_userID`
    FOREIGN KEY (`idUser`)
    REFERENCES `elephas`.`User` (`idUser`)
    ON DELETE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8
COLLATE = utf8_bin;


-- -----------------------------------------------------
-- Table `elephas`.`order_item`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `elephas`.`order_item` (
  `idOrder` INT(11) NOT NULL,
  `idProduct` INT(11) NOT NULL,
  `quantity` INT(11) NOT NULL,
  PRIMARY KEY (`idOrder`, `idProduct`),
  INDEX `fk_order_item_2_idx` (`idProduct` ASC) VISIBLE,
  CONSTRAINT `fk_orderID`
    FOREIGN KEY (`idOrder`)
    REFERENCES `elephas`.`Order` (`idOrder`)
    ON DELETE CASCADE,
  CONSTRAINT `fk_order_item_2`
    FOREIGN KEY (`idProduct`)
    REFERENCES `elephas`.`Product` (`idProduct`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8
COLLATE = utf8_bin;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
