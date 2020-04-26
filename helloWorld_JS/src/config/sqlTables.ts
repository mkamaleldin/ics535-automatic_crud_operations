    export const tables = `
    CREATE TABLE Users (
	userID			INT,
	name			VARCHAR,
PRIMARY KEY (userID)
);


CREATE TABLE Notes (
	noteID			INT,
	title			VARCHAR NOT NULL UNIQUE,
	notes			VARCHAR,
PRIMARY KEY (noteID)
);

    `;
    