#!/bin/bash
# Shell script to download dependencies for The Tenderwolf Diaries on Netlify.

# Download Jacqui's and Hawkeye's posts to a temporary directory.
mkdir -p posts/jacqui
mkdir posts/hawkeye
wget ${JACQUI} -O jacqui.tar
wget ${HAWKEYE} -O hawkeye.tar
tar -xf jacqui.tar -C posts/jacqui --strip 1
tar -xf hawkeye.tar -C posts/hawkeye --strip 1
rm jacqui.tar
rm hawkeye.tar

# Build the node app.
npm install
npm test
