#!/bin/bash/
rm -fr ./uploads/res/img
rm -fr ./uploads/graph.zip
mkdir -p ./uploads/res/img
zip ./uploads/graph.zip ./uploads/res/img/*
