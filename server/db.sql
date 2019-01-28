 DROP DATABASE IF EXISTS politico;
 CREATE DATABASE politico;

 \c politico;

-- USERS TABLE
CREATE TABLE IF NOT EXISTS users(
      id SERIAL PRIMARY KEY,
      firstname VARCHAR(128) NOT NULL,
      lastname VARCHAR(128) NOT NULL,
      othername VARCHAR(128) NOT NULL,
      email VARCHAR(128) UNIQUE NOT NULL,
      phone VARCHAR(128) UNIQUE NOT NULL,
      passportUrl VARCHAR(128) UNIQUE NOT NULL,
      password VARCHAR(128) NOT NULL,
      isAdmin BOOLEAN DEFAULT false
);

-- PARTIES TABLE
CREATE TABLE IF NOT EXISTS parties( 
        id SERIAL PRIMARY KEY,
        partyName VARCHAR(128) UNIQUE NOT NULL,
        partyAddress VARCHAR(128) UNIQUE NOT NULL,
        partyLogo VARCHAR(128) UNIQUE NOT NULL,
        createdOn TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

-- OFFICES TABLE
CREATE TABLE IF NOT EXISTS offices( 
        id SERIAL PRIMARY KEY,
        officeName VARCHAR(128) UNIQUE NOT NULL,
        officeType VARCHAR(128) UNIQUE NOT NULL,
        createdOn TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

-- CANDIDATES TABLE
CREATE TABLE IF NOT EXISTS candidates( 
        id SERIAL PRIMARY KEY,
        office INT REFERENCES offices(id) ON DELETE CASCADE,
        party INT REFERENCES parties(id) ON DELETE CASCADE,
        userId INT REFERENCES users(id) ON DELETE CASCADE
    );

-- VOTES TABLE
CREATE TABLE IF NOT EXISTS votes( 
        id SERIAL PRIMARY KEY,
        office INT REFERENCES offices(id) ON DELETE CASCADE,
        candidate INT REFERENCES candidates(id) ON DELETE CASCADE,
        voter INT REFERENCES users(id) ON DELETE CASCADE
    );

-- PETITIONS TABLE
CREATE TABLE IF NOT EXISTS petitions( 
        id SERIAL PRIMARY KEY,
        office INT REFERENCES offices(id) ON DELETE CASCADE,
        createdBy INT REFERENCES users(id) ON DELETE CASCADE,
        text VARCHAR(128) NOT NULL,
        evidence VARCHAR(128) NOT NULL
    );

INSERT INTO users(firstname,
                      lastname,
                      othername ,
                      email,
                      phone,
                      passportUrl,
                      password,
                      isAdmin)
          VALUES('Chiazokam', 'Echeta', 'Chioma' , 'chiazokamecheta@gmail.com', '07032425466', 'www.passport/chiazokam.com', '$2b$10$LAkfreG/ayNEne9.cnJnp.HnvjsJzraz/uN.Mcv4XIKzQxY.W6/fW', true);
    COMMIT