#!/bin/bash
# Shell script to download dependencies for The Tenderwolf Diaries on Netlify.

# Download Jacqui's and Hawkeye's posts to a temporary directory.
mkdir -p posts/jacqui
mkdir posts/hawkeye
wget ${JACQUI} -O jacqui.tar 2>&1
wget ${HAWKEYE} -O hawkeye.tar 2>&1
tar -xf jacqui.tar -C posts/jacqui --strip 1
tar -xf hawkeye.tar -C posts/hawkeye --strip 1

# Use node to build the static app.
npm test

# Cleanup, just in case.
rm *.tar
rm -rf posts
