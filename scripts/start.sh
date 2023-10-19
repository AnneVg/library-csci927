#!/bin/bash

mkdir -p logs
mkdir -p pids
# run_program (service, pidfile, logfile)
run_program ()
{
  service=$1
  pidfile=$2
  logfile=$3

  if [ -e "$pidfile" ]
  then
    echo "$service is already running. Run 'npm stop' if you wish to restart."
    return 0
  fi

  pnpm start:$service >> $logfile 2>&1 &
  PID=$!
  if [ $? -eq 0 ]
  then
    echo "Successfully started $service. PID=$PID. Logs are at $logfile"
    echo $PID > $pidfile
    return 0
  else
    echo "Could not start $nodefile - check logs at $logfile"
    exit 1
  fi
}

run_program member-mngt pids/member-mngt.pid logs/member-mngt.log
run_program book-mngt pids/book-mngt.pid logs/book-mngt.log
run_program borrow-mngt pids/borrow-mngt.pid logs/borrow-mngt.log
run_program api-gateway pids/api-gateway.pid logs/api-gateway.log
run_program frontend pids/frontend.pid logs/frontend.log

