# ticketing-app

## Top level things to be done

- User can list a ticket for an event for sale.

- Other users can purchase this ticket.

- Any user can list tickets for sale and purchase tickets.

- When a user attempts to purchase a ticket , the ticket is `locked` for 15 minutes. The user has 15 minutes to enter the payment info.

- While locked, no other user can purchase the ticket. After 15 minutes, the ticket should `unlock`.

- Ticket prices can be edited if they are not locked.

## System Design

**DB models**

- User

  - email (string)
  - password (hashed string)

- Ticket

  - title (string)
  - price (number)
  - userId (Ref to User)
  - orderId (Ref to Order)

- Order

  - userId (Ref to User)
  - status (Created | Cancelled | AwaitingPayment | Completed)
  - ticketId (Ref to ticket)
  - expiresAt (Date)

- Charge

  -orderId (Ref to order)
  -status(Created | Failed | Completed)
  -amount (number)
  -stripeId(string)
  -stripeRefundId(string)

**Services**

- Auth

  > everything related to user signup/signin/signout

- Tickets

  > Tickets creating/editing. (Knows if tickets are updatable)

- Orders

  > Order creation/editing

- expiration

  > watches for orders to be created cancels them after 15 minutes.

- payments

  > Handles credit card payments. Cancels order if failed or expired.

**Events**

- UserCreated , UserUpdated

- OrderCreated , OrderCancelled , OrderExpired

- TicketCreated , TicketUpdated

- ChargeCreated

## Setting Base Error Structure

As there can be many language independent services in cluster. It is highly important to maintain a fixed error response accross the services.

## NATS Streaming Sever

Docs - docs.nats.io
NATS and NATS Streaming Server are two service

- We create chanels/topic
- required service will subscribe and listen to that channel

**client library** -> node-nats-streaming


**Event Logging**
1.  Used to handle downtime for a particular service. So that at any point of time when service is up. It can read event logs and be up to date.
1.  When new service is developed it can always be in sync with other service

NATS Streaming will by defualt store events *in memory* but can also can be stored in DB.

client in nats is called as stan. (Terminology in NATS..Its NATS in backwards)

## Port forwarding

For quickly expose pod outside cluster , we can use three ways
1. Node Cluster
1. Routing in ingress controller to specific cluster ip
1. port forwarding (fastest way for quick test)

Ex: kubectl port-forward <pod_name> <port_on_local_machine>:<port_on_actual_pod>

Publisher - data + Subject(name of channel/topic)
Listener - subscription to topic/channel.  
