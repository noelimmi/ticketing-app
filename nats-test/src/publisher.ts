import nats from 'node-nats-streaming';

console.clear();

const stan = nats.connect('ticketing', 'abc', {
  url: 'http://localhost:4222',
});

stan.on('connect', () => {
  console.log('Publisher connected to NATS');

  const data = JSON.stringify({ id: '1234', title: 'Connect' });

  stan.publish('ticket:created', data, () => {
    console.log('event publised');
  });
});
