# Venus Telescope

Venus telescope is a helper for the Venus DeFi platform on binance smart chain, it's main purpose is to send you emails when you reach certain levels of
collateral to avoid being liquidated.

### If this project helps you, please consider donating:

ETH/BSC: **0xa285e43258cFc05021AC16D5EdFCb984Cf9A31F8**  
BTC: **1Jws8UAJRbMBn4FmheiFvAHGrhhmfuqoMz**

## Requirements

- [Node.js](https://nodejs.org/en/)
- [Mailgun](https://www.mailgun.com/) account

## Installation

1. Clone or download this repository
2. run `npm install`
3. copy the `.env.example` file to `.env`

## Configuration

Now you need to edit the `.env` (not the `.env.example`) file to fit your needs.

I highly recommend that you create a specific email address to receive the **danger notifications** as you can configure your gmail account use custom ringtones
and bypass the "do not disturb" functionality.

#### WALLET_ADDRESS

``Address``  
The address you want to be monitored

#### VENUS_NOTIFICATION_DANGER_LOW

``Number``  
This is the low threshold for sending notifications to the danger email
(max. 1 every 5 minutes).

#### VENUS_NOTIFICATION_NOTIFICATION_LOW

``Number``  
This is the low threshold for sending notifications to the notifications email
(max. 1 every hour).

#### VENUS_NOTIFICATION_NOTIFICATION_HIGH

``Number``  
This is the high threshold for sending notifications to the notifications email
(max. 1 every hour).

#### VENUS_NOTIFICATION_DANGER_HIGH

``Number``  
This is the high threshold for sending notifications to the danger email
(max. 1 every 5 minutes).

#### BDOLLAR_ENABLED

``Boolean``  
Enable bdo price notifications.

#### BDOLLAR_PRICE_THRESHOLD

``Number``  
BDO price notifications are sent when the price is below this threshold.

#### MAILGUN_API_KEY

``String``  
API key for your mailgun account.

#### MAILGUN_DOMAIN

``String``  
Domain registered in your mailgun account.

#### MAILGUN_FROM_EMAIL

``Email``  
Email that sends the notifications.  
Ex. `Jane Doe <jane@example.com>`

#### MAILGUN_NOTIFICATION_EMAIL

``Email``  
Email that receives the notifications.  
Ex. `Jane Doe <jane@example.com>`

#### MAILGUN_DANGER_EMAIL

``Email``  
Email that receives the danger notifications, recommended having custom notifications rules to play a louder ring and bypass the "do not disturb"
functionality.  
Ex. `Jane Doe <jane@example.com>`
