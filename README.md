# Courier App — Agent-Dispatched Delivery Platform

A mobile-first courier app for an AI agent-dispatched delivery system.

---

## Overview

Unlike traditional delivery apps (e.g., DoorDash), where a human places an order, this system is driven by an AI agent.

The agent monitors signals like inventory, calendar events, and demand patterns to proactively create delivery jobs — and continues to update them in real time during execution.

---

## Demo Flow

Job Offer → Accept → Pickup → On the Way → Deliver → Complete

---

## Use Case
I chose an office sandwich vending machine as the primary use case, as it allows the agent to leverage structured signals (inventory, time, and consumption patterns) to proactively generate orders.


At 1:00 PM, the system detects:

- Only 5 sandwiches left in inventory  
- A 3:00 PM meeting expanding from 10 → 15 attendees  

The agent predicts a shortage and creates a delivery job:

- Egg Mayo ×15  
- Ham Cheese ×5  

Courier receives:

- 2.4 mi  
- 18 min  
- $12.50 payout  

---

## Mid-Delivery Update (Core Feature)
Updates are not arbitrary — the agent evaluates kitchen capacity before sending any modification, only prompts the courier when a justified pay bump is included, and reassigns the task to another nearby courier if declined.


At 2:10 PM:

- 5 more attendees join  
- The agent confirms the kitchen can prepare 3 more items  

→ The job updates in real time:

- +3 Egg Mayo sandwiches  
- $12.50 → $17.50 (+$5.00)

Courier can accept or decline the update.

---

## Key Features

- AI-generated job offers  
- Real-time task updates  
- Dynamic pay adjustments  
- Earnings efficiency ($/mi)  
- Courier decision control (accept / decline)  
- Explainable AI actions  

---

## What’s Different from Traditional Systems

- Proactive: jobs are created by the system  
- Dynamic: tasks change during delivery  
- System-driven: no manual coordination needed  

---

## Tech Stack

- Next.js (App Router)
- React
- Tailwind CSS

---

## Running a prototpye

Run the app locally and open http://localhost:3000
