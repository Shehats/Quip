# Quip
Social network website developed using spring boot framework and angular 4.
#### To Install the maven dependencies:
cd Quip
mvn install:install-file -Dfile=ojdbc7.jar -DgroupId=com.oracle -DartifactId=ojdbc7 -Dversion=12.1.0 -Dpackaging=jar
mvn install

#### To install the npm dependencies:
cd Quip/Quip
npm i -S
or yarn install

##### To serve the front end:
ng serve -o
