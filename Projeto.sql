-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema ProjetoEverton
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema ProjetoEverton
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `ProjetoEverton` DEFAULT CHARACTER SET utf8 ;
USE `ProjetoEverton` ;

-- -----------------------------------------------------
-- Table `ProjetoEverton`.`Nivel_Usuario`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ProjetoEverton`.`Nivel_Usuario` (
  `idNivel_Usuario` INT NOT NULL AUTO_INCREMENT,
  `Nome` VARCHAR(45) NULL,
  PRIMARY KEY (`idNivel_Usuario`),
  UNIQUE INDEX `idNivel_Usuario_UNIQUE` (`idNivel_Usuario` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ProjetoEverton`.`Usuario`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ProjetoEverton`.`Usuario` (
  `idUsuario` INT NOT NULL,
  `Nome` VARCHAR(45) NOT NULL,
  `Email` VARCHAR(45) NOT NULL,
  `Senha` VARCHAR(45) NOT NULL,
  `Nivel_Usuario_idNivel_Usuario` INT NOT NULL,
  PRIMARY KEY (`idUsuario`),
  INDEX `fk_Usuario_Nivel_Usuario1_idx` (`Nivel_Usuario_idNivel_Usuario` ASC) VISIBLE,
  CONSTRAINT `fk_Usuario_Nivel_Usuario1`
    FOREIGN KEY (`Nivel_Usuario_idNivel_Usuario`)
    REFERENCES `ProjetoEverton`.`Nivel_Usuario` (`idNivel_Usuario`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ProjetoEverton`.`Cliente`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ProjetoEverton`.`Cliente` (
  `idCliente` INT NOT NULL AUTO_INCREMENT,
  `Nome` VARCHAR(45) NOT NULL,
  `Fone` VARCHAR(45) NOT NULL,
  `CPF` VARCHAR(45) NOT NULL,
  `Usuario_idUsuario` INT NOT NULL,
  PRIMARY KEY (`idCliente`),
  INDEX `fk_Cliente_Usuario_idx` (`Usuario_idUsuario` ASC) VISIBLE,
  UNIQUE INDEX `idCliente_UNIQUE` (`idCliente` ASC) VISIBLE,
  CONSTRAINT `fk_Cliente_Usuario`
    FOREIGN KEY (`Usuario_idUsuario`)
    REFERENCES `ProjetoEverton`.`Usuario` (`idUsuario`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ProjetoEverton`.`CNPJ`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ProjetoEverton`.`CNPJ` (
  `idCNPJ` INT NOT NULL AUTO_INCREMENT,
  `Nome` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`idCNPJ`),
  UNIQUE INDEX `idCNPJ_UNIQUE` (`idCNPJ` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ProjetoEverton`.`Cliente_CNPJ`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ProjetoEverton`.`Cliente_CNPJ` (
  `idCliente_CNPJ` INT NOT NULL AUTO_INCREMENT,
  `Cliente_idCliente` INT NOT NULL,
  `CNPJ_idCNPJ` INT NOT NULL,
  PRIMARY KEY (`idCliente_CNPJ`),
  INDEX `fk_Cliente_CNPJ_Cliente1_idx` (`Cliente_idCliente` ASC) VISIBLE,
  UNIQUE INDEX `idCliente_CNPJ_UNIQUE` (`idCliente_CNPJ` ASC) VISIBLE,
  INDEX `fk_Cliente_CNPJ_CNPJ1_idx` (`CNPJ_idCNPJ` ASC) VISIBLE,
  CONSTRAINT `fk_Cliente_CNPJ_Cliente1`
    FOREIGN KEY (`Cliente_idCliente`)
    REFERENCES `ProjetoEverton`.`Cliente` (`idCliente`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Cliente_CNPJ_CNPJ1`
    FOREIGN KEY (`CNPJ_idCNPJ`)
    REFERENCES `ProjetoEverton`.`CNPJ` (`idCNPJ`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ProjetoEverton`.`Tipo_Link`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ProjetoEverton`.`Tipo_Link` (
  `idTipo_Link` INT NOT NULL AUTO_INCREMENT,
  `Nome` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`idTipo_Link`),
  UNIQUE INDEX `idTipo_Link_UNIQUE` (`idTipo_Link` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ProjetoEverton`.`CNAE`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ProjetoEverton`.`CNAE` (
  `idCNAE` INT NOT NULL AUTO_INCREMENT,
  `Nome` VARCHAR(45) NOT NULL,
  `Numero` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`idCNAE`),
  UNIQUE INDEX `idCNAE_UNIQUE` (`idCNAE` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ProjetoEverton`.`Geração de LINK`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ProjetoEverton`.`Geração de LINK` (
  `idGeração de LINK` INT NOT NULL AUTO_INCREMENT,
  `Link` VARCHAR(45) NOT NULL,
  `Tipo_Link_idTipo_Link` INT NOT NULL,
  `Cliente_idCliente` INT NOT NULL,
  `Cliente_CNPJ_idCliente_CNPJ` INT NOT NULL,
  `CNAE_idCNAE` INT NOT NULL,
  PRIMARY KEY (`idGeração de LINK`),
  UNIQUE INDEX `idGeração de LINK_UNIQUE` (`idGeração de LINK` ASC) VISIBLE,
  INDEX `fk_Geração de LINK_Tipo_Link1_idx` (`Tipo_Link_idTipo_Link` ASC) VISIBLE,
  INDEX `fk_Geração de LINK_Cliente1_idx` (`Cliente_idCliente` ASC) VISIBLE,
  INDEX `fk_Geração de LINK_Cliente_CNPJ1_idx` (`Cliente_CNPJ_idCliente_CNPJ` ASC) VISIBLE,
  INDEX `fk_Geração de LINK_CNAE1_idx` (`CNAE_idCNAE` ASC) VISIBLE,
  CONSTRAINT `fk_Geração de LINK_Tipo_Link1`
    FOREIGN KEY (`Tipo_Link_idTipo_Link`)
    REFERENCES `ProjetoEverton`.`Tipo_Link` (`idTipo_Link`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Geração de LINK_Cliente1`
    FOREIGN KEY (`Cliente_idCliente`)
    REFERENCES `ProjetoEverton`.`Cliente` (`idCliente`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Geração de LINK_Cliente_CNPJ1`
    FOREIGN KEY (`Cliente_CNPJ_idCliente_CNPJ`)
    REFERENCES `ProjetoEverton`.`Cliente_CNPJ` (`idCliente_CNPJ`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Geração de LINK_CNAE1`
    FOREIGN KEY (`CNAE_idCNAE`)
    REFERENCES `ProjetoEverton`.`CNAE` (`idCNAE`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ProjetoEverton`.`CNPJ_CNAE`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ProjetoEverton`.`CNPJ_CNAE` (
  `idCNPJ_CNAE` INT NOT NULL AUTO_INCREMENT,
  `CNAE_idCNAE` INT NOT NULL,
  `CNPJ_idCNPJ` INT NOT NULL,
  PRIMARY KEY (`idCNPJ_CNAE`),
  UNIQUE INDEX `idCNPJ_CNAE_UNIQUE` (`idCNPJ_CNAE` ASC) VISIBLE,
  INDEX `fk_CNPJ_CNAE_CNAE1_idx` (`CNAE_idCNAE` ASC) VISIBLE,
  INDEX `fk_CNPJ_CNAE_CNPJ1_idx` (`CNPJ_idCNPJ` ASC) VISIBLE,
  CONSTRAINT `fk_CNPJ_CNAE_CNAE1`
    FOREIGN KEY (`CNAE_idCNAE`)
    REFERENCES `ProjetoEverton`.`CNAE` (`idCNAE`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_CNPJ_CNAE_CNPJ1`
    FOREIGN KEY (`CNPJ_idCNPJ`)
    REFERENCES `ProjetoEverton`.`CNPJ` (`idCNPJ`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ProjetoEverton`.`Tipo_Documento`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ProjetoEverton`.`Tipo_Documento` (
  `idTipo_Documento` INT NOT NULL AUTO_INCREMENT,
  `Nome` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`idTipo_Documento`),
  UNIQUE INDEX `idTipo_Documento_UNIQUE` (`idTipo_Documento` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ProjetoEverton`.`Documento`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ProjetoEverton`.`Documento` (
  `idDocumento` INT NOT NULL AUTO_INCREMENT,
  `Link` VARCHAR(45) NOT NULL,
  `Tipo_Documento_idTipo_Documento` INT NOT NULL,
  `Cliente_idCliente` INT NOT NULL,
  `CNPJ_idCNPJ` INT NOT NULL,
  PRIMARY KEY (`idDocumento`),
  UNIQUE INDEX `idDocumento_UNIQUE` (`idDocumento` ASC) VISIBLE,
  INDEX `fk_Documento_Tipo_Documento1_idx` (`Tipo_Documento_idTipo_Documento` ASC) VISIBLE,
  INDEX `fk_Documento_Cliente1_idx` (`Cliente_idCliente` ASC) VISIBLE,
  INDEX `fk_Documento_CNPJ1_idx` (`CNPJ_idCNPJ` ASC) VISIBLE,
  CONSTRAINT `fk_Documento_Tipo_Documento1`
    FOREIGN KEY (`Tipo_Documento_idTipo_Documento`)
    REFERENCES `ProjetoEverton`.`Tipo_Documento` (`idTipo_Documento`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Documento_Cliente1`
    FOREIGN KEY (`Cliente_idCliente`)
    REFERENCES `ProjetoEverton`.`Cliente` (`idCliente`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Documento_CNPJ1`
    FOREIGN KEY (`CNPJ_idCNPJ`)
    REFERENCES `ProjetoEverton`.`CNPJ` (`idCNPJ`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
