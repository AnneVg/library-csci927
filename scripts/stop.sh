#!/bin/bash

stop_program ()
{
  pidfile=$1

  echo "Stopping Process - $pidfile. PID=$(cat $pidfile)"
  kill -9 $(cat $pidfile)
  rm $pidfile
  
}

stop_program pids/member-mngt.pid
stop_program pids/book-mngt.pid
stop_program pids/borrow-mngt.pid
stop_program pids/api-gateway.pid
stop_program pids/frontend.pid

