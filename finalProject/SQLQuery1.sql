CREATE DATABASE PointFiyLog;
GO
USE PointFiyLog;
GO
CREATE TABLE Logs (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    Timestamp DATETIME NOT NULL,
    Level NVARCHAR(128) NOT NULL,
    Message NVARCHAR(MAX) NOT NULL,
    Exception NVARCHAR(MAX) NULL,
    Properties NVARCHAR(MAX) NULL
);
select * from  Logs
