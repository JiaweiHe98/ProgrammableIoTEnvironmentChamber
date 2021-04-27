node app.js > /dev/null 2> server_error.log &

python3 light.py > light.log 2> light_error.log &
python3 relay.py > relay.log 2> relay_error.log &
python3 serial_read.py > serial.log 2> serial_error.log &
lt --port 4001 --subdomain chamber > tunnelo.log &

