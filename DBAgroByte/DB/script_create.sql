-- Database: AgroByte

-- DROP DATABASE IF EXISTS "AgroByte";
CREATE TABLE measure(
   idMeasure serial not null,
   temperature float8 not null,
   humidity float8 not null,
   timeData timestamptz not null
);

CREATE TABLE dataparameters(
   idData serial not null,
   startTime time not null,
   timelapse integer not null,
   weekday integer not null
);