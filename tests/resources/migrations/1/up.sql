/* You can use block/inline comments, just don't forget the semi-column! */

-- MyEntity table
CREATE TABLE `my_entities` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `version` INT NOT NULL DEFAULT 0,
    `is_discarded` TINYINT(1) NOT NULL DEFAULT 0,
    `registered_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `name` VARCHAR(255) NOT NULL,
    PRIMARY KEY (`id`)
) ENGINE = InnoDB;


-- MyAggregate table
CREATE TABLE `my_aggregates` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `version` INT NOT NULL DEFAULT 0,
    `is_discarded` TINYINT(1) NOT NULL DEFAULT 0,
    `registered_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `reference_id` INT NOT NULL,
    `counter` INT NOT NULL,
    PRIMARY KEY (`id`),
    CONSTRAINT `fk_my_aggregates_my_entities`
        FOREIGN KEY (`reference_id`)
        REFERENCES `my_entities` (`id`)
        ON DELETE NO ACTION
        ON UPDATE NO ACTION
) ENGINE = InnoDB;
