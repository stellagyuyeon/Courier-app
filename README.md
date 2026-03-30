# Courier App — Agent-Dispatched Delivery Platform

A courier app for an AI agent-dispatched delivery system.

---

## Overview

Unlike traditional delivery apps (e.g., DoorDash), where a human places an order, this system is driven by AI agents.
The agents monitor signals like inventory, calendar events, and demand patterns — rather than human-initiated needs — to proactively create delivery jobs, and continue to update them in real time during execution.
A central orchestrator agent manages the workflow, while specialized agents handle tasks like demand generation, dispatching, and feasibility evaluation.
The agent logic is assumed and not implemented in this project. The focus is on the courier flow and system design, rather than implementing the agent logic.

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
Not all updates are equal. The agent distinguishes between informational updates and action-required updates.
For example, minor changes such as a floor update (where the overall destination remains the same) are surfaced as informational updates without requiring user action. 
However, when the scope of the task changes — such as additional items or a different delivery location — the system gives the courier control to accept or decline the update.
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
