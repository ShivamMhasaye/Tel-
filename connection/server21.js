const net = require('net');
const { InfluxDB, Point } = require('@influxdata/influxdb-client');

// InfluxDB configuration
const INFLUXDB_URL = 'http://localhost:8086';
const INFLUXDB_TOKEN = '58E4UcSbYsQ1dvWhSyX9z0NMnmuuFBAqD4fJ2BJV7h0lKoO8mUYYGEoK9zQdaCI2h19ey322eV85ZCTPwSTOrQ==';
const INFLUXDB_ORG = 'cdacian';
const INFLUXDB_BUCKET = 'PROCESS';

const influxDBClient = new InfluxDB({ url: INFLUXDB_URL, token: INFLUXDB_TOKEN });

// Set up TCP server
const SERVER_PORT = 4003;
const server = net.createServer(socket => {
  console.log('Client connected');

  socket.on('data', data => {
    try {
      const jsonData = JSON.parse(data.toString());
      console.log('Received data from client:', jsonData);

      // Store data in InfluxDB
      writeDataToInfluxDB(jsonData);
    } catch (error) {
      console.error('Error processing data:', error);
    }
  });

  socket.on('end', () => {
    console.log('Client disconnected');
  });

  socket.on('error', error => {
    console.error('Socket error:', error);
  });
});

server.listen(SERVER_PORT, () => {
  console.log(`Server listening on port ${SERVER_PORT}`);
});

async function writeDataToInfluxDB(data) {
  try {
    const writeApi = influxDBClient.getWriteApi(INFLUXDB_ORG, INFLUXDB_BUCKET);

    // Convert the value field to a number if it's a string
    if (typeof data.fields.value === 'string') {
      data.fields.value = parseFloat(data.fields.value);
    }

    // Create a new InfluxDB Point
    const point = new Point(data.name)
      .tag('host', data.tags.host)
      .floatField('value', data.fields.value);

    // Write the data point to InfluxDB
    writeApi.writePoint(point);
    await writeApi.close();
    console.log('Data stored in InfluxDB');
  } catch (error) {
    console.error('Error writing data to InfluxDB:', error);
  }
}
