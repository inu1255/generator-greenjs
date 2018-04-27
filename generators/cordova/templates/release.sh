#!/bin/sh
cordova-hcp build
scp -r www/ aliyun:/opt/soulsign/public/
