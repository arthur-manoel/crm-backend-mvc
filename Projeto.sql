-- Desabilita FKs para criar na ordem (reabilita no fim)
SET FOREIGN_KEY_CHECKS = 0;

-- -------------------------
-- Tabela: nivel_usuario
-- -------------------------
DROP TABLE IF EXISTS nivel_usuario;
CREATE TABLE nivel_usuario (
  id_nivel_usuario INT NOT NULL AUTO_INCREMENT,
  nome VARCHAR(100) NOT NULL,
  PRIMARY KEY (id_nivel_usuario)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- -------------------------
-- Tabela: usuario
-- -------------------------
DROP TABLE IF EXISTS usuario;
CREATE TABLE usuario (
  id_usuario INT NOT NULL AUTO_INCREMENT,
  nome VARCHAR(100) NOT NULL,
  email VARCHAR(191) NOT NULL,
  senha VARCHAR(255) NOT NULL,
  nivel_usuario_id INT NOT NULL,
  PRIMARY KEY (id_usuario),
  UNIQUE KEY uq_usuario_email (email),
  KEY idx_usuario_nivel (nivel_usuario_id),
  CONSTRAINT fk_usuario_nivel
    FOREIGN KEY (nivel_usuario_id)
    REFERENCES nivel_usuario (id_nivel_usuario)
    ON UPDATE CASCADE
    ON DELETE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- -------------------------
-- Tabela: cliente
-- -------------------------
DROP TABLE IF EXISTS cliente;
CREATE TABLE cliente (
  id_cliente INT NOT NULL AUTO_INCREMENT,
  nome VARCHAR(100) NOT NULL,
  fone VARCHAR(45) NULL,
  cpf VARCHAR(45) NOT NULL,
  usuario_id INT NOT NULL,
  PRIMARY KEY (id_cliente),
  UNIQUE KEY uq_cliente_cpf (cpf),
  KEY idx_cliente_usuario (usuario_id),
  CONSTRAINT fk_cliente_usuario
    FOREIGN KEY (usuario_id)
    REFERENCES usuario (id_usuario)
    ON UPDATE CASCADE
    ON DELETE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- -------------------------
-- Tabela: cnpj
-- -------------------------
DROP TABLE IF EXISTS cnpj;
CREATE TABLE cnpj (
  id_cnpj INT NOT NULL AUTO_INCREMENT,
  nome VARCHAR(100) NULL,
  PRIMARY KEY (id_cnpj)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- -------------------------
-- Tabela: cliente_cnpj (pivot)
-- -------------------------
DROP TABLE IF EXISTS cliente_cnpj;
CREATE TABLE cliente_cnpj (
  id_cliente_cnpj INT NOT NULL AUTO_INCREMENT,
  cliente_id INT NOT NULL,
  cnpj_id INT NOT NULL,
  PRIMARY KEY (id_cliente_cnpj),
  KEY idx_cliente_cnpj_cliente (cliente_id),
  KEY idx_cliente_cnpj_cnpj (cnpj_id),
  CONSTRAINT fk_cliente_cnpj_cliente
    FOREIGN KEY (cliente_id)
    REFERENCES cliente (id_cliente)
    ON UPDATE CASCADE
    ON DELETE RESTRICT,
  CONSTRAINT fk_cliente_cnpj_cnpj
    FOREIGN KEY (cnpj_id)
    REFERENCES cnpj (id_cnpj)
    ON UPDATE CASCADE
    ON DELETE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- -------------------------
-- Tabela: tipo_link
-- -------------------------
DROP TABLE IF EXISTS tipo_link;
CREATE TABLE tipo_link (
  id_tipo_link INT NOT NULL AUTO_INCREMENT,
  nome VARCHAR(45) NOT NULL,
  PRIMARY KEY (id_tipo_link)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- -------------------------
-- Tabela: cnae
-- -------------------------
DROP TABLE IF EXISTS cnae;
CREATE TABLE cnae (
  id_cnae INT NOT NULL AUTO_INCREMENT,
  nome VARCHAR(200) NOT NULL,
  numero VARCHAR(45) NOT NULL,
  PRIMARY KEY (id_cnae),
  UNIQUE KEY uq_cnae_numero (numero)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- -------------------------
-- Tabela: geracao_link  (antes "Geração de LINK")
-- -------------------------
DROP TABLE IF EXISTS geracao_link;
CREATE TABLE geracao_link (
  id_geracao_link INT NOT NULL AUTO_INCREMENT,
  link VARCHAR(255) NOT NULL,
  tipo_link_id INT NOT NULL,
  cliente_id INT NOT NULL,
  cliente_cnpj_id INT NOT NULL,
  cnae_id INT NOT NULL,
  PRIMARY KEY (id_geracao_link),
  KEY idx_gl_tipo_link (tipo_link_id),
  KEY idx_gl_cliente (cliente_id),
  KEY idx_gl_cliente_cnpj (cliente_cnpj_id),
  KEY idx_gl_cnae (cnae_id),
  CONSTRAINT fk_gl_tipo_link
    FOREIGN KEY (tipo_link_id)
    REFERENCES tipo_link (id_tipo_link)
    ON UPDATE CASCADE
    ON DELETE RESTRICT,
  CONSTRAINT fk_gl_cliente
    FOREIGN KEY (cliente_id)
    REFERENCES cliente (id_cliente)
    ON UPDATE CASCADE
    ON DELETE RESTRICT,
  CONSTRAINT fk_gl_cliente_cnpj
    FOREIGN KEY (cliente_cnpj_id)
    REFERENCES cliente_cnpj (id_cliente_cnpj)
    ON UPDATE CASCADE
    ON DELETE RESTRICT,
  CONSTRAINT fk_gl_cnae
    FOREIGN KEY (cnae_id)
    REFERENCES cnae (id_cnae)
    ON UPDATE CASCADE
    ON DELETE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- -------------------------
-- Tabela: cnpj_cnae (pivot)
-- -------------------------
DROP TABLE IF EXISTS cnpj_cnae;
CREATE TABLE cnpj_cnae (
  id_cnpj_cnae INT NOT NULL AUTO_INCREMENT,
  cnae_id INT NOT NULL,
  cnpj_id INT NOT NULL,
  PRIMARY KEY (id_cnpj_cnae),
  KEY idx_cnpj_cnae_cnae (cnae_id),
  KEY idx_cnpj_cnae_cnpj (cnpj_id),
  CONSTRAINT fk_cnpj_cnae_cnae
    FOREIGN KEY (cnae_id)
    REFERENCES cnae (id_cnae)
    ON UPDATE CASCADE
    ON DELETE RESTRICT,
  CONSTRAINT fk_cnpj_cnae_cnpj
    FOREIGN KEY (cnpj_id)
    REFERENCES cnpj (id_cnpj)
    ON UPDATE CASCADE
    ON DELETE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- -------------------------
-- Tabela: tipo_documento
-- -------------------------
DROP TABLE IF EXISTS tipo_documento;
CREATE TABLE tipo_documento (
  id_tipo_documento INT NOT NULL AUTO_INCREMENT,
  nome VARCHAR(45) NULL,
  PRIMARY KEY (id_tipo_documento)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- -------------------------
-- Tabela: documento
-- -------------------------
DROP TABLE IF EXISTS documento;
CREATE TABLE documento (
  id_documento INT NOT NULL AUTO_INCREMENT,
  link VARCHAR(255) NOT NULL,
  tipo_documento_id INT NOT NULL,
  cliente_id INT NOT NULL,
  cnpj_id INT NOT NULL,
  PRIMARY KEY (id_documento),
  KEY idx_doc_tipo (tipo_documento_id),
  KEY idx_doc_cliente (cliente_id),
  KEY idx_doc_cnpj (cnpj_id),
  CONSTRAINT fk_doc_tipo
    FOREIGN KEY (tipo_documento_id)
    REFERENCES tipo_documento (id_tipo_documento)
    ON UPDATE CASCADE
    ON DELETE RESTRICT,
  CONSTRAINT fk_doc_cliente
    FOREIGN KEY (cliente_id)
    REFERENCES cliente (id_cliente)
    ON UPDATE CASCADE
    ON DELETE RESTRICT,
  CONSTRAINT fk_doc_cnpj
    FOREIGN KEY (cnpj_id)
    REFERENCES cnpj (id_cnpj)
    ON UPDATE CASCADE
    ON DELETE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- -------------------------
-- Tabela: cnpj_status (corrigido o typo "CPNJ")
-- -------------------------
DROP TABLE IF EXISTS cnpj_status;
CREATE TABLE cnpj_status (
  id_cnpj_status INT NOT NULL AUTO_INCREMENT,
  cnpj_id INT NOT NULL,
  PRIMARY KEY (id_cnpj_status),
  KEY idx_cnpj_status_cnpj (cnpj_id),
  CONSTRAINT fk_cnpj_status_cnpj
    FOREIGN KEY (cnpj_id)
    REFERENCES cnpj (id_cnpj)
    ON UPDATE CASCADE
    ON DELETE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Reabilita FKs
SET FOREIGN_KEY_CHECKS = 1;