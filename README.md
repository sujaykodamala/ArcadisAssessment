# ShipmentManagementSystem

Angular frontend for the Shipment Management application.

## Overview

This application provides a UI for managing post offices and shipments.

The application communicates with a REST API provided by the backend repository.

## Features

- View post offices
- Create post offices
- Update post offices
- Delete post offices
- View shipments
- Create shipments
- Update shipments
- Delete shipments
- Filter shipments by:
  - Shipment ID
  - Status
  - Post Office / ZIP code
  - Weight
- Shipment pagination

## Technology Stack

- Angular
- TypeScript
- HTML
- CSS
- Angular Reactive Forms
- Angular HttpClient

## Project Structure

```text
src/app/
├── constants/
├── postoffice/
│   ├── components/
│   ├── models/
│   ├── services/
│   ├── styles/
│   └── templates/
├── shipment/
│   ├── components/
│   ├── models/
│   ├── services/
│   ├── styles/
│   ├── templates/
│   └── utils/
└── app.routes.ts
