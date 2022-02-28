#!/bin/bash

# Running mysql_upgrade as the base schema was created in 5.6
mysql_upgrade -uroot -p"password"

# seed schema using csv files
echo "Seeding database schema"

# handle updating files to fix nulls
cp -r /mysql-seeds/*.{csv,sql} /var/lib/mysql-files/
SEED_PATH=/var/lib/mysql-files/*.csv
for f in $SEED_PATH;
do
	sed -i 's/"NULL"/NULL/' $f # correct quote NULL values so MySQL does not think they are strings
done


# now batch all files into mysql
mysql -uroot -p"password" -e "SET GLOBAL foreign_key_checks=0"
mysqlimport -uroot -p"password" react --default-character-set=utf8mb4 --fields-terminated-by=',' --fields-enclosed-by='"' --ignore-lines=1 --lines-terminated-by='\n' $SEED_PATH
mysql -uroot -p"password" -e "SET GLOBAL foreign_key_checks=1"


# finally, get rid of the files
rm -f /var/lib/mysql-files/*
