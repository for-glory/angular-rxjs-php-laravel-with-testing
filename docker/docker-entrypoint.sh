#!/bin/bash

rm -f /var/run/httpd/httpd.pid

cd /www/web

composer install

if [ ! -f .env ]; then
    cp .env.example .env
fi

if [ ! -f config/horizon.php ]; then
    cp config/horizon.php.example config/horizon.php
fi

exec /usr/sbin/httpd -D FOREGROUND
