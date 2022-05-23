CREATE TABLE meter(
   idMeter serial,
   serialNo varchar(25) not null,
   PRIMARY KEY( idMeter )
);

CREATE TABLE userMeter(
   idMeter int not null,
   username varchar(25) not null,
   email varchar(60) not null,
   PRIMARY KEY( idMeter ),
   CONSTRAINT fk_meter
      FOREIGN KEY(idMeter) 
	  REFERENCES meter(idMeter)
);


CREATE TABLE measure(
   
   idMeasure serial not null,
   idMeter integer not null,
   cumulativeFlow integer not null,
   currentFlowRate integer not null,
   temperature integer not null,
   secondTime integer not null,
   minuteTime integer not null,
   hourTime integer not null,
   dayTime integer not null,
   monthTime integer not null,
   yearTime integer not null,
   statusWord bigint not null,
   freeSpace bigint not null,
   countData integer not null,
   timeData timestamptz,
   PRIMARY KEY( idMeasure ),
   CONSTRAINT fk_meter
      FOREIGN KEY(idMeter) 
	  REFERENCES meter(idMeter)
   
);

INSERT INTO meter (serialNo) VALUES ('dsads15')

INSERT INTO measure (idMeter,cumulativeFlow,currentFlowRate,temperature,
					secondTime,minuteTime,hourTime,dayTime,yearTime,statusWord,
					freeSpace,countData,timeData) 
					VALUES ()