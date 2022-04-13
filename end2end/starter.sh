#!/bin/bash

function defer {
  chmod -R 777 .reports
}

trap defer EXIT


yarn test $TEST_NAME


